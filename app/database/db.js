
import { Promise as PolyfillPromise } from 'promise-polyfill';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

if (!Promise) {
    window.Promise = PolyfillPromise;
}

if (!fetch) {
    window.fetch = fetchPolyfill;
}

let baseUri = 'https://api.mlab.com/api/1';
let apiKey = '5b0DEhyEGkQeINP0VTc_SKnzH34BeO6h';

export default class Database {
    constructor() {
        this.apiKey = '5b0DEhyEGkQeINP0VTc_SKnzH34BeO6h';
        this.baseUri = 'https://api.mlab.com/api/1/databases/sdd/collections/sddtest';
        this.indicatorsUri = 'https://api.mlab.com/api/1/databases/sdd/collections/indicator_names';

        this.seed()
    }

    seed() {
        var survay_years = [
            {
                code: 'AF70',
                un_country_name: 'Afghanistan',
                year: 2015,
                year_rang: {
                    start: 2015,
                    end: 2015
                }
            },
            {
                code: 'AM42',
                un_country_name: 'Armenia',
                year: 2000,
                year_rang: {
                    start: 2000,
                    end: 2000
                }
            },
            {
                code: 'AM61',
                un_country_name: 'Armenia',
                year: 2010,
                year_rang: {
                    start: 2010,
                    end: 2010
                }
            },
            {
                code: 'AM61',
                un_country_name: 'Armenia',
                year: 2010,
                year_rang: {
                    start: 2010,
                    end: 2010
                }
            },
            {
                code: 'AM71',
                un_country_name: 'Armenia',
                year: 2015,
                year_rang: {
                    start: 2015,
                    end: 2016
                }
            },
            {
                code: 'BD41',
                un_country_name: 'Bangladesh',
                year: 1999,
                year_rang: {
                    start: 1999,
                    end: 2000
                }
            },
            {
                code: 'BD70',
                un_country_name: 'Bangladesh',
                year: 2014,
                year_rang: {
                    start: 2014,
                    end: 2014
                }
            },
            {
                code: 'IA52',
                un_country_name: 'India',
                year: 2005,
                year_rang: {
                    start: 2005,
                    end: 2006
                }
            },
            {
                code: 'IA71',
                un_country_name: 'India',
                year: 2015,
                year_rang: {
                    start: 2015,
                    end: 2016
                }
            },
            {
                code: 'ID42',
                un_country_name: 'Indonesia',
                year: 2002,
                year_rang: {
                    start: 2002,
                    end: 2003
                }
            },
            {
                code: 'ID63',
                un_country_name: 'Indonesia',
                year: 2012,
                year_rang: {
                    start: 2012,
                    end: 2012
                }
            },
            {
                code: 'KH42',
                un_country_name: 'Cambodia',
                year: 2000,
                year_rang: {
                    start: 2000,
                    end: 2000
                }
            },
            {
                code: 'KH72',
                un_country_name: 'Cambodia',
                year: 2014,
                year_rang: {
                    start: 2014,
                    end: 2014
                }
            },
            {
                code: 'KY31',
                un_country_name: 'Kyrgyzstan',
                year: 1997,
                year_rang: {
                    start: 1997,
                    end: 1997
                }
            },
            {
                code: 'KY61',
                un_country_name: 'Kyrgyzstan',
                year: 2012,
                year_rang: {
                    start: 2012,
                    end: 2012
                }
            },
            {
                code: 'MM71',
                un_country_name: 'Myanmar',
                year: 2015,
                year_rang: {
                    start: 2015,
                    end: 2016
                }
            },
            {
                code: 'MV51',
                un_country_name: 'Maldives',
                year: 2009,
                year_rang: {
                    start: 2009,
                    end: 2009
                }
            },
            {
                code: 'NP7H',
                un_country_name: 'Nepal',
                year: 2016,
                year_rang: {
                    start: 2016,
                    end: 2016
                }
            },
            {
                code: 'PH3B',
                un_country_name: 'Philippines',
                year: 1998,
                year_rang: {
                    start: 1998,
                    end: 1998
                }
            },
            {
                code: 'PH61',
                un_country_name: 'Philippines',
                year: 2013,
                year_rang: {
                    start: 2013,
                    end: 2013
                }
            },
            {
                code: 'PH62',
                un_country_name: 'Philippines',
                year: 2013,
                year_rang: {
                    start: 2013,
                    end: 2013
                }
            },
            {
                code: 'PK21',
                un_country_name: 'Pakistan',
                year: 1990,
                year_rang: {
                    start: 1990,
                    end: 1991
                }
            },
            {
                code: 'PK61',
                un_country_name: 'Pakistan',
                year: 2012,
                year_rang: {
                    start: 2012,
                    end: 2013
                }
            },
            {
                code: 'TJ61',
                un_country_name: 'Tajikistan',
                year: 2012,
                year_rang: {
                    start: 2012,
                    end: 2012
                }
            },
            {
                code: 'TL61',
                un_country_name: 'Timor-Leste',
                year: 2009,
                year_rang: {
                    start: 2009,
                    end: 2010
                }
            },
            {
                code: 'TL71',
                un_country_name: 'Timor-Leste',
                year: 2016,
                year_rang: {
                    start: 2016,
                    end: 2016
                }
            }
        ]

        var indicator_names = [
            {name: 'SecondaryEducation2035', value :	'Secondary education attainment (25-35 year olds)'},
            {name: 'SecondaryEducation35+',  value :	'Secondary education attainment (35+ year olds)'},
            {name: 'HigherEducation2535',    value :	'Higher education attainment (25-35 year olds)'},
            {name: 'HigherEducation35+' ,    value :	'Higher education attainment (35+ year olds)'},
            {name: 'Overweight',             value :	'Overweight (children aged 0-5)'},
            {name: 'Stunting',               value : 	'Stunting (children aged 0-5)'},
            {name: 'Wasting',                value:	    'Wasting (children aged 0-5)'},
            {name: 'ProfessionalHelp',       value :	'Professional help during childbirth'},
            {name: 'Contraceptive Method',   value :	'Modern contraception'},
            {name: 'SafeSanitation',         value :	'Basic sanitation'},
            {name: 'AccessElectricity',      value :	'Electricity access'},
            {name: 'CleanFuel',              value :	'Clean fuels'},
            {name: 'CleanWater',             value :	'Clean water'},
            {name: 'BankCard',               value :	'Bank account (owned by household)'},
            {name: 'Land',                   value :	'Land (owned by household)'} 
        ]

        let url = 'https://api.mlab.com/api/1/databases/sdd/collections?apiKey=' + this.apiKey;
        let survey_year_uri = baseUri + '/databases/sdd/collections/survay_years?apiKey=' + this.apiKey;
        let indicators_uri =  baseUri + '/databases/sdd/collections/indicator_names?apiKey=' + this.apiKey;

        fetch(url).then((response)=>{
            response.json().then((collections_arr)=>{
              if (collections_arr.indexOf('survay_years') === -1){
                    fetch(survey_year_uri, {
                        method: 'POST',
                        body: JSON.stringify(survay_years),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
               }

               if (collections_arr.indexOf('indicator_names') === -1){
                    fetch(indicators_uri, {
                        method: 'POST',
                        body: JSON.stringify(indicator_names),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
            })
        });

    }

    getAllIndicators(){
        let url = this.indicatorsUri + '?apiKey=' + apiKey;
        return fetch(url);
    }
    
    getAllTrees() {
        // gets all trees in db
        let url = this.baseUri + '?apiKey=' + apiKey;

        return fetch(url)
    }

    getTreesByProps(searchTermObject) {
        // get all trees that matches the supplied params.
        let query = {};

        if (searchTermObject.countryCode) { query['countryCode'] = searchTermObject.countryCode }
        if (searchTermObject.response) { query['response'] = searchTermObject.response }
        if (searchTermObject.year) { query['year'] = searchTermObject.year }
        if (searchTermObject.lastupdated) { query['lastupdated'] = searchTermObject.lastupdated }

        let url = this.baseUri + '?q=' + JSON.stringify(query) + '&apiKey=' + apiKey;

        return fetch(url);
    }

    saveTree(treeObj) {
        let url = this.baseUri + '?apiKey=' + apiKey;


        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(treeObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteTreeById(recordId) {
        let url = this.baseUri + '/' + recordId + '?apiKey=' + apiKey;

        return fetch(url, {
            method: 'DELETE'
        });
    }
}