import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListAdminPage } from './course-list-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CourseListAdminPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseListAdminPageRoutingModule {}
