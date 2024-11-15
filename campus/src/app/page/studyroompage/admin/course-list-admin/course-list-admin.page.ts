import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../services/course/course.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { CourseCreateModalComponent } from 'src/app/component/course-create-modal/course-create-modal.component';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { CreateCourseRegistrationDto } from 'src/app/models/course/courses/course-registration.interface';
import { CourseResponseDto } from 'src/app/models/course/courses/course-response.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-classmy',
  templateUrl: './course-list-admin.page.html',
  styleUrls: ['./course-list-admin.page.scss'],
})
export class CourseListAdminPage implements OnInit {
  courses = [
    // 예시 코스 데이터
    { id: 1, title: 'NestJS 백엔드 웹 서버 개발', description: 'NestJS 프레임워크를 활용하여 효율적인 백엔드 웹 서버를 개발하는 방법을 배웁니다. RESTful API 설계 및 데이터베이스 연동을 포함한 실습 중심의 강의입니다.', instructor: '김강사', isExpanded: false },
    { id: 2, title: 'Angular 프론트엔드 기획과 데이터바인딩', description: 'Angular 프레임워크를 이용한 프론트엔드 개발의 기초부터 데이터 바인딩 기법까지, 실무에 필요한 다양한 기술을 익힐 수 있는 과정입니다.', instructor: '최강사', isExpanded: false },
    { id: 3, title: 'Virtual Reality 가상현실 레벨 디자인', description: '가상현실 환경에서의 레벨 디자인 기법을 배우고, 실제 VR 프로젝트에 적용할 수 있는 실습을 통해 창의적인 디자인 능력을 키웁니다.', instructor: '김강사', isExpanded: false },
    { id: 4, title: 'VR/AR 컴포넌트 프로그래밍', description: 'VR 및 AR 애플리케이션을 위한 컴포넌트를 프로그래밍하는 방법을 배우며, 최신 기술을 활용한 인터랙티브한 경험을 설계하는 과정입니다.', instructor: '이강사', isExpanded: false },
    { id: 5, title: 'Amazon Web Service 배포와 CI/CD', description: 'AWS를 활용하여 애플리케이션을 배포하고, CI/CD 파이프라인을 구축하는 방법을 배우는 과정으로, 클라우드 환경에서의 효율적인 개발 및 운영을 다룹니다.', instructor: '김강사', isExpanded: false },
    { id: 6, title: 'Spring/SpringBoot 백엔드 프로그래밍', description: 'Spring과 SpringBoot를 이용한 백엔드 프로그래밍의 기초부터 고급 기술까지, 실제 프로젝트를 통해 실습하며 학습하는 과정입니다.', instructor: '김강사', isExpanded: false },
    { id: 7, title: 'Figma 서비스 기획과 React 프론트엔드 개발', description: 'Figma를 사용하여 서비스 기획을 하고, React를 통해 프론트엔드 개발을 실습하는 과정으로, 디자인과 개발의 통합적 접근을 배웁니다.', instructor: '최강사', isExpanded: false },
    { id: 8, title: '취업을 위한 포트폴리오/이력서/자소서 다듬기', description: '취업 준비를 위한 포트폴리오, 이력서, 자기소개서를 효과적으로 작성하고 다듬는 방법을 배우며, 경쟁력 있는 지원서를 만드는 과정입니다.', instructor: '김강사', isExpanded: false },
    { id: 9, title: '기술면접을 대비한 Computer Science 기초', description: '기술면접에서 자주 묻는 Computer Science의 기초 개념을 학습하고, 문제 해결 능력을 키우는 과정으로, 실전 면접 대비에 초점을 맞춥니다.', instructor: '김강사', isExpanded: false },
    { id: 10, title: 'Java 프로그래밍 언어 기초', description: 'Java 프로그래밍 언어의 기본 문법과 개념을 배우고, 간단한 프로젝트를 통해 실습하며 프로그래밍 능력을 향상시키는 과정입니다.', instructor: '김강사', isExpanded: false },
    { id: 11, title: 'C++ 프로그래밍 언어 기초', description: 'C++의 기본 문법과 객체 지향 프로그래밍 개념을 배우고, 다양한 실습을 통해 프로그래밍 실력을 쌓는 과정입니다.', instructor: '김강사', isExpanded: false },
    { id: 12, title: 'Javascript 프로그래밍 언어 기초', description: 'Javascript의 기본 문법과 웹 개발에서의 활용 방법을 배우며, 실습을 통해 동적인 웹 페이지를 만드는 기술을 익힙니다.', instructor: '최강사', isExpanded: false },
    { id: 13, title: 'Typescript 프로그래밍 언어 기초', description: 'Typescript의 기본 문법과 Javascript와의 차이점을 배우고, 타입 안전성을 활용한 프로그래밍 기법을 익히는 과정입니다.', instructor: '최강사', isExpanded: false },
    // ... 추가 강의 데이터
    { id: 20, title: '코스 20', description: '코스 20에 대한 자세한 설명을 통해 학습 목표와 내용을 안내하는 과정입니다.', instructor: '강사 20', isExpanded: false }
];

  registeredCourses: Set<number> = new Set(); // 신청한 강의 ID를 저장할 Set
  // courses: CourseResponseDto[] = []; // 가져온 강의 정보를 저장할 배열
  coursesRegistration : CreateCourseRegistrationDto[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private courseService: CourseService,
    private modalController: ModalController,
    private route: ActivatedRoute
  ) {}

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
    this.loadCourses(); // 컴포넌트가 초기화될 때 강의 목록을 불러옴
    this.courseJoinUser(); //이게 실행되면 페이지에 load가 되지 않는 오류가 있음
    this.loadRegisteredCourses(); //등록된 강의 로딩
  }


  async loadCourses() {
    // try {
    //   const response: ApiResponse<CourseResponseDto[]> = await firstValueFrom(this.courseService.getAllCourses());
    //   this.courses = response.data; // response.data에서 배열 추출
    //   console.log(response)
    //   console.log(response.data)
    // } catch (error) {
    //   console.error('Error loading courses', error);
    // }
  }

  // 등록한 강의 로드
  loadRegisteredCourses() {
    const registeredCourses = localStorage.getItem('registeredCourses');
    if (registeredCourses) {
      this.registeredCourses = new Set(JSON.parse(registeredCourses));
    }
  }

  async createCourse() {
    const modal = await this.modalController.create({
      component: CourseCreateModalComponent,
      cssClass: 'modal',
    });
    return await modal.present();
  }

  getCourseInfo(courseId: number) {

  }

  async updateCourse(course: CourseResponseDto) {
   // 1. 모달을 열어서 기존 강의 데이터를 전달하고 수정할 수 있게 함
    const modal = await this.modalController.create({
      component: CourseCreateModalComponent,
      cssClass: 'modal',
      componentProps: { course } // 기존 강의 데이터를 모달에 전달
    });

    // 2. 모달이 닫힌 후의 결과 처리
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        // 사용자가 수정을 완료하고 데이터를 반환했을 때
        try {
          const updatedCourse = result.data;
          const response = await firstValueFrom(this.courseService.updateCourse(course.course_id, updatedCourse));
          console.log('Course updated successfully:', response);

          // 3. 업데이트 후 강의 목록을 다시 불러옴
          this.loadCourses();
        } catch (error) {
          console.error('Error updating course:', error);
        }
      }
    });

    return await modal.present();
  }

  async deleteCourse(courseId: number) {
    const confirmed = confirm('이 코스를 삭제하시겠습니까?'); // 삭제 확인 다이얼로그
    if (!confirmed) {
      return; // 사용자가 삭제를 취소한 경우
    }
    try {
      const response: ApiResponse<void> = await firstValueFrom(this.courseService.deleteCourse(courseId)); // 숫자를 문자열로 변환하여 삭제 API 호출
      console.log(response.message); // 삭제 성공 메시지 출력
      this.loadCourses(); // 삭제 후 목록 갱신
    } catch (error) {
      console.error('강의 삭제 중 오류 발생', error);
    }
  }

  async getCurrentDate(): Promise<Date> {
    return new Date(); // 현재 날짜를 Date 객체로 반환
  }

  // async joinCourse(courseId: number) {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('토큰을 찾을 수 없습니다.');
  //     alert('로그인이 필요합니다.');
  //     return;
  //   }

  //   try {
  //     const courseReportingDate = await this.getCurrentDate(); // Date 객체 가져오기
  //     const registrationData: CreateCourseRegistrationDto = {
  //       course_reporting_date: courseReportingDate.toISOString(), // ISO 문자열로 변환하여 설정
  //       course_registration_status: Registration.PENDING,
  //     };

  //     const response: ApiResponse<CreateCourseRegistrationDto> = await firstValueFrom(
  //       this.courseService.joinCourse(courseId, registrationData)
  //     );
  //     console.log('강의 신청 성공:', response.message);
  //     alert('강의 신청이 완료되었습니다.');
  //     this.registeredCourses.add(courseId);
  //   } catch (error) {
  //     // 오류 처리 코드
  //     console.error('강의 신청 중 오류 발생:', error);
  //     alert('강의 신청 중 오류가 발생했습니다.');
  //   }
  //   //임시로 작성된 코드임, 등록한 코스 저장하기
  //   this.registeredCourses.add(courseId);
  //   localStorage.setItem('registeredCourses', JSON.stringify(Array.from(this.registeredCourses)));
  // }

  //현재 강의를 신청했는지에 대한 변수
  isRegistered(courseId: number): boolean {
    return this.registeredCourses.has(courseId); // 강의 ID가 Set에 존재하는지 확인
  }

  //신청하기
  async courseJoinUser() {
    try {
      const response: ApiResponse<any> = await firstValueFrom(this.courseService.getAllJoinUsers());

      // 응답이 객체일 경우 적절히 배열로 변환
      this.coursesRegistration = response.data.registrations || [];

      console.log('Loaded courses:', this.coursesRegistration);
    } catch (error) {
      console.error('Error loading courses', error);
    }
  }

  acceptUser(userId: number) {
    // 유저 수락 로직을 여기에 구현
    console.log(`User ${userId} accepted.`);
  }

  rejectUser(userId: number) {
    // 유저 거절 로직을 여기에 구현
    console.log(`User ${userId} rejected.`);
  }
}