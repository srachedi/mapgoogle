$(document).ready(function()
{
	var coordonnes;
	var origin;
	var destination;

	$.getJSON("themes.json", function(data){
	$('#side').append("<div id='menu' ></h3>");
	$.each(data,function(entryIndex, entry){
		$("#menu").append("<h3 id="+entry['type']+">"+entry['type']+"</h3>");
		
		$('#'+entry['type']).after("<div ><ul id=li-"+entry['type']+"> </ul></div>");
			
		$.getJSON(entry['type']+".json", function(data1){
		

			 $.each(data1,function(entryIndex1, entry1){
			  	 $('#li-'+entry['type']).after("<li ><input type='checkbox' value='"+entry1['latitude']+":"+entry1['longitude']+":"+entry1['texte']+":"+entry1['image']+"'>"+entry1['nom']+"</input></li>");
			
			$('input:checkbox').click(function(){
				 n = $('input:checked').size();


			    if($(this).is(':checked')){
			  		 if (n > 10){
					n=n -10;
					}
					
					latlong = $(this).attr("value").split(":");
					coordonnes=latlong;
					var lat   = latlong[0];
					var longg = latlong[1];
					var texte = latlong[2];
					var image = latlong[3];   
					  

					var point  = new google.maps.LatLng(lat,longg);
					origin= point;
					var marker = new google.maps.Marker({
					           
					                                            position: point,
					                                            map: map,
					                                            title:"JE SUIS LAAAAAA!!",
																icon: 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.8|0|'+n+'|11|b|'+n
					                                });	
					
					var infoWindow = new google.maps.InfoWindow();
					                                var html="<b>"+texte+"</b>"+"<br>"+"<img style='width:8em; heght:4em'src="+image+">";
					                                google.maps.event.addListener(marker, 'click', function() {
					                                    							infoWindow.setContent(html);
					                                   								infoWindow.open(map, marker);
					                                				});
									
					   			}// En if checked !!!
								
							}); //input:checkbox
							
			  	  		}); //each(data1,function(entryIndex1, entry1)
						
			  		}); 

					
				});


			  	   $( "#menu" ).accordion({ heightStyle: "content",active: 5});
			        $('body').append("</div>"); 

			  	    });

					//// ================ Map =======================================================

					var latlng0 = new google.maps.LatLng(43.6111, 3.87667);
			      	var myOptions = {
			      						zoom: 10,
			                     		center: latlng0,
			                    	 	mapTypeId: google.maps.MapTypeId.ROADMAP
			                    	};
			     	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			        var marker=new google.maps.Marker({position:latlng0,
			                                          map: map,
			                                          title:"Montpellier Centre!!!",
			                                          draggable:true             

			                          }); 
			        ///     ==================== Map  ===================================





			        //////==================== Auto-Localisation ===================//////////////////

					$('.localise-moi').click(function(){
						
						if (navigator.geolocation)
						{
						  navigator.geolocation.getCurrentPosition(function(position)
						  {
						    var latLoca = position.coords.latitude ;
						    var longLoca=  position.coords.longitude;
						    var localisation  = new google.maps.LatLng(latLoca,longLoca);
						    destination =localisation;
						    var marker = new google.maps.Marker({
					           
					                                            position: localisation,
					                                            map: map,
					                                            title:"JE SUIS LAAAAAA!!",
																animation: google.maps.Animation.DROP,
																
					                                });	

						  });
						}
						else
						  alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
						});

					//////==================== Fin Auto-Localisation ===================//////////////////


					///===================== Parcour ================================/////
					$('.se-rendre').click(function(){
						 calculate = function(){

						 	  direction = new google.maps.DirectionsRenderer({
    							map   : map,
  								});

					    	
					   		if (origin && destination){ 
					        var request = {
					            origin      : origin,
					            destination : destination,
					            travelMode  : google.maps.DirectionsTravelMode.DRIVING // Mode de conduite
					        }
					        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
					        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
					            if(status == google.maps.DirectionsStatus.OK){
					                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
					            }
					        });
					    }
					    else
					    	alert ("il faut vous vous localiser !")
					};	
					calculate();

					});
					///===================== Fin Parcour ================================/////

					
			   });


