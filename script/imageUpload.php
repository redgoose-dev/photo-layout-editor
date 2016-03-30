<?php

ini_set("display_errors", 1);
error_reporting(E_ALL);


// set variables
$files = $_FILES['files'];
$count = count($files['name']);
$copyFiles = [];

$uploadDir = '../upload';
$uploadUrl = '../upload';


// check directory
if (!$uploadDir || !is_dir($uploadDir))
{
	$umask = umask();
	umask(000);
	mkdir($uploadDir, 0707);
	umask($umask);

	if (!is_dir($uploadDir))
	{
		echo urlencode(json_encode([
			'state' => 'error',
			'message' => 'not exist "'.$uploadDir.'" directory'
		]));
		exit;
	}
}


// check file count
if ($count < 0)
{
	echo urlencode(json_encode([
		'state' => 'error',
		'message' => 'not upload files'
	]));
	exit;
}


// copying files and set file list
for ($i=0; $i<$count; $i++)
{
	if ($files['tmp_name'][$i])
	{
		move_uploaded_file($files['tmp_name'][$i], $uploadDir.'/'.$files['name'][$i]);
		$copyFiles[] = [
			'loc' => $uploadUrl.'/'.$files['name'][$i],
			'type' => $files['type'][$i],
			'size' => $files['size'][$i],
			'name' => $files['name'][$i]
		];
	}
}


// print result
echo urlencode(json_encode([
	'state' => 'success',
	'message' => 'complete upload',
	'images' => $copyFiles
]));
