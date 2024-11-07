import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-data-modal',
  templateUrl: './user-data-modal.component.html',
  styleUrls: ['./user-data-modal.component.scss'],
})
export class UserDataModalComponent{

  @Input() userName: string | null = null;
  @Input() userRole: string | null = null;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

}
