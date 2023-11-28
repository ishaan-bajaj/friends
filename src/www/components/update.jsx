import React from 'react';

import { friends } from "../../declarations";

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Update extends React.Component {

  constructor() {
    super();
    this.state = { success: null };
  }

  update(event) {
    event.preventDefault();
    const friendId = parseInt($('update-friend-id').value, 10);
    const name = $('update-name').value;
    const n = parseInt($('update-attributes-count').value, 10);
    const attributes = [];
    for (var i = 0; i < n; i++) {
      const attribute = $('update-attribute-' + i).value;
      attributes.push(attribute);
    };
    const friend = { name, attributes };
    friend.attributes = idl.toList(friend.attributes);
    friends.update(friendId, friend).then((success) => {
      this.setState({ success });
    });
  }

  toggle() {
    const n = parseInt($('update-attributes-count').value, 10);
    const container = $('update-attributes-container');
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    };
    for (var i = 0; i < n; i++) {
      const label = document.createElement('label');
      label.setAttribute('for', 'update-attribute-' + i);
      label.innerHTML = 'Attribute #' + (i + 1) + ': ';
      container.appendChild(label);
      const input = document.createElement('input');
      input.id = 'update-attribute-' + i;
      input.type = 'text';
      container.appendChild(input);
      const br = document.createElement('br');
      container.appendChild(br);
    };
  }

  render() {
    return (
      <div>
        <h2>Update a Friend</h2>
        <form onSubmit={ this.update.bind(this) }>
          <label htmlFor="update-friend-id">Identifier: </label>
          <input id="update-friend-id" type="number"/>
          <br/>
          <label htmlFor="update-name">Name: </label>
          <input id="update-name" type="text"/>
          <br/>
          <label htmlFor="update-attributes-count">Attributes: </label>
          <select id="update-attributes-count" onChange={ this.toggle }>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br/>
          <div id="update-attributes-container"/>
          <button type="submit">Submit</button>
        </form>
        <div id="update-response">
          <pre>
            <code>{ JSON.stringify(this.state, null, 2) }</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Update;
