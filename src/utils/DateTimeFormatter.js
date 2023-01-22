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