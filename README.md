# [그레이픽(gray pick)](https://graypick.co.kr/)

법안 정보를 생활밀착형으로 쉽고 흥미롭게 추천해주는 AI 기반 큐레이션 서비스로, 복잡한 정치 정보를 일상과 연결하여 개인 맞춤형으로 제공하는 정치 참여 활성화 플랫폼

<img width="939" height="819" alt="image" src="https://github.com/user-attachments/assets/3fc3ce88-4e33-4c27-b1ae-c5f5b0f1d681" />

## 실행 방법

로컬 실행

```bash
npm i
npm run dev
```

스토리북 실행

```bash
npm run storybook
```

## 주요 기능

- 🔍 사용자 맞춤형 법안 추천 기능
- 🔍 법안 검색 기능
- 🎯 반응형 UI 지원 (데스크탑/모바일)
- 🛠 무한스크롤
- 🛠 AWS + Docker + Github action을 통한 CI/CD 파이프라인 연결

## 폴더구조

FSD를 간소화 시킨 폴더 구조 사용

- **규칙**
  1.  pages, features, shared 세 가지 레이어를 사용
  2.  next.js 특성상 pages는 app으로 대체
  3.  하위 레이어에서 상위 레이어를 import 금지
  4.  동일 레이어끼리는 import 가능
  5.  지엽적인 상수나 타입은 컴퍼넌트 내부, 피쳐 혹은 공용 상수나 타입은 hooks 및 types 폴더에서 관리

```
📦src
┣ 📂app / # next.js 페이지 컴퍼넌트
┣ 📂features / # feature 단위 컴퍼넌트
┃ ┗ 📂layout / # feature 명
┃ ┃ ┣ 📂const / # 상수
┃ ┃ ┣ 📂hooks / # 훅
┃ ┃ ┣ 📂types / # 타입
┃ ┃ ┣ 📜layout.css / # 관련 css
┃ ┃ ┗ 📜Header.tsx / # 관련 컴퍼넌트
┣ 📂shared / # shared 레이어 파일
┃ ┗ 📂components / # 컴퍼넌트
┃ ┃ ┣ 📜SolidBtn.stories.ts / # 공용 컴퍼넌트의 경우 스토리 작성
┃ ┃ ┗ 📜SolidBtn.tsx
┃ ┣ 📂const / # 상수
┃ ┣ 📂hooks / # 훅
┃ ┣ 📂styles / # css
┃ ┣ 📂svg / # svg컴퍼넌트
┣ ┗ 📂types / # 타입
┣ 📂stories / # 스토리 관련 mdx 파일
┃ ┗ 📜index.mdx
```

## 컨벤션

- **네이밍 컨벤션**

| 대상                           | 명명법                           | 예시                                                 |
| ------------------------------ | -------------------------------- | ---------------------------------------------------- |
| 폴더                           | 케밥 케이스                      | user-profile                                         |
| tsx 컴포넌트                   | 파스칼 케이스 , index.tsx는 예외 | Header.tsx                                           |
| 파일                           | 카멜 케이스                      | useLogin.ts                                          |
| 변수 및 함수                   | 카멜 케이스                      | userProfile                                          |
| 매개변수                       | 카멜 케이스                      | userNum                                              |
| boolean타입의 변수 및 반환함수 | is, has, can으로 시작            | isLoading                                            |
| 상수                           | 스크리밍 스네이크 케이스         | USER_PROFILE                                         |
| 타입                           | 파스칼 케이스                    | ProfileProps                                         |
| 배열 변수                      | 접미사로 List                    | const [userList, setUserList] = useState<User[]>([]) |
| 이벤트핸들러                   | handle 접두사                    | const handleLogin=()=>{}                             |
| 번역시 어렵거나 복잡한 용어    | 한글                             | 발의법안                                             |

- **축약어**
  | 원어 | 축약어 | 원어 | 축약어 |
  |--------------|--------|----------------|--------|
  | button | btn | color | clr |
  | image | img | property | prop |
  | input | inp | parameter | param |
  | navigation | nav | configuration | config |
  | section | sec | information | info |
  | background | bg |foreground | fg |
  | number | num | temporary | tmp |
  | message | msg | error | err |

- **prettier**

  ```json
  {
  	"printWidth": 150,
  	"tabWidth": 2,
  	"singleQuote": true,
  	"trailingComma": "all",
  	"bracketSpacing": true,
  	"semi": true,
  	"useTabs": true,
  	"arrowParens": "always"
  }
  ```

## 기술 스텍

<div>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">    
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/framer--motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</div>

## branch 전략

- main : 실 서비스 중인 브랜치. 베타서비스 이전까지는 develop 브랜치 역할을 대신함, main에 대한 pullrequest의 경우 merge: prefix와 라벨을 적용.
- develop : 신규 개발 내용을 병합중이 branch.
- tt-\* : 지라 이슈 번호에 따른 기능 단위의 브랜치. 작업이 완료시 develop에 병합 -> 이후 관련 develop 이슈에 이슈 번호 추가
- hotfix : 급하게 수정해야할 내용을 작업 -> main에 병합 , 단일 규모에 대한 hotfix는 tt에서 직접 작업후 병합

## 커밋 컨벤션

- feat: 기능 추가
- fix: 리팩토링 및 기능 수정
- bug: 버그 픽스
- remove : 파일삭제
- docs: 문서 및 주석 추가 및 수정
- test: 테스트 코드 추가
- ci/cd: cicd 파이프라인 추가 및 수정
- dep: 의존성 추가
- hotfix : 배포 파일 오류에 의한 핫픽스

## DOCS

[지라](https://twoteam.atlassian.net/jira/software/c/projects/TT/boards/2)  
[노션](https://www.notion.so/2074deb2c29380628abcd29de2cedcf5?pvs=5)
