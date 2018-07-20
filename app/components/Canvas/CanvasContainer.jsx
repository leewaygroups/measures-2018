import React from 'react';
import TreeChart from '../Chart/TreeChart.jsx';

const searchSyle = {
    marginTop : '20px',
    paddingRight: '15px',
    paddingLeft: '15px',
    paddingTop: '1rem'
};

export default class CanvasContainer extends React.Component {
    // this.props.targetTree[0].response
    render(){
        return (
            <div className="container border mb-4" style={searchSyle} >
                {
                    this.props.targetTree ?
                    <div style={{height: "500px", width: "100%"}}>
                        <TreeChart targetTree={ this.props.targetTree[0] }/>               
                    </div>
                    :
                    <div className="card mt-2 border-0 font-14">
                        <div className="col-12 text-center py-2">
                        <span>
                            Search for a specific <span className="font-weight-bold">Response</span> and the <span
                            className="font-weight-bold">classification tree</span> will be displayed to you here.
                        </span>
                        </div>
                    </div>
                }
            </div>            
        );
    }
}