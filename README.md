# NoticeBoardAPI

익명 게시판 RESTful API 서비스
<br><br>

## 📌 서비스 개요

- 본 서비스는 RESTful API로 작성되었으며, 사용자가 게시판에서 글을 읽거나 작성 및 수정, 삭제할 수 있습니다.
- 익명으로 사용되는 서비스이므로 로그인 절차는 생략되었으며, 오직 게시글의 비밀번호만으로 작성자를 구분합니다.

  <br>

## 📌 요구사항 분석 및 구현

- 사용자는 게시글을 올릴 수 있습니다.
  - 게시글은 제목과 본문으로 구성됩니다.
  - 제목은 최대 20 자, 본문은 200 자로 서버에서 제한해야 합니다.
  - 제목과 본문 모두 이모지가 포함될 수 있습니다.
- 사용자는 게시글을 올릴 때 비밀번호를 설정할 수 있습니다. 추후 본인이 작성한 게시물에 비밀번호 입력 후 수정, 삭제할 수 있습니다.
  - 회원 가입, 로그인 없이 비밀번호만 일치하면 수정, 삭제가 가능합니다.
  - 비밀번호는 데이터베이스에 암호화 된 형태로 저장이 되어야 합니다.
  - 비밀번호는 6 자 이상이어야 하고, 숫자 1 개 이상 반드시 포함 되어야 합니다.
- 모든 사용자는 한 페이지 내에서 모든 게시글을 최신 글 순서로 확인할 수 있습니다.

## 📌 추가 요구사항 분석 및 구현

- 게시글의 개수가 많을 때, 사용자가 앱이나 웹에서 스크롤을 내릴 때마다 오래된 글들이 계속 로드 되는 형태로 API 를 수정합니다.
  - 게시글이 중복으로 나타나면 안됩니다.
  - 추가 로드는 20 개 단위로 합니다.

## 📌 DB 모델링

![image](https://user-images.githubusercontent.com/92367032/188887656-2bb50fea-99b9-4f82-a63d-80664c268ca5.png)

- 익명으로 작성되는 게시글이기에 회원의 정보는 존재하지 않습니다.
- 비밀번호로 작성자를 확인하며, 비밀번호는 데이터베이스에서 암호화하여 관리합니다.
- 암호화하는 과정에서 salt는 각 게시글마다 매번 다른 값이 저장됩니다.

## 📌 API 문서

### ✅ 전체 게시글 목록 읽어오기

**request**

```http
GET /api/boards  HTTP/1.1
Host: localhost:3000
Content-type: Application/JSON

order=desc&page=1&limit=20
```

**response**

```
HTTP/1.1 200  OK
Content-type: Application/JSON

{
  data: [
     {
         "id": 1,
         "title": "첫번째 게시글",
         "content": "게시글 내용입니다.",
         "createdAt": "2022-09-07T09:48:17.000Z",
         "updatedAt": "2022-09-07T11:08:12.000Z",
         "deletedAt": null
     },
     ...
     {
         "id": 20,
         "title": "게시글",
         "content": "수정된 게시글 내용입니다.",
         "createdAt": "2022-09-07T07:48:17.000Z",
         "updatedAt": "2022-09-07T08:48:16.000Z",
         "deletedAt": null
     },
  ],
  "message": "OK"
}
```

### ✅ 특정 게시글 읽어오기

**request**

```http
GET /api/boards/{id}  HTTP/1.1
Host: localhost:3000
Content-type: Application/JSON

```

**response**

```
HTTP/1.1 200  OK
Content-type: Application/JSON

{
  {
      "id": 1,
      "title": "첫번째 게시글",
      "content": "게시글 내용입니다.",
      "createdAt": "2022-09-07T09:48:17.000Z",
      "updatedAt": "2022-09-07T11:08:12.000Z",
      "deletedAt": null
  },
  "message": "OK"
}
```

### ✅ 게시글 작성하기

**request**

```http
POST /api/boards  HTTP/1.1
Host: localhost:3000
Content-type: Application/JSON

{
   "title": "첫 게시글",
   "content": "게시글 내용입니다.",
   "password": "1q2w3e4r"
}
```

**response**

```
HTTP/1.1 201  Created
Content-type: Application/JSON

{
  "message": "OK"
}
```

### ✅ 특정 게시글 수정하기

**request**

```http
PATCH /api/boards/{id}  HTTP/1.1
Host: localhost:3000
Content-type: Application/JSON

{
   "content": "게시글 내용 다시 작성합니다.",
   "password": "1q2w3e4r"
}
```

**response**

```
HTTP/1.1 200  OK
Content-type: Application/JSON

{
  {
      "id": 1,
      "title": "첫번째 게시글",
      "content": "게시글 내용 다시 작성합니다.",
      "createdAt": "2022-09-07T09:48:17.000Z",
      "updatedAt": "2022-09-07T11:08:12.000Z",
      "deletedAt": null
  },
  "message": "OK"
}
```

### ✅ 특정 게시글 삭제하기

**request**

```http
DELETE /api/boards/{id}  HTTP/1.1
Host: localhost:3000
Content-type: Application/JSON
Authorization: "1q2w3e4r"
```

**response**

```
HTTP/1.1 204  No Content
Content-type: Application/JSON
```

## 📌 적용 기술

- 사용언어 : Javascript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL
  <br/> <br/>

## 📌 Commit Convention

- init : 초기화
- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, linting
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩터링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
