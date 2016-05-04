var app = null;
var gridster = null;
var sidebar = null;
var exp = require('../lib/Export.js');

function GridsterForAPI() {

	/**
	 * shuffle blocks
	 *
	 */
	this.shuffle = () => {
		gridster.shuffleBlocks();
	};

	/**
	 * add block
	 *
	 * @param {object} options
	 */
	this.add = (options) => {
		if (options)
		{
			options.col = options.col || 1;
			options.row = options.row || 1;
		}
		else
		{
			options = { col : 1, row : 1 };
		}
		gridster.block(options);
	};

	/**
	 * change color
	 *
	 * @param {object} $target
	 * @param {string} color
	 */
	this.changeColor = ($target, color) => {
		gridster.changeBlockColor($target, color);
	};

	/**
	 * remove block
	 *
	 * @param {object} $target
	 */
	this.remove = ($target) => {
		gridster.removeBlock($target);
	};

	/**
	 * clear image in block
	 *
	 * @param {object} $target
	 */
	this.clearImage = ($target) => {
		gridster.emptyBlock($target);
	};

	/**
	 * duplicate block
	 *
	 * @param {object} $target
	 */
	this.duplicate = ($target) => {
		gridster.duplicateBlock($target);
	};
	
	/**
	 * select block
	 *
	 * @param {object} $target
	 */
	this.select = ($target) => {
		gridster.selectBlock($target);
	};

	/**
	 * un select block
	 *
	 * @param {object} $target
	 */
	this.unSelect = ($target) => {
		gridster.unSelectBlock($target);
	};

	/**
	 * toggle select block
	 *
	 * @param {object} $target
	 */
	this.toggleSelect = ($target) => {
		if ($target.hasClass(gridster.selectedClassName))
		{
			this.unSelect($target);
		}
		else
		{
			this.select($target);
		}
	};

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

	/**
	 * Init
	 *
	 * @param {object} parent : PLE
	 */
	this.init = (parent) => {
		app = parent;
		gridster = app.refs.container.refs.gridster;

		this.gridster = new GridsterForAPI();
		this.side = new SidebarForAPI();
	};
};
