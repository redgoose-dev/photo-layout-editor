var photoLayoutEditor = new PhotoLayoutEditor('#app', {
	side: {
		files: [],
		visible: true,
	},
	updateStoreFunc: function() {
		if (!photoLayoutEditor) return;
		var store = photoLayoutEditor.body.store.getState();
		console.log(store);
		// TODO: 스토리지에 값들 집어넣기
	}
});