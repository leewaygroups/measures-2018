import React from 'react';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const articleStyle = {
            paddingBottom: "10px",
            borderBottom: "2px solid #17A2B8",
        };
        return (
            <div className="card hoverable bg-light text-dark my-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 my-auto text-center">
                            <img src="img/nature.jpg"/>
                        </div>
                        <div className="col-md-9 card-content-border my-auto">
                            <h4 style={articleStyle}><a href="#" onClick={this.props.action}>{this.props.article.title}</a></h4>
                            <p className="font-14">{this.props.article.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}