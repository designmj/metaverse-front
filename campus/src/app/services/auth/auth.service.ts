// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(false);
//   isLoggedIn = this.loggedIn.asObservable();
//   private userApiUrl = 'http://localhost:3000/users';
//   private authApiUrl = 'http://localhost:3000/auth';

//   constructor(private http: HttpClient) {
//     // 초기 로그인 상태 설정
//     this.checkInitialLoginStatus();
//   }

//   private checkInitialLoginStatus() {
//     // 로컬 스토리지에 토큰이 있으면 로그인 상태를 true로 설정
//     this.loggedIn.next(!!localStorage.getItem('token'));
//   }

//   login_current(token: string) {
//     // 토큰을 로컬 스토리지에 저장하고 로그인 상태를 true로 설정
//     localStorage.setItem('token', token);
//     this.loggedIn.next(true);
//   }

//   logout_current() {
//     // 로컬 스토리지에서 토큰을 제거하고 로그인 상태를 false로 설정
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }

//   // 사용자 등록 메서드
//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.userApiUrl}/register`, userData);
//   }

//   // 사용자 로그인 메서드
//   login(credentials: any): Observable<any> {
//     return this.http.post<{ token: string }>(`${this.authApiUrl}/login`, credentials)
//       .pipe(
//         tap(response => {
//           console.log('Login response:', response);
//           // 로그인 성공 시 토큰을 저장하고 로그인 상태를 true로 설정
//           if (response.token) {
//             this.login_current(response.token);
//           } else {
//             console.error('토큰이 응답에 포함되지 않았습니다.');
//           }
//         })
//       );
//   }

//   // 강의 생성 메서드
//   /*createCourse(courseData: { course_title: string }): Observable<any> {
//     const token = localStorage.getItem('token'); // 로그인 시 저장한 토큰을 가져옴
//     const headers = { Authorization: `Bearer ${token}` }; // Authorization 헤더에 토큰 추가

//     return this.http.post(`${this.courseApiUrl}/register`, courseData, { headers });
//   }*/

//     private handleError(error: HttpErrorResponse) {
//       let errorMessage = '알 수 없는 오류가 발생했습니다.';
  
//       if (error.error instanceof ErrorEvent) {
//           errorMessage = `Error: ${error.error.message}`;
//       } else {
//           switch (error.status) {
//               case 400:
//                   errorMessage = error.error.message; // 서버에서 반환한 메시지 사용
//                   break;
//               case 409:
//                   errorMessage = error.error.message; // 중복 오류 메시지
//                   break;
//               case 500:
//                   errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
//                   break;
//               default:
//                   errorMessage = '알 수 없는 오류가 발생했습니다.';
//                   break;
//           }
//       }
//       return throwError(() => new Error(errorMessage));
//   }
  

// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();
  private userApiUrl = 'http://localhost:3000/users';
  private authApiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {
    // 초기 로그인 상태 설정
    this.checkInitialLoginStatus();
  }

  private checkInitialLoginStatus() {
    // 로컬 스토리지에 토큰이 있으면 로그인 상태를 true로 설정
    this.loggedIn.next(!!localStorage.getItem('token'));
  }

  login_current(token: string) {
    // 토큰을 로컬 스토리지에 저장하고 로그인 상태를 true로 설정
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout_current() {
    // 로컬 스토리지에서 토큰을 제거하고 로그인 상태를 false로 설정
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  // 사용자 등록 메서드
  register(userData: any): Observable<any> {
    return this.http.post(`${this.userApiUrl}/register`, userData).pipe(
      catchError(this.handleError)  // 오류 처리 추가
    );
  }

  // 사용자 로그인 메서드
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.authApiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          // 로그인 성공 시 토큰을 저장하고 로그인 상태를 true로 설정
          if (response.token) {
            this.login_current(response.token);
          } else {
            console.error('토큰이 응답에 포함되지 않았습니다.');
          }
        }),
        catchError(this.handleError)  // 오류 처리 추가
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    if (error.error instanceof ErrorEvent) {
      // 클라이언트 측 오류
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // 서버 측 오류
      switch (error.status) {
        case 400:
          errorMessage = error.error.message; // 서버에서 반환한 메시지 사용
          break;
        case 409:
          errorMessage = error.error.message; // 중복 오류 메시지
          break;
        case 500:
          errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          break;
        default:
          errorMessage = '알 수 없는 오류가 발생했습니다.';
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
