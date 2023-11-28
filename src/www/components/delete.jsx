import React from 'react';

import { friends } from "../../declarations";

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Delete extends React.Component {

  constructor() {
    super();
    this.state = { success: null };
  }

  delete(event) {
    event.preventDefault();
    const friendId = parseInt($('delete-friend-id').value, 10);
    friends.delete(friendId).then((success) => {
      this.setState({ success });
    });
  }

  render() {
    return (
      <div>
        <h2>Delete a Friend</h2>
        <form onSubmit={ this.delete.bind(this) }>
          <label htmlFor="delete-friend-id">Identifier: </label>
          <input id="delete-friend-id" type="number"/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <div id="delete-response">
          <pre>
            <code>{ JSON.stringify(this.state, null, 2) }</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Delete;
