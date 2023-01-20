/**
 * Responsible for converting csv to json format
 * @param {*String} csv 
 * @returns {Array,Array} Headers,Body
 */
export const csvToJson = csv => {
    let body = [];
    if (csv === "" || csv === undefined || csv === null) return body;
    let lines = csv.split("\n");
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length - 1; i++) {
        let obj = {};
        let currentLine = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        body.push(obj);
    }
    return { headers, body };
}