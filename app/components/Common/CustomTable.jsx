import React from 'react';
import FaBeer from 'react-icons/lib/fa/beer';
import IoTrashA from 'react-icons/lib/io/trash-a';
import IoEye from 'react-icons/lib/io/eye.js';
import CustomModal from './CustomModal_v2.jsx';

export default class CustomTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            view: {showModal: false}
        }
    }
 
    parseDate(dateObj){
        return "".concat(dateObj.getUTCFullYear(), '-', dateObj.getUTCMonth(), '-', dateObj.getUTCDate().toString());
    }

    handleHideModal(){
        // this.setState({view: {showModal: false}});
    }
        
    handleShowModal(){
        this.setState({
            view: {showModal: true}
        });
    }

    viewTableRecord(recordId){
        console.info(recordId);
        let recordOfInterest = null;

        for (let index = 0; index < this.props.tableData.length; index++) {
            if( this.props.tableData[index]._id.$oid === recordId ){
                recordOfInterest = this.props.tableData[index]
                break;
            }         
        }

        console.log('REC INT: ', recordOfInterest);
        if(recordOfInterest){
            console.log(this);
            this.handleShowModal();
        }
    }

    render() {
        const tableSyle = {
            marginTop: '5%'
        };
        
        return (
            <div style={tableSyle}>
                <p>All data files.</p>
                <table id="mytable" class="table table-bordred table-striped">
                    <thead>
                        <th className="station">No.</th>
                        {
                            this.props.tableHeader.map(header => (
                                <th className="station" key={header.title}>{header.title}</th>
                            ))
                        }
                        <th>Edit</th>
                        <th>Delete</th>
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
                                        <p data-placement="top" data-toggle="tooltip" title="Edit">
                                            <button class="btn btn-primary btn-xs" data-title="Edit" onClick={() => this.viewTableRecord(fileItem._id.$oid)}>
                                                <span class="glyphicon glyphicon-pencil"><IoEye /></span>
                                            </button>
                                        </p>
                                    </td>
                                    <td>
                                        <p data-placement="top" data-toggle="tooltip" title="Delete">
                                            <button class="btn btn-danger btn-xs" data-title="Delete" onClick={this.props.removeTableRecord.bind(this, fileItem._id.$oid)}>
                                                <span class="glyphicon glyphicon-trash"><IoTrashA /></span>
                                            </button>
                                        </p>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                {this.state.view.showModal ? <CustomModal handleHideModal={this.handleHideModal}/> : null}
            </div>
        )
    }
}