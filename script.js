var map;
var festivalData;
	
var myIcon = L.icon({
    iconUrl : 'hurricane-icon-42370.png',
    iconSize:[25,25]
});

function initialize()   {
        map = L.map('mapdiv');
        map.setView([51.50800254386003, -0.12679273896889875], 5);
            
        //Load tiles from open street map
        L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery 		©CloudMade',
            maxZoom: 18 
        }).addTo(map); //add the basetiles to the map object
}


/*function fetchData()	{
	
	//Define array to hold results returned from server
	festivalData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			festivalData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon,
				genre: results[i].genre,
				month: results[i].month,
				countrty: results[i].country,
				website:results[i].website
			}); 
		}
		
		plotTweets(); 
	});
	
	
}*/

document.getElementById("monthSelector").addEventListener('change', function(){
	fetchFestivals(this.value);
});

function fetchFestivals(monthName){
	festivalData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", { month: monthName }, function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			festivalData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon,
				genre: results[i].genre,
				month: results[i].month,
				countrty: results[i].country,
				website:results[i].website
			}); 
		}
		
		plotFestivals(); 
	});
}

function plotFestivals()	{	
	
		for (var i = 0; i< festivalData.length; i++)	{ 
		    var markerLocation = new L.LatLng(festivalData[i].lat, festivalData[i].lon);
            var marker = new L.Marker(markerLocation,{icon:myIcon}).addTo(map).bindPopup(festivalData[i].body + '</br>' + festivalData[i].genre + '</br>' + festivalData[i].month + '</br>' + '<a href="' + festivalData[i].website + '">' + festivalData[i].website + '</a>');			
		}
	}

function clearData() {
    map.eachLayer(function(layer) {
        if (layer.getLatLng) {
            map.removeLayer(layer); 
        }
    });
  }

		
	
	