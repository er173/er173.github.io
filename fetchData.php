<?php 
	//Returns JSON data to Javascript file
	header("Content-type:application/json");
	
	$monthName = $_GET['month'];
	
	//Connect to db 
	$pgsqlOptions = "host='localhost' dbname='geog5871' user='geog5871student' password='Geibeu9b'";
	$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
	
	//Define sql query
	$query = "SELECT oid, body, latitude, longitude, genre, month, country, website FROM festivals WHERE month LIKE '%{$monthName}'";

	//Execute query
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());
	
	//Define new array to store results
	$festivalData = array();
	
	//Loop through query results 
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
	
		//Populate tweetData array 
		$festivalData[] = array("id" => $row["oid"], "body" => $row["body"], "lat" => $row["latitude"], "lon" => $row["longitude"], "genre" => $row["genre"], "month" => $row["month"], "country" => $row["country"], "website" => $row["website"]);
	}
	
	//Encode tweetData array in JSON
	echo json_encode($festivalData); 
	
	//Close db connection
	pg_close($dbconn);
?>
