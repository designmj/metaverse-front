import { CourseResponseDto } from "./course-response.interface";

export interface CoursePaginatedResponse {
    courses: CourseResponseDto[];
    totalCount: number;
}