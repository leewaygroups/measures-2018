import React from 'react';
import ArticleContainer from './Articles/ArticleContainer.jsx';
import FileLoader from './Common/FileLoader.jsx';
import CustomTable from './Common/CustomTable.jsx';
import DataProvider from '../dataprovider/provider.js';
import DataProcessor from '../dataprovider/processor.js';
import CanvasContainer from './Canvas/CanvasContainer.jsx';
import SearchForm from './Common/SearchForm.jsx';

let dataProvider = new DataProvider();
let dataProcessor = new DataProcessor();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUploadedFiles = this.handleUploadedFiles.bind(this);
        this.searchForTree = this.searchForTree.bind(this);
        this.state = {
            dataFilesMetaData: [],
        };
    }

    handleUploadedFiles(files){   
       let self = this;
        dataProcessor.process(files, [dataProvider.saveTrees, (function(){
            return ()=>{                
                dataProvider.getAllTrees()
                .then((response)=>{
                   response.json().then((jsonRes)=>{
                       self.setState({
                           dataFilesMetaData : jsonRes
                       })
                   })
                });
            };
        }())]);
    }

    removeTableRecord(recordId){
        let self = this
        dataProvider.removeTree(recordId)
        .then((response) => {

            dataProvider.getAllTrees()
            .then(function(response) {
                response.json()
                .then((jsonRes)=>{
                    console.log('Self after removal: ', self)
                    console.log('dataset after removal: ', jsonRes)
                    self.setState({
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

    searchForTree(searchTermObject){
         let self = this
        /*
            TODOs:
            1. Use the searchTermObject to get the matching tree in db.
            2. Set state targetTrees to the tree retrieved from db.
            3. Pass targetTree state as props to Canvas container.
        */

        dataProvider.getTreesByProps(searchTermObject)
        .then(function(response){
            response.json().then((res) =>{
                self.setState({
                    treeInView: res
                });

                setTimeout(function(){console.log(self.state)}, 3000)
            });
        });
    }

    handleClick(){
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()).then( (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount(){
        let self = this;
        dataProvider.getAllTrees()
        .then(function(response) {
            response.json().then((res)=>{
                self.setState({
                    dataFilesMetaData : res
                });
            })
        }).catch(function(ex) {
            console.log('failed to get data from db');
        });
    }

    render() {
        return (
            <div className="starter-template">
                <div className="col-md-12">                
                    <ul id="tabsJustified" className="nav nav-tabs">                        
                        <li className="nav-item"><a href="" data-target="#pblications" data-toggle="tab" className="nav-link small text-uppercase active">Publications</a></li>
                        <li className="nav-item"><a href="" data-target="#stats" data-toggle="tab" className="nav-link small text-uppercase">Inequality-Measures</a></li>
                        {/*<li className="nav-item"><a href="" data-target="#quizzes" data-toggle="tab" className="nav-link small text-uppercase">Quizzes</a></li>*/}
                        <li className="nav-item"><a href="" data-target="#admin" data-toggle="tab" className="nav-link small text-uppercase">Admin</a></li>
                    </ul>
                    <br />
                    <div id="tabsJustifiedContent" className="tab-content">
                        <div id="stats" className="tab-pane fade tab-group">
                            <h1 className="header">Inequalities Visualised</h1>
                            <SearchForm search={this.searchForTree} />
                            <CanvasContainer targetTree={this.state.treeInView}/>
                        </div>
                        <div id="pblications" className="tab-pane fade active show tab-group">                       
                                <h1 className="header">Published Articles Discussing Inequality</h1>                            
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
                        <div id="quizzes" className="tab-pane fade tab-group">
                            <h1 className="header">Quizzes On Inequality Topics</h1>
                            <p className="lead">Use this document as a way to quickly start any new project.
                                <br /> All you get is this text and a mostly barebones HTML document.</p>
                            <p className="lead">
                                <a className="btn btn-primary btn-lg" href="#" role="button" onClick={this.handleClick}>Click to test data call</a>
                            </p>
                        </div>
                        <div id="admin" className="tab-pane fade tab-group">
                            <h1 className="header">Manage Data Files</h1>                        
                            <FileLoader uploadHandler={this.handleUploadedFiles} />
                            {
                                !this.state || !this.state.dataFilesMetaData ?
                                <div>
                                    <p>No file uploaded yet. Please contact the system admin if you believe files have been uploaded</p>
                                </div>
                                :
                                <CustomTable 
                                    tableHeader = { [{ title: 'Country code'}, { title: 'Response'}, { title: 'Year'}, { title: 'Last updated'} ] } 
                                    tableData = { this.state.dataFilesMetaData }
                                    removeTableRecord = { this.removeTableRecord}
                                /> 
                            }                    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}