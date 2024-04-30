import React, { } from "react";
import {Link, useLocation} from "react-router-dom";
import {GreenButton} from "@/components/ui/GreenButton.tsx";

type Props = {
  onSearch: () => void;
  examTitle: string;
  setExamTitle: (title: string) => void;
}

export default function ExamHeader({onSearch, examTitle, setExamTitle}: Props) {
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

  return (
    <div className="flex flex-row justify-between items-center p-4 border-b border-gray-300 w-full">
      <input
        id="title"
        className="flex flex-row items-center w-30 h-9 p-2 border border-gray-300 rounded-md"
        value={examTitle}
        onKeyDown={onEnter}
        onChange={onChangeId} type="text" placeholder="시험 검색"
      />
      <GreenButton>
        <Link to={`${location.pathname}/create`}>
          시험 생성
        </Link>
      </GreenButton>
    </div>
  );
}