/**
 * Responsible for converting csv to json format
 * @param {*String} csv 
 * @returns JsonArray
 */
export const csvToJson = csv => {
    let lines = csv.split("\n");
    let results = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length - 1; i++) {
        let obj = {};
        let currentLine = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        results.push(obj);
    }
    return results;
}