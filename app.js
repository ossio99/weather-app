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
                    let temp = Math.round(data.main.temp);
                    console.log(data);
                    console.log(temp);
                    temperaturaValor.textContent = `${temp}?`;
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;
                })
                .catch(error => {console.log(error)})
        })
    }
});