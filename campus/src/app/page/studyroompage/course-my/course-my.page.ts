import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-classmy',
  templateUrl: './course-my.page.html',
  styleUrls: ['./course-my.page.scss'],
})
export class CourseMyPage implements OnInit {
  course = {
    id: 1,
    title: '코스명 : NestJS 백엔드 웹 서버 개발',
    instructor: '강사 : 김인용',
    lessons: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1, // 고유 ID
      name: `${i + 1}. 이 강의는 웹 개발에 대한 중요한 내용을 다룹니다.`
    }))
  };

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  getPaginatedLessons() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.course.lessons.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.course.lessons.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('course_id');
      console.log(courseId);
      if (courseId) {
        // 코스 데이터를 가져오는 로직 추가 가능
      }
    });
  }
}