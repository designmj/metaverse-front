import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassCreateModalComponent } from 'src/app/page/studyroompage/admin/class-create-modal/class-create-modal.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
  ],
  standalone: true
})
export class SidemenuComponent {
  classesVisible = false;
  projectsVisible = false;
  AdminMenuesVisible = false;


  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  toggleClasses() {
    this.classesVisible = !this.classesVisible;
  }
  toggleAdminMenues() {
    this.AdminMenuesVisible = !this.AdminMenuesVisible;
  }
  toggleProjects() {
    this.projectsVisible = !this.projectsVisible;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  async createClass() {
    const modal = await this.modalController.create({
      component: ClassCreateModalComponent,
      cssClass: 'modal',
    });
    return await modal.present();
  }
}