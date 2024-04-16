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
import {useEffect} from "react";
import CourseCreatePage from "./(afterLogin)/dashborad/course/CourseCreatePage.tsx";
import ExamCreatePage from "./(afterLogin)/dashborad/course/exam/ExamCreatePage.tsx";
import ExamDetailEditPage from "./(afterLogin)/dashborad/course/exam/ExamDetailEditPage.tsx";
import {useMemberStore} from "../store/member.store.ts";
import secureLocalStorage from "react-secure-storage";

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
      {path: "course/:courseId/exam/create", element: <ExamCreatePage />},
      {path: "course/:courseId/exam/:examId", element: <ExamDetailPage />},
      {path: "course/:courseId/exam/:examId/edit", element: <ExamDetailEditPage />},
      {path: "course/:courseId/exam/:examId/take", element: <ExamTakePage />},
      {path: "account", element: <AccountPage />},
    ]
  },
]);

export default function Router() {
  const memberStore = useMemberStore();

  useEffect(() => {
    console.log('memberStore.data', memberStore.data);
    if(memberStore.data !== null || secureLocalStorage.getItem('accessToken') === null){
      return;
    }
    getMemberInfo().then((member) => {
      console.log('member', member);
      memberStore.setData(member);
    });
  }, []);


  return (
    <RouterProvider router={router} />
  );
}