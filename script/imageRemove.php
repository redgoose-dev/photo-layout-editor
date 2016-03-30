<?php
header("Content-Type: text/plain");
ini_set("display_errors", 1);
error_reporting(E_ALL);


$dir = '../upload';
$dir_exp = '/^..\/upload/';


if (isset($_POST['images']) && count($_POST['images']) > 0)
{
	foreach($_POST['images'] as $k=>$v)
	{
		if (preg_match_all($dir_exp, $v))
		{
			$filedir = preg_replace($dir_exp, $dir, $v);
			if (file_exists($filedir))
			{
				unlink($filedir);
			}
		}
	}
}
