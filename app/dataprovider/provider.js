import Database from '../database/db.js';

let database = new Database();

export default class DataProvider {
    constructor() {
        this.filesMetaData = [
           
        ];
    }

    getFilesMetaData(){
        this.getAllTrees();
        return this.filesMetaData; 
    }

    getAllTrees(){
        return database.getAllTrees();
    }

    getTreesByProps(searchTerms){
        return database.getTreesByProps(searchTerms);
    }

    saveTrees(JSONTree){
        JSONTree.lastupdated.push(new Date());
        return database.saveTree(JSONTree)
    }

    removeTree(recordId){
        return database.deleteTreeById(recordId);
    }
}
