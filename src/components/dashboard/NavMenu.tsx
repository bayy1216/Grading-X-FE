import {Link, useLocation} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {logout} from "@/api/auth/auth.api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {MEMBER} from "@/const/data.ts";
import {useMemberStore} from "@/store/member.store.ts";
import {cn} from "@/lib/utils.ts";
import {buttonVariants} from "@/components/ui/button.tsx";

interface Props {
  isCollapsed: boolean;
}

interface NavLink {
  title: string;
  icon: string;
  variant: 'default' | 'ghost';
  to: string;
}


export default function NavMenu({isCollapsed}: Props) {
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const memberStore = useMemberStore();

  const onLogout = () => {
    console.log('logout');
    secureLocalStorage.removeItem('accessToken');
    secureLocalStorage.removeItem('refreshToken');
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({
      queryKey: [MEMBER]
    });
    logout().then(() => {
      memberStore.setData(null);
    });
  }

  const links: NavLink[] = [
    {title: 'Dashboard', icon: "DashboardIcon", variant: 'ghost', to: '/dashboard'},
    {
      title: 'Classes',
      icon: "ClassesIcon",
      variant: location.pathname.includes('course') ? 'default' : 'ghost',
      to: '/dashboard/course'
    },
    {
      title: 'Account',
      icon: "AccountIcon",
      variant: location.pathname.includes('account') ? 'default' : 'ghost',
      to: '/dashboard/account'
    },
  ]

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full"
    >
      <nav className="grid gap-1 px-2 group-[data-collapsed=true]:justify-center group-[data-collapsed=true]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <>
              <Link
                to={link.to}
                className={cn(
                  buttonVariants({variant: link.variant, size: "icon"}),
                  "h-9 w-9",
                  link.variant === "default" &&
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <span className="sr-only">{link.title}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                key={index}
                to={link.to}
                className={cn(
                  buttonVariants({variant: link.variant, size: "sm"}),
                  link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                {link.title}

              </Link>
            </>
          )
        )}

        {isCollapsed ? (
          <Link to={'/'} onClick={onLogout}
                className={cn(
                  buttonVariants({variant: 'ghost', size: "icon"}),
                  "h-9 w-9",
                )}>
            <span className="sr-only">로그아웃</span>

          </Link>
        ) : (
          <Link to={'/'} onClick={onLogout}
                className={cn(
                  buttonVariants({variant: 'ghost', size: "sm"}),
                  "justify-start"
                )}>
            로그아웃
          </Link>
        )}
      </nav>
    </div>
  )

  //
  // return (
  //   <div className={style.container}>
  //     <div className={style.topHeader}>
  //       <Link to={'/dashboard/course'} className={style.link}>
  //         <h1>Dashboard</h1>
  //       </Link>
  //     </div>
  //
  //
  //
  //     <div className={style.section}>Classes</div>
  //     <ul>
  //       <Link to={'/dashboard/course'} className={style.link}>
  //         {location.pathname.includes('course') ? <div className={style.current}>클래스 관리 ✓</div> :
  //           <li>클래스</li>}
  //       </Link>
  //
  //
  //     </ul>
  //     <Separator />
  //     <div className={style.section}>Account</div>
  //     <ul>
  //       <Link to={'/dashboard/account'} className={style.link}>
  //         {location.pathname.includes('account') ? <div className={style.current}>계정 관리 ✓</div> :
  //           <li>계정</li>}
  //       </Link>
  //     </ul>
  //     <Separator />
  //     <Link to={'/'} onClick={onLogout} className={style.link}>
  //       <div className={style.logout}>로그아웃</div>
  //     </Link>
  //   </div>
  // )
}