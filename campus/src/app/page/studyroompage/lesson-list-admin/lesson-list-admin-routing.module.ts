import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonListAdminPage } from './lesson-list-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LessonListAdminPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonListAdminPageRoutingModule {}
