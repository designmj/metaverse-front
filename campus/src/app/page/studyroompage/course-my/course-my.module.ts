import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CourseMyPageRoutingModule } from './course-my-routing.module';
import { CourseMyPage } from './course-my.page';
import {SidemenuComponent} from "../../../component/sidemenucomponent/sidemenu.component";
import {CourseTitleComponent} from "../../../component/course-title/course-title.component";
import {DocTopicComponent} from "../../../component/doc-topic/doc-topic.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseMyPageRoutingModule,
    SidemenuComponent
  ],
    declarations: [CourseMyPage, CourseTitleComponent, DocTopicComponent]
})
export class CourseMyPageModule {}
