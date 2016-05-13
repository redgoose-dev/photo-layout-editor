var app = null;
var container = null;
var gridster = null;
var sidebar = null;
var exp = null;


/**
 * item to array
 *
 * @param {number|string|Array} item
 * @param {string} type
 * @return {Array}
 */
function itemToArray(item, type)
{
	if (typeof item === type)
	{
		item = [item];
	}
	else if (!Array.isArray(item))
	{
		item = [];
	}
	return item;
}


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
	 * reset gridster
	 *
	 * @param {Boolean} sw gridster를 삭제할때 블럭의 내용을 저장할것인지에 대한 여부
	 */
	this.reset = (sw) => {
		gridster.reset(sw);
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
	 * @param {Object} setting
	 */
	this.importPreference = (setting) => {
		if (setting && (typeof setting === 'object'))
		{
			setting = Object.assign(container.state.preference, setting);
			container.updatePreference(setting);
		}
	};

	/**
	 * import gridster parameter
	 *
	 * @param {Array} arr
	 */
	this.importParams = (arr) => {
		gridster.importParams(arr);
	};

	/**
	 * export preference
	 *
	 * @return {Object}
	 */
	this.exportPreference = () => {
		return container.state.preference;
	};

	/**
	 * export
	 *
	 * @param {Object}   packImageOptions
	 * @param {String}   packImageOptions.type    (image/jpeg, image/png)
	 * @param {int}      packImageOptions.quality (0~1)
	 * @param {Function} callback
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
	 * @param {Array} files
	 */
	this.add = (files) => {
		sidebar.importImages(files);
	};

	/**
	 * remove images
	 *
	 * @param {number|Array} keys
	 */
	this.remove = (keys) => {
		sidebar.remove(itemToArray(keys, 'number'));
	};

	/**
	 * clear images
	 *
	 */
	this.clear = () => {
		sidebar.remove(sidebar.getItems(false));
	};

	/**
	 * select images
	 *
	 * @param {number|Array} keys
	 */
	this.select = (keys) => {
		sidebar.select(itemToArray(keys, 'number'), true);
	};

	/**
	 * un select images
	 *
	 * @param {number|Array} keys
	 */
	this.unSelect = (keys) => {
		sidebar.select(itemToArray(keys, 'number'), false);
	};

	/**
	 * toggle select for all items
	 *
	 */
	this.toggleSelectAll = () => {
		sidebar.toggleSelect();
	};

	/**
	 * export images
	 *
	 * @return {Array}
	 */
	this.export = () => {
		return sidebar.exportImages();
	};

	/**
	 * attach image
	 *
	 * @param {number|Array} keys
	 */
	this.attach = (keys) => {
		sidebar.attachImagesByKey(itemToArray(keys, 'number'));
	};

	/**
	 * get items
	 *
	 * @param {Array} selected
	 */
	this.getItems = (selected) => {
		sidebar.getItems(selected);
	};
}


module.exports = function API() {
	
	this.gridster = null;
	this.side = null;
	
	/**
	 * Init
	 *
	 * @param {object} parent : PLE
	 */
	this.init = (parent) => {
		app = parent;
		container = app.container;
		gridster = container.refs.gridster;
		sidebar = app.side;
		exp = app.export;

		this.gridster = new GridsterForAPI();
		this.side = new SidebarForAPI();
	};
};
