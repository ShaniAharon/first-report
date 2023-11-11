import fs from 'fs'

export const utilService = {
    readJsonFile,
    generateRandomNums
}


function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function generateRandomNums(times) {
    let str = ''
    for (let i = 0; i < times; i++) {
        const randNum = getRandomIntInclusive(0,9);
        str += randNum
    }
    return str
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


  
