import React from 'react';
import ReactDOM from 'react-dom';

export default class CustomModal extends React.Component {

    componentDidMount(){
        const modalDOM = ReactDOM.findDOMNode(this)

        $(modalDOM).modal('show');
        $(modalDOM).on('hidden.bs.modal', this.props.handleHideModal);

        console.log('modal end');
    }

    render(){
        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header"> 
                            <h4 className="modal-title">Response title goes here</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <p> Response tree structure in JSON goes here </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}