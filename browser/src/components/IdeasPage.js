import React, { Component } from "react";

import IdeasApi from "../api/ideas";
import Idea from "./Idea";

export const InitialIdeaId = "INIT";

class IdeasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingId: null
    };
  }

  componentDidMount() {
    IdeasApi.index().then(data => this.setState({ ideas: data }));
  }

  handleNewIdea = () => {
    // create new idea in state, set editingId to something specific, only create if that id isn't found
    if (!this.state.ideas.some(idea => idea.id === InitialIdeaId)) {
      this.setState(state => ({
        ideas: [{ id: InitialIdeaId, title: "", body: "" }, ...state.ideas],
        editingId: InitialIdeaId
      }));
    }
  };

  updateIdea = ({ idea, id }) => {
    this.setState(state => {
      const ideaIndex = state.ideas.findIndex(i => i.id === id);
      return {
        ideas: [
          ...state.ideas.slice(0, ideaIndex),
          idea,
          ...state.ideas.slice(ideaIndex + 1)
        ],
        editingId: null
      };
    });
  };

  handleIdeaClick = id => {
    this.setState({ editingId: id });
  };

  handleDeleteClick = id => {
    // initial ideas can be removed from state directly
    if (id === InitialIdeaId) {
      this.setState(state => {
        const ideaIndex = state.ideas.findIndex(i => i.id === id);
        return {
          ideas: [
            ...state.ideas.slice(0, ideaIndex),
            ...state.ideas.slice(ideaIndex + 1)
          ]
        };
      });
    } else {
      IdeasApi.delete(id).then(() =>
        this.setState(state => {
          const ideaIndex = state.ideas.findIndex(i => i.id === id);
          return {
            ideas: [
              ...state.ideas.slice(0, ideaIndex),
              ...state.ideas.slice(ideaIndex + 1)
            ]
          };
        })
      );
    }
  };

  render() {
    const ideas = this.state.ideas || [];
    return (
      <section className="section">
        <button className="baseBtn newIdeaButton" onClick={this.handleNewIdea}>
          New Idea
        </button>
        {ideas.map(idea => (
          <Idea
            key={idea.id}
            idea={idea}
            isForm={this.state.editingId === idea.id}
            updateIdea={this.updateIdea}
            onClick={this.handleIdeaClick}
            onDelete={this.handleDeleteClick}
          />
        ))}
      </section>
    );
  }
}

export default IdeasPage;
