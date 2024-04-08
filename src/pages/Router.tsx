import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainPage from "./(beforeLogin)/MainPage.tsx";
import CoursePage from "./(afterLogin)/dashborad/course/CoursePage.tsx";
import ExamPage from "./(afterLogin)/dashborad/course/exam/ExamPage.tsx";
import ExamDetailPage from "./(afterLogin)/dashborad/course/exam/ExamDetailPage.tsx";
import ExamTakePage from "./(afterLogin)/dashborad/course/exam/take/ExamTakePage.tsx";
import CourseDetailPage from "./(afterLogin)/dashborad/course/CourseDetailPage.tsx";
import LoginPage from "./(beforeLogin)/LoginPage.tsx";
import SignupPage from "./(beforeLogin)/SignupPage.tsx";
import DashboardLayout from "./(afterLogin)/dashborad/DashBoardLayout.tsx";
import AccountPage from "./(afterLogin)/dashborad/account/AccountPage.tsx";
import {getMemberInfo} from "../api/member/member.api.ts";
import {useQuery} from "@tanstack/react-query";
import {Member} from "../api/member/member.response.ts";
import {createContext, useEffect, useState} from "react";
import {INFO, MEMBER, MINUTE_10, MINUTE_5} from "../const/data.ts";
import CourseCreatePage from "./(afterLogin)/dashborad/course/CourseCreatePage.tsx";

const router = createBrowserRouter([
  {index: true, path: "/", element: <MainPage /> },
  {path: "/login", element: <LoginPage />},
  {path: "/signup", element: <SignupPage />},
  {
    path: "/dashboard", element: <DashboardLayout />,
    children: [
      {path: "", element: <Navigate replace to={"/dashboard/course"} />},
      {path: "course", element: <CoursePage />},
      {path: "course/create", element: <CourseCreatePage />},
      {path: "course/:courseId", element: <CourseDetailPage />},
      {path: "course/:courseId/exam", element: <ExamPage />},
      {path: "course/:courseId/exam/:examId", element: <ExamDetailPage />},
      {path: "course/:courseId/exam/:examId/take", element: <ExamTakePage />},
      {path: "account", element: <AccountPage />},
    ]
  },
]);
interface Props {
  member: Member | null;
  isError: boolean;
  changeLoginFlag: () => void;
}

export const MemberContext = createContext<Props>({
  member: null, isError: false, changeLoginFlag: () => {},
});

export default function Router() {
  const { data, isError,refetch }  = useQuery<Member>({
    queryKey: [MEMBER, INFO],
    queryFn: getMemberInfo,
    staleTime: MINUTE_5,
    gcTime: MINUTE_10,
  });
  const [isLoginChangedFlag, setIsLoginChangedFlag] = useState(false);

  useEffect(() => {
    console.log("[isLoginChangedFlag] UseEffect")
    refetch();
  }, [isLoginChangedFlag]);

  useEffect(() => {
    console.log("ROUTER UseEffect")
    if(!data){
      console.log("[data,refetch]refetch")
      refetch().then(r => console.log('refetch', r)).catch(e => console.error(e));
    }
  }, [data, refetch]);
  return (
    <MemberContext.Provider value={{
      member: data || null, // data가 null이면 null을 넣고 아니면 data를 넣는다.
      isError,
      changeLoginFlag: () => setIsLoginChangedFlag(!isLoginChangedFlag),
    }}>
      <RouterProvider router={router} />
    </MemberContext.Provider>
  );
}