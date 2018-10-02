import React from 'react';
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view'

export default class CustomModal extends React.Component {

    componentDidMount(){
        const modalDOM = ReactDOM.findDOMNode(this)

        let JQuerymodalDOM = $(modalDOM)

        JQuerymodalDOM.focus();
        JQuerymodalDOM.modal('show');
        JQuerymodalDOM.on('hidden.bs.modal', this.props.handleHideModal);


    }

    render(){

        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header"> 
                            <h4 className="modal-title">
                                 { this.props.modelData.countryCode + this.props.modelData.year + this.props.modelData.response} 
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body no-scroll">
                            <ReactJson 
                                src={this.props.modelData}
                                theme="rjv-default"
                                collapsed="1"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" 
                                data-dismiss="modal" 
                                onClick={this.props.download.bind(this, this.props.modelData)}>
                                Download
                            </button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}