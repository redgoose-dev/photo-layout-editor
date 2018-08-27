# Photo Layout Editor (PLE)

[react-photo-layout-editor](https://github.com/RedgooseDev/react-photo-layout-editor)를 베이스로 만들어진 사진 레이아웃 편집 웹 프로그램입니다.


## service

이 기능을 웹에서 바로 사용할 수 있도록 페이지를 만들었습니다.

http://redgoose-dev.github.io/photo-layout-editor/


## usage

```html
<div id="app"></div>

<script src="./vendor/react.min.js"></script>
<script src="./vendor/react-dom.min.js"></script>
<script src="./vendor/PhotoLayoutEditor.vendor.pack.js"></script>
<script src="./vendor/PhotoLayoutEditor.pack.js"></script>
<script src="./build/PhotoLayoutEditor.js"></script>

<script>
var photoLayoutEditor = new PhotoLayoutEditor('#app', {});
</script>
```

활용한 리소스는 `index.html` 파일의 내용을 참고하세요.

https://github.com/redgoose-dev/photo-layout-editor/blob/master/index.html
