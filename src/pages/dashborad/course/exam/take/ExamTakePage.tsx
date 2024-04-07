import {useLocation} from "react-router-dom";

export default function ExamTakePage() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  console.log(email);
  return (
    <div>
      <h1>Exam Take Page</h1>
    </div>
  );
}