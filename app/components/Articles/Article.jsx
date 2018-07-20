import React from 'react';


export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="card hoverable bg-light text-dark my-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 my-auto text-center">
                            <a href="#" onClick={this.props.action}>{this.props.article.title}</a>
                        </div>
                        <div className="col-md-9 card-content-border my-auto">
                            <span className="font-14">{this.props.article.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}