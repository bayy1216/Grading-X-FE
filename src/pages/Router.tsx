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

const router = createBrowserRouter([
  {index: true, path: "/", element: <MainPage /> },
  {path: "/login", element: <LoginPage />},
  {path: "/signup", element: <SignupPage />},
  {
    path: "dashboard", element: <DashboardLayout />,
    children: [
      {path: "", element: <Navigate replace to={"course"} />},
      {path: "course", element: <CoursePage />},
      {path: "course/:courseId", element: <CourseDetailPage />},
      {path: "course/:courseId/exam", element: <ExamPage />},
      {path: "course/:courseId/exam/:examId", element: <ExamDetailPage />},
      {path: "course/:courseId/exam/:examId/take", element: <ExamTakePage />},
      {path: "account", element: <AccountPage />},
    ]
  },
]);


export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}