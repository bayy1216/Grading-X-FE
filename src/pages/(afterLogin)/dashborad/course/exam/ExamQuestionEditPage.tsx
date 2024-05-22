import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Question, QuestionEdit, QuestionEditResponse} from "@/api/question/question.response.ts";
import {MINUTE_5, QUESTIONS} from "@/const/data.ts";
import {getQuestionsByExamIdForUpdate} from "@/api/question/question.api.ts";
import {useEffect, useState} from "react";
import ExamQuestionEditItem from "@/components/exam/ExamQuestionEditItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import {GreenButton} from "@/components/ui/GreenButton.tsx";


const isChanged = (origin: Question, current: Question) => {
  return origin.weightage !== current.weightage || origin.query !== current.query || origin.index !== current.index;
}

export default function ExamQuestionEditPage() {
  const location = useLocation();
  const examId = parseInt(location.pathname.split("/")[5] || "0");
  const {data} = useQuery<QuestionEditResponse, Object, QuestionEditResponse, [_1: string, _2: number]>({
    queryKey: [QUESTIONS, examId],
    queryFn: getQuestionsByExamIdForUpdate,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });

  const [questions, setQuestions] = useState<QuestionEdit[]>([]);
  useEffect(() => {
    setQuestions(data?.questions?.sort((a, b) => a.index - b.index) || []);
  }, [data]);

  const [dirty, setDirty] = useState(false);

  /**
   * useEffect를 사용하여 questions가 변경될 때마다 dirty를 계산한다.
   * JSON의 값에 따라 dirty를 계산한다.
   */
  useEffect(() => {
    const isDirty = JSON.stringify(questions) !== JSON.stringify(data?.questions);
    setDirty(isDirty);
  }, [questions]);

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const {name, value} = e.target;
    if (name === "weightage" && isNaN(Number(value))) return;

    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const newQuestion = {
      ...question,
      [name]: name === "weightage" ? Number(value) : value,
    }


    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return newQuestion;
        }
        return q;
      });
    });
  }
  /**
   * 문제를 위로 이동시키는 함수
   * 문제의 index를 변경하여 정렬한다.
   */
  const onChangeUp = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const qIndex = question.index;
    const changeQuestion = questions.find((q) => q.index === qIndex - 1);
    if (!changeQuestion) return;
    const exchangeQuestions = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          index: changeQuestion.index,
        }
      } else if (q.id === changeQuestion.id) {
        return {
          ...q,
          index: question.index,
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));

  }

  /**
   * 문제를 아래로 이동시키는 함수
   * 문제의 index를 변경하여 정렬한다.
   */
  const onChangeDown = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    const qIndex = question.index;
    const changeQuestion = questions.find((q) => q.index === qIndex + 1);
    if (!changeQuestion) return;
    const exchangeQuestions = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          index: changeQuestion.index,
        }
      } else if (q.id === changeQuestion.id) {
        return {
          ...q,
          index: question.index
        }
      }
      return q;
    });
    setQuestions(exchangeQuestions.sort((a, b) => a.index - b.index));
  }

  const onDelete = (id: number) => {
    setQuestions((prev) => {
      return prev.filter((q) => q.id !== id);
    });
  }

  const onAddQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          id: (prev.length + 1) * -1,
          index: prev.length + 1,
          weightage: 0,
          query: "",
          answer: "",
          keywords: [],
        }
      ];
    });
  }

  const onQuestionSave = () => {
    const createQuestions = questions.filter((q) => q.id < 0);
    const updateQuestions = questions.filter((q) => {
      const originQuestion = data?.questions?.find((oq) => oq.id === q.id);
      return originQuestion && isChanged(originQuestion, q);
    });
    console.log("createQuestions", createQuestions);
    console.log("updateQuestions", updateQuestions);
    return;
  }


  const onAnswerChange = (id: number, value: string) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            answer: value,
          }
        }
        return q;
      });
    });
  };

  const onKeywordAdd = (id: number) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            keywords: [...q.keywords, ""],
          }
        }
        return q;
      });
    });
  }

  const onKeywordChange = (id: number, value: string, index: number) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            keywords: q.keywords.map((k, i) => {
              return i === index ? value : k;
            }),
          }
        }
        return q;
      });
    });
  }

  const onKeywordDelete = (id: number, index: number) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            keywords: q.keywords.filter((_, i) => i !== index),
          }
        }
        return q;
      });
    });
  }


  return (
    <div className="bg-[#f6f6f6] flex flex-row w-full h-full items-start justify-start overflow-y-auto relative">
      <div className="flex-1"/>
      <div className="flex flex-col items-end justify-start h-full pr-4">
        {questions.map((question) => (
          <ExamQuestionEditItem
            key={question.id}
            question={question}
            onQuestionChange={(e) =>
              onQuestionChange(e, question.id)
            }
            onChangeUp={() => onChangeUp(question.id)}
            onChangeDown={() => onChangeDown(question.id)}
            onDelete={() => onDelete(question.id)}
            onAnswerChange={onAnswerChange}
            onKeywordAdd={onKeywordAdd}
            onKeywordDelete={onKeywordDelete}
            onKeywordChange={onKeywordChange}
            isLast={questions.length === question.index}
          />
        ))}
      </div>
      <div className="sticky right-0 top-0 flex flex-col items-start justify-center h-full">
        <Button
          className="mb-2"
          onClick={onAddQuestion}
          variant="outline"
        >
          <div className="w-24">
            문제 추가
          </div>
        </Button>
        <GreenButton
          disabled={!dirty}
          onClick={onQuestionSave}
        >
          <div className="w-24">
            저장
          </div>
        </GreenButton>
      </div>
      <div className="flex-1"/>
    </div>
  );
}