import React from 'react';
import ReactDOM from 'react-dom';

export default class AdminModel extends React.Component {

    componentDidMount(){
        const modalDOM = ReactDOM.findDOMNode(this);

        $(modalDOM).modal('show');
        $(modalDOM).on('hidden.bs.modal', this.props.handleHideModal);

    }

    onLoginClick = () => {
        const {onLoginClick} = this.props;
       let userName = document.getElementById("userId").value;
       let password = document.getElementById("password").value;
       onLoginClick(userName, password);
    };

    render(){
        const {onCloseClick} = this.props;
        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header"> 
                            <h4 className="modal-title">Admin Login</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="usr">UserName:</label>
                                <input type="text" className="form-control" id="userId"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" id="password"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onCloseClick}>Close</button>
                            <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.onLoginClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}