import {Course} from "@/api/course/course.response.ts";

type Props = {
  onClick: () => void;
  course: Course
}

export default function CourseItem({onClick, course}: Props) {

  return (
    <div className="w-80 h-48 bg-white flex flex-col
    rounded
     border border-gray-300 p-4 hover:bg-gray-200"
         onClick={onClick}
    >
      <div className="flex-1">
        <div className="text-2xl">{course.courseName}</div>
        <p className="text-sm">{course.startDate} - {course.endDate}</p>
      </div>
      <div>
        <p className="text-sm">Instructor: {course.instructor.name}</p>
      </div>
    </div>
  );
}