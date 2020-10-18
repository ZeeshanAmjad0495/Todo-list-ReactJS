import React from "react";

const completedStyle = "line-through";
const notCompletedStyle = "";
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
      style: { textDecorationLine: notCompletedStyle },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.markItem = this.markItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          mark={this.markItem}
          delete={this.deleteItem}
          style={this.state.style}
        />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo"></label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>Add</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState((state) => ({
      items: state.items.concat(newItem),
      text: "",
      style: { textDecorationLine: notCompletedStyle },
    }));
  }
  markItem() {
    this.setState({ style: { textDecorationLine: completedStyle } });
  }
  deleteItem(id) {
    const list = [...this.state.items];

    const updatedList = list.filter((item) => item.id !== id);

    this.setState({ items: updatedList });
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <li key={item.id} style={this.props.style}>
            {item.text}

            <button
              style={{ color: "yellow", backgroundColor: "green" }}
              onClick={this.props.mark}
            >
              Mark Complete
            </button>
            <button
              style={{ color: "red", backgroundColor: "pink" }}
              onClick={() => this.props.delete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoApp;
