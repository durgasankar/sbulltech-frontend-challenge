const _valueFormatter = input => input < 10 ? `0${input}` : input;

const _ampmHourCalculator = hour => Number(hour) <= 12 ? hour : _valueFormatter(Number(hour) - 12);

const _isValidData = data => data !== null || data !== undefined || data !== "";

/**
 * Reuasable function takes date-time string as params and return formatted Date and time in 
 * If human readable then the format is(DD/MMM/YYYY | hh:mm:ss am/pm) format
 * @param {*dateString} mandatory date-time string format
 * @returns fromatted Date-Time(DD/MMM/YYYY | hh:mm:ss)
 */
export const getFormattedDateTime = (dateTime) => {
    if (!_isValidData(dateTime)) return '';
    const dateObject = new Date(dateTime);
    const day = dateObject.toLocaleString("en-US", { day: "2-digit" }) // 9
    const monthName = dateObject.toLocaleString("en-US", { month: "short" }) // Jan
    const year = dateObject.toLocaleString("en-US", { year: "numeric" }) // 2019
    const hour = dateObject.toLocaleString("en-US", { hour: "2-digit", hour12: false }) // 10 
    const minute = dateObject.toLocaleString("en-US", { minute: "2-digit", hour12: true }) // 30
    const second = dateObject.toLocaleString("en-US", { second: "2-digit" }) // 30
    return `${day}-${monthName}-${year} | ${_ampmHourCalculator(hour)}:${_valueFormatter(minute)}:${_valueFormatter(second)} ${hour < 12 || hour === 24 || hour === '24' ? 'am' : 'pm'}`;
}