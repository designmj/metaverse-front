import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceModalComponent } from './component/attendance-modal/attendance-modal.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidemenuComponent } from './component/sidemenucomponent/sidemenu.component';
import {TopBarComponent} from "./component/top-bar/top-bar.component";
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import{ExhibitionComponent} from "./page/exhibitionpage/exhibition/exhibition.component";
import { CourseService } from './services/course/course.service'; // 서비스 경로 확인
import { JwtModule } from '@auth0/angular-jwt';
import { UserDataModalComponent } from './component/user-data-modal/user-data-modal.component';

export function tokenGetter() {
  return localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
}

@NgModule({
  declarations: [AppComponent, AttendanceModalComponent],

  imports: [BrowserModule, ReactiveFormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    TopBarComponent,
    CommonModule,
    ExhibitionComponent,
    FormsModule, SidemenuComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'], // API 도메인 설정 (로컬호스트)
        disallowedRoutes: [], // 제외할 URL 설정
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},CourseService,],
  bootstrap: [AppComponent],
})
export class AppModule {}