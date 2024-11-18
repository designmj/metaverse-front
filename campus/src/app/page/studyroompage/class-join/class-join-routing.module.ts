import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassJoinPage } from './class-join.page';

const routes: Routes = [
  {
    path: '',
    component: ClassJoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassJoinPageRoutingModule {}
