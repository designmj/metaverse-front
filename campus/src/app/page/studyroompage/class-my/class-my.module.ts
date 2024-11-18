import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassMyPageRoutingModule } from './class-my-routing.module';
import { ClassMyPage } from './class-my.page';
import { SidemenuComponent } from "../../../component/sidemenucomponent/sidemenu.component";
import { ClassTitleComponent } from "../../../component/class-title/class-title.component";
import { DocTopicComponent } from "../../../component/doc-topic/doc-topic.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassMyPageRoutingModule,
    SidemenuComponent
  ],
    declarations: [ClassMyPage, ClassTitleComponent, DocTopicComponent]
})
export class ClassMyPageModule {}
