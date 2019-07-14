window.addEventListener('load', ()=> {
    let long;
    let lat;
    
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
                //Set DOM Elements from the API for today's weather
                document.getElementById("timeZone").innerHTML = data.timezone;
                document.getElementById("temp-degree").innerHTML = data.currently.temperature;
                document.getElementById("temp-description").innerHTML = data.currently.summary;

                let elpochTimeStamp = data.currently.time;
                days = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
                let dayOfWeek = getDayOfWeek(elpochTimeStamp,days);
        

                document.getElementById("the-Day").innerHTML = dayOfWeek;
                //sets Icon
                setIcons(data.currently.icon, document.getElementById("icon"));

                
                var x;
                //Set DOM Elements from API for the rest of the days
                for (x =1; x<7; x++){
                    //Sets the Degree
                    document.getElementById(`temp-degree${x}`).innerHTML = data.daily.data[x].temperatureLow;
                    //sets the Description
                    document.getElementById(`temp-description${x}`).innerHTML = data.daily.data[x].summary;
                    //Sets the Location
                    document.getElementById(`the-Day${x}`).innerHTML = getDayOfWeek(data.daily.data[x].time,days);

                    //setIcons
                    setIcons(data.daily.data[x].icon, document.getElementById(`icon${x}`));
                  
                }
            
            });
        });
    }
    else{
        // Sets Location, Degree, and Summary to default 
        // values if gelocation is not given
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


function getDayOfWeek(elpochTime, days){
    let timeStamp = new Date();
    timeStamp.setTime(elpochTime*1000);
    return days[timeStamp.getDay()];

}



/*
function setBackground(icon,myBgColor){
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
            break;

    }
}
*/