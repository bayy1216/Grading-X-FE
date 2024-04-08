import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainPage from "./MainPage.tsx";
import CoursePage from "./dashborad/course/CoursePage.tsx";
import ExamPage from "./dashborad/course/exam/ExamPage.tsx";
import ExamDetailPage from "./dashborad/course/exam/ExamDetailPage.tsx";
import ExamTakePage from "./dashborad/course/exam/take/ExamTakePage.tsx";
import CourseDetailPage from "./dashborad/course/CourseDetailPage.tsx";
import LoginPage from "./LoginPage.tsx";
import SignupPage from "./SignupPage.tsx";
import DashboardLayout from "./dashborad/DashBoardLayout.tsx";
import AccountPage from "./dashborad/account/AccountPage.tsx";
import {getMemberInfo} from "../api/member/member.api.ts";
import {useQuery} from "@tanstack/react-query";
import {Member} from "../api/member/member.response.ts";
import {createContext, useEffect, useState} from "react";

const router = createBrowserRouter([
  {index: true, path: "/", element: <MainPage /> },
  {path: "/login", element: <LoginPage />},
  {path: "/signup", element: <SignupPage />},
  {
    path: "/dashboard", element: <DashboardLayout />,
    children: [
      {path: "", element: <Navigate replace to={"/dashboard/course"} />},
      {path: "course", element: <CoursePage />},
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
    queryKey: ['member', 'info'],
    queryFn: getMemberInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  const [isLoginChangedFlag, setIsLoginChangedFlag] = useState(false);

  useEffect(() => {
    refetch();
  }, [isLoginChangedFlag]);

  useEffect(() => {
    console.log("UseEffect")
    if(!data){
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