function Uploader()
{
	/**
	 * Local upload
	 *
	 * @Param {Array} files
	 * @Param {Function} complete
	 * @Return {Array}
	 */
	this.local = function(files, complete)
	{
		var reader = new FileReader();
		var i = 0;
		var result = [];
		reader.onload = function(e)
		{
			result.push(e.target.result);

			// check last queue
			if (i == (files.length - 1))
			{
				complete(result);
			}
			else
			{
				// trigger next queue
				i++;
				reader.readAsDataURL(files[i]);
			}
		};
		reader.readAsDataURL(files[i]);
	};

	/**
	 * External upload
	 *
	 * @Param {String} script
	 * @Param {Array} files
	 * @Return {Array}
	 */
	this.external = function(script, files)
	{
		log('external upload');
	}
}