import { Component } from '@angular/core';
import { ExhibitionService } from "../../../services/exhibition/exhibitionservice.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-exhibitioncreate',
  templateUrl: './exhibitioncreate.page.html',
  styleUrls: ['./exhibitioncreate.page.scss'],
})
export class ExhibitioncreatePage {
  exhibition_title: string = ''; // 전시 제목
  team_name: string = ''; // 팀 이름
  description: string = ''; // 설명
  thumbnail: File | null = null; // 썸네일 파일
  thumbnailPreview: string | null = null; // 썸네일 미리보기 URL
  introduce: string = ''; // 단일 소개
  introductions: string[] = []; // 소개 문장 배열
  memberName: string = ''; // 멤버 이름
  memberImage: File | null = null; // 멤버 이미지 (null 가능)
  memberGeneration: string = ''; // 멤버 세대
  members: { name: string; image: File | null; generation: string; }[] = []; // 멤버 배열
  outputImagesList: File[] = []; // Output 이미지 파일을 저장할 배열
  outputImages: FileList | null = null;
  outputVideo: File | null = null; // 출력 비디오 파일
  outputVideoPreview: string | null = null; // 비디오 미리보기 URL
  exhibitionGeneration: string = ''; // 전시 세대 추가

  constructor( private router: Router,
               private exhibitionService: ExhibitionService) {}

  // Introduce 추가
  addIntroduce() {
    if (this.introduce) {
      this.introductions.push(this.introduce);
      this.introduce = ''; // 입력 필드 초기화
    }
  }

  // Introduce 삭제
  removeIntroduce(index: number) {
    this.introductions.splice(index, 1); // 해당 인덱스의 문장 삭제
  }

  // Member 추가
  addMember() {
    if (this.memberName && this.memberGeneration && this.memberImage) {
      this.members.push({
        name: this.memberName,
        image: this.memberImage, // File 객체를 저장
        generation: this.memberGeneration // 멤버 세대
      });
      
      // 초기화
      this.resetMemberInputs();
    } else {
      console.error('이름, 세대, 그리고 이미지를 모두 입력해야 합니다.');
    }
  }

  // Member 삭제
  removeMember(index: number) {
    this.members.splice(index, 1); // 해당 인덱스의 멤버 삭제
  }

  addOutputImage() {
    if (this.outputImages) {
      const filesArray: File[] = Array.from(this.outputImages);
      this.outputImagesList.push(...filesArray); // File 객체를 추가

      // 추가 후 초기화
      this.outputImages = null; // 선택된 파일 초기화
      const input = document.getElementById('outputImages') as HTMLInputElement;
      if (input) {
        input.value = ''; // 파일 입력 초기화
      }
    }
  }




  // Output 이미지 삭제
  removeOutputImage(index: number) {
    this.outputImagesList.splice(index, 1); // 해당 인덱스의 출력 이미지 삭제
  }
// Output 이미지 파일 변경 감지

 onOutputImageChange(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
      this.outputImages = target.files; // 선택된 파일들을 저장
  }
}


  // Member 이미지 파일 변경 감지
  onMemberImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.memberImage = target.files[0]; // memberImage 파일 설정
    }
  }

  // Thumbnail 파일 변경 감지
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.thumbnail = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.thumbnailPreview = e.target.result as string; // 미리보기 URL 저장
        }
      };
      reader.readAsDataURL(this.thumbnail);
    }
  }

  // Output 비디오 파일 변경 감지
  onOutputVideoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.outputVideo = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.outputVideoPreview = e.target.result as string; // 비디오 미리보기 URL 저장
        }
      };
      reader.readAsDataURL(this.outputVideo);
    }
  }

  // 제출 처리
  onSubmit() {
    // 유효성 검사
    if (this.introductions.length < 1 || this.introductions.length > 5) {
      alert('Introduce 문장은 1~5개 사이여야 합니다.');
      return;
    }
  
    if (this.members.length < 1 || this.members.length > 7) {
      alert('Member는 1~7명이어야 합니다.');
      return;
    }
  
    if (this.outputImagesList.length < 1 || this.outputImagesList.length > 3) {
      alert('Output에서 사용할 사진은 1~3개이어야 합니다.');
      return;
    }
  
    const exhibitionData = this.prepareExhibitionData();
    
    // 전시 생성 요청
    this.exhibitionService.saveExhibitionData(exhibitionData).subscribe({
      next: (exhibitionResponse) => {
        const exhibitionId = exhibitionResponse.exhibition_id; // 서버에서 받은 전시 ID
        this.submitIntroductions(exhibitionId);
        this.submitMembers(exhibitionId);
        this.submitOutputs(exhibitionId);
        this.router.navigate(['/exhibitionmain']).then(() => {
          window.location.reload();
        }); 
      },
      error: (exhibitionError) => {
        console.error('전시 생성 실패:', exhibitionError);
        alert('전시 생성에 실패했습니다. 다시 시도해 주세요.');
      }
    });
   

  }
  
  // 전시 데이터 준비
  prepareExhibitionData(): FormData {
    const exhibitionData = new FormData();
    exhibitionData.append('exhibition_title', this.exhibition_title);
    exhibitionData.append('team_name', this.team_name);
    exhibitionData.append('description', this.description);
    exhibitionData.append('generation', this.exhibitionGeneration); // 전시 세대 추가
  
    if (this.thumbnail) {
      exhibitionData.append('file', this.thumbnail);
    }
  
    return exhibitionData;
  }
  
  // Introductions 제출
  submitIntroductions(exhibitionId: number) {
    const introductionsData = new FormData();
    introductionsData.append('exhibition_id', exhibitionId.toString()); // 전시 ID 추가
  
    this.introductions.forEach((intro, index) => {
      introductionsData.append(`introduce[${index}]`, intro);
    });
  
    this.exhibitionService.saveIntroductions(introductionsData).subscribe({
      next: (introResponse) => {
        console.log('소개 생성 성공:', introResponse);
       
      },
      error: (introError) => {
        console.error('소개 생성 실패:', introError);
        alert('소개 추가에 실패했습니다. 다시 시도해 주세요.');
      }
    });
  }
  
  submitMembers(exhibitionId: number) {
    const membersData = new FormData();
    
    // 기본 정보 추가
    membersData.append('exhibitions_id', exhibitionId.toString());
    
    // 멤버 기본 정보 추가
    this.members.forEach((member, index) => {
        membersData.append(`members[${index}][name]`, member.name);
        membersData.append(`members[${index}][generation]`, member.generation);
    });
    
    // 파일들을 별도로 처리
    this.members.forEach((member, index) => {
        if (member.image) {
            membersData.append('members[*][image]', member.image);
        }
    });

    this.exhibitionService.saveMembers(membersData).subscribe({
        next: (membersResponse) => {
            console.log('멤버 생성 성공:', membersResponse);
        },
        error: (membersError) => {
            console.error('멤버 생성 실패:', membersError.error);
            alert('멤버 추가에 실패했습니다. 다시 시도해 주세요.');
        }
    });
}
// Outputs 제출
submitOutputs(exhibitionId: number) {
  const outputData = new FormData();
  outputData.append('exhibitions_id', exhibitionId.toString());

  // 출력 이미지 추가
  this.outputImagesList.forEach((image, index) => {
      outputData.append(`outputImages`, image); // 'outputImages[]' 형태로 배열로 추가
  });

  // 출력 비디오 추가 (선택적)
  if (this.outputVideo) {
      outputData.append('outputVideo', this.outputVideo); // 출력 비디오 추가
  }

  // 서버에 데이터 전송
  this.exhibitionService.saveOutputs(outputData).subscribe({
      next: (outputResponse) => {
          console.log('출력 생성 성공:', outputResponse);
      },
      error: (outputError) => {
          console.error('출력 생성 실패:', outputError);
          alert('출력 추가에 실패했습니다. 다시 시도해 주세요.');
      }
  });
}
  






  // 입력 필드 초기화 메서드
  resetMemberInputs() {
    this.memberName = ''; // 멤버 이름 초기화
    this.memberImage = null; // 멤버 이미지 초기화
    this.memberGeneration = ''; // 멤버 세대 초기화
  }
  
  // Data URL을 File 객체로 변환하는 헬퍼 함수
  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/);
    if (mime && mime[1]) {
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime[1] });
    }
    throw new Error('Invalid data URL');
  }
}

