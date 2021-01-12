![Main](/readmeAssets/logo.png)

# Metafume🌷
향수의 향을 시각적으로 표현하여 유저가 향을 상상해볼 수 있도록 도와주는 검색 서비스입니다.

![Main](/readmeAssets/main.gif)
![Main-2](/readmeAssets/main-2.gif)

## ✨ Summary
- Metafume - 향수의 향을 시각적 요소로 빗대어 표현하는 검색 웹서비스 (Metaphor + Perfume)
- Background - 향을 시각화해서 상상해볼 수 없을까? 기존의 경험과 새로운 지식을 조합한 도전
- Features - 향수 검색 및 향 시각화, 향과 재료 구성 정보 제공, 즐겨찾기, 유저 향수 추천, 구독 메일 서비스
- Duration - 총 3주 (1주 - 아이디어 구체화 & 설계 / 2주 - 구현 & 배포)
- Stack - React, D3, NodeJS (Express), Mongo, Redis, Puppeteer 등

```

🌟 Metafume이 더욱 궁금하시다면 자세한 내용은 아래에..😎

```

# 🌈 Table of contents
- [Links](#-Links)
- [Background](#-Background)
- [Duration](#-Duration)
- [Features](#-Features)
- [Deploy](#-Deploy)
- [Stack](#-Stack)
- [Usage](#-Usage)
- [Logs](#-Logs)

## 🔗 Links
- [배포 링크](https://www.metafume.site/)
- [Repository: Front-end](https://github.com/metafume/metafume-frontend)
- [Repository: Back-end](https://github.com/metafume/metafume-backend)
- [프로젝트 발표 영상 (2:24:16부터)](https://youtu.be/jMw5MIxLY3o?t=8656)
- [기능 영상 1: 검색, 상세 페이지 (유튜브 링크)](https://youtu.be/Gn4YyqeTo0s)
- [기능 영상 2: 유저 로그인, 즐겨찾기, 추천 (유튜브 링크)](https://youtu.be/8YsSLo3IaFA)

## 🌱 Background
향수는 직접 맡아보고 느끼는 게 가장 좋은 방법입니다. 하지만 특정 향수를 알아볼 때 검색으로 이미지나 구매한 사람의 후기 등으로 의존해서 상상해야 될 때도 있습니다 그리고 직접 찾아가서 맡아보는 게 귀찮을 수 있습니다. 시간을 들여야 하니까요. 그래서 **향수의 분위기를 향을 맡아보지 않고 상상해볼 수 있는 방법이 없을까?** 라는 의문이 들었습니다.

향은 한마디로 정의하기 어려운 요소라고 생각합니다. 여러 재료에 의해 다양한 향들이 공존하면서 하나의 하모니가 만들어지는 게 향입니다. 거듭된 고민의 결과 **향의 분위기를 대체재로 표현 가능하다고 생각한 것 중 하나가 색**이었고 향을 색상으로 빗대어 표현한다는 점에서 Metaphor + Perfume의 합성어인 Metafume이 만들어졌습니다.

개발 공부를 시작하기 전에 그래픽 디자인 분야에 있었습니다. 미적, 시각적 감각이 예민한 편입니다. 그래서 **향을 시각화 한다**는 아이디어는 **기존에 해왔던 그래픽, 그리고 지금 새롭게 흡수하고 있는 개발 분야에서도 충분한 도전 가치가 있다고 판단**하여 선택하게 되었습니다.

## 📅 Duration
2020.11.30 - 12.18 / **3주** (1주 - 아이디어 구체화 & 설계 + 2주 - 구현 & 배포)
- 1주차 - 아이디어 구체화, UX/UI, DB Schema 설계
- 2주차 - 크롤링 로직, D3 Visualization, 향수 추천, 메일 서비스 등 로직 구현
- 3주차 - 배포, 테스트 코드 작성, 코드 리펙터링

## 🌟 Features
- 원하는 **향수를 검색해서 향의 분위기를 색상**으로 알 수 있습니다
- 향수의 구성된 **향 정보와 사용된 재료를 확인**할 수 있습니다
- **유저 로그인, 향수 즐겨찾기 기능**이 있습니다
- 즐겨찾기 정보를 반영하여 유저에게 **향수 리스트를 추천**합니다
- 즐겨찾기 정보를 반영한 브랜드를 검색할 수 있도록 유도하는 **구독형 메일 서비스를 제공**합니다

## 🌐 Deploy

#### Front-end
- Netlify를 사용하여 애플리케이션 배포 및 관리

#### Back-end
- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- Amazon ACM (AWS Certificate Manager)을 사용하여 SSL 관리
- AWS 파이프라인 연결 후 배포 자동화 구현

## 🔧 Stack

| Front-end              | Back-end                |
| :--------------------- | :---------------------  |
| ES2015+                | NodeJS (Express)        |
| React                  | MongoDB                 |
| React-router-dom       | Redis                   |
| Redux (Redux-toolkit)  | Mongoose                |
| Redux-saga             | JWT (JSON Web Token)    |
| D3                     | Puppeteer               |
| SWR                    | Cheerio                 |
| Axios                  | Node-schedule           |
| Firebase               | Nodemailer              |
| Styled-components      | Mocha                   |
| Jest                   | Supertest               |
| React-testing-library  | Sinon                   |

## 💾 Usage

#### Requirements
최신 버전의 크롬 브라우저 사용을 권장합니다.

#### Installation
Local 환경에서 실행하기 위한 사전 준비가 필요합니다.

- [Firebase API key](https://firebase.google.com/?hl=ko)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

#### Front-end

Clone된 Root 디렉토리에 `.env` 파일을 생성하고, Firebase API Key와 API URL을 입력합니다.

```

REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_FIREBASE_APP_ID=<Your Firebase APP ID>

```

```

git clone https://github.com/metafume/metafume-frontend.git
cd metafume-frontend
npm install
npm start

```

#### Back-end

Clone된 Root 디렉토리에 `.env` 파일을 생성하고, MongoDB Url과 JWT의 Secret Key를 입력합니다.

```

LOCAL_CLIENT_URL=http://localhost:3000
LOCAL_MONGO_DB_URL=<Your MongoDB URL>
TOKEN_SECRET_KEY=<Your JWT Signature Secret KEY>

```

사전에 반드시 Redis 설치 & 터미널에서 redis-server 명령 실행 후 진행하세요.

```

git clone https://github.com/metafume/metafume-backend.git
cd metafume-backend
npm install
npm run dev

```

## 📝 Logs

#### 향수 정보 크롤링 (Fetch, Puppeteer)
- 향수 정보를 어디에서 어떤 방식으로 가져올지 고민했습니다.
- 리서치 결과 공식적으로 향수 정보를 충분히 제공하는 API는 없었고 특정 향수 정보 사이트를 크롤링하는 방식으로 결정하였습니다.
- 필요한 정보는 향수 검색 정보, 특정 향수 상세 페이지 정보 두 가지였습니다.
- 크롤링 방식은 사이트 렌더링 방식에 따라 달라지는데, 크롤링 타깃 사이트는 SSR이라 판단하여 SSR 크롤링에 적합한 Fetch(Axios)를 통해 html을 요청하는 방식으로 설계했습니다.
  - API 테스트 프로그램인 Insomnia를 통해 html 데이터 요청 테스트에서는 문제가 없었는데, 실제 백엔드 서버에서 요청을 하니 403 에러가 발생하였습니다. 확인해보니 요청 측에서 user-agent가 확인되지 않는 문제가 발생하여 요청이 거부됨을 확인했습니다. 이에 user-agent를 확인할 수 있는 모듈을 서버에서 사용하여 요청 거부 문제를 해결하였습니다.
- 크롤링 타깃 사이트는 SSR 방식인데 향수 검색 정보를 API 테스트 진행할 때 원하는 정보가 오지 않는 문제가 있었습니다. 확인 결과, 타깃 사이트에서 검색을 진행하면 최초 서버에서 html을 받고 요청한 쿼리가 내부 script를 통해 다시 타깃 사이트 서버에 요청하여 결괏값과 함께 DOM이 리랜더링 되는 방식이 적절한 정보를 가져올 수 없는 이유였습니다. SSR로 설계되어있다고 생각했는데 부분적으로 마치 SPA처럼 동작하고 있음을 알게 되었습니다.
  - Fetch 방식은 단순히 정적인 html 정보를 받아오기 때문에 타깃 사이트에서 script 작동에 의해 동적으로 변경되는 정보를 수집하는 데 무리가 있다고 판단하여 검색 정보 크롤링은 SPA 크롤링에 활용되는 Puppeteer로 변경하였습니다.
- 제품 상세 정보는 Fetch 방식으로 데이터를 요청하고 있었는데, 중간에 423 에러가 종종 발생했습니다. 해당 사이트에서 비정상적인 수의 요청이나, 크롤링 봇에 대한 요청 차단을 하는 것으로 확인되었습니다.
  - 이 문제도 위와 같은 브라우저 엔진 기반의 Puppeteer를 사용하여 요청 차단 문제를 해결하였습니다.
  - 크롤링은 외부의 데이터를 비공식적으로 정보를 가져오는 것이기 때문에, 윤리적 차원에서 다음 프로젝트에서는 가능한 공식 API를 사용하는 방향으로 진행을 해야겠다는 생각이 들었습니다.

#### Redis 도입
- 프로젝트 설계 당시, 유저들이 최근 조회했던 향수를 서로 확인할 수 있는 리스트를 홈 화면에 보여주는 구현 목표가 설정되어 있었습니다.
- 최근 유저들이 조회한 향수 리스트는 정보의 성질을 판단해보았을 때 인-메모리 기반의 Redis를 도입이 적합하다고 판단하였습니다.
  - Redis를 도입한 이유는 속도적인 측면과 구현하려는 기술 내의 정보가 휘발되어도 문제없는 특징이 Redis와 적합하다고 판단하여 선택하였습니다. 또한, NodeJS 기반에서도 무리 없이 적용해볼 수 있고 문서가 잘 정리되어 있어 빠르게 학습할 수 있는 부분도 결정 요인 중 하나였습니다.
- 캐싱 관련: 크롤링은 최초 Fetch 방식을 통해 데이터를 요청하였기 때문에 클라이언트에서 정보 요청에 대한 응답 시간이 길지 않아 문제가 없었지만 추후 여러 이슈로 인해 Puppeteer로 전환함에 따라 응답 시간이 길어지는 문제가 있었습니다.
  - Puppeteer는 Chromium을 사용하기 때문에 성능적으로 무거울 수밖에 없어 모듈 자체의 최적화에는 한계가 있었습니다. 그래서 크롤링 된 정보를 캐싱하는 방식을 고민해보았습니다.
  - 캐싱은 데이터 처리가 빠른 Redis를 사용하는 것이 적합하다고 판단하였습니다. 그리고 타깃 사이트의 정보가 갱신될 소지도 있었기 때문에 TTL 설정하여 주기적으로 데이터 최신화가 되도록 설계했습니다. 결과적으로 속도 개선(요청에 대한 평균 응답 시간 1~1.8초 감소)을 이루었습니다.

#### D3 향수 시각화
- 향수 데이터를 시각화해 줄 수 있는 기술이 필요했습니다.
- React 내에서 사용할 수 있는 데이터 표현 라이브러리를 찾아본 결과 대표적으로 D3와 P5 등이 있었습니다.
  - D3와 P5에 대해 각각 리서치와 마이크로 테스트를 진행하였습니다. 결과적으로 좀 더 다양한 기능 사용과 여러 예제를 확인해볼 수 있는 D3로 결정하였습니다.
- 시각화 구현 후 여러 향수를 조회하는 테스트를 거치면서 브라우저 성능이 떨어지는 문제가 있었습니다. 조사해본 결과 향수 시각화 컴포넌트에는 D3 애니메이션이 적용되어 있는데 함수를 재귀적으로 실행하는 무한 루프 방식으로 설계되어 있어 컴포넌트가 언마운트되어도 내부적으로는 애니메이션 로직이 실행되는 문제가 원인이었습니다.
  - 설계 당시 컴포넌트 함수 외부의 전역 컨텍스트에 D3 애니메이션 함수를 선언했는데 막상 문제를 해결하려고 보니, 재귀적으로 실행되는 애니메이션 함수가 컴포넌트가 언마운트 되었을 때 언마운트 상태를 확인할 수 없었습니다. 그래서 애니메이션 함수가 클로저되도록 컴포넌트 컨텍스트에 포함시킨 뒤, 언마운트 상태를 체크하여 무한 루프 함수가 break 되도록 문제를 해결하였습니다.
  - 컴포넌트의 생명 주기가 끝나면 해당 스크립트 등이 작동을 멈출 거라고 잘못 생각하였고 이 문제에 대해 조사해보는 시간을 가졌습니다. 또한, 자바스크립트의 클로저나 실행 컨텍스트에 대한 이해가 없었다면 곤란할 수 있는 문제였다고 생각합니다. 다시 한번 기본이 중요하다고 생각한 계기가 되었습니다.

#### Redux, SWR 등의 비동기 처리
- 클라이언트에서 비동기 관련 상태는 Redux-saga를 도입해 비동기 핸들링을 하였습니다. saga를 도입한 이유는 Redux의 action, reducer 등이 원래의 역할에서 크게 달라지지 않고, 역할에 따른 코드 분할이 용이하며, 이전 프로젝트에서 제대로 경험해보지 못한 아쉬움이 남아서였습니다.
- saga를 적용해보면서 느낀 점은 규모가 커짐에 따른 복잡성에 대한 피로감이 있었습니다. 예를 들어, 비동기로 처리하는 유저 정보 상태 로직을 추가하려면 reducer, action, saga 등 여러 파일을 만들면서 코드를 살펴봐야 하는데 이런 부분이 여러모로 비효율적이라 느꼈습니다.
  - 복잡성을 줄이기 위해 Redux에 Redux-toolkit을 통해 Ducks pattern을 도입하여 action과 reducer를 상태당 하나의 파일로 통합하여 좀 더 직관적으로 보일 수 있도록 변경하였습니다.
- 검색 후 특정 제품을 클릭할 때 상세 정보를 API 요청하는 기능을 구현할 당시, 처음에는 제품 상세 정보를 Redux에서 관리하자고 생각하였습니다. 하지만 유저 정보와 같이 전역으로 공유되어야 하는 상태와 달리, 제품 상세 정보는 구현 방향 기준에서 전역으로 상태 공유가 필요하지 않았습니다.
  - 지역 상태로 관리해도 충분하다고 판단하여, 로딩이나 에러 처리를 용이하게 처리할 수 있는 SWR을 이용하여 제품 상세 정보 API 핸들링을 하였습니다.
  - 특정 상태를 전역으로 공유해야 할지, 지역으로 처리해야 할지 등의 상태 특성을 고려하여 기술을 적용하는데 좀 더 고심할 필요성을 느꼈습니다.

#### Worker Threads
- Nodemailer와 Node-schedule을 통해 유저에게 광고성 메일을 보내는 기술이 적용되어있습니다.
- 구독자가 수천, 수십만이 넘고 모두에게 메일을 보낸다고 생각해 보았을 때, 싱글 스레드로 돌아가는 NodeJS에서 메인 스레드가 모든 작업 처리를 감당하기에는 부담스러운 일이라고 판단하였습니다.
  - NodeJS에 내장된 Worker-threads를 도입하여 다중 스레드를 사용하는 방향으로 설계해보았습니다.
  - 만약 메일 서비스 작업 비중이 커서 서버를 별도로 두어야 한다고 가정하면 Queue service (RabbitMQ) 등을 활용하여 분산 처리를 해볼 수 있을 것 같습니다.
