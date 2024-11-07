import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseCreateModalComponent } from '../course-create-modal/course-create-modal.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  imports: [
    IonicModule,
    RouterLink,
    NgForOf,
    RouterLinkActive,
    CommonModule,
  ],
  standalone: true
})
export class SidemenuComponent {
  classesVisible = false;
  projectsVisible = false;


  constructor(    private modalController: ModalController,
    private router: Router) {}

  toggleClasses() {
    this.classesVisible = !this.classesVisible;
  }
  toggleProjects() {
    this.projectsVisible = !this.projectsVisible;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  async createCourse() {
    const modal = await this.modalController.create({
      component: CourseCreateModalComponent,
      cssClass: 'modal',
    });
    return await modal.present();
  }
}




