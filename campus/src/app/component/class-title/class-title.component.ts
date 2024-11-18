import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ClassService } from '../../services/class/class.service';
import { ClassResponseDto } from '../../models/class/classes/class-response.interface';
import { ApiResponse} from "../../models/common/api-response.interface";
import { ModalController } from '@ionic/angular';
import { UpdateClassModalComponent } from "../update-class-modal/update-class-modal.component";

@Component({
  selector: 'app-class-title',
  templateUrl: './class-title.component.html',
  styleUrls: ['./class-title.component.scss'],
})
export class ClassTitleComponent  implements OnInit {
  classes : ClassResponseDto[] = [];
  id: number = 14;  // classId 저장

  constructor(
    private classService : ClassService,
    private modalController : ModalController
  ) { }

  ngOnInit() {
    this.loadTitleClasses();
  }

  //코스에 대한 data 반환 : ClassResponseDto
  async loadTitleClasses() {
    try {
      const response: ApiResponse<ClassResponseDto[]> = await firstValueFrom(this.classService.getOneClasses(this.id));
      // response.data가 배열이 아닌 단일 객체일 경우 배열로 변환
      if (!Array.isArray(response.data)) {
        this.classes = [response.data]; // 배열로 변환
      } else {
        this.classes = response.data; // 이미 배열이면 그대로 사용
      }
    } catch (error) {
      console.error('Error loading classes', error);
    }
  }


  // 모달 열기
  openModal(classResponseDto: ClassResponseDto) {
    this.modalController.create({
      component: UpdateClassModalComponent,
      cssClass: 'modal',
      componentProps: { classResponseDto }, // 기존 강의 데이터를 모달에 전달
    }).then(modal => modal.present());
  }
}
