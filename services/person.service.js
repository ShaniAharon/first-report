import fs from 'fs'
import { utilService } from './util.service.js'
import { scrapeForm } from './scrape.service.js'

const persons = utilService.readJsonFile('data/person.json')

export const personService = {
    query,
    get,
    remove,
    save,
    fillForm
}

function query(filterBy = {}) {
    let personsToDisplay = persons
    console.log('f', filterBy);
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        personsToDisplay = personsToDisplay.filter(person => regExp.test(person.name))
    }

    if (filterBy.num) {
        personsToDisplay = personsToDisplay.filter(person => person.num === filterBy.num)
    }
    console.log('persons', personsToDisplay);

    return Promise.resolve(personsToDisplay)
}

async function get(personId) {
    const person = persons.find(person => person._id === personId)
    // const scraped = await scrapeForm(person)
    // console.log('scraped', scraped)
    if (!person) return Promise.reject('Person not found!')
    return Promise.resolve(person)
}

async function fillForm({personId}) {
    const person= await get(personId)
    console.log('person', person);
    const scraped = await scrapeForm(person)
    console.log('scraped', scraped)
}

function remove(personId, loggedinUser) {
    const idx = persons.findIndex(person => person._id === personId)
    if (idx === -1) return Promise.reject('No Such Person')
    const person = persons[idx]
    if (person.owner._id !== loggedinUser._id) return Promise.reject('Not your person')
    persons.splice(idx, 1)
    return _savePersonsToFile()
}

function save(person) {
    if (person._id) {
        const personToUpdate = persons.find(currPerson => currPerson._id === person._id)
        personToUpdate.name = person.name
        personToUpdate.num = person.num
    } else {
        person._id = _makeId()
        person.num += utilService.generateRandomNums(4)
        console.log('testRand', utilService.generateRandomNums(5));
        console.log('num', person.num);
        persons.push(person)
    }

    return _savePersonsToFile().then(() => person)
    // return Promise.resolve(person)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _savePersonsToFile() {
    return new Promise((resolve, reject) => {

        const personsStr = JSON.stringify(persons, null, 4)
        fs.writeFile('data/person.json', personsStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}
