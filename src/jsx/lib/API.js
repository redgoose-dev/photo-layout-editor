var app = null;

function GridsterForAPI() {

	this.shuffle = () => {};
	this.add = () => {};
	this.remove = () => {};
	this.select = () => {};
	this.duplicate = () => {};
	this.clear = () => {};

	this.updatePreference = (params) => {};
	this.getPreference = () => {};

	this.export = () => {};
	this.makeImage = () => {};

}

function SidebarForAPI() {

	this.add = () => {};
	this.remove = () => {};
	this.select = () => {};

	this.export = () => {};
	this.attach = () => {};

}

module.exports = function API() {

	this.gridster = new GridsterForAPI();
	this.side = new SidebarForAPI();

	/**
	 * Init
	 *
	 * @param {object} parent : PLE
	 */
	this.init = (parent) => {
		app = parent;
	};
};
