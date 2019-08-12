var photoLayoutEditor = new PhotoLayoutEditor('#app', {
	side: {
		files: [
			'https://images.unsplash.com/photo-1565504052130-29d2211abd47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=60',
			'https://images.unsplash.com/photo-1565462900119-a16b91dead9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2592&q=60',
			'https://images.unsplash.com/photo-1565402149395-65551328334c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2200&q=60'
		],
		visible: true,
	}
});


(function() {

	const makeImage = document.getElementById('makeImage');
	const result = document.getElementById('result');
	const elements = {
		quality_range: makeImage.querySelector('[name=quality_range]'),
		quality_number: makeImage.querySelector('[name=quality_number]'),
		submit: makeImage.querySelector('.submit'),
		resultImage: result.querySelector('.result__image'),
		resultClose: result.querySelector('.result__close'),
		save: document.getElementById('save'),
		restoreSave: document.getElementById('restore_save'),
		clearSave: document.getElementById('clear_save'),
	};

	// on submit
	elements.submit.addEventListener('click', function(e) {
		photoLayoutEditor.body.api.util.makeImage(
			'jpg',
			Number(elements.quality_number.value),
			3,
			'base64'
		).then(function(res) {
			result.classList.add('result-open');
			elements.resultImage.innerHTML = '<img src="' + res + '"/>';
		});
	});

	// sync quality values
	elements.quality_range.addEventListener('input', function(e) {
		elements.quality_number.value = e.currentTarget.value;
	});

	// on close result
	elements.resultClose.addEventListener('click', function(e) {
		result.classList.remove('result-open');
		elements.resultImage.innerHTML = '';
	});


	// save events
	elements.save.addEventListener('click', function(e) {
		if (!photoLayoutEditor) return;
		let exportData = photoLayoutEditor.body.api.util.export('all', false);
		exportData = JSON.stringify(exportData);
		localStorage.setItem('ple', exportData);
		alert('Save storage');
	});
	elements.restoreSave.addEventListener('click', function(e) {
		let restoreData = localStorage.getItem('ple');
		if (restoreData)
		{
			photoLayoutEditor.body.api.util.import(JSON.parse(restoreData), true);
		}
	});
	elements.clearSave.addEventListener('click', function(e) {
		localStorage.clear();
		alert('Clear storage');
	});

}());