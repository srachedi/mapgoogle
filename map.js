function initialize(){
	
		alert("ok map!!")
		var latlng = new google.maps.LatLng(43.6111, 3.87667);
		var myOptions={zoom:15,
							center:latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP
							};
		var map= new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		var latlng = new google.maps.LatLng(43.611, 3.87667);
		var marker = new google.maps.Marker ({position: latlng,
																	map:map,
																	title: "JE SUIS ICI !",
																	draggable: true
																	});
				}


		
