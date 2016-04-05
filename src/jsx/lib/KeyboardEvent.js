module.exports = function() {

	const self = this;
	const EVENT_NAME = 'pleGlobal';
	const $window = $(window);
	const keyNames = {
		ctrl : 17,
		cmd : 91
	};

	this.press = false;
	this.pressKeyCode = null;
	this.readySelect = false;


	/**
	 * Key down
	 *
	 * @param {event} e
	 */
	this.keyDown = (e) => {

		this.pressKeyCode = e.keyCode;
		this.readySelect = (this.pressKeyCode == keyNames.ctrl || this.pressKeyCode == keyNames.cmd);

		// set event
		$window
			.off('keydown.' + EVENT_NAME)
			.on('keyup.' + EVENT_NAME, this.keyUp);
	};

	/**
	 * Key up
	 *
	 * @param {event} e
	 */
	this.keyUp = (e) => {

		this.pressKeyCode = null;
		this.readySelect = null;

		// set event
		$window
			.off('keyup.' + EVENT_NAME)
			.on('keydown.' + EVENT_NAME, this.keyDown);
	};


	// init event
	$(window).on('keydown.' + EVENT_NAME, this.keyDown);
};
