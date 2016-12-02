<?php

	$slug = $_GET["link"];

	$servername = "localhost";
	$username = "oswalmkb_shorten";
	$password = "1Anand01*";
	$dbname = "oswalmkb_globalshortener";

	$connect = new mysqli($servername, $username, $password, $dbname);
	if ($connect->connect_error) {
		die("connection failed: " . $connect->connect_error);
	}

	$sql = "SELECT * FROM urls WHERE slug = '" . $slug . "'";
	$result = $connect->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$url = $row["url"];
		}
	}

	$sql = "INSERT INTO linkanalytics (shortlink, ipaddress, timing, useragent, referer, creator) VALUES ('" . $slug . "', '" . $_SERVER["REMOTE_ADDR"] . "', '" . date("l j F Y h:i:s A") . "', '" . $_SERVER ["HTTP_USER_AGENT"] . "', '" . $_SERVER["HTTP_REFERER"] . "', '" . $_SERVER["SERVER_NAME"] . "')";

	if ($connect->query($sql) === TRUE) {
		header("Location: " . $url);
	} else {
		echo "Error: " . $sql . "<br>" . $connect->error;
	}

?>