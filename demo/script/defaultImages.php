<?php
header("Content-Type: text/plain");
ini_set("display_errors", 1);
error_reporting(E_ALL);


$images = [
	'./images/rg3115.jpg',
	'./images/rg3121.jpg',
	'./images/rg3130.jpg',
	'./images/rg3144.jpg',
	'./images/rg3242.jpg'
];


// make images list
if (is_dir('../upload'))
{
	foreach (glob('../upload/*.*') as $filename)
	{
		if (exif_imagetype($filename))
		{
			$images[] = './upload/'.basename($filename);
		}
	}
}


// print result
echo json_encode($images, JSON_PRETTY_PRINT);
