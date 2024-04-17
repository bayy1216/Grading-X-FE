import {Outlet, useNavigate} from "react-router-dom";
import NavMenu from "../../../components/dashboard/NavMenu.tsx";
import {useEffect, useState} from "react";
import {useMemberStore} from "@/store/member.store.ts";
import {getMemberInfo} from "@/api/member/member.api.ts";
import secureLocalStorage from "react-secure-storage";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {cn} from "@/lib/utils.ts";

export default function DashboardLayout() {
  const nav = useNavigate();

  const memberStore = useMemberStore();

  /**
   * 로그인이 안되어있다면 정보 불러오기 시도 후, 로그인 페이지로 이동
   */
  useEffect(() => {
    if(secureLocalStorage.getItem('accessToken') === null) {
      nav('/login');
      return;
    }
    if(memberStore.data == null) {
      getMemberInfo().then((member) => {
        memberStore.setData(member);

      }).catch(() => {
        nav('/login');
      });
    }
  }, []);


  const layout = localStorage.getItem("react-resizable-panels:layout")
  const collapsed = localStorage.getItem("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout) : [265,1300]
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : false
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const navCollapsedSize =4;

  return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          localStorage.setItem("react-resizable-panels:layout", JSON.stringify(sizes));
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            console.log("onCollapse", isCollapsed);
            setIsCollapsed(true);
            localStorage.setItem("react-resizable-panels:collapsed", JSON.stringify(true));
          }}
          onExpand={() => {
            console.log("onExpand", isCollapsed);
            setIsCollapsed(false);
            localStorage.setItem("react-resizable-panels:collapsed", JSON.stringify(false));
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out h-full"
          )}
        >
          <NavMenu isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="h-dvh">
          <Outlet  />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
  );
}