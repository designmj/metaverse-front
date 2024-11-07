import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CourseJoinPageRoutingModule } from './course-join-routing.module';
import { CourseJoinPage } from './course-join.page';
import { SidemenuComponent } from "../../../component/sidemenucomponent/sidemenu.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CourseJoinPageRoutingModule,
        SidemenuComponent
    ],
  declarations: [CourseJoinPage]
})
export class CourseJoinPageModule {}
