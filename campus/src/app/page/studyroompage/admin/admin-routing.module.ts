import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonListAdminPage } from './lesson-list-admin/lesson-list-admin.page';
import { ClassListAdminPage } from './class-list-admin/class-list-admin.page';

const routes: Routes = [
  {
    path: '', component: LessonListAdminPage // (디폴트임시) 진입 페이지 추가 후 세부 경로로 분할 필요
  },
  {
    path: 'lessonlist', component: LessonListAdminPage
  }, 
  {
    path: 'classlist', component: ClassListAdminPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
