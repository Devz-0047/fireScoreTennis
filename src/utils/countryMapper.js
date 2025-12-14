export const phoneToIso = {
    381: 'rs', // Serbia
    34: 'es',  // Spain
    7: 'ru',   // Russia
    39: 'it',  // Italy
    49: 'de',  // Germany
    30: 'gr',  // Greece
    45: 'dk',  // Denmark
    47: 'no',  // Norway
    1: 'us',   // USA / Canada
    61: 'au',  // Australia
    48: 'pl',  // Poland
    359: 'bg', // Bulgaria
    33: 'fr',  // France
    44: 'gb',  // United Kingdom
    41: 'ch',  // Switzerland
    54: 'ar',  // Argentina
    55: 'br',  // Brazil
    86: 'cn',  // China
    81: 'jp',  // Japan
    82: 'kr',  // South Korea
    91: 'in',  // India
    420: 'cz', // Czech Republic
    385: 'hr', // Croatia
    31: 'nl',  // Netherlands
    32: 'be',  // Belgium
    43: 'at',  // Austria
    46: 'se',  // Sweden
    351: 'pt', // Portugal
    36: 'hu',  // Hungary
    421: 'sk', // Slovakia
    386: 'si', // Slovenia
    358: 'fi', // Finland
    56: 'cl',  // Chile
    52: 'mx',  // Mexico
    57: 'co',  // Colombia
    27: 'za',  // South Africa
    20: 'eg',  // Egypt
    216: 'tn', // Tunisia
    90: 'tr',  // Turkey
    972: 'il', // Israel
    380: 'ua', // Ukraine
    40: 'ro',  // Romania
    375: 'by', // Belarus
    371: 'lv', // Latvia
    372: 'ee', // Estonia
    370: 'lt', // Lithuania
    77: 'kz',  // Kazakhstan

};

export const getCountryCode = (phoneCode) => {
    return phoneToIso[phoneCode] || 'us'; // Fallback
};
