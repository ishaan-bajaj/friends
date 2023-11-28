import React from 'react';

import { friends } from "../../declarations";

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Create extends React.Component {

  constructor() {
    super();
    this.state = { friendId: null };
  }

  create(event) {
    event.preventDefault();
    const name = $('create-name').value;
    const n = parseInt($('create-attributes-count').value, 10);
    const attributes = [];
    for (var i = 0; i < n; i++) {
      const attribute = $('create-attribute-' + i).value;
      attributes.push(attribute);
    };
    const friend = { name, attributes };
    friend.attributes = idl.toList(friend.attributes);
    friends.create(friend).then((friendId) => {
      this.setState({ friendId });
    });
  }

  toggle() {
    const n = parseInt($('create-attributes-count').value, 10);
    const container = $('create-attributes-container');
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    };
    for (var i = 0; i < n; i++) {
      const label = document.createElement('label');
      label.setAttribute('for', 'create-attribute-' + i);
      label.innerHTML = 'Attribute #' + (i + 1) + ': ';
      container.appendChild(label);
      const input = document.createElement('input');
      input.id = 'create-attribute-' + i;
      input.type = 'text';
      container.appendChild(input);
      const br = document.createElement('br');
      container.appendChild(br);
    };
  }

  render() {
    return (
      <div>
        <h2>Create a Friend</h2>
        <form onSubmit={ this.create.bind(this) }>
          <label htmlFor="create-name">Name: </label>
          <input id="create-name" type="text"/>
          <br/>
          <label htmlFor="create-attributes-count">Attributes: </label>
          <select id="create-attributes-count" onChange={ this.toggle }>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br/>
          <div id="create-attributes-container"/>
          <button type="submit">Submit</button>
        </form>
        <div id="create-response">
          <pre>
            <code>{ JSON.stringify(this.state, null, 2) }</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Create;
