const apiKey = 'at_4KXHspiLDJIby35KPRBcaNPeQ7kK9';
let ipAdd = document.querySelector(".ipaddress");
const btn = document.querySelector('.btn');
const description = document.querySelector('.description');
let ip;

// btn.addEventListener('click', () => findLocation)
// btn.addEventListener('click', () => updateMap)
btn.addEventListener('click', () => {
    map.remove()
    //to remove the map initialized error
    const newMap = document.createElement('div')
    newMap.setAttribute("id", "map")

    document.body.appendChild(newMap)


    findLocation()

    updateMap()
})

async function findLocation() {
    // const url = `https://geo.ipify.org/api/v2/country?apiKey=at_4KXHspiLDJIby35KPRBcaNPeQ7kK9&ipAddress=${ipAdd.value}`; //doesn't include the lat,long data..
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=58275771f6fb4d31ab305679d462ed8f&ip=${ipAdd.value}`
    let resp = await fetch(url);
    let data = await resp.json()
    let lat = data.latitude;
    let long = data.longitude;

    description.innerHTML = `
    <div class="bg-danger p-1 m-1">
    <h4 class="fs-4">City</h4>
    <h2 class="fs-5">${data.city}</h2>
    </div>
    <div class="bg-warning p-1 m-1">
    <h4 class="fs-4">Country</h4>
    <h2 class="fs-5">${data.country_name}</h2>
    </div>
    <div class="bg-info p-1 m-1">
    <h4 class="fs-4">Today is</h4>
    <h2 class="fs-5">${data.time_zone.current_time.slice(0, 10)}</h2>
    </div>`;

    // console.log(data);

    // console.log(data.time_zone.current_time.slice(0, 10)); //show the date only

}
findLocation()

async function updateMap(e) {

    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=58275771f6fb4d31ab305679d462ed8f&ip=${ipAdd.value}`;
    let resp = await fetch(url);
    let data = await resp.json()
    let lat = data.latitude;
    let long = data.longitude;

    var map = L.map('map').setView([lat, long], 13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, long]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}
updateMap()

// `https://api.ipgeolocation.io/ipgeo?apiKey=58275771f6fb4d31ab305679d462ed8f&ip=${ipAdd.value}`