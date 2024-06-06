import {Exam} from "@/api/exam/exam.response.ts";
import dayjs from "dayjs";

type Props = {
  exam: Exam;
};


export default function ExamItem({exam}: Props){

  const startTime = dayjs(exam.startTime).format('YYYY-MM-DD HH:mm');
  const endTime = dayjs(exam.endTime).format('YYYY-MM-DD HH:mm');
  return (
    <div className="w-full flex flex-row items-start justify-start p-5 border-b border-gray-300">
      <div className="flex-1">
        <div className="text-xl font-semibold mb-4">
          {exam.name}
        </div>
        <div className="flex flex-row items-center">
          <div className="text-base font-medium mb-2 mr-5">
            {startTime}
          </div>
          <div className="text-base font-medium mb-2">
            {endTime}
          </div>
          <div className="ml-2 text-base font-medium mb-2">
            / 시험코드 : {exam.id}
          </div>
        </div>
      </div>
    </div>
  );
}