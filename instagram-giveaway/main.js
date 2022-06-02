const {readFileSync} = require('fs');

function uniqueValues(files) {
    let allUniqueValues = new Set();
    for (let i = 0; i < files.length; i++) {
        readFileAndSplit(files[i])
        .forEach(element => allUniqueValues.add(element));
    }
    return allUniqueValues.size;
}

function existInAllFiles(files) {
    let mapUniqueValues = findAllUniqueValues(files);
    let count = 0;

    for (const [key, value] of mapUniqueValues) {
        if (value == 20) {
            count++;
        }
    }
    return count;
}

function existInAtLeastTen(files) {
    let mapUniqueValues = findAllUniqueValues(files);
    let count = 0;
    
    for (const [, value] of mapUniqueValues) {
        if (value >= 10) {
            count++;
        }
    }
    return count;
}

function findAllUniqueValues(files) {
    let map = new Map();
    for (let i = 0; i < files.length; i++) {
        let unique = uniqueValuesInFile(files[i]); 
        for (const val of unique) {
            if (!map.has(val)) {
                map.set(val, 1);
            } else {
                map.set(val, map.get(val) + 1);
            }
        }
    }
    return map;
}

function uniqueValuesInFile(file) {
    let allValues = readFileAndSplit(file);
    return new Set(allValues);
}

function readFileAndSplit(file) {
    return readFileSync(file, 'utf-8').split('\n');
}

module.exports = {uniqueValues, existInAllFiles, existInAtLeastTen};