import React from 'react';
import Article from './Article.jsx';
import CustomModal from '../Common/CustomModal.jsx';
import * as FileSaver from "file-saver";
import Pagination from '../Common/Pagination.jsx';



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
    },
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
        this.state = {
            dataPerPage: [],
        }
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

    handleDownload(data){
        this.setState({ showModal: false });
        let file = new Blob([JSON.stringify(data)], {
            type: 'text/plain'
        });

        FileSaver.saveAs(file, 'article.txt');
    }

    handlePageClick = (data) => {
        this.setState({
            dataPerPage: data,
        });
    };

    componentWillMount(){
        this.setState({
            articles: articles,
            showModal: false
        });
    }

    render(){

        var articleElems = [];
        var self  = this;
        const {dataPerPage} = this.state;

        dataPerPage.map(function(article){
            articleElems.push( <Article stylename={articleStyle[article.type]} article={article} action={self.handleClick.bind(this, article)}/>)
        })

        return (
            <div>
                {articleElems}
                <div id="react-paginate" className="text-center">
                    <Pagination items={this.state.articles} onChangePage={this.handlePageClick} initialPage={1} perPageCount = {5}/>
                </div>
                <CustomModal
                    article={this.state.activeArticle}
                    show={this.state.showModal}
                    closeAction={self.handleClose.bind(this)}
                    downloadAction={self.handleDownload}
                />
            </div>
        );
    }
}