const sortController = (function() {
    const fs = require('fs');

    // Reads the content of the file
    const readFile = (fileName) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            if (error) throw error;

            const firstSplit = splitAtDoubleReturn(data);
            const secondSplit = splitAtSingleReturn(firstSplit);
            const rawObject = pushtoRawObject(secondSplit);
            const uniqueObject = sortUniqueObject(rawObject);
            const finalJSON = convertObjToJSON(uniqueObject);
            writeToJSONFile(finalJSON, 'myjsonfile');
        });
    };

    // Creates an array that splits at every double carriage return
    const splitAtDoubleReturn = (data) => {
        return data.toString().split('\n\n');
    };

    // Creates an array that splits at every single carriage return
    const splitAtSingleReturn = (data) => {
        let newArray = [];
        data.forEach((elm) => {
            let newSplit = elm.toString().split('\n');
            newArray.push(newSplit);
        });

        return newArray;
    };

    // Pushes array to js object
    const pushtoRawObject = (data) => {
        let obj = {
            table: []
        };
        
        data.forEach((elm) => {
            obj.table.push({
                name: elm[0],
                telephone: elm[1],
                contact: elm[2],
                address: elm[3],
                website: elm[4]
            });
        });

        return obj;
    };

    // Sorts js object and maps unique array of objects to new object
    const sortUniqueObject = (data) => {
        let result = [];
        const map = new Map();

        for (const item of data.table) {
            if(!map.has(item.telephone)){
                map.set(item.telephone, true);
                result.push({
                    name: item.name,
                    telephone: item.telephone,
                    contact: item.contact,
                    address: item.address,
                    website: item.website
                });
            }
        }

        const uniqueObj = {
            result
        };

        return uniqueObj;
    };

    // Converts the js object to JSON
    const convertObjToJSON = (data) => {
        return JSON.stringify(data);
    };

    // Writes the JSON to a file
    const writeToJSONFile = (data, filename) => {
        fs.writeFile(`${filename}.json`, data, 'utf8', (error) => {
            if (error) throw error;
        });
    };

    return {
        init: function() {
            const rawData = readFile('junk1.txt');
        }
    };

})();

sortController.init();