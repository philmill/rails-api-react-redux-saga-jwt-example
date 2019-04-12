import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Idea from './components/Idea';

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
    axios.post('/api/v1/ideas', {
      idea: {
        title: '',
        body: ''
      }
    })
      .then(response => this.setState((state) => ({
        ideas: [response.data, ...state.ideas],
        editingId: response.data.id,
      })))
      .catch(error => console.log(error));
  }

  updateIdea = (idea) => {
    this.setState((state) => {
      const ideaIndex = state.ideas.findIndex(i => i.id === idea.id);
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
    axios.delete(`/api/v1/ideas/${id}`)
      .then(() => this.setState((state) => {
        const ideaIndex = state.ideas.findIndex(i => i.id === id);
        return {
          ideas: [...state.ideas.slice(0, ideaIndex), ...state.ideas.slice(ideaIndex + 1)]
        };
      }))
      .catch(error => console.log(error));
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
