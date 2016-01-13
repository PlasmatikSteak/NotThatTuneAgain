<?php

header('Access-Control-Allow-Origin: *');

switch ($_REQUEST['action']) {
	case 'get_lists':
		echo json_encode(get_list($_REQUEST['guid']));
		break;
	
	case 'save_lists':
		if($_POST['guid'] != ''){
			save_list($_POST);
			echo json_encode('Saved!');
		}
		break;

	case 'update_web':
		if($_POST['guid'] != ''){
			echo json_encode(update_web($_POST));
			//echo json_encode('Web updated!');
		}
		break;

	default:
		echo json_encode('Not supported!');
		break;
}

function save_list($data){
	
	include("config.php");

	$connection = mysql_connect($servername, $dbusername, $dbpassword);
	mysql_select_db($dbname, $connection) or die (mysql_error());

	mysql_set_charset('utf8');

	$result = mysql_query("INSERT INTO `NotThatTuneAgain` SET `GUID`='".$data['guid']."', `blocked_artists`='".implode('|',$data['blocked_artists'])."', `blocked_tracks`='".implode('|',$data['blocked_tracks'])."', `change_stations`='".implode('|',$data['change_stations'])."' ON DUPLICATE KEY UPDATE `blocked_artists`='".implode('|',$data['blocked_artists'])."', `blocked_tracks`='".implode('|',$data['blocked_tracks'])."', `change_stations`='".implode('|',$data['change_stations'])."'");

	mysql_close($connection);

	return $result;

}

function get_list($GUID = NULL){
	include("config.php");

	$connection = mysql_connect($servername, $dbusername, $dbpassword);
	mysql_select_db($dbname, $connection) or die (mysql_error());

	mysql_set_charset('utf8');

	$result = mysql_query("SELECT * FROM `NotThatTuneAgain` WHERE `GUID` = '".$GUID."'");

	$row = mysql_fetch_array($result);

	mysql_close($connection);

	return $row;
}

function update_web($data){
	include("config.php");

	$connection = mysql_connect($servername, $dbusername, $dbpassword);
	mysql_select_db($dbname, $connection) or die (mysql_error());

	mysql_set_charset('utf8');

	$result = mysql_query("INSERT INTO `NotThatTuneAgain` SET `GUID`='".$data['guid']."', `playing_artist`='".addslashes($data['current_artist'])."', `playing_track`='".addslashes($data['current_track'])."', `playing_station`='".addslashes($data['current_station'])."', `last_update`=now() ON DUPLICATE KEY UPDATE `playing_artist`='".addslashes($data['current_artist'])."', `playing_track`='".addslashes($data['current_track'])."', `playing_station`='".addslashes($data['current_station'])."', `last_update`=now()");

	$result2 = mysql_query("SELECT `blocked_artists`, `blocked_tracks`, `change_stations` FROM `NotThatTuneAgain` WHERE `GUID` = '".$data['guid']."' LIMIT 1");

	$row = mysql_fetch_array($result2);

	mysql_close($connection);

	return $row;
}

?>
