import React from 'react';


export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>                          
                <div className={this.props.stylename} id="callout-dropdown-positioning">
                    <a href="#" onClick={this.props.action}>
                        <h4>{this.props.article.title}</h4>
                    </a>                    
                    <p>{this.props.article.description}</p>
                </div>
            </div>
        );
    }
}