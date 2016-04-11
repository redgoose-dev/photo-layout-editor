
function Canvas(width, height, bgColor)
{
	this.el = document.createElement('canvas');
	this.ctx = this.el.getContext('2d');

	var size = {
		width : (width) ? width : 150,
		height : (height) ? height : 100
	};

	this.el.width = size.width;
	this.el.height = size.height;

	if (bgColor)
	{
		this.ctx.fillStyle = bgColor;
		this.ctx.fillRect(0, 0, size.width, size.height);
	}
}

module.exports = {

	container : null,
	gridster : null,

	
	/**
	 * init
	 * 
	 * @param {object} container
	 */
	init(container)
	{
		this.container = container;
		this.gridster = container.refs.gridster;
	},

	/**
	 * Object to json
	 *
	 * @param {Object} src
	 * @param {int} space
	 * @return {String}
	 */
	objectToJson(src, space)
	{
		return JSON.stringify(src, null, (space || 4));
	},

	/**
	 * Export gridster
	 *
	 * @return {Object}
	 */
	exportGridster()
	{
		const $gridster = this.gridster.$gridster;
		const gridster = this.gridster.gridster;
		var blockData = [];

		$gridster.find('li').each((k, o) => {
			const $o = $(o);
			var data = {};

			data.color = $o.data('color');

			if ($o.hasClass('attached'))
			{
				data.position = $o.children('figure').data('position');
				data.size = $o.children('figure').data('size');
				data.image = $o.children('figure').data('image');
			}

			blockData.push(data);
		});

		return {
			params : gridster.serialize(),
			figure : blockData
		};
	},

	/**
	 * Get ratio
	 *
	 * @param {int} w
	 * @param {int} h
	 * @return {int}
	 */
	getRatio(w, h)
	{
		var result = parseInt(w) / parseInt(h);
		result = Math.round(result * 1000) / 1000;
		return result;
	},

	/**
	 * Make queue
	 *
	 * @param {Object} gridsterData
	 * @return {Array}
	 */
	makeQueue(gridsterData)
	{
		var queue = [];
		var pref = this.container.state.preference;

		gridsterData.figure.forEach((o, k) => {
			var param = gridsterData.params[k];
			if (o.image)
			{
				queue.push({
					key : k,
					image : o.image,
					position : o.position,
					size : o.size,
					targetWidth : pref.width * param.size_x, // TODO : inner 여백을 계산 안했다.;; 그래서 사이즈가 안맞음.
					targetHeight : pref.height * param.size_y
				});
			}
		});

		return queue;
	},

	/**
	 * Basic
	 * 
	 * @return {Object}
	 */
	basic()
	{
		return {
			gridster : this.exportGridster(),
			preference : this.container.state.preference
		};
	},

	/**
	 * Packed
	 *
	 */
	packed()
	{
		var queue = this.makeQueue(this.exportGridster());

		this.playQueue(queue);
	},

	/**
	 * Play queue
	 *
	 * @return {Object}
	 */
	playQueue(queue)
	{
		var max = queue.length;

		function makeImage(options, callback)
		{
			// set limit resampling count
			options.resampleCount = (options.resampleCount > 1) ? options.resampleCount : 1;
			options.resampleCount = (options.resampleCount < 4) ? options.resampleCount : 4;

			var resampleMax = Math.pow(2, options.resampleCount);
			var canvas = new Canvas(options.width * resampleMax, options.height * resampleMax, options.bgColor);

			// resize canvas
			var resizeCanvas = function(count, parentCanvas)
			{
				var max = Math.pow(2, count);
				var canvasForResize = new Canvas(options.width * max, options.height * max, options.bgColor);

				canvasForResize.ctx.drawImage(parentCanvas.el, 0, 0, parentCanvas.el.width * 0.5, parentCanvas.el.height * 0.5);

				if (count > 0)
				{
					resizeCanvas(count-1, canvasForResize);
				}
				else
				{
					if (callback)
					{
						callback(canvasForResize);
					}
				}
			};

			// init draw image
			canvas.ctx.drawImage(
				options.image,
				options.cx, // crop x
				options.cy, // crop y
				options.cw, // crop x2
				options.ch, // cropy2
				options.dx, // x
				options.dy, // y
				(options.width * resampleMax), // dw
				(options.width * resampleMax) // dh
			);

			resizeCanvas(options.resampleCount - 1, canvas);
		}

		function draw(key)
		{
			var img = new Image();
			var data = queue[key];

			img.onload = (e) => {
				// data.targetWidth;
				var ratio = 0;
				var size = null;
				var option = null;
				var realSize = {
					width: img.naturalWidth,
					height: img.naturalHeight
				};

				if (data.size == 'cover')
				{
					ratio = (realSize.width > realSize.height) ?
						(realSize.width / data.targetWidth) :
						(realSize.height / data.targetHeight);
					size = {
						width : realSize.width / ratio,
						height : realSize.height / ratio
					};
					option = {
						image : img,
						resampleCount : 2,
						width : data.targetWidth,
						height : data.targetHeight,
						cx : 0,
						cy : 0,
						cw : realSize.width,
						ch : realSize.height,
						dx : 0,
						dy : 0,
						bgColor : '#dddddd'
					};
					log(size);
				}
				else
				{

				}

				makeImage(option, function(canvas){
					key += 1;
					log(key);
					document.body.appendChild(canvas.el);
					if (max > key)
					{
						draw(key);
					}
				});
			};
			img.src = data.image;
		}

		if (max)
		{
			draw(0);
		}
	}
};