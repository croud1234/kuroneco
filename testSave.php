<?php
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
	// Get the data
	$imageData=$GLOBALS['HTTP_RAW_POST_DATA'];

	// Remove the headers (data:,) part.
	// A real application should use them according to needs such as to check image type
	$filteredData=substr($imageData, strpos($imageData, ",")+1);

	// Need to decode before saving since the data we received is already base64 encoded
	$unencodedData=base64_decode($filteredData);

	//echo "unencodedData".$unencodedData;

	// Save file. This example uses a hard coded filename for testing,
	// but a real application can specify filename in POST variable
	$fp = fopen( './tmp/test.png', 'wb' );
	fwrite( $fp, $unencodedData);
	fclose( $fp );

	require_once("./src/facebook.php");

	$config = array();
	$config['appId'] = '279998682139776';
	$config['secret'] = '09ff40fabf0e8f9d05b4e01a22b8a927';
	$config['fileUpload'] = true;

	$facebook = new Facebook($config);

	$user_id = $facebook->getUser();

	system("echo $user_id >> ./tmp/log");

}
?>
