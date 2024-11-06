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



  // public data: ClassmyResponseData = {
  //   VideoTopics: [],
  //   activeSection: 'lecture',
  //   isEmptyState: true,
  //   lectureItems: []
  // };

  constructor(
    private courseService: CourseService,
    // ActivatedRoute는 URL 경로에서 course_id를 동적으로 가져온다.
    private route: ActivatedRoute,
    private router: Router // Router 주입

  ) {
    // this.courseId = +this.route.snapshot.paramMap.get('courseId'); // courseId를 경로에서 가져오기
  }

  currentPage: number = 1;
  itemsPerPage: number = 5;

  toggleCourse(course: { isExpanded: boolean; }) {
    course.isExpanded = !course.isExpanded; // 현재 강의의 펼침 상태 토글
  }

  getLessons(lectureId: number): string[] {
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
  // 컴포넌트(페이지도 하나의 큰 컴포넌트)가 초기화될 때 호출되는 메서드
  ngOnInit() {
    // URL 경로에서 course_id 파라미터를 가져와 저장
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('course_id');
      console.log(courseId);
      if (courseId) {
        // this.course_id = +courseId; // 가져온 값을 숫자로 변환하여 저장
      }
      // if (this.course_id) {
        // this.router.navigate(['/courses', this.course_id, 'videoTopics', 'allVT2']);
    //   } else {
    //     console.error('Course ID가 설정되지 않았습니다.');
    //   }
    // });

    // 페이지가 로드될 때 강의 주제 로드
    // this.loadCourses();
  })
  }}



  // private routeSubscription?: Subscription;

  // async loadCourses() {
  //   try {
  //     // ApiResponse에서 배열을 받도록 변경
  //     const response: ApiResponse<VideoTopicResponseData[]> = await firstValueFrom(
  //       this.courseService.getAllVideoTopic(this.course_id)
  //     );

  //     this.data.VideoTopics = response.data.map(videoTopic => ({
  //       video_topic_id: videoTopic.video_topic_id,
  //       video_topic_title: videoTopic.video_topic_title,
  //       video_pa_topic_id: videoTopic.video_pa_topic_id,
  //     }));

  //     // 로드 후 빈 배열 여부 확인 (필요할 경우)
  //     if (this.data.VideoTopics.length === 0) {
  //       console.log('비디오 주제가 없습니다.');
  //     } else {
  //       console.log('로드된 비디오 주제:', this.data.VideoTopics);
  //     }
  //   } catch (error) {
  //     console.error('Error loading courses', error);
  //   }
  // }


  // 모든 비디오 토픽을 가져오는 메서드
      // async getAllVideoTopics() {
      //   try {
      //     const response: ApiResponse<VideoTopicResponseData[]> = await firstValueFrom(
      //       this.courseService.getAllVideoTopic(this.course_id)
      //     );

      //     this.data.VideoTopics = response.data.map(videoTopic => ({
      //       video_topic_id: videoTopic.video_topic_id,
      //       video_topic_title: videoTopic.video_topic_title,
      //       video_pa_topic_id: videoTopic.video_pa_topic_id,
      //     }));

      //     if (this.data.VideoTopics.length === 0) {
      //       console.log('비디오 주제가 없습니다.');
      //     } else {
      //       console.log('로드된 비디오 주제:', this.data.VideoTopics);
      //     }
      //   } catch (error) {
      //     console.error('비디오 주제 로드 중 오류 발생', error);
      //   }
      // }

      // setActiveSection(section: 'lecture' | 'material') {  // union type으로 타입 안정성 확보
      //   this.data.activeSection = section;
      // }

      // // 새로운 항목을 추가하고 초기 상태를 해제
      // addFirstLectureItem() {
      //   this.data.isEmptyState = false;  // 초기 상태를 해제
      //   this.data.lectureItems.push({ title: '', newCourseTitle: '' }); // 첫 항목 추가
      // }

      // // index 위치에 새로운 항목을 추가하는 메서드
      // addLectureItem(index: number) {
      //   this.data.lectureItems.splice(index + 1, 0, { title: '', newCourseTitle: '' });
      // }

      // async deleteVideo(courseId: number, videoTopicId: number) {
      //   const confirmed = confirm('이 비디오 주제를 삭제하시겠습니까?'); // 삭제 확인 다이얼로그
      //   if (!confirmed) {
      //     return; // 사용자가 삭제를 취소한 경우
      //   }
      //   try {
      //     const response: ApiResponse<void> = await firstValueFrom(this.courseService.deleteVideoTopic(courseId, videoTopicId)); // 비디오 주제 삭제 API 호출
      //     console.log(response.message); // 삭제 성공 메시지 출력
      //     this.loadCourses(); // 삭제 후 목록 갱신
      //   } catch (error) {
      //     console.error('비디오 주제 삭제 중 오류 발생', error);
      //   }
      // }

      // 비디오 주제를 생성하는 메서드
      // async videotopicRegister(i: number) {
      //   // null 체크를 명시적으로 수행
      //   if (!this.course_id) {
      //     console.error('courseId가 없습니다.');
      //     return;
      //   }
      //   const lectureItem = this.data.lectureItems[i]; // 현재 항목 가져오기
      //   if (!lectureItem.newCourseTitle) {
      //     return; // 제목이 없으면 실행하지 않음
      //   }

      //   const video_topic_title =  { video_topic_title: lectureItem.newCourseTitle }

      //   console.log('전송할 비디오 주제 데이터:', video_topic_title); // 확인용 로그

      //   try {
      //     // firstValueFrom은 Observable의 첫번째 값을 Promise로 변환하여 비동기로 처리, API 호출 완료까지 대기하는 메서드
      //     const response = await firstValueFrom(
      //       this.courseService.createVideoTopic(this.course_id, video_topic_title)
      //     );
      //     console.log('비디오 주제가 성공적으로 생성되었습니다:', response);
      //     alert('비디오 주제가 성공적으로 생성되었습니다!');

      //     // 새 비디오 주제 정보를 lectureItem에 저장
      //     lectureItem.title = lectureItem.newCourseTitle; // 성공적으로 생성 후 제목 설정
      //     lectureItem.newCourseTitle = ''; // 입력 초기화
      //   } catch (error) {
      //     console.error('비디오 주제 생성 중 오류 발생:', error);
      //     alert('비디오 주제 생성에 실패했습니다.');
      //   }
      // }

      // Alert 메시지 표시를 위한 메서드
      // async showAlert(title: string, message: string) {
      //   alert(`${title}: ${message}`);
      // }
