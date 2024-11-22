import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyroomHomePage } from './home/studyroom.page';

const routes: Routes = [
  {
    path: '', component: StudyroomHomePage
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student-routing.module').then(m => m.StudentRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyroomHomeRoutingModule {}
