export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap
}

// Var that is used throughout this Module (not global)
var gMap

function getMap(){
    return gMap
}

function addMarker(name,loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: name,
    })
    return marker
}

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
