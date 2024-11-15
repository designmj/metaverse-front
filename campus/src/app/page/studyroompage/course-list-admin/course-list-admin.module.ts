import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CourseListAdminPageRoutingModule } from './course-list-admin-routing.module';
import { CourseListAdminPage } from './course-list-admin.page';
import {SidemenuComponent} from "../../../component/sidemenucomponent/sidemenu.component";
import {CourseTitleComponent} from "../../../component/course-title/course-title.component";
import {DocTopicComponent} from "../../../component/doc-topic/doc-topic.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseListAdminPageRoutingModule,
    SidemenuComponent
  ],
    declarations: [CourseListAdminPage]
})
export class CourseListAdminPageModule {}
