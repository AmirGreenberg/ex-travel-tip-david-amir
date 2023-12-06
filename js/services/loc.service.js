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


// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


//////////////////////////////////////////////////////////



var gFilterBy = { txt: '', minScore: 0 }

_createLocs()



function query() {
	return storageService.query(LOC_KEY).then(locs => {
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

function remove(petId) {
	return storageService.remove(LOC_KEY, locId)
}

function save(pet) {
	if (loc.id) {
		return storageService.put(LOC_KEY, loc)
	} else {
		return storageService.post(LOC_KEY, loc)
	}
}

function getEmptyLoc(name = '', score = 0) {
	return {
		id: '',
		name,
		lng,
        lat,
        createdAt,
        updatedAt,
        weather	
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

///////////////////////////////////////

function _createLocs() {
	let pets = utilService.loadFromStorage(LOC_KEY)
	if (!pets || !pets.length) {
		_createDemoLocs()
	}
}

function _createDemos() {
	const petNames = ['Bobi', 'Charli', 'Pinchi']
	const petDescs = ['Bobi is an amazing dog', 'Charli is a curious cat', 'Just one look at Pinchi']

	const pets = petNames.map((petName, i) => {
		const pet = _createPet(petName)
		pet.desc = petDescs[i]
		return pet
	})

	utilService.saveToStorage(LOC_KEY, pets)
}

function _createPet(name) {
	const pet = getEmptyPet()
	pet.id = utilService.makeId()
	pet.type = utilService.randomPetType()
	pet.name = name || utilService.randomPetName(pet.type)
	pet.birth = utilService.randomPastTime()
	return pet
}
