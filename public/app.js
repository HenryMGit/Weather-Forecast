window.addEventListener('load', ()=> {
    let long;
    let lat;
    let myBgColor = document.getElementsByTagName('body')[0];
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // Calls weather endpoint to receive the weather json data
            const api_url = `weather/${lat}/${long}`;
            fetch(api_url)
            .then( response =>{
               
                return response.json();
            })
            .then( data =>{
                console.log(data);
                //console.log(data.daily.data[0].temperatureLow)
                //stores the temp,summary,& icon 
                const {temperature,summary, icon} = data.currently;

                //Set DOM Elements from the API
                document.getElementById("temp-degree").innerHTML = temperature;
                document.getElementById("temp-description").innerHTML = summary;
                document.getElementById("location-timezone").innerHTML = data.timezone;
                
                switch (icon){
                    case 'rain':
                        myBgColor.style.background ="-moz-linear-gradient(#95bed1, #8b9ea7)";
                        break;
                    case 'clear-day':
                        myBgColor.style.background ="-moz-linear-gradient(#2CF7453, #30F2BF)";
                        break;
                    case 'clear-night':
                        myBgColor.style.background ="-moz-linear-gradient(#003366, #000d1a)";
                        break;
                    case 'snow':
                        myBgColor.style.background ="-moz-linear-gradient(#FFFFFF, #DCDCDC)";
                    case 'fog':
                            myBgColor.style.background ="-moz-linear-gradient(#FFFFFF, #DCDCDC)";
                        break;
                    default:
                        myBgColor.style.background ="-moz-linear-gradient(#2CF7453, #30F2BF)";

                }
   
                
                
                //sets Icon
                setIcons(icon, document.getElementById("icon"));

            
            });
        });
    }
    else{
      
        setIcons("Rain", document.getElementById("icons"));
        document.getElementById("temp-degree").innerHTML = "?????";
        document.getElementById("temp-description").innerHTML = "Please enable Geolocation";
        document.getElementById("location-timezone").innerHTML = "?????";

    }

    // Sets Icon using skycon.js
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});