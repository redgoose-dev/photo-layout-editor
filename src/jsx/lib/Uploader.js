module.exports = function Uploader()
{
	/**
	 * Local upload
	 *
	 * @param {Array} files
	 * @param {Function} complete
	 * @return {Array}
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
	 * @param {String} script
	 * @param {String} dir
	 * @param {String} url
	 * @param {Array} files
	 * @param {Function} complete
	 * @return {Array}
	 */
	this.external = function(script, dir, url, files, complete)
	{
		var xhr = new XMLHttpRequest();

		if (typeof FormData === 'function' || typeof FormData === 'object')
		{
			var formData = new FormData();

			for (var i=0; i<files.length; i++)
			{
				formData.append('files[]', files[i]);
			}
			formData.append('dir', dir);
			formData.append('url', url);

			xhr.open('post', script, true);
			xhr.addEventListener('load', function(e){
				var response = null;
				if (e.target.readyState == 4)
				{
					switch (e.target.status)
					{
						case 200:
							try {
								var result = JSON.parse(decodeURIComponent(e.target.responseText.replace(/\+/g, '%20')));
								complete(result);
							} catch(e) {
								complete({
									'state' : 'error',
									'message' : e.target.responseText
								});
							}
							break;
						case 404:
							response = {
								state : 'error',
								message : '404 - File not found'
							};
							break;
						case 403:
							response = {
								state : 'error',
								message : '403 - Forbidden file type'
							};
							break;
						default:
							response = {
								state : 'error',
								message : 'Unknown Error'
							};
							break;
					}
				}
				else
				{
					response = {
						state : 'error',
						message : 'Unknown Error'
					};
				}
			});
			xhr.send(formData);
		}

		return null;
	}
};