import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  courses: CourseResponseDto[] = [];
  registeredCourses: Set<number> = new Set();
  coursesRegistration : CreateCourseRegistrationDto[] = [];
  currentPage: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  totalCount: number = 0;

  constructor(
    private courseService: CourseService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPaginatedCourses();
  }

  loadPaginatedCourses() {
    this.courseService.getPaginatedCourses(this.currentPage, this.limit).subscribe({
      next: response => {
        if (response.success) {
          this.courses = response.data.courses;
          this.totalCount = response.data.totalCount;
          this.totalPages = Math.ceil(this.totalCount / this.limit);
          console.log(response.data.courses)
        } else {
          console.error(response.message);
        }
      },
      error: err => {
        console.error('Error fetching paginated courses:', err);
      },
      complete: () => {
        console.log('Fetching paginated courses request completed.');
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadPaginatedCourses();
  }

  async createCourse() {
    const modal = await this.modalController.create({
      component: CourseCreateModalComponent,
      cssClass: 'modal',
    });
    return await modal.present();
  }

  viewCourseDetail(id: number) {
    this.router.navigate(['/courses/detail', id]);
  }

  //------------ 리팩토링 이전 기존 코드


  // 등록한 강의 로드
  loadRegisteredCourses() {
    const registeredCourses = localStorage.getItem('registeredCourses');
    if (registeredCourses) {
      this.registeredCourses = new Set(JSON.parse(registeredCourses));
    }
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
          const response = await firstValueFrom(this.courseService.updateCourse(course.id, updatedCourse));
          console.log('Course updated successfully:', response);

          // 3. 업데이트 후 강의 목록을 다시 불러옴
          // this.getAllCourses();
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
      // this.getAllCourses(); // 삭제 후 목록 갱신
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