import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {createExam} from "../../../../../api/exam/exam.api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {COURSES, DASHBOARD, EXAMS} from "../../../../../const/data.ts";
import {ExamCreateRequest} from "../../../../../api/exam/exam.request.ts";

export default function ExamCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  // /dashboard/course/3/exam/create 에서 3을 추출
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const [createExamDto, setCreateExamDto] = useState<ExamCreateRequest>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateExamDto((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateExamDto({...createExamDto, startTime: e.target.value});
  }

  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateExamDto({...createExamDto, endTime: e.target.value});
  }

  const queryClient = useQueryClient();

  const handleSaveClick = async () => {
    if(!createExamDto.name || !createExamDto.description || !createExamDto.startTime || !createExamDto.endTime) {
      alert('입력 값을 확인해주세요.');
    }
    //2024-04-08T00:00:00.000Z 형식으로 변환
    const converted = {
      ...createExamDto,
      startTime: new Date(createExamDto.startTime).toISOString(),
      endTime: new Date(createExamDto.endTime).toISOString(),
    }

    await createExam(courseId, converted);
    await queryClient.invalidateQueries({
      queryKey: [DASHBOARD, COURSES, courseId, EXAMS],
    });
    navigate(-1);
  }
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <form>
              <TextField
                name="name"
                label="Name"
                value={createExamDto.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={createExamDto.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />

              <label>Start date</label>
              <input type="date" onChange={changeStartDate}/>
              <label>End date</label>
              <input type="date" onChange={changeEndDate}/>

            </form>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>저장</Button>
        </Box>
      </Box>
    </Container>


  );
}