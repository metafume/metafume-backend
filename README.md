![Main](/readmeAssets/logo.png)

# Metafume🌷
향수의 향을 시각적으로 표현하여 유저가 향을 상상해볼 수 있도록 도와주는 검색 서비스입니다.

![Main](/readmeAssets/main.gif)
![Main-2](/readmeAssets/main-2.gif)

## ⏱ 바쁘신 분들을 위해.. 요약하자면! ✨
- Metafume - 향수의 향을 시각적 요소로 빗대어 표현하는 검색 웹서비스 (Metaphor + Perfume)
- Background - 향을 시각화해서 상상해볼 수 없을까? 기존의 경험과 새로운 지식을 조합한 도전!
- Features - 향수 검색 및 향 시각화, 향과 재료 구성 정보 제공, 즐겨찾기, 유저 향수 추천, 구독 메일 서비스
- Duration - 총 3주 (1주 - 아이디어 구체화 & 설계 / 2주 - 구현 & 배포)
- Stack - React, D3, NodeJS (Express), Mongo, Redis, Puppetteer 등

```

🌟 Metafume이 더욱 궁금하시다면 자세한 내용은 아래에..😎

```

# 🌈 Table of contents
- [Links](#-Links)
- [Background](#-Background)
- [Features](#-Features)
- [Schedule](#-Schedule)
- [Usage](#-Usage)
- [Stack](#-Stack)
- [Logs](#-Logs)

## 🌐 Links
- [배포 링크](https://www.metafume.site/)
- [Repository: Front-end](https://github.com/metafume/metafume-frontend)
- [Repository: Back-end](https://github.com/metafume/metafume-backend)
- [프로젝트 발표 영상 (2:24:16부터)](https://youtu.be/jMw5MIxLY3o?t=8656)
- [기능 영상 1: 검색, 상세 페이지 (유튜브 링크)](https://youtu.be/Gn4YyqeTo0s)
- [기능 영상 2: 유저 로그인, 즐겨찾기, 추천 (유튜브 링크)](https://youtu.be/8YsSLo3IaFA)

## 🌱 Background
향수는 직접 맡아보고 느끼는 게 가장 좋은 방법입니다. 하지만 특정 향수를 알아볼 때 검색으로 이미지나 구매한 사람의 후기 등으로 의존해서 상상해야 될 때도 있습니다 그리고 직접 찾아가서 맡아보는 게 귀찮을 수 있습니다. 시간을 들여야 하니까요. 그래서 **향수의 분위기를 향을 맡아보지 않고 상상해볼 수 있는 방법이 없을까?** 라는 의문이 들었습니다.

향은 한마디로 정의하기 어려운 요소라고 생각합니다. 여러 재료에 의해 다양한 향들이 공존하면서 하나의 하모니가 만들어지는 게 향입니다. 거듭된 고민의 결과 **향의 분위기를 대체재로 표현 가능하다고 생각한 것 중 하나가 색**이었고 향을 색상으로 빗대어 표현한다는 점에서 Metaphor + Perfume의 합성어인 Metafume이 만들어졌습니다.

저는 개발 공부를 시작하기 전에 그래픽 디자인 분야에 있었습니다. 미적, 시각적 감각이 예민한 편입니다. 그래서 **향을 시각화 한다**는 아이디어는 **기존에 해왔던 그래픽, 그리고 지금 새롭게 흡수하고 있는 개발 분야에서도 충분한 도전 가치가 있다고 판단**하여 선택하게 되었습니다.

## 📅 Duration
2020.11.30 - 12.18 / **3 Weeks** (Planning 1 Week + Production 2 Weeks)
- 1주차 - 아이디어 구체화, UX/UI, DB Schema 설계
- 2주차 - 크롤링 로직, D3 Visualization, 향수 추천, 메일 서비스 등 로직 구현
- 3주차 - 배포, 테스트 코드 작성, 코드 리펙터링

## 🌟 Features
- 원하는 **향수를 검색해서 향의 분위기를 색상**으로 알 수 있습니다
- 향수의 구성된 **향 정보와 사용된 재료를 확인**할 수 있습니다
- **유저 로그인, 향수 즐겨찾기 기능**이 있습니다
- 즐겨찾기 정보를 반영하여 유저에게 **향수 리스트를 추천**합니다
- 즐겨찾기 정보를 반영한 브랜드를 검색할 수 있도록 유도하는 **구독형 메일 서비스를 제공**합니다

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


## 🔧 Stack

| Front-end              | Back-end                |
| :--------------------- | :---------------------  |
| ES2015+                | Express                 |
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

## 📝 Logs

#### 향수 정보를 어떻게 수집할까? 크롤링 그리고 Puppeteer
공식적으로 향수 정보를 충분히 제공하는 API는 없었기 때문에, 여러 사이트를 찾아 그중 특정 사이트에서 크롤링 하는 방식을 선택하였습니다. 크롤링 방식은 여러 가지가 있는데, SSR 페이지는 `fetch` 등을 통해 쉽게 정보를 가져올 수 있지만 제가 타깃으로 잡은 사이트와 같이 CSR 방식의 SPA의 경우 `fetch`로는 데이터를 불러오기 어려워 Chromium을 사용하는 Puppeteer로 선택하였습니다.

#### 크롤링..자원 소모가 심한데? Redis의 도입
Puppeteer은 유용하지만 무거운 단점을 가지고 있었습니다. 클라이언트에서 백엔드로 데이터를 요청할 때 크롤링 시간 + 응답 시간이 굉장히 길어지는 문제가 있었습니다. 더군다나 똑같은 정보를 매번 크롤링 한다는 것이 비효율적이면서 서버에 부담이 되는 일이라 판단하여 캐싱을 도와줄 수 있는 인-메모리 기반의 빠른 속도를 가진 Redis DB를 도입하였습니다. 그 결과 검색된 적이 있는 정보는 Redis에 캐싱 된 정보를 응답하는 방식으로 속도 개선을 이루었고 최근 유저들이 본 향수나 즐겨찾기를 로직을 설계하는데 많은 도움이 되었습니다.

#### React, 컴포넌트의 재사용성에 대한 끝없는 고민
이전 프로젝트나 과제 등에서 항상 아쉬웠던 부분은 컴포넌트의 재사용성, 함수의 순수성에 대한 부분이었습니다. 프로젝트를 진행하다 보면 결과물을 빠르게 만들어야 한다는 압박 때문에 컴포넌트라는 본래의 목적과는 멀어지는 방식으로 작업을 진행하는 경우가 있어 이번만큼은 최대한 함수의 재사용성을 고려해보자는 취지 하에, HOC 등 컴포넌트의 재사용성을 증대하는 방법을 꾸준히 모색하였습니다. 결과적으로 프론트엔드 테스트 작성을 진행할 때 완벽하지는 않지만 이전보다 수월하게 진행할 수 있었습니다.

#### D3, 향수의 시각화..실전이라면?
D3는 주로 차트를 표현하는데 많이 사용되지만, 그래픽 표현에도 충분한 가능성이 있어 도입하게 되었습니다. 최초에 향 정보를 기반으로 색을 가진 입자로 표현해주는 방식으로 시작하였습니다. 하지만 화면에 단순히 멈춰져있는 혹은 움직이지 않는 입자는 생동감이 느껴지지 않았습니다. 한편으로 '만약 실전에서 생동감 있는 표현 방식을 요구 했던 다른 디자이너 혹은 기획자가 내가 작업한 결과물을 함께 본다면 수긍하고 넘어갈까?'라는 가정을 해보았고, D3를 좀 더 연구 해볼 겸 더욱 강도 높은 요구사항이 있다는 전제 하에 애니메이션이나 마이크로 인터렉션 등을 추가적으로 진행하여 생동감을 더 했습니다.

#### 메일 구독 서비스..만약 구독자가 엄청 많다면? (Worker threads)
구독자가 수천, 수십만이 넘고 모두에게 메일을 보낸다고 생각해 보았을 때, 싱글 스레드로 돌아가는 NodeJS에서 메인 스레드가 모든 작업 처리를 감당하기에는 부담스러운 일이라고 판단하였습니다. 그래서 추가적인 Threads를 도입하는 방식으로 설계를 해보았고 만약 작업 비중이 서버를 별도로 두어야 한다고 가정하면 Queue service (RabbitMQ) 등을 활용하여 분산 처리를 해볼 수 있을 것 같습니다.
