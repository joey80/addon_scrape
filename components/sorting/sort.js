var exports = module.exports = {};
const fs = require('fs');

exports.startSort = () => {
    const fileName = 'junk1.txt';

    // Reads the content of the file, processes the data and saves it to JSON file
    fs.readFile(fileName, 'utf8', (error, data) => {
        if (error) throw error;

        const firstSplit = exports.splitAtDoubleReturn(data);
        const secondSplit = exports.splitAtSingleReturn(firstSplit);
        const rawObject = exports.pushToRawObject(secondSplit);
        const uniqueObject = exports.sortUniqueObject(rawObject);
        const finalJSON = exports.convertObjToJSON(uniqueObject);
        writeToJSONFile(finalJSON, 'myjsonfile');
    });
};

// Creates an array that splits at every double carriage return
exports.splitAtDoubleReturn = data => {
    return data.toString().split('\n\n');
};

// Creates an array that splits at every single carriage return
exports.splitAtSingleReturn = data => {
    let newArray = [];
    data.forEach(elm => {
        let newSplit = elm.toString().split('\n');
        newArray.push(newSplit);
    });

    return newArray;
};

// Pushes array to js object
exports.pushToRawObject = (data) => {
    let results = new Array();
    
    data.forEach((elm) => {
        results.push({
            name: elm[0],
            telephone: elm[1],
            contact: elm[2],
            address: elm[3],
            website: elm[4]
        });
    });

    return results;
};

// Pushes array to js object
// exports.pushToRawObject = data => {
//     let results = Object.fromEntries(data);
//     return results;
// };

// Sorts js object and maps unique array of objects to new object
exports.sortUniqueObject = data => {
    let results = new Array();
    const map = new Map();

    for (const item of data) {
        if(!map.has(item.telephone)){
            map.set(item.telephone, true);
            results.push({
                name: item.name,
                telephone: item.telephone,
                contact: item.contact,
                address: item.address,
                website: item.website
            });
        }
    }

    return results;
};

// Converts the js object to JSON
exports.convertObjToJSON = data => {
    return JSON.stringify(data);
};

// Writes the JSON to a file
const writeToJSONFile = (data, filename) => {
    fs.writeFile(`${filename}.json`, data, 'utf8', (error) => {
        if (error) throw error;
    });
};
