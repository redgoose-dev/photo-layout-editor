export default {
	body: {
		setting: {
			width: 100,
			height: 100,
			column: 5,
			maxScale: 2,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
		},
		blockColor: '#ff0000',
		grid: [
			{ layout: { x: 0, y: 0, w: 2, h: 2 } },
			{ layout: { x: 2, y: 0, w: 1, h: 2 } },
			{ layout: { x: 3, y: 0, w: 2, h: 1 } },
			{ layout: { x: 3, y: 1, w: 1, h: 1 } },
		],
	},
	side: {
		upload: null,
		remove : null,
		visible: true,
		items: [],
	},
}