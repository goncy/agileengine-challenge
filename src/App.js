// @flow

import React, {Component} from "react";
import styled from "styled-components";

import Layout from "./components/Layout";
import BoxBase from "./components/Box";
import Modifiers from "./components/Modifiers";
import Suggestions from "./components/Suggestions";

import {MODIFIERS} from "./constants";
import api from "./api";

const TextBox = styled(BoxBase)`
  min-width: 250px;
  min-height: 250px;
  max-width: 640px;
  max-height: 420px;
  overflow: auto;
`;

const MODIFIERS_TAGS = MODIFIERS.map(m => m.tag);

class App extends Component {
  textbox = React.createRef();

  state = {
    content: "<b>Write</b> something <i>here</i>",
    selection: null,
    modifier: null,
    suggestions: [],
  };

  onModify = (tag: String) => {
    const {selection} = this.state;
    const selectedText = selection && selection.toString();

    if (selectedText) {
      const tagElement = document.createElement(tag);
      const selectionElement = document.createTextNode(selectedText);

      tagElement.appendChild(selectionElement);
      selection.deleteContents();
      selection.insertNode(tagElement);
    }

    this.syncText();
  };

  onSuggestion = (suggestion: String) => {
    const {selection} = this.state;
    const selectedText = selection && selection.toString();

    if (selectedText) {
      const selectionElement = document.createTextNode(suggestion);

      selection.deleteContents();
      selection.insertNode(selectionElement);
    }

    this.syncText();

    this.setState({suggestions: []});
  };

  syncText = () =>
    this.setState({
      content: this.textbox.current.innerHTML,
    });

  onSelect = async () => {
    const selection = window
      .getSelection()
      .getRangeAt(0)
      .cloneRange();
    const tag = selection.commonAncestorContainer.parentNode.tagName;
    const selectedText = selection.toString();

    this.setState({
      selection,
      suggestions: selectedText ? await this.getSuggestion(selectedText) : [],
      modifier: MODIFIERS_TAGS.includes(tag) ? tag : null,
    });
  };

  getSuggestion = async word => {
    const suggestions = (await api.suggestions.fetch(word)) || [];

    return suggestions.slice(0, 10).map(s => s.word);
  };

  render() {
    const {content, modifier, suggestions} = this.state;

    return (
      <Layout>
        <Modifiers
          onClick={this.onModify}
          list={MODIFIERS}
          selected={modifier}
        />
        <Suggestions onClick={this.onSuggestion} list={suggestions} />
        <TextBox
          contentEditable
          innerRef={this.textbox}
          onBlur={this.syncText}
          onMouseUp={this.onSelect}
          onKeyUp={this.onSelect}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Layout>
    );
  }
}

export default App;
