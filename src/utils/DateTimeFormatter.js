import moment from "moment";

const _isValidData = data => data !== null || data !== undefined || data !== "";

/**
 * Reuasable function takes date-time string at UTC format and using moment 
 * it converts to ASIA/Kolkata local time zone.
 * @param {*dateString} mandatory date-time UTC format
 * @returns fromatted Date-Time DD-MMM-YYYY | hh:mm:ss A
 */
export const getFormattedDateTime = (dateTimeInUTC) => {
    if (!_isValidData(dateTimeInUTC)) return '';
    return moment
        .utc(dateTimeInUTC)
        .local()
        .format('DD-MMM-YYYY | hh:mm:ss A');
}

/**
 * Compares from the available date strings and return the recent date.
 * Comparison is based on UNIX Date and time. 
 * @param {*Array} array 
 * @returns String
 */
export const getMaxUnixTime = (array) => {
    let maxTime = array[0];
    for (let i = 0; i < array.length; i++) {
        if (convertToUnixDateFormat(array[i]) > convertToUnixDateFormat(maxTime)) {
            maxTime = array[i];
        }
    }
    return convertToUnixDateFormat(maxTime);
}

/**
 * This function converts dateString to converted Unix value data
 * @param {*dateString} dateString as String
 * @returns Unix Converted data
 */
export const convertToUnixDateFormat = dateString => {
    if (dateString === 'currentDateTime') return Date.parse(new Date()) / 1000;
    return Date.parse(dateString) / 1000;
}
