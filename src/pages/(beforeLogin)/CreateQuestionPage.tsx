import {useState} from "react";
import {createQuestionByAI, QuestionAnswerResponse} from "@/api/question/question.api.ts";

export const CreateQuestionPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<QuestionAnswerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const result = await createQuestionByAI(formData);
      setResponse(result);
      setError(null);
    } catch (error) {
      setError('Error uploading file.');
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <h1>Upload a File</h1>
      <div className="flex flex-row items-stretch">
        <form onSubmit={handleSubmit} encType="mult-part/form-data" className="border p-4 w-[600px]">
          <input type="file" onChange={handleFileChange}/>
          <button type="submit">업로드</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>

      <div className="h-32"/>
      {response && (
        response.questions_answers.map((qa, index) => (
          <div key={index} className="border rounded-md p-4 mb-4 w-[600px] flex flex-col justify-between">

            <p>문제: {qa.답안}</p>
            <div className="h-12" />
            <p>답안: {qa.문제}</p>
          </div>
        ))
      )}
    </div>
  );

}