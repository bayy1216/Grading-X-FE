import style from './signup.module.css';
import BackButton from "./BackButton";
import {FormEventHandler, useState} from "react";
import {useNavigate} from "react-router-dom";

function showMessage(message: string | null) {
  console.log('message', message);
  if (message === 'no_id') {
    return '아이디를 입력하세요.';
  }
  if (message === 'no_name') {
    return '닉네임을 입력하세요.';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요.';
  }
  if (message === 'no_image') {
    return '이미지를 업로드하세요.';
  }
  if (message === 'user_exists') {
    return '이미 사용 중인 아이디입니다.';
  }
  return '';
}

export default function SignupModal() {

  const [message, setMessage] = useState('');
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      //
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  }
  const navigate = useNavigate();
  const onClickClose = () => {
    //홈으로 이동
    navigate('/');
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
    <>
      <div className={style.modalBackground} onClick={handleModalClick}>
        <div className={style.modal} onClick={handleContentClick}>
          <div className={style.modalHeader}>
            <BackButton/>
            <div>계정을 생성하세요.</div>
          </div>
          <form onSubmit={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" name="id" className={style.input} type="text" placeholder=""
                       required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" name="name" className={style.input} type="text" placeholder=""
                       required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" name="password" className={style.input} type="password" placeholder=""
                       required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input id="image" name="image" required className={style.input} type="file" accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton} disabled={message !== ''}>가입하기</button>
              <div className={style.error}>{showMessage(message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}