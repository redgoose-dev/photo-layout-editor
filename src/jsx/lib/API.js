var app = null;
var container = null;
var gridster = null;
var sidebar = null;
var exp = require('../lib/Export.js');

/**
 * Gridster for API
 *
 */
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
	 * attach images to block
	 *
	 * @param {Array} images
	 */
	this.attachImages = (images) => {
		gridster.attachImages(images);
	};

	/**
	 * assign images to target element
	 *
	 * @param {Object} $target
	 * @param {String} image
	 * @param {Object} imageOptions
	 * @param {String} imageOptions.position
	 * @param {String} imageOptions.size
	 */
	this.assignImage = ($target, image, imageOptions) => {
		gridster.assignImage($target, image, imageOptions);
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

	/**
	 * import preference
	 *
	 * @param {object} setting
	 */
	this.importPreference = (setting) => {
		if (setting && (typeof setting === 'object'))
		{
			setting = Object.assign(container.state.preference, setting);
			container.updatePreference(setting);
		}
	};

	/**
	 * export preference
	 *
	 * @return {object}
	 */
	this.exportPreference = () => {
		return container.state.preference;
	};

	/**
	 * export
	 *
	 * @param {object}   packImageOptions
	 * @param {string}   packImageOptions.type    (image/jpeg, image/png)
	 * @param {int}      packImageOptions.quality (0~1)
	 * @param {function} callback
	 */
	this.export = (packImageOptions, callback) => {
		if (packImageOptions && (typeof packImageOptions === 'object'))
		{
			exp.packed(packImageOptions.type, packImageOptions.quality, (res) => {
				if (callback)
				{
					callback(res);
				}
			});
		}
		else
		{
			if (callback)
			{
				callback(exp.exportGridster());
			}
		}
	};

	/**
	 * make image
	 *
	 * @param {object}   options
	 * @param {string}   options.type    (image/jpeg, image/png)
	 * @param {int}      options.quality (0~1)
	 * @param {string}   options.bgColor (#ffffff)
	 * @param {function} callback
	 */
	this.makeImage = (options, callback) => {
		if (callback)
		{
			if (!options)
			{
				options = options || { type : null, quality : null, bgColor : null };
			}
			exp.image(options.type, options.quality, options.bgColor, (src) => {
				callback(src);
			});
		}
	};
}

/**
 * Sidebar for API
 *
 */
function SidebarForAPI() {

	/**
	 * add image
	 *
	 * @param {Object} files
	 */
	this.add = (files) => {
		sidebar.importImages(files);
	};

	/**
	 * remove image
	 *
	 * @param {number|Array} key
	 */
	this.remove = (key) => {
		if (typeof key === 'number')
		{
			key = [key];
		}
		else if (!Array.isArray(key))
		{
			key = [];
		}
		log(key);
		// TODO : 여기서부터 작업시작
	};

	this.select = () => {};
	this.unSelect = () => {};

	this.export = () => {};

	/**
	 * attach image
	 *
	 * @param {Number|Array} key
	 */
	this.attach = (key) => {
		if (typeof key === 'number')
		{
			key = [key];
		}
		else if (!Array.isArray(key))
		{
			key = [];
		}
		sidebar.attachImagesByKey(key);
	};
}


module.exports = function API() {

	/**
	 * Init
	 *
	 * @param {object} parent : PLE
	 */
	this.init = (parent) => {
		app = parent;
		container = app.refs.container;
		gridster = container.refs.gridster;
		sidebar = app.refs.sidebar;

		this.gridster = new GridsterForAPI();
		this.side = new SidebarForAPI();
	};
};
