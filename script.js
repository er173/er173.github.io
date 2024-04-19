var map;
var tweetData;
	
var myIcon = L.icon({
    iconUrl : 'hurricane-icon-42370.png',
    iconSize:[25,25]
});

function initialize()   {
        map = L.map('mapdiv');
        map.setView([53.8043, -1.5548], 16);
            
        //Load tiles from open street map
        L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery 		©CloudMade',
            maxZoom: 18 
        }).addTo(map); //add the basetiles to the map object
}


function fetchData()	{
	
	//Define array to hold results returned from server
	tweetData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			tweetData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon
			}); 
		}
		
		plotTweets(); 
	});
	
	
}

function plotTweets()	{	
	
		for (var i = 0; i< tweetData.length; i++)	{ 
		    var markerLocation = new L.LatLng(tweetData[i].lat, tweetData[i].lon);
            var marker = new L.Marker(markerLocation,{icon:myIcon}).addTo(map).bindPopup(tweetData[i].body);			
		}
	}

function clearData() {
    map.eachLayer(function(layer) {
        if (layer.getLatLng) {
            map.removeLayer(layer); 
        }
    });
  }

		
	
	