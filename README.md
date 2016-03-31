# LayoutEditor
사진 레이아웃을 편집하는 웹 프로그램입니다.

### Demo

데모실행 : `demo/index.html`


### Development app

css를 수정하거나 javascript 개발하려면 다음 명령어를 이용하여 모듈을 설치할 필요가 있습니다.

```
npm install
```

#### build vendor
외부 라이브러리 빌드

```
gulp vendor
```

#### build App
`gulp js`을 실행하여 빌드합니다.  
webpack을 통하여 빌드하며 빌드를 실행하면 빌드 대기상태가 되며, `src/jsx/`에 있는 코드가 변경되면 빌드합니다.


#### build scss to css
`gulp scss`를 실행하여 빌드하거나 `gulp scss:watch`를 실행하여 빌드 대기를 유지합니다.