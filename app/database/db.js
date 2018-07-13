
import { Promise as PolyfillPromise } from 'promise-polyfill';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
   
if(!Promise){
    window.Promise = PolyfillPromise;
}

if(!fetch){
    window.fetch = fetchPolyfill;
}

let baseUri = 'https://api.mlab.com/api/1';
let apiKey = '5b0DEhyEGkQeINP0VTc_SKnzH34BeO6h';

export default class Database {
    constructor(){
        this.apiKey = '5b0DEhyEGkQeINP0VTc_SKnzH34BeO6h';
        this.baseUri = 'https://api.mlab.com/api/1/databases/sdd/collections/sddtest';
    }

    getAllTrees(){
        // gets all trees in db
        let url = this.baseUri + '?apiKey=' + apiKey ;

        return fetch(url)
    }

    getTreesByProps(searchTermObject){
        // get all trees that matches the supplied params.
        let query = {};

        if(searchTermObject.countryCode){ query['countryCode'] = searchTermObject.countryCode }
        if(searchTermObject.response){ query['response'] = searchTermObject.response }
        if(searchTermObject.year){ query['year'] = searchTermObject.year }
        if(searchTermObject.lastupdated){ query['lastupdated'] = searchTermObject.lastupdated }
       
        let url = this.baseUri + '?q=' + JSON.stringify(query) + '&apiKey=' + apiKey;

        return fetch(url);
    }

    saveTree(treeObj){
        let url = this.baseUri + '?apiKey=' + apiKey ;


        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(treeObj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }

    deleteTreeById(recordId){
        let url = this.baseUri + '/' + recordId + '?apiKey=' + apiKey;

        return fetch(url, {
            method: 'DELETE'
        });
    }
}