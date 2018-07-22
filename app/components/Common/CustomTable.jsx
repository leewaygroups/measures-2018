import React from 'react';
import FaBeer from 'react-icons/lib/fa/beer';
import IoTrashA from 'react-icons/lib/io/trash-a';
import IoEye from 'react-icons/lib/io/eye.js';
import CustomModal from './CustomModal_v2.jsx';

export default class CustomTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            view: {showModal: false},
            modelData: "",
        }
    }
 
    parseDate(dateObj){
        return "".concat(dateObj.getUTCFullYear(), '-', dateObj.getUTCMonth(), '-', dateObj.getUTCDate().toString());
    }

    handleHideModal = () => {
         this.setState({view: {showModal: false}});
    }
        
    handleShowModal = () => {
        this.setState({
            view: {showModal: true}
        });
    }

    viewTableRecord = (recordId) => {
        let recordOfInterest = null;

        for (let index = 0; index < this.props.tableData.length; index++) {
            if( this.props.tableData[index]._id.$oid === recordId ){
                recordOfInterest = this.props.tableData[index]
                break;
            }         
        }

        if(recordOfInterest){
            this.setState({
                modelData: recordOfInterest}
            );
            this.handleShowModal();
        }
    }

    render() {
        const tableSyle = {
            marginTop: '5%'
        };
        return (
            <div style={tableSyle}>
                <h4 className="mb-3 text-secondary mt-4">All data files</h4>
                <table id="mytable" className="table table-hover table-striped">
                    <thead>
                        <th className="border-right">No.</th>
                        {
                            this.props.tableHeader.map(header => (
                                <th className="border-right" key={header.title}>{header.title}</th>
                            ))
                        }
                        <th className="border-right">Action</th>
                    </thead>
                    <tbody>
                        {
                            this.props.tableData.map((fileItem, dataIndex) => (
                                <tr key={fileItem._id.$oid}>
                                    <td>{ dataIndex + 1 }</td>
                                    <td>{ fileItem.countryCode }</td>
                                    <td>{ fileItem.response }</td>
                                    <td>{ fileItem.year }</td>
                                    <td>{ this.parseDate(new Date(fileItem.lastupdated[fileItem.lastupdated.length - 1]))}</td>					
                                    <td>
                                        <a href="#" className="btn rounded" title="Edit" onClick={() => this.viewTableRecord(fileItem._id.$oid)}>
                                            <i className="fas fa-pen"></i>
                                        </a>
                                        <a href="#" className="btn rounded" title="Delete" onClick={this.props.removeTableRecord.bind(this, fileItem._id.$oid)}>
                                            <i className="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                {
                    this.state.view.showModal 
                    ? 
                    <CustomModal 
                        handleHideModal={this.handleHideModal} 
                        modelData={this.state.modelData}
                        download = {this.props.download}/> 
                    : 
                    null
                }
            </div>
        )
    }
}