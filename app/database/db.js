
import { Promise as PolyfillPromise } from 'promise-polyfill';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import Static_data_set from './staticset.js';


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
        var survay_years = Static_data_set.survay_years;
        var indicator_names = Static_data_set.indicator_names;

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