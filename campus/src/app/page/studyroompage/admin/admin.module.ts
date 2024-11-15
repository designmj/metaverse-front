import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminRoutingModule } from './admin-routing.module';
import { LessonListAdminPage } from './lesson-list-admin/lesson-list-admin.page';
import { CourseListAdminPage } from './course-list-admin/course-list-admin.page';
import { SidemenuComponent } from 'src/app/component/sidemenucomponent/sidemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRoutingModule,
    SidemenuComponent
  ],
  declarations: [LessonListAdminPage, CourseListAdminPage]
})
export class AdminModule {}
