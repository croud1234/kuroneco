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

	$result = array("url" => 'http://croud.chu.jp/h/github/tmp/test.png');
	echo json_encode($result);

	/* 画像名はランダムで、一日経過したら消すような仕組みを入れる */
}
?>
