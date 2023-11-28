import React from 'react';
import ReactDOM from 'react-dom';

import Create from './components/create.jsx';
import Read from './components/read.jsx';
import Update from './components/update.jsx';
import Delete from './components/delete.jsx';

import './styles.css';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Friends List</h1>
        </header>
        <main>
          <p>Friends List is a simple example of a CRUD app.</p>
          <div className="crud-grid">
            <div className="crud-section">
              <Create />
            </div>
            <div className="crud-section">
              <Read />
            </div>
            <div className="crud-section">
              <Update />
            </div>
            <div className="crud-section">
              <Delete />
            </div>
          </div>
        </main>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));