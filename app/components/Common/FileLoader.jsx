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
        const files = [];
        files.push(inputFile.files[0]);
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
                    <input type="file" className="form-control-file font-weight-bold" id="inputFile"
                           onChange={this.onDrop.bind(this)}
                           data-title="Try dropping structured text files here, or click to select files to upload.">
                    </input>
                </div>
                {
                    this.state.files.length > 0 ?
                        <div className="mx-auto p-3">
                            <h5 className="text-center">Dropped files</h5>
                            <ul className="text-center">
                                {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                            <a className="btn btn-info btn-lg grey-text" href="#" role="button"
                                onClick={this.handlefileUpload.bind(this)}>Click to process and upload</a>
                        </div>
                        :
                        null
                }
        </div>
        );
    }
}