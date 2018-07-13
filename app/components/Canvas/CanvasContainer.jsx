import React from 'react';
import TreeChart from '../Chart/TreeChart.jsx';

const searchSyle = {
    margin : '20px',
    paddingRight: '15px',
    paddingLeft: '15px',
    paddingTop: '1rem'
};

export default class CanvasContainer extends React.Component {
    // this.props.targetTree[0].response
    render(){
        return (
            <div className="container border" style={searchSyle} >
                {
                    this.props.targetTree ?
                    <div>
                        <TreeChart targetTree={ this.props.targetTree[0] }/>               
                    </div>
                    :
                    <div  className="alert alert-info">
                        <p> Search for a specific <b>Response</b> and the <b>classification tree</b> will be displayed to you here. </p> 
                    </div>
                }
            </div>            
        );
    }
}