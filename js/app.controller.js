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


function onInit() {
    mapService.initMap().then(() => {})
}

function onSearch(ev) {
    ev.preventDefault()
    const elSearch = ev.target
    const elSearchInput = elSearch.querySelector('input')
    const value = elSearchInput.value
    // onAddLoc(value)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddLoc(ev) {
    const newLoc = locService.getEmptyLoc()
    console.log("🚀  newLoc:", newLoc)
    // if (!newLoc.name) return

    newLoc.name = prompt('Enter name')
    newLoc.lat = ev.latLng.lat()
    newLoc.lng = ev.latLng.lng()
    newLoc.createdAt = Date.now()
    newLoc.updatedAt = Date.now()
    newLoc.weather = ''
    console.log("🚀  newLoc:", newLoc)

    locService.save(newLoc).then((savedLoc) => {
        return loadLocs()
    })
}

function loadLocs() {
    return locService.query().then((locs) => renderLocs(locs))
}

function onAddMarker() {
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        document.querySelector('.locs').innerText = JSON.stringify(
            locs,
            null,
            2
        )
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
