<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);


// set variables
$files = $_FILES['files'];
$count = count($files['name']);

$uploadDir = '../upload';
$uploadUrl = './upload';


// make unique filename
function generateRandomString($length = 10) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}


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
if ($files['tmp_name'][0])
{
	$filename = generateRandomString(15).'.'.pathinfo($files['name'][0])['extension'];
	move_uploaded_file($files['tmp_name'][0], $uploadDir.'/'.$filename);
	$copyFiles = $uploadUrl.'/'.$filename;
}


if ($copyFiles)
{
	// print result
	echo json_encode([
		'state' => 'success',
		'data' => $copyFiles
	], JSON_PRETTY_PRINT);
}
else
{
	echo urlencode(json_encode([
		'state' => 'error',
		'message' => 'Copy failed file'
	]));
}