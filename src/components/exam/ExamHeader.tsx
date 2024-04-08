import style from "./ExamHeader.module.css";
import React, { } from "react";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
  onSearch: () => void;
  examTitle: string;
  setExamTitle: (title: string) => void;
}

export default function ExamHeader({onSearch, examTitle, setExamTitle}: Props) {
  const navigation = useNavigate();
  const location = useLocation();

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Change")
    setExamTitle(e.target.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
      onSearch();
    }
  }

  const onCreateButtonClick = () =>{
    navigation(`${location.pathname}/create`);
  }

  return (
    <div className= {style.container}>
      <input id="title" className={style.search} value={examTitle}
             onKeyDown={onEnter}
             onChange={onChangeId} type="text" placeholder="시험 검색"/>
      <button className={style.createButton} onClick={onCreateButtonClick}>Create Exam</button>
    </div>
  );
}