export interface CourseCreateRequest {
  courseName: string;
  startDate: string;
  endDate: string;
}

export interface CourseUpdateRequest {
  courseName: string;
  endDate: string;
}