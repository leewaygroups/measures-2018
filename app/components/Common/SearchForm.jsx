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
            <div className="container border" style={searchSyle}>
                <form> 
                    <div class="form-row">                
                        <div className="form-group col-md-3">                            
                            <select id="inputCountryCode" className="form-control" onChange={this.change} value={this.state.searchTerms.countryCode}>
                                <option>Choose Country...</option>
                                <option>AM</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3">                           
                            <select id="inputResponse" className="form-control" onChange={this.change} value={this.state.searchTerms.response}>
                                <option selected>Choose Response...</option>
                                <option>ChildHealth</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3">
                            <select id="inputYear" className="form-control" onChange={this.change} value={this.state.searchTerms.year}>
                                <option selected>Choose Year...</option>
                                <option>2018</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3"> 
                           <button type="button" className=" form-control btn btn-primary" onClick={this.handleSearch.bind(this)}>Search</button>
                        </div>

                    </div>
                </form>         
            </div>
        );
    }
}