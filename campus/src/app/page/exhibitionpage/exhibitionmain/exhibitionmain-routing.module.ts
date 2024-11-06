import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// @ts-ignore
import { ExhibitionmainPage } from './exhibitionmain.page';
import { ExhibitionDetailsPage } from '../exhibition-details/exhibition-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExhibitionmainPage
  },
  {
    path: ':id',
    component: ExhibitionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExhibitionmainPageRoutingModule {}
