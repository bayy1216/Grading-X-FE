import {ChangeEventHandler, FormEventHandler, useContext, useEffect, useState} from "react";
import style from './login.module.css';
import {useNavigate} from "react-router-dom";
import SignupButton from "./SignupButton.tsx";
import BackButton from "./BackButton.tsx";
import {login} from "../../api/auth/auth.api.ts";
import secureLocalStorage from "react-secure-storage";
import {MemberContext} from "../../pages/Router.tsx";


export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const {changeLoginFlag} = useContext(MemberContext);
  const navigate = useNavigate();

  /**
   * 로그인이 되어있는 경우에는 바로 dashboard로 이동
   * useEffect를 사용하는 이유는 렌더링이 된 후에 실행되기 때문에
   */
  const {member} = useContext(MemberContext);
  useEffect(() => {
    if(member) {
      console.log('member', member);
      navigate('/dashboard', {replace: true});
    }
  },[member]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = await login({email, password});
      secureLocalStorage.setItem('accessToken', token.accessToken);
      secureLocalStorage.setItem('refreshToken', token.refreshToken);
      console.log('token', token);
      changeLoginFlag();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };
  const onClickClose = () => {
    //홈으로 이동
    navigate('/');
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleModalClick = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 모달 바깥의 배경 클릭 시 모달을 닫는 처리 로직 추가
    const target = e.target as HTMLElement;
    if (target.classList.contains(style.modalBackground)) {
      onClickClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 내부의 요소 클릭 시 클릭 이벤트가 모달 바깥으로 전파되지 않도록 함
    e.stopPropagation();
  };


  return (
    <div className={style.modalBackground} onClick={handleModalClick}>
      <div className={style.modal} onClick={handleContentClick}>
        <div className={style.modalHeader}>
          <BackButton/>
          <div>로그인하세요.</div>
          <SignupButton />
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">아이디</label>
              <input id="id" className={style.input} value={email} onChange={onChangeId} type="text" placeholder=""
                     required/>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">비밀번호</label>
              <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder=""
                     required/>
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!email && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}