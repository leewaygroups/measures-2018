import React from 'react';
import Dropzone from 'react-dropzone';

const dropzoneStyle = {
    width  : "80%",
    height : "150px",
    borderRadius: "5px",
    border: "2px dashed rgb(0, 135, 247)",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2%"
};

export default class FileLoader extends React.Component {
    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(file) {
        const files = this.state.files;
        if (inputFile && inputFile.files && inputFile.files.length > 0) {
            _.forEach(inputFile.files, (file) => {
                files.push(file);
            });
        }
        this.setState({
            files: files
        });
    }

    handlefileUpload(){
        this.props.uploadHandler(this.state.files)
        this.setState({
            files: []
        });
    }

    removeFile(file, index){
        let files = this.state.files;
        files.splice(index, 1);
        this.setState({files});
    };

    componentWillUpdate(nextProps, nextState) {
        if(nextState.files && (this.state !== nextState)){  
            //console.log('will call handle uploader')          
            //this.props.uploadHandler(nextState.files)
        }        
    }

    render() {
        return (
            <div className="row">
                <div className="form-group inputDnD w-100">
                    <label className="sr-only" for="inputFile">File Upload</label>
                    <input type="file" className="form-control-file font-weight-bold" id="inputFile" multiple={true}
                           onChange={this.onDrop.bind(this)}
                           data-title="Try dropping structured text files here, or click to select files to upload.">
                    </input>
                </div>
                {
                    this.state.files.length > 0 ?
                        <div className="w-100">
                            <h5 className="text-center">Dropped files</h5>
                            <div className="table-wrapper-scroll-y">
                            <table id="mytable" className="table table-hover table-striped">
                                <tbody>
                                {
                                    this.state.files.map((f, index) => (
                                        <tr>
                                            <td key={f.name}>{f.name}</td>
                                            <td key={f.size}>{f.size} bytes </td>
                                            <td>
                                                <a href="#" className="btn rounded float-right" title="Delete"
                                                   onClick={this.removeFile.bind(this, index)}>
                                                    <i className="fas fa-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            <a className="btn btn-info btn-lg grey-text mt-3" href="#" role="button"
                               onClick={this.handlefileUpload.bind(this)}>Click to process and upload</a>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}