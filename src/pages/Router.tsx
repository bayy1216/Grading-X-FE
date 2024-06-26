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
import GuestExamTakePage from "@/pages/(beforeLogin)/GuestExamTakePage.tsx";
import ExamQuestionEditPage from "@/pages/(afterLogin)/dashborad/course/exam/ExamQuestionEditPage.tsx";
import CourseDetailLayout from "@/pages/(afterLogin)/dashborad/course/CourseDetailLayout.tsx";
import CourseResultPage from "@/pages/(afterLogin)/dashborad/course/CourseResultPage.tsx";
import CourseAnnouncementPage from "@/pages/(afterLogin)/dashborad/course/CourseAnnouncementPage.tsx";
import {CreateQuestionPage} from "@/pages/(beforeLogin)/CreateQuestionPage.tsx";

const router = createBrowserRouter([
  {index: true, path: "/", element: <MainPage /> },
  {path: "/login", element: <LoginPage />},
  {path: "/signup", element: <SignupPage />},
  {path: "/exam/:examId", element: <GuestExamTakePage />},
  {path: "/question/create", element: <CreateQuestionPage />},
  {
    path: "/dashboard", element: <DashboardLayout />,
    children: [
      {path: "", element: <Navigate replace to={"/dashboard/course"} />},
      {path: "course", element: <CoursePage />},
      {path: "course/create", element: <CourseCreatePage />},
      {
        path: "course/:courseId", element: <CourseDetailLayout />,
        children: [
          {path: "", element: <CourseDetailPage />},
          {path: "exam", element: <ExamPage />},
          {path: "exam/create", element: <ExamCreatePage />},
          {path: "exam/:examId", element: <ExamDetailPage />},
          {path: "exam/:examId/edit", element: <ExamDetailEditPage />},
          {path: "exam/:examId/question-edit", element: <ExamQuestionEditPage />},
          {path: "exam/:examId/take", element: <ExamTakePage />},
          {path: "announcement", element: <CourseAnnouncementPage />},
          {path: "result", element: <CourseResultPage />}
        ],
      },
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