# PhotoLayoutEditor(PLE)
사진 레이아웃을 편집하는 웹 프로그램입니다.

Instagram blog(http://blog.instagram.com/)에 있는 정렬된 이미지의 모습에 매료되어 저런 모습을 직접 편집하여 게시물로 올렸으면 좋겠다는 생각이 들어 만들게 되었습니다.  
블럭을 드래그 앤 드롭으로 위치와 크기를 편집하여 모던하게 정렬된 이미지나 레이아웃 만들 수 있습니다.


## Feature

PLE는 이런 특징들을 가지고 있습니다.

#### 이미지 관리

사이드바에 이미지를 업로드하여 사진을 배치하기 전에 이미지를 담아둘 수 있습니다.

#### 에디터 속성변경

블럭의 갯수나 사이즈, 여백등을 조절할 수 있습니다.

#### 드래그 앤 드롭

이미지를 드래그하여 이미지를 블럭에 넣거나 블럭의 위치를 옮기거나 수정할 수 있습니다.

#### 이미지 영역의 편집

블럭을 선택하고 펜 모양의 툴바(edit block)를 선택하면 편집창이 뜨면서 영역을 변경할 수 있습니다.

#### 배경색 변경

블럭의 배경색을 바꿀 수 있습니다. 빈 블럭을 만들고 색상을 수정할 수 있습니다.



## Demo

다음 경로를 통하여 사진 레이아웃 에디터를 체험해볼 수 있습니다.

http://projects.redgoose.me/2016/PhotoLayoutEditor/demo/


## Vendor list

PLE는 다음과 같이 외부 프로그램으로부터 도움받았습니다.

- http://jquery.com/
- https://facebook.github.io/react/
- http://gridster.net/
- https://github.com/claviska/jquery-minicolors


## Start PLE

데모파일(`./demoindex.html`)의 소스를 보시면 기본적으로 구성되어있는 형태를 확인할 수 있습니다. 소스는 다음과 같습니다.

### html
```
<div class="ple-editor" id="app">
	<div class="container">
		<div id="ple_app"></div>
	</div>
	<div id="ple_side"></div>
</div>

<div id="cropper"></div>
<div id="result"></div>
```

### javascript
```
PLE.init({
	elements : {
		app : document.getElementById('app'),
		container : document.getElementById('ple_app'),
		side : document.getElementById('ple_side'),
		cropper : document.getElementById('cropper'),
		result : document.getElementById('result')
	},
	preference : {}
});
```

위 소스와 같이 `PLE.init()` 메서드 실행으로 PLE를 초기화 및 구동을 합니다.  
여기에 들어가는 옵션이 많지만 꼭 필요한 옵션은 `elements`의 객체이며 이것은 각각 역할을 하는 부분에 대한 엘리먼트를 지정합니다.  
이렇게 한 이유는 프로그램 수정없이 레이아웃 변경이 가능하도록 하기 위함입니다.

`elements`값의 옵션 설명은 다음과 같습니다.

- app : PLE의 컨테이너
- container : 왼쪽 레이아웃 에디터와 툴바버튼 영역
- side : 오른쪽 이미지 목록영역
- cropper : 블럭을 편집할때 팝업으로 뜨는 영역
- result : 결과물을 팝업으로 뜨는 영역

#### preference
preference값은 좀더 디테일한 옵션값들을 담고 있습니다. 이 값이 없으면 설정되어있는 기본값으로 사용됩니다.

기본값은 다음과 같습니다.

```
{
	uploadScript : '',
	removeScript : '',
	defaultImagesScript : '',
	showSide : true,
	gridster : {
		nameID : 'gridster',
		createNow : true,
		createCount : 4,
		blockColor : '#DDDDDD',
		params : null
	},
	setting : {
		width : 100,
		height : 100,
		max_col : 5,
		max_scale : 2,
		outer_margin : 10,
		inner_margin : 10
	}
}
```

(TODO : 옵션값에 대한 설명..)


## API

직접만든 이벤트로 PLE를 컨트롤 하고싶을겁니다.  
그럴때마다 프로그램을 직접고치거나 객체를 헤집고 들어가는 수고를 덜기 위하여 API 컴포넌트를 별도로 만들었습니다.  
API를 통하여 최대한 많은일을 할 수 있도록 많은 메서드들을 만들었습니다. 이것들을 조합하여 다른 멋진 기능들을 만들 수 있다는것을 기대하고 있습니다.

### Gridster

에디터 영역에 관한 메서드들입니다. 객체는 `PLE.gridster`

#### shuffle
블럭을 무작위로 위치와 사이즈를 변경합니다.

```
PLE.gridster.shuffle();
```

(TODO : API 메서드에 대한설명)

### Side

업로드한 이미지들을 담고있는 사이드 영역입니다. 객체는 `PLE.side`

(TODO : API 메서드에 대한설명)

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



## Development

PLE의 기능을 수정하거나 더하려면 개발할 수 있는 환경을 구성해야합니다.  
우선 node.js v5.0이상의 버전이 설치되어 있어야 하고, 커멘드라인에서 다음과 같은 형태로 설치해줍니다.

```
git clone https://github.com/RedgooseDev/PhotoLayoutEditor.git
cd PhotoLayoutEditor
npm install
```

### build vendor
외부 라이브러리는 로딩 개선을 위하여 `./dist/vendor.pkgd.min.js`파일로 묶었습니다.  
개발용으로 vendor를 사용하려면 `./dist/vendor.pkgd.js`파일을 사용하는것을 권장합니다.

만약 vendor를 수정하고 싶다면 `./gulpfile.js`파일에서 `externalResource`함수의 내용을 수정한 뒤에 커멘드라인에서 `gulp vendor` 명령을 실행해주시면 벤더 파일을 빌드합니다.

### build App
커멘드라인에서 `gulp js`을 실행하여 빌드합니다.  
webpack을 통하여 빌드하며 빌드를 실행하면 빌드 대기상태가 되며, `./src/jsx/`에 있는 코드가 변경되면 빌드합니다.


### build scss to css
`gulp scss`를 실행하여 빌드하거나 `gulp scss:watch`를 실행하여 빌드 대기상태로 두어 scss가 수정되면 빌드가 되도록 할 수 있습니다.
