import React from 'react';

const searchSyle = {
    margin : '20px',
    paddingRight: '15px',
    paddingLeft: '15px',
    paddingTop: '1rem'
};

export default class SearchForm extends React.Component {

     constructor(props, context) {
        super(props, context);
        this.state = {
            searchTerms: {
                countryCode: null,
                year: null,
                response: null
            }
        }

        this.change = this.change.bind(this);
    }

    handleSearch(){
        if(this.state.searchTerms.countryCode && this.state.searchTerms.response){
             this.props.search(this.state.searchTerms);
        }
    }

    change(event){
        window.testEvent = event.target;
        
        switch (event.target.id) {
            case 'inputCountryCode':
                this.setState({
                    searchTerms: {
                        countryCode: event.target.value,
                        year: this.state.searchTerms.year,
                        response: this.state.searchTerms.response
                    }
                });
                break;

            case 'inputResponse':
                this.setState({
                    searchTerms: {
                        countryCode: this.state.searchTerms.countryCode,
                        year: this.state.searchTerms.year,
                        response: event.target.value
                    }
                });
                break;

                case 'inputYear':
                    this.setState({
                        searchTerms: {
                            countryCode: this.state.searchTerms.countryCode,
                            year: event.target.value,
                            response: this.state.searchTerms.response
                        }
                    });
                    break;

            default:
        }
    }

    render(){
        return (
            <div className="card mt-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="form-group m-0 p-1">
                                <select className="form-control" id="inputResponse" onChange={this.change} value={this.state.searchTerms.response}>
                                    <option>Choose Response...</option>
                                    {
                                        this.props.selectionOptions.responses.map((optionItem, key) => (                                           
                                            <option key={key} value={optionItem.name} > {optionItem.value} </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="form-group m-0 p-1">
                                <select className="form-control" id="inputCountryCode" onChange={this.change} value={this.state.searchTerms.countryCode}>
                                    <option>Choose Country...</option>
                                    { 
                                        this.props.selectionOptions.countries.map(optionItem => (
                                            <option> {optionItem} </option>
                                        ))
                                    }                                    
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="form-group m-0 p-1">
                                <select className="form-control" id="inputYear" onChange={this.change} value={this.state.searchTerms.year}>
                                    <option>Choose Year...</option>
                                    {
                                        this.props.selectionOptions.years.map(optionItem => (
                                            <option> {optionItem} </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="form-group m-0 p-1">
                                <button className="btn btn-info w-100" onClick={this.handleSearch.bind(this)}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}