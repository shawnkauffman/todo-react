import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tasks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }

  handleChange(e) {
    let name = e.target.value;
    this.setState({ 
      name: name 
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const task = {
      name: this.state.name
    };

    this.addTask(task);
  }

  addTask(task) {
    const tasks = this.state.tasks;

    tasks.push(task);

    this.setState({
      tasks: tasks,
      name: ''
    });
  }

  removeTask(name) {
    const tasks = this.state.tasks.filter(task => task.name !== name);
    this.setState({
      tasks: tasks,
    });
  }

  clearTasks() {
    this.setState({
      tasks: []
    });
  }

  componentDidMount() {
    const tasks = [
      {
        id: 0,
        name: 'Clean house',
      },
      {
        id: 1,
        name: 'Cook dinner',
      },
      {
        id: 2,
        name: 'Build app',
      }
    ];

    this.setState({
      tasks: tasks
    });
  }

  render() {
    return (
      <div className="App">
        <p>Tasks: {this.state.tasks.length}</p>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.name} onChange={this.handleChange} />
          <button type="submit">Add Item</button>
        </form>

        <button type="button" onClick={this.clearTasks}>Clear All</button>

        <TaskList removeTask={this.removeTask} tasks={this.state.tasks} />
      </div>
    );
  }
}

class TaskList extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const tasks = this.props.tasks;

    const listItems = tasks.map((task) =>
      <ListItem removeTask={this.props.removeTask} key={task.id} name={task.name} />
    );

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return <li>{this.props.name} <button type="button" onClick={() => this.props.removeTask(this.props.name)}>Delete</button></li>;
  }
}

export default App;
