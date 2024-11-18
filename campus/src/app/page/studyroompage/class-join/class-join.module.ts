import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassJoinPageRoutingModule } from './class-join-routing.module';
import { ClassJoinPage } from './class-join.page';
import { SidemenuComponent } from "../../../component/sidemenucomponent/sidemenu.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClassJoinPageRoutingModule,
        SidemenuComponent
    ],
  declarations: [ClassJoinPage]
})
export class ClassJoinPageModule {}
