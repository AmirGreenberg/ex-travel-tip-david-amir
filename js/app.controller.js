import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/util.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch
window.onAddLoc = onAddLoc
window.onRemoveLoc = onRemoveLoc


function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready')
            onGetLocs()
        })
        .catch(() => console.log('Error: cannot init map'))
}

function onSearch(ev) {
    ev.preventDefault()
    const elSearch = ev.target
    const elSearchInput = elSearch.querySelector('input')
    const value = elSearchInput.value
    console.log('🚀  value:', value)
    const API_KEY = 'AIzaSyCkKats8hPTEfFBZWP9TBgW7ElMGbCsmdk'
    const urlLoc = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${API_KEY}`
    console.log('🚀  loc:', urlLoc)

    return fetch(urlLoc)
        .then((res) => res.json())
        .then((res) => res.results[0])
        .then((loc) => {
            console.log(loc)
            // onAddMarker(
            //     { lat: newLoc.lat, lng: newLoc.lng },
            //     loc.results[0].formatted_address
            // )
            return loc
        })
}

// const location = {loc: {loc.results[0].geometry.location,} }
// onAddLoc(value)

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddLoc(ev) {
    const newLoc = locService.getEmptyLoc()
    console.log('🚀  newLoc:', newLoc)
    // if (!newLoc.name) return

    newLoc.name = prompt('Enter name')
    newLoc.lat = ev.latLng.lat()
    newLoc.lng = ev.latLng.lng()
    newLoc.createdAt = Date.now()
    newLoc.updatedAt = Date.now()
    newLoc.weather = ''
    console.log("🚀  newLoc:", newLoc)
    onAddMarker({ lat: newLoc.lat, lng: newLoc.lng })


    locService.save(newLoc).then((savedLoc) => {
        return loadLocs()
    })
}

///check with amir about this function
// function loadLocs() { 
//     return locService.query().then((locs) => renderLocs(locs))
// }

function onAddMarker(name, pos) {
    mapService.addMarker(name, pos)
}

function renderLocs(locs) {
    // const locs = getLocs()
    const elLocs = document.querySelector('.locs')
    let strHtmls = locs.map((loc) => {
        return `<div class="loc">
        <h3 class="locName">${loc.name}</h3>
        <button class="btn" onclick="onPanToLoc('${loc.id}')">Go</button>
        <button class="btn" onclick="onRemoveLoc('${loc.id}')">X</button>
        </div>`
    })
    elLocs.innerHTML = strHtmls.join('')
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        renderLocs(locs)
    })
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch((err) => {})
}

function onPanTo() {
    mapService.panTo(35.6895, 139.6917)
}

function onRemoveLoc(locId){
    console.log('locId', locId)
    locService.remove(locId)
    .then(() => loadLocs())
    

}

