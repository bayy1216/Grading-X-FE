import style from "./ExamHeader.module.css";
import React, { } from "react";

type Props = {
  onSearch: () => void;
  examTitle: string;
  setExamTitle: (title: string) => void;
}

export default function ExamHeader({onSearch, examTitle, setExamTitle}: Props) {

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Change")
    setExamTitle(e.target.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
      onSearch();
    }

  }

  return (
    <div className= {style.container}>
      <input id="title" className={style.search} value={examTitle}
             onKeyDown={onEnter}
             onChange={onChangeId} type="text" placeholder="시험 검색"/>
      <button className={style.createButton}>Create Exam</button>
    </div>
  );
}