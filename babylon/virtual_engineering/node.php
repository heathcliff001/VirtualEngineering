<?php
	// Allow from any origin
	if (isset($_SERVER['HTTP_ORIGIN'])) {
		// should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
		// whitelist of safe domains
		header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}
	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
			header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
			header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	}
   // connect to mongodb
	$result = [];
	$dbName = '3DObjectManagement';
    require '/var/www/html/vendor/autoload.php';
    $getColl = $_GET["collection"];
	$connection = new MongoDB\Client("mongodb://naufal:labduafa@x1.hcm-lab.id:27070/?authSource=admin");
    $collection = $connection->$dbName->$getColl;
    $cursor = $collection->find(['contentType' => 'gltf']);
    foreach($cursor as $r){
        array_push($result, $r);
    }
    echo json_encode($result);
	//phpinfo();
?>