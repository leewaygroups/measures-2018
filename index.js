

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App.jsx';

if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.toString().replace(/^\s+|\s+$/g, '');
    };
}

ReactDOM.render(<App />, document.getElementById('root'));