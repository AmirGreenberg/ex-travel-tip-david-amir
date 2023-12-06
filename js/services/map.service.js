export const mapService = {
    initMap,
    // addMarker,
    panTo,
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi().then(() => {
        console.log('google available')
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })
        gMap.addListener('click', onAddLoc)
        console.log('Map!', gMap)
    })
}

// function renderLocs() {
//     const locs = getLocs()
//     const elLocs = document.querySelector('.locs')
//     let strHtmls = locs.map((loc) => {
//         return `<div class="loc">
//         <h3 class="locName">${loc.name}</h3>
//         <button class="btn" onclick="onPanToLoc('${loc.id}')">Go</button>
//         <button class="btn" onclick="onRemoveLoc('${loc.id}')">X</button>
//         </div>`
//     })
//     elLocs.innerHTML = strHtmls.join('')
// }

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCkKats8hPTEfFBZWP9TBgW7ElMGbCsmdk' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
