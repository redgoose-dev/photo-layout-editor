const $window = $(window);
const EVENT_NAME = 'ple';


export default {

	names: {
		17: 'ctrl',
		91: 'cmd',
		93: 'cmd',
		16: 'shift',
	},

	code: null,
	keyName: null,

	apply(code) {
		this.code = code;
		this.keyName = this.names[this.code] || null;
	},

	keyDown(e) {
		// apply keyCode
		this.apply(e.keyCode);

		// set events
		$window.on(`keyup.${EVENT_NAME}`, this.keyUp.bind(this));
		$window.off(`keydown.${EVENT_NAME}`);
	},

	keyUp(e) {
		if (this.code !== e.keyCode) return;

		// apply keyCode
		this.apply(null);

		// set events
		$window.on(`keydown.${EVENT_NAME}`, this.keyDown.bind(this));
		$window.off(`keyup.${EVENT_NAME}`);
	},

	init() {
		$window.on(`keydown.${EVENT_NAME}`, this.keyDown.bind(this));
	},

};