import React, { Component } from 'react';
import axios from 'axios';

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.idea.title,
      body: props.idea.body,
    };
  }

  handleUpdate = () => {
    const idea = {
      title: this.state.title,
      body: this.state.body,
    };

    axios.put(`/api/v1/ideas/${this.props.idea.id}`, {
      idea
    })
      .then(response => this.props.updateIdea(response.data))
      .catch(error => console.log(error));
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick = () => {
    this.props.onClick(this.props.idea.id);
  }

  handleDelete = () => {
    this.props.onDelete(this.props.idea.id);
  }

  render() {
    const { idea, isForm } = this.props;
    if (isForm) {
      return (
        <div className="tile">
          <form>
            <input className='input' type="text"
              name="title" placeholder='Enter a Title'
              value={this.state.title}
              onChange={this.handleInput}
            />
            <textarea className='input' name="body"
              placeholder='Describe your idea'
              value={this.state.body}
              onChange={this.handleInput}
            />
          </form>
          <button onClick={this.handleUpdate}>Update</button>
        </div>
      )
    } else {
      return (
        <div className="tile" key={idea.id} onClick={this.handleClick}>
          <span className="deleteBtn" onClick={this.handleDelete}>X</span>
          <h4>{idea.title}</h4>
          <p>{idea.body}</p>
        </div>
      );
    }
  }
};

export default Idea;