import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminRoutingModule } from './admin-routing.module';
import { LessonListAdminPage } from './lesson-list-admin/lesson-list-admin.page';
import { ClassListAdminPage } from './class-list-admin/class-list-admin.page';
import { SidemenuComponent } from 'src/app/component/sidemenucomponent/sidemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRoutingModule,
    SidemenuComponent,
    ReactiveFormsModule
  ],
  declarations: [LessonListAdminPage, ClassListAdminPage]
})
export class AdminModule {}
