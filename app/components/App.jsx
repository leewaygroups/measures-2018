import React from 'react';
import ArticleContainer from './Articles/ArticleContainer.jsx';
import FileLoader from './Common/FileLoader.jsx';
import CustomTable from './Common/CustomTable.jsx';
import DataProvider from '../dataprovider/provider.js';
import Static_data_set from '../database/staticset.js';
import DataProcessor from '../dataprovider/processor.js';
import CanvasContainer from './Canvas/CanvasContainer.jsx';
import SearchForm from './Common/SearchForm.jsx';
import * as FileSaver from 'file-saver';

let dataProvider = new DataProvider();
let dataProcessor = new DataProcessor();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUploadedFiles = this.handleUploadedFiles.bind(this);
        this.searchForTree = this.searchForTree.bind(this);
        this.buildSelectionOptions = this.buildSelectionOptions.bind(this);
        this.downloadJSONData = this.downloadJSONData.bind(this);

        this.state = {
            dataFilesMetaData: [],
            selectionOptions: {
                countries: [],
                responses: [],
                years: []
            }
        };
    }

    handleUploadedFiles = (files) => {
        let self = this;
        dataProcessor.process(files, Static_data_set, [dataProvider.saveTrees, ((res) => {
            return (res) =>{
                let dataFilesMetaData = this.state.dataFilesMetaData;
                dataFilesMetaData.push(res);
                this.setState({
                    dataFilesMetaData
                });
                dataProvider.getAllTrees()
                    .then((response)=>{
                        response.json().then((jsonRes)=>{
                            self.setState({
                                dataFilesMetaData : jsonRes
                            })
                        })
                    });
            };
        })]);
    }

    removeTableRecord = (recordId) => {
        let self = this;
        dataProvider.removeTree(recordId)
            .then((response) => {
                dataProvider.getAllTrees()
                    .then((response) => {
                        response.json()
                            .then((jsonRes)=>{
                                this.setState({
                                    dataFilesMetaData : jsonRes
                                });
                            })
                    }).catch(function(ex) {
                    console.log('failed to get data from db after delete');
                });

            })
            .catch(function(ex) {
                console.log('failed to delete');
            });
    }

    searchForTree = (searchTermObject) => {
        let self = this
        /*
         TODOs:
         1. Use the searchTermObject to get the matching tree in db.
         2. Set state targetTrees to the tree retrieved from db.
         3. Pass targetTree state as props to Canvas container.
         */

        dataProvider.getTreesByProps(searchTermObject)
            .then((response) => {
                response.json().then((res) =>{
                    this.setState({
                        treeInView: res
                    });

                    //setTimeout(() => {console.log(self.state)}, 3000)
                });
            });
    }

    handleClick = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()).then( (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    buildSelectionOptions = (options_obj) => {
        let countrySet = new Set();
        let responseSet = []; //new Set();
        let yearSet = new Set();

        if (options_obj['indicator']){
            responseSet = options_obj['indicator'];
        }

        /*
        for (let index = 0; index < allTrees.length; index++) {
            countrySet.add(allTrees[index].countryCode);
            responseSet.add(allTrees[index].response);
            yearSet.add(allTrees[index].year)         
        }
        */

        return {
            countries: Array.from(countrySet),
            responses: responseSet,
            years: Array.from(yearSet)
        };
    }

    downloadJSONData = (jsonData) => {

        let file = new Blob([JSON.stringify(jsonData)], { 
            type: 'application/json' 
        });

        FileSaver.saveAs(file, 'data.json');
    }

    componentDidMount(){
        let self = this;
        dataProvider.getAllTrees()
            .then((response) => {
                response.json().then((res)=>{

                    dataProvider.getAllIndicators()
                        .then((inner_response) =>{
                            inner_response.json().then((indicator) => {
                                
                                console.log('Metadata: ', res);

                                this.setState({
                                    dataFilesMetaData : res,
                                    selectionOptions: this.buildSelectionOptions({'indicator' : indicator})
                                });
                                
                            }) 
                        }).catch((err) =>{
                            console.log('failed to get responses from db');
                        })
                })
            }).catch((ex) => {
            console.log('failed to get data from db');
        });
    }

    render() {
        return (
            <div className="container ">
                <div className="container-fluid">
                    <ul className="nav nav-tabs tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#publications">Publications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#inequality">Inequality-Measures</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#admin">Admin</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="publications" className="container tab-pane active">
                            <h4 className="mb-3 text-secondary mt-4">Published Articles Discussing Inequality</h4>
                            <ArticleContainer />
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabindex="-1">Previous</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div id="inequality" className="container tab-pane">
                            <h4 className="mb-3 text-secondary mt-4">Inequalities Visualised</h4>
                            <SearchForm selectionOptions={this.state.selectionOptions} search={this.searchForTree} />
                            <CanvasContainer targetTree={this.state.treeInView}/>
                        </div>
                        <div id="admin" className="container tab-pane">
                            <h4 className="mb-3 text-secondary mt-4">Manage Data Files</h4>
                                <div className="card border-0 ">
                                    <div className="card-body">
                                        <FileLoader uploadHandler={this.handleUploadedFiles} />
                                        {
                                            !this.state || !this.state.dataFilesMetaData ?
                                            <div>
                                                <p>No file uploaded yet. Please contact the system admin if you believe files have been uploaded</p>
                                            </div>
                                                :
                                            <CustomTable
                                                tableHeader = { [{ title: 'Country'}, { title: 'Response'}, { title: 'Year'}, { title: 'Last updated'} ] }
                                                tableData = { this.state.dataFilesMetaData }
                                                removeTableRecord = { this.removeTableRecord}
                                                download= {this.downloadJSONData}
                                            />
                                        }
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}