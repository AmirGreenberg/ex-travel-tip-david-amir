import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs, //was orignally here
    query, // importet from pets
    get,
    remove,
    save,
    getEmptyLoc,
    getFilterBy,
    setFilterBy,
    
}

const LOC_KEY = 'locDB'
_createLocs()

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(query())
        }, 2000)
    })
}

//////////////////////////////////////////////////////////

var gFilterBy = { txt: '', minScore: 0 }


function query() {
    return storageService.query(LOC_KEY).then((locs) => {
        // if (gFilterBy.txt) {
        // 	const regex = new RegExp(gFilterBy.txt, 'i')
        // 	pets = pets.filter(pet => regex.test(pet.name))
        // }
        // if (gFilterBy.minScore) {
        // 	pets = pets.filter(pet => pet.score >= gFilterBy.minScore)
        // }
        return locs
    })
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function remove(locId) {
    return storageService.remove(LOC_KEY, locId)
}

function save(loc) {
    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
}

function getEmptyLoc(
    id,
    name = '',
    lng = '',
    lat = '',
    createdAt = '',
    updatedAt = '',
    weather = ''
) {
    return {
        id: '',
        name,
        lng,
        lat,
        createdAt,
        updatedAt,
        weather,
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minScore !== undefined) gFilterBy.minScore = filterBy.minScore
    return gFilterBy
}

function _createLocs() {
    let locs = utilService.loadFromStorage(LOC_KEY)
    if (!locs || !locs.length) {
        _createDemoLocs()
    }
}

function _createDemoLocs() {
    const locs = [
        {
            id:utilService.makeId(),
            name: 'Greatplace',
            lng: 34.832384,
            lat: 32.047104,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            weather: '',
        },
        {
            id:utilService.makeId(),
            name: 'Neveragain',
            lng: 34.832581,
            lat: 32.047201,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            weather: '',
        },
    ]

    utilService.saveToStorage(LOC_KEY, locs)
    return locs
}



// function _createLoc(name, lat, lng) {
//     const loc = getEmptyLoc()
//     loc.id = utilService.makeId()
//     loc.name = name
//     loc.lat = lat
//     loc.lng = lng
//     loc.createdAt = Date.now()
//     loc.updatedAt = Date.now()
//     loc.weather = ''
//     return loc
// }
