const inputHeader = document.querySelector('.header-input').getElementsByTagName('input');
const submitBtn = document.querySelector('.header-input').getElementsByTagName('a')[0];

submitBtn.addEventListener('click', async(e) => {
    e.preventDefault();
    const inputVal = inputHeader[0].value;

    try{
        fetch('/postData',{
            method: 'POST',
            body: JSON.stringify({  inputVal  }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() =>{
            location.assign('/');
        });      
    }
    catch(err){
        console.log(err);
    }
})

setMarkerOnMap = async () => {

    try{
        const data = await fetch('/geoDataLocation');
        const geoDataLocation = await data.json();
        console.log(geoDataLocation+"sdomeredf")
        const { "lat":lat , "lng":lng, "city":city, "region":region,"country":country,"postalCode":postalCode} = geoDataLocation;

        var mymap = new L.Map('leaflet', {
            center: [lat, lng],
            zoom: 6,
            layers: [
                new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                })
            ]
        });

        let marker = L.marker([lat, lng]).addTo(mymap);
        marker.bindPopup(`<b>${region},${city}</b><br><b>${country},${postalCode}`).openPopup();
        inputHeader[0].value = null;


        // let circle = L.circle([51.508, -0.11], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 500
        // }).addTo(mymap);

        // let polygon = L.polygon([
        //     [51.509, -0.08],
        //     [51.503, -0.06],
        //     [51.51, -0.047]
        // ]).addTo(mymap);


    }catch(err){
        console.log(err);
    }

    
}

setMarkerOnMap();

//  // Initialize the map
//  var map = L.map('map', {
//     scrollWheelZoom: false
//     });

//     // Set the position and zoom level of the map
//     map.setView([47.70, 13.35], 7);

//     // Initialize the base layer
//     var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     // res.render('index',{geoDataObj});
//     res.render('index');