import {useMemberStore} from "@/store/member.store.ts";
import {Link, useNavigate} from "react-router-dom";
export default function Main() {
  const memberStore = useMemberStore();
  const navigate = useNavigate();

  const onDashboardClick = () => {
    if(memberStore.data === null) {
      navigate('/login');
    }else{
      navigate('/dashboard');
    }
  }


  return (
    <main className="flex flex-col items-center w-screen h-screen bg-backgroundColor-blackgrey">
      <div className="w-screen h-16 bg-backgroundColor-blackgrey flex flex-row items-center border-b border-gray-700">
        <div className="flex-1"></div>
        <div className="flex flex-row justify-end items-center mr-16">

          <button onClick={onDashboardClick} className="h-8 mr-4 text-white text-sm font-light px-3 py-1 border border-gray-300 rounded bg-mediumseagreen hover:bg-gray-400">
            dashboard
          </button>
          <Link to={'/login'} className="h-8 mr-4 text-white text-sm font-light px-3 py-1 border border-gray-300 rounded bg-mediumseagreen hover:bg-gray-400">
            로그인
          </Link>
        </div>
      </div>
      <div className="mt-64 flex flex-col items-center text-2xl font-semibold text-white">
        <div>Automate Your exam questions</div>
        <div>
          Manage your own exam questions and save time
        </div>
      </div>
    </main>
  );
}