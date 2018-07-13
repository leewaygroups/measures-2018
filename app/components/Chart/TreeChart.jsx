import React from 'react';
// /import * as d3 from "d3";


export default class TreeChart extends React.Component {
     constructor(props, context) {
        super(props, context);
    }

    
    componentDidMount(){ 
    }


    render(){
        
        return (
            <div ref="treeContainer">
                <h4> { this.props.targetTree.response } </h4>
            </div>            
        );
    }
}