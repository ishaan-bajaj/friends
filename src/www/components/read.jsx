import React from 'react';

import { friends } from "../../declarations";

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Read extends React.Component {

  constructor() {
    super();
    this.state = { friend: null };
  }

  read(event) {
    event.preventDefault();
    const friendId = parseInt($('read-friend-id').value, 10);
    friends.read(friendId).then((result) => {
      const friend = idl.fromOptional(result);
      if (friend) {
        friend.attributes = idl.fromList(friend.attributes);
      };
      this.setState({ friend });
    });
  }

  render() {
    return (
      <div>
        <h2>Read a Friend</h2>
        <form onSubmit={ this.read.bind(this) }>
          <label htmlFor="read-friend-id">Identifier: </label>
          <input id="read-friend-id" type="number"/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <div id="read-response">
          <pre>
            <code>{ JSON.stringify(this.state, null, 2) }</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Read;
