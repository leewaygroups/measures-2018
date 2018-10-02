import React from 'react';

const searchSyle = {
    margin : '20px',
    paddingRight: '15px',
    paddingLeft: '15px',
    paddingTop: '1rem'
};

const disabledbutton = {
    pointerEvents: "none",
    opacity: "0.4",
}

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
        const {onChangeResponse, onChangeCountry} = this.props;

        switch (event.target.id) {
            case 'inputCountryCode':
                onChangeCountry(this.state.searchTerms.response, event.target.value);
                this.setState({
                    searchTerms: {
                        countryCode: event.target.value,
                        year: null,
                        response: this.state.searchTerms.response
                    }
                });
                break;

            case 'inputResponse':
                onChangeResponse(event.target.value);
                this.setState({
                    searchTerms: {
                        countryCode: "Choose Country",
                        year: null,
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
                        <div className="col-md-3 col-sm-6 my-auto" style={!this.state.searchTerms.response ? disabledbutton : null }>
                            <div className="form-group m-0 p-1">
                                <select className="form-control" id="inputCountryCode" onChange={this.change} value={this.state.searchTerms.countryCode}>
                                    <option value="Choose Country">Choose Country...</option>
                                    {
                                        this.props.selectionOptions.countries.map((optionItem, key) => (
                                            <option key={key} value={optionItem.name} > {optionItem.value} </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto" style={(!this.state.searchTerms.response
                        || !this.state.searchTerms.countryCode || this.state.searchTerms.countryCode === "Choose Country") ? disabledbutton : null }>
                            <div className="form-group m-0 p-1">
                                <select className="form-control" id="inputYear" onChange={this.change} value={this.state.searchTerms.year}>
                                    <option>Choose Year...</option>
                                    {
                                        this.props.selectionOptions.years.map((optionItem, key) => (
                                            <option key={key} value={optionItem.name} > {optionItem.value} </option>
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