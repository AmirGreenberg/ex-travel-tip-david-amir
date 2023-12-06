export const mapService = {
    initMap,
    addMarker,
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
        gMap.addListener('click', onAddPlace)
        console.log('Map!', gMap)
    })
}

function onAddPlace(ev) {
    const name = prompt('Place name?', 'New Place')
    if (!name) return
    const lat = ev.latLng.lat()
    console.log('🚀  lat:', lat)
    const lng = ev.latLng.lng()
    console.log('🚀  lng:', lng)
    addPlace(name, lat, lng, gMap.getZoom())
    renderPlaces()
    // renderMarkers()
}

function renderPlaces() {
    const places = getPlaces()
    const elPlaces = document.querySelector('.places')
    let strHtmls = places.map((place) => {
        return `<div class="place">
        <h3 class="placeName">${place.name}</h3>
        <button class="btn" onclick="onPanToPlace('${place.id}')">Go</button>
        <button class="btn" onclick="onRemovePlace('${place.id}')">X</button>
        </div>`
    })
    elPlaces.innerHTML = strHtmls.join('')
}

function addPlace(name, lat, lng, zoom) {
    gPlaces.push(_createPlace(name, lat, lng, zoom))
    saveToStorage(PLACE_KEY, gPlaces)
}

function _createPlace(name, lat, lng, zoom) {
    return {
        id: makeId(),
        name,
        lat,
        lng,
        zoom,
    }
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    })
    return marker
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
