import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VideoTopicResponseData } from '../../../models/course/video_topic/video_topic-response.interface';
import { CourseService } from '../../../services/course/course.service';
import { ApiResponse } from '../../../models/common/api-response.interface';
import { ClassmyResponseData } from '../../../models/course/dummy/classmy/classmy-response.interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-classmy',
  templateUrl: './course-my.page.html',
  styleUrls: ['./course-my.page.scss'],
})

export class CourseMyPage implements OnInit {
  courses = [
    // 예시 코스 데이터
    { id: 1, title: 'NestJS 백엔드 웹 서버 개발', instructor: '김강사', isExpanded: false },
    { id: 2, title: 'Angular 프론트엔드 기획과 데이터바인딩', instructor: '최강사', isExpanded: false },
    { id: 3, title: 'Virtual Reality 가상현실 레벨 디자인', instructor: '김강사', isExpanded: false },
    { id: 4, title: 'VR/AR 컴포넌트 프로그래밍', instructor: '이강사', isExpanded: false },
    { id: 5, title: 'Amazon Web Service 배포와 CI/CD', instructor: '김강사', isExpanded: false },
    { id: 6, title: 'Spring/SpringBoot 백엔드 프로그래밍', instructor: '김강사', isExpanded: false },
    { id: 7, title: 'Figma 서비스 기획과 React 프론트엔드 개발', instructor: '최강사', isExpanded: false },
    { id: 8, title: '취업을 위한 포트폴리오/이력서/자소서 다듬기', instructor: '김강사', isExpanded: false },
    { id: 9, title: '기술면접을 대비한 Computer Science 기초', instructor: '김강사', isExpanded: false },
    { id: 10, title: 'Java 프로그래밍 언어 기초', instructor: '김강사', isExpanded: false },
    { id: 11, title: 'C++ 프로그래밍 언어 기초', instructor: '김강사', isExpanded: false },
    { id: 12, title: 'Javascript 프로그래밍 언어 기초', instructor: '최강사', isExpanded: false },
    { id: 13, title: 'Typescript 프로그래밍 언어 기초', instructor: '최강사', isExpanded: false },
    // ... 추가 강의 데이터
    { id: 20, title: '코스 20', instructor: '강사 20', isExpanded: false }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router // Router 주입

  ) {
    // this.courseId = +this.route.snapshot.paramMap.get('courseId'); // courseId를 경로에서 가져오기
  }


  toggleCourse(course: { isExpanded: boolean; }) {
    course.isExpanded = !course.isExpanded; // 현재 강의의 펼침 상태 토글
  }

  getLessons(courseId: number): string[] {
    const lessons = [];
    for (let i = 1; i <= 20; i++) {
      lessons.push(`${i}강 : 이 강의는 웹 개발에 대한 중요한 내용을 다룹니다.`);
    }
    return lessons;
  }

  getPaginatedCourses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.courses.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.courses.length) {
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
      }
    })
  }
}