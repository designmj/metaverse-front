import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidemenuComponent } from 'src/app/component/sidemenucomponent/sidemenu.component';
import { StudyroomHomePage } from './home/studyroom.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidemenuComponent,
    ReactiveFormsModule,
  ],
  declarations: [StudyroomHomePage]
})
export class StudyroomModule {}