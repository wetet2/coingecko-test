## Table of Contents
  - [Installing](#Installing)
  - [Dependencies](#Dependencies)
  - [Project Folder & Files](#project-folder--files)
  - [Demo](#Demo)

## Installing

Using npm:

```bash
$ npm install
```

Using yarn:

```bash
$ yarn
```

## Dependencies
- axios
   - coinGecko와 통신하기 위해 사용

- classnames
	- class에 넣을 string을 편리하게 조합하기 위해 사용

- react-redux, redux 
	- global store를 이용하기 위해 사용(로딩화면, 토스트 등)

- styled-components
	- 편리하게 css를 관리하고 재사용성 높은 코드를 생산하기 위해 사용

- 그외
	- package.json 안에 devDependencies 패키지들은 babel & webpack 빌드를 위한 loader와 plugin들
	- node-sass: webpack scss-loader에서 scss파일을 css로 변환하기 위해 사용
	- nodemon: 파일 변경 시 자동 재시작 위해 사용(개발용)

## Project Folder & Files

- /package.json 
	- 프로젝트 및 패키지 정의 파일

- /webpack.config.js
	- webpack 빌드를 위한 설정 파일

- /yarn.lock
	- yarn에서 자동으로 생성한 패키지 관리 파일


- /client_dist
	- babel & webpack으로 빌드된 파일 output 폴더
	- 웹서버에서 바로 접근 가능한 static 폴더

- /public
	- 웹서버에서 바로 접근 가능한 static 폴더

- /server
	- Node + Express 서버를 구동하기 위한 서버 파일 폴더

- /client/store.js
	- redux를 위한 store 모듈

- /client/main.scss
	- global css파일

- /client/main.js
	- 메인페이지 시작 모듈

- /client/main.html, /client/main.dev.html
	- webpack 빌드를 위한 템플릿 파일

- /component/**/*
	- React컴포넌트 및 Hook, styled컴포넌트 모음
	- *.style.js 파일이 styled컴포넌트 파일

- /component/common
	- 공통으로 사용되는 컴포넌트 모음
	
- /reducer, /reducer/actions
	- redux사용을 위한 리듀스, 액션 파일 모음

- /shared
	- 비지니스 로직이 없는 공통 모듈 모음

- /utils
	- 유틸성 모듈 모음

## Demo

[http://www.hoyoon.co.kr:3000](http://www.hoyoon.co.kr:3000).