import {useMemberStore} from "@/store/member.store.ts";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Main() {
  const memberStore = useMemberStore();
  const navigate = useNavigate();

  const onDashboardClick = () => {
    if (memberStore.data === null) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }

  const [examCode, setExamCode] = useState<string>('');

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCodeEnter();
    }
  }
  const onCodeEnter = () => {
    //숫자이거나 비었으면 에러메시지
    if (isNaN(Number(examCode)) || examCode === '') {
      alert('올바른 시험 코드를 입력해주세요.');
      return;
    }
    navigate(`/exam/${examCode}`);
  }

  return (
    <main className="flex flex-col  w-screen h-screen bg-bgGrey items-center">
      <div className="w-screen h-16 bg-bgGrey
      px-64 flex flex-row items-center border-b border-gray-700">
        <div className="text-base text-gray-50">
          Grading-X
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-row justify-end items-center">


          <button onClick={onDashboardClick}
                  className="h-7 mr-4 text-white text-[12px] font-light px-2.5 py-0.5
                  border border-buttonGreenBorder rounded-[6px]
                  hover:text-white hover:bg-[#38996b]/80 bg-buttonGreen">
            Dashboard
          </button>
          {memberStore.data == null &&
              <Link to={'/login'}
                    className="h-8 flex items-center justify-center mr-4 text-white text-[12px] font-light
                    px-2.5 py-0.5 border border-gray-300 rounded hover:bg-gray-400 hover:text-black">
                  <div>로그인</div>
              </Link>
          }

        </div>
      </div>
      <div className="mt-64 flex flex-col items-center text-5xl font-semibold">
        <div className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b
        from-[#cccccc] via-[#cccccc] to-[#ffffff]">
          Automate Your questions
        </div>
        <div className="text-transparent bg-clip-text
        bg-gradient-to-br from-[#3ECF8E] via-[#3ECF8E] to-[#3ecfb2] block md:ml-0">
          Manage your own exam
        </div>
      </div>

      <div className="h-32"/>

      <div className="flex flex-row bg-buttonGreen w-[600px] items-center rounded-full px-10 py-4">
        <div className="text-2xl text-white">
          Exam Access
        </div>
        <input
          className="w-96 h-10  px-4 py-2 text-lg text-gray-700 border border-gray-300 rounded-md"
          value={examCode}
          onChange={(e) => setExamCode(e.target.value)}
          placeholder="시험 코드를 입력하세요"
          onKeyDown={onEnter}
        />
        <button className="h-10 w-20 ml-2 bg-gray-700 text-white text-lg
          font-light px-2 py-1 border border-gray-300 rounded-md"
          onClick={onCodeEnter}
        >
          Enter
        </button>
      </div>
    </main>
  );
}