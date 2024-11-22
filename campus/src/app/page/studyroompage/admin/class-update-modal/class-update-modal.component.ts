import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClassService } from '../../../../services/class/class.service';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { ClassResponseDto } from '../../../../models/class/classes/class-response.interface';

@Component({
  selector: 'app-update-class-modal',
  templateUrl: './class-update-modal.component.html',
  styleUrls: ['./class-update-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,          // IonicModule 추가
    ReactiveFormsModule,  // ReactiveFormsModule 추가
  ]
})
export class UpdateClassModalComponent  implements OnInit {
  @Input() class!: ClassResponseDto; // 모달에 전달된 강의 데이터
  classForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private alertController: AlertController
  ) {
    this.classForm = this.formBuilder.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.class) {
      // 전달받은 강의 데이터를 폼에 초기값으로 설정
      this.classForm.patchValue({
        title: this.class.title,
        instructor: this.class.instructor,
        description: this.class.description,
      });
    }
  }

  async onSubmit() {
    if (this.classForm.valid) {
      const classData = { ...this.class, ...this.classForm.value }; // 기존 데이터와 폼 데이터를 병합

      try {
        const response = await firstValueFrom(this.classService.updateClass(this.class.id, classData));
        console.log('Class updated successfully:', response);
        await this.showAlert('성공', '클래스가 성공적으로 수정되었습니다.');
      } catch (error) {
        console.error('Error updating class:', error);
        await this.showAlert('실패', '클래스 수정에 실패했습니다.');
      }
    }
  }

  // Alert 생성 메서드
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['확인'],
    });
    await alert.present();
  }
}
