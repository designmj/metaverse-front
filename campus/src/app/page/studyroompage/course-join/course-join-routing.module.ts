import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseJoinPage } from './course-join.page';

const routes: Routes = [
  {
    path: '',
    component: CourseJoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseJoinPageRoutingModule {}
