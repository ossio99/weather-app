window.addEventListener("load", ()=>{
    let lon;
    let lat;

    let temperaturaValor = document.getElementById("temperatura-valor");
    let temperaturaDescripcion = document.getElementById("temperatura-descripcion");
    let ubicacion = document.getElementById("ubicacion");
    let iconoAnimado = document.getElementById("icono-animado");
    let vientoVelocidad = document.getElementById("viento-velocidad");

    //navigator.geolication nos devuelve un objeto de geolocalizacion
    if(navigator.geolocation){
        //getCurrentPosition metodo para obtener la posicion de un dispositivo
        navigator.geolocation.getCurrentPosition(posicion =>{
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=8a8d8cc1b11f1bfbfa64517df451b49a`
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a8d8cc1b11f1bfbfa64517df451b49a`;
            console.log(url);

            fetch(url)
                .then(res => {return res.json()})
                .then(data => {
                    let temp = Math.round(data.main.temp - 273);
                    console.log(data);
                    console.log(temp);
                    temperaturaValor.textContent = `${temp}°`;
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    switch(data.weather[0].main){
                        case "Clear":
                            iconoAnimado.src ="img/day.svg";
                            break;
                        case "Thunderstorm":
                            iconoAnimado.src ="img/thunder.svg";
                            break;
                        case "Drizzle":
                            iconoAnimado.src ="img/rainy-2.svg";
                            break;
                        case "Rain":
                            iconoAnimado.src ="img/rainy-7.svg";
                            break;
                        case "Snow":
                            iconoAnimado.src ="img/snowy-6.svg";
                            break;
                        case "Atmosphere":
                            iconoAnimado.src ="img/weather.svg";
                            break;
                        case "Clouds":
                            iconoAnimado.src ="img/cloudy-day-1.svg";
                            break;
                    }
                })
                .catch(error => {console.log(error)})
        })
    }
});