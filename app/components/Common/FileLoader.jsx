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

    onDrop(files) {
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
        <section>
            <div className="dropzone">
            <Dropzone
                accept="text/plain"
                onDrop={this.onDrop.bind(this)}
                style={dropzoneStyle}>
                <p>Try dropping structured text files here, or click to select files to upload.</p>
            </Dropzone>
            </div>
            <aside>
            {
                this.state.files.length > 0 ?            
                    <div>
                        <h5>Dropped files</h5>
                        <ul>
                            {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                        <a className="btn btn-primary btn-lg" href="#" role="button" 
                            onClick={this.handlefileUpload.bind(this)}>Click to process and upload</a>
                    </div>
                    :
                    null  
            }          
            </aside>
        </section>
        );
    }
}