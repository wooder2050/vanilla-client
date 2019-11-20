# VANILLA


## Introduction

VANILLA는 "뮤지션들의 공연 정보와 예매 서비스를 제공하고 음원과 비발매곡을 들 수 있으며, 함께 하지 못한 공연의 영상과 뮤지션의 일상을 공유"하는 웹 SNS 어플리케이션입니다.

![](https://algo111.s3.ap-northeast-2.amazonaws.com/ezgif.com-resize.gif)


## Content

* [Requirements](#requirements)
* [Installation](#installation)
* [Features](#features)
* [Skills](#skills)
* [Project management](#project-management)
* [Things To Do](#things-to-do)

## Requirements
* 1024px 이상의 큰 브라우저 환경에서 실행해야 합니다.
* 브라우저는 최신 버전 크롬을 사용해야 합니다.

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

* 이번 프로젝트에서 처음으로 AMAZON WEB SERVICES S3를 사용해 영상과 음원을 업로드해 보았습니다. AWS S3에서 영상과 음원을 저장하고 URL를 받아 Database를 입력하는 방식으로 서버를 설계하였습니다. 실행은 잘 되었지만 브라우저에서 실행되는 속도가 느렸습니다. multer 모듈과 서버의 로직 개선을 통해 이 문제점을 개선할 예정입니다.

* 팔로우, 팔로잉 기능을 구현하면서 Database Schema 설계의 중요성을 알게 되었습니다. 팔로우, 팔로잉 상태에 따라서 보여지는 정보가 달라지기 때문에 잘 설계된 Schema가 아닐 경우 기능을 추가할 때마다 Database 구조를 뒤집어야 했습니다. 다음 프로젝트부터는 기능을 고려한 Database Schema 설계해서 Database를 뒤집는 작업을 하지 않도록 할 것입니다. 


## Things To Do
* 테스트 작성 - Jest와 Enzyme를 이용해 프론트 테스트를 작성하고 Cypress.io로 E2E test를 작성할 예정입니다. 
* 클라이언트와 서버 배포 - 클라이언트는 Netlify로 배포 자동화를 하면서 도메인을 구매해 https 로 서버와 응답, 요청을 할 수 있도록 할 예정입니다. 서버는 AWS Elastic beanstalk로 배포를 하고 CircleCI를 이용해 테스트 이후 자동 배포될 수 있도록 할 예정입니다.
* 좋아요와 댓글 기능 추가 - 좋아요와 댓글 Schema를 새로 만들어 유저의 id를 배열로 담아 기능을 구현할 예정입니다. 
* 스토리 기능 추가 - 스토리 Schema를 만들어 상대 유저 프로필을 클릭 시 10초 간 사진이나 영상을 보여주는 기능을 추가할 예정입니다.  
* 라이브 채팅 기능 추가(socket.io) - socket.io를 활용해서 실시간으로 채팅을 할 수 있는 기능을 추가할 예정입니다. 
* 언팔로우 기능과 삭제 기능 추가 - 현재 웹 어플리케이션에는 언팔로우와 포스트한 게시물을 삭제하는 기능이 없는데 서버와 데이터베이스을 수정해서 언팔로우와 삭제 기능을 추가할 예정입니다.  
