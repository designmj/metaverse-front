import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseMyPage } from './course-my.page';

const routes: Routes = [
  {
    path: '',
    component: CourseMyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseMyPageRoutingModule {}
