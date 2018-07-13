import React from 'react';
import Article from './Article.jsx';
import CustomModal from '../Common/CustomModal.jsx';



const  articleStyle = {
    info: 'bd-callout bd-callout-info',
    warning:  'bd-callout bd-callout-warning',
    primary: 'bd-callout bd-callout-primary',
    danger: 'bd-callout bd-callout-danger'
};

const articles = [
    {
         title: 'Things Fall Apart',
         type: 'info',
         shortdescr: 'Dropdowns are automatically positioned via CSS within the normal flow of the document',
         description: 'Dropdowns are automatically positioned via CSS within the normal flow of the document. This means dropdowns may be cropped by parents with certain <code>overflow</code> properties or appear out of bounds of the viewport. Address these issues on your own as they arise'                    
    },
    {
         title: 'The Man Died',
         type: 'warning',
         shortdescr: 'Dropdowns are automatically positioned via CSS within the normal flow of the document',
         description: 'Dropdowns are automatically positioned via CSS within the normal flow of the document. This means dropdowns may be cropped by parents with certain <code>overflow</code> properties or appear out of bounds of the viewport. Address these issues on your own as they arise'                    
    },
    {
         title: 'A Wake for Okigbo',
         type: 'danger',
         shortdescr: 'Dropdowns are automatically positioned via CSS within the normal flow of the document',
         description: 'Dropdowns are automatically positioned via CSS within the normal flow of the document. This means dropdowns may be cropped by parents with certain <code>overflow</code> properties or appear out of bounds of the viewport. Address these issues on your own as they arise'                    
    },
    {
         title: 'One Week One Trouble',
         type: 'info',
         shortdescr: 'Dropdowns are automatically positioned via CSS within the normal flow of the document',
         description: 'Dropdowns are automatically positioned via CSS within the normal flow of the document. This means dropdowns may be cropped by parents with certain <code>overflow</code> properties or appear out of bounds of the viewport. Address these issues on your own as they arise'                   
    }
]
   
export default class ArticleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(article){
        this.setState({
            activeArticle: article
        })

        this.handleShow()
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleDownload(){
        // download the active article
        //console.log(this.state.activeArticle);
        this.setState({ showModal: false });
    }

    componentWillMount(){
        this.setState({
            articles: articles,
            showModal: false
        });
    }

    render(){

        var articleElems = [];
        var self  = this;

        this.state.articles.map(function(article){
            articleElems.push( <Article stylename={articleStyle[article.type]} article={article} action={self.handleClick.bind(this, article)}/>)
        })

        return (
            <div> 
                {articleElems}
                <CustomModal 
                    article={this.state.activeArticle}
                    show={this.state.showModal} 
                    closeAction={self.handleClose.bind(this)} 
                    downloadAction={self.handleDownload.bind(this)} 
                />
            </div>
        );
    }
}