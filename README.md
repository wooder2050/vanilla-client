# VANILLA


## Introduction

VANILLA는 "뮤지션들의 공연 정보와 예매 서비스를 제공하고 음원과 비발매곡을 들 수 있으며, 함께 하지 못한 공연의 영상과 뮤지션의 일상을 공유"하는 웹 SNS 어플리케이션입니다.

![](https://algo111.s3.ap-northeast-2.amazonaws.com/vanilla.gif)

![](https://algo111.s3.ap-northeast-2.amazonaws.com/vanilla2.gif)

## Content

* Requirements
* Installation
* Features
* Skills
* Project management
* Things To Do

## Requirements
* 1024px 이상의 큰 브라우저 환경에서 실행해야 합니다.
* 브라우저는 최신 버전 크롭을 사용해야 합니다.

## Installation

### Client
<pre>
git clone https://github.com/wooder2050/vanilla-client.git
cd vanilla-client
npm install
npm start
</pre>

### Client
<pre>
git clone https://github.com/wooder2050/vanilla-server.git
cd vanilla-server
npm install
npm start
</pre>

## Features

* passport.js를 이용한 로컬 로그인과 소셜 로그인 구현(구글)
* 팔로우, 팔로잉 기능 구현
* 팔로잉한 유저 포스트만 SNS 피드 보이는 기능 구현
* AMAZON WEB SERVICES S3를 이용해 이미지, 영상, 음원 업로드 기능 구현
* 정규식을 활용해 유저 찾기 기능 구현(자동 완성)
* 음악 플레이어 구현 

## Skills

### Client
* ES2015+
* React
* React Router
* Redux 
* Sass

### Server
* Node.js
* Express
* ES2015+
* Passport.js
* AMAZON WEB SERVICES S3
* MongoDB
* Mongoose
* Atlas

## Project management
* Git, Github
* Trello를 이용한 일정관리

## Challenges
* 첫 프로젝트여서 시간관리를 제대로 하지 못했습니다. 생각보다 기능 구현 속도가 많이 늦어져서 처음 계획보다 많은 기능을 추가하지 못 했습니다. 다음 프로젝트에는 일정관리를 잘할 수 있도록 객관적으로 일정을 계획할 것입니다.  

* 이번 프로젝트에서 처음으로 AMAZON WEB SERVICES S3를 사용해 영상과 음원을 업로드해 보았습니다. AWS S3에서 영상과 음원을 저장하고 URL를 받아 Datebase를 입력하는 방식으로 서버를 설계하였습니다. 실행은 잘 되었지만 브라우저에서 실행되는 속도가 느렸습니다. multer 모듈과 서버의 로직 개선을 통해 이 문제점을 개선할 예정입니다.

* 팔로우, 팔로잉 기능을 구현하면서 Database Schema 설계의 중요성을 알게 되었습니다. 팔로우, 팔로잉 상태에 따라서 보여지는 정보가 달라지기 때문에 잘 설계된 Schema가 아닐 경우 기능을 추가할 때마다 Database 구조를 뒤집어야 했습니다. 다음 프로젝트부터는 기능을 고려한 Database Schema 설계해서 Datebase를 뒤집는 작업을 하지 않도록 할 것입니다. 


## Things To Do
* 테스트 작성
* 클라이언트와 서버 배포
* 좋아요와 댓글 기능 추가
* 스토리 기능 추가
* 라이브 채팅 기능 추가(socket.io)
* 언팔로우 기능과 삭제 기능 추가
