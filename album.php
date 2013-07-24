<?php
require_once("./src/facebook.php");

$config = array();
$config['appId'] = '279998682139776';
$config['secret'] = '09ff40fabf0e8f9d05b4e01a22b8a927';
$config['fileUpload'] = true;

$facebook = new Facebook($config);

$user_id = $facebook->getUser();



if( empty($user_id) ){
	$login_url = $facebook->getLoginUrl( array( 'scope' => 'publish_stream' ) );
	echo 'Please <a href="' . $login_url . '">login.</a>';
}

if( $user_id && !empty($_FILES) ){

	$img = $_FILES["pictures"]["tmp_name"];
	$photo = $facebook->api(
		'/me/photos', 
		'POST',
		array(
			'source' => '@' . $img,
			'message' => 'Photo uploaded via the PHP SDK!',
			'name' => 'asdf'
		)
	);
}


?>
<html>
<body>
<form action="" method="post" enctype="multipart/form-data">
<p>Pictures:
<input type="file" name="pictures" />
<input type="submit" value="Send" />
</p>
</form>
</body>
</html>
