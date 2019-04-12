import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Idea from './components/Idea';

export const InitialIdeaId = 'INIT';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingId: null,
    }
  }

  componentDidMount() {
    axios.get('/api/v1/ideas')
      .then(response => this.setState({ ideas: response.data }))
      .catch(error => console.log(error));
  }

  handleNewIdea = () => {
    // create new idea in state, set editingId to something specific, only create if that id isn't found
    if (!this.state.ideas.some(idea => idea.id === InitialIdeaId)) {
      this.setState((state) => ({
        ideas: [{ id: InitialIdeaId, title: '', body: '' }, ...state.ideas],
        editingId: InitialIdeaId,
      }))
    }
  }

  updateIdea = ({ idea, id }) => {
    this.setState((state) => {
      const ideaIndex = state.ideas.findIndex(i => i.id === id);
      return {
        ideas: [...state.ideas.slice(0, ideaIndex), idea, ...state.ideas.slice(ideaIndex + 1)],
        editingId: null,
      };
    })
  }

  handleIdeaClick = (id) => {
    this.setState({ editingId: id });
  }

  handleDeleteClick = (id) => {
    // initial ideas can be removed from state directly
    if (id === InitialIdeaId) {
      this.setState((state) => {
        const ideaIndex = state.ideas.findIndex(i => i.id === id);
        return {
          ideas: [...state.ideas.slice(0, ideaIndex), ...state.ideas.slice(ideaIndex + 1)]
        };
      })
    } else {
      axios.delete(`/api/v1/ideas/${id}`)
        .then(() => this.setState((state) => {
          const ideaIndex = state.ideas.findIndex(i => i.id === id);
          return {
            ideas: [...state.ideas.slice(0, ideaIndex), ...state.ideas.slice(ideaIndex + 1)]
          };
        }))
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className="newIdeaButton" onClick={this.handleNewIdea}>New Idea</button>
        </header>
        <section className="section">
          {this.state.ideas.map(idea => (
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
      </div>
    );
  }
}

export default App;
