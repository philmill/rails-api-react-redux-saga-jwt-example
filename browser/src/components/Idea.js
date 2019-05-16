import React, { Component, Fragment } from "react";

import IdeasApi from "../api/ideas";
import { InitialIdeaId } from "./IdeasPage";

const IdeaText = ({ idea }) => {
  if (idea.id === InitialIdeaId) {
    return <h4>Unsaved Changes</h4>;
  } else {
    return (
      <Fragment>
        <h4>{idea.title}</h4>
        <p>{idea.body}</p>
      </Fragment>
    );
  }
};

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.idea.title,
      body: props.idea.body
    };
  }

  handleUpdate = () => {
    // conditionally POST or PUT based on prop idea id
    const idea = {
      id: this.props.idea.id,
      title: this.state.title,
      body: this.state.body
    };

    if (idea.id === InitialIdeaId) {
      // this will POST with id param that will be filtered out by Rails
      // the original id is needed in the updateIdea callback to determine how to update app state
      IdeasApi.create(idea).then(data =>
        this.props.updateIdea({ idea: data, id: idea.id })
      );
    } else {
      IdeasApi.update(idea).then(data =>
        this.props.updateIdea({ idea: data, id: idea.id })
      );
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.props.onClick(this.props.idea.id);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.idea.id);
  };

  render() {
    const { idea, isForm } = this.props;
    const btnLabel = idea.id === InitialIdeaId ? "Create" : "Update";

    if (isForm) {
      return (
        <div className="tile">
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter a Title"
            value={this.state.title}
            onChange={this.handleInput}
          />
          <textarea
            className="input"
            name="body"
            placeholder="Describe your idea"
            value={this.state.body}
            onChange={this.handleInput}
          />
          <button onClick={this.handleUpdate}>{btnLabel}</button>
        </div>
      );
    } else {
      return (
        <div className="tile" onClick={this.handleClick}>
          <span className="deleteBtn" onClick={this.handleDelete}>
            X
          </span>
          <IdeaText idea={idea} />
        </div>
      );
    }
  }
}

export default Idea;
