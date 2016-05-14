# LayoutEditor
사진 레이아웃을 편집하는 웹 프로그램입니다.

### Demo

* 체험하기 : http://projects.redgoose.me/2016/PhotoLayoutEditor/demo/


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




```
// TODO : 아래 주석된 api호출 예제코드들을 도큐먼트를 작성하는데 사용하기.

//var api = window.PLE.api;
//document.getElementById('fooo').addEventListener('click', function(e){
//	// $('#gridster li').eq(0)
//
//	// 이미지를 경로 그대로 가져온다
//	//	api.gridster.export(null, function(res){
//	//		log(res);
//	//	});
//
//	// 이미지를 base64코드로 변환하여 가져온다.
//	//	api.gridster.export({
//	//		type: 'image/jpeg',
//	//		quality : 0.5
//	//	}, function(res){
//	//		log(res);
//	//	});
//
//	// 모두 모아져 있는 이미지 만들기
//	//	api.gridster.makeImage({
//	//		type : 'image/jpeg',
//	//		quality : 0.5,
//	//		bgColor : '#ff0000'
//	//	}, function(res){
//	//		log(res);
//	//	});
//
//	//	api.gridster.makeImage({ type: 'image/png', quality: 0.1, bgColor: '#7e04f2' }, function(res){
//	//		$('body').append('<img src="' + res + '" />');
//	//	});
//
//	//	api.gridster.assignImage(
//	//		$('#gridster').find('li:nth-child(1), li:nth-child(3)'),
//	//		'./images/rg3144.jpg',
//	//		{
//	//			size: '80px auto',
//	//			position: '-20px -10px'
//	//		}
//	//	);
//
//	// api.side.attach([1,8]);
//
//	// api.side.remove([1,2]);
//
//	// api.side.select([0,2,3]);
//
//	//api.side.unSelect([1,2,4]);
//
//	//api.side.toggleSelectAll();
//
//	// log(api.side.export());
//});
//document.getElementById('fooo2').addEventListener('click', function(e){
//	api.gridster.unSelect($('#gridster li').eq(2));
//});
```