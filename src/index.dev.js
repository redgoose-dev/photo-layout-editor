import PLE from './App';


console.log('HELLO DEV');
var ple = new PLE(document.getElementById('app'), {
	body: {
		setting: {
			width: 100,
		},
		grid: [
			{
				layout: { x: 0, y: 0, w: 2, h: 2 },
				image: {
					src: 'http://goose.redgoose.me/data/upload/original/201503/ce88b697650b8cba1c11d1abc2976263.jpg',
					position: '50% 50%',
					size: 'cover',
				},
				color: '#b188ff',
			},
			{ layout: { x: 2, y: 0, w: 1, h: 2 } },
			{ layout: { x: 3, y: 0, w: 2, h: 1 } },
			{ layout: { x: 3, y: 1, w: 1, h: 1 } },
		],
	},
	side: {
		visible: true,
		items: [
			"http://goose.redgoose.me/data/upload/original/201703/rg-20170307-000116.jpg",
			"http://goose.redgoose.me/data/upload/original/201703/rg-20170306-000104.jpg",
			"http://goose.redgoose.me/data/upload/original/201611/rg3871.jpg",
			"http://goose.redgoose.me/data/upload/original/201610/rg-c4d-junk-20161003.jpg",
			"http://goose.redgoose.me/data/upload/original/201507/rg3322.jpg"
		],
	}
});