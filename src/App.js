import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        id: 'asda1',
        name: "James",
        age: 27
      }, {
        id: 'asdaw2',
        name: "Sylvia",
        age: 24
      }
    ],
    showPerson: false,
  }

  togglePersonHandler = () => {
    const showPersonToggle = this.state.showPerson;
    this.setState({ showPerson: !showPersonToggle });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  changedNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = { ...this.state.persons[personIndex] };
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    person.name = event.target.value;

    this.setState({
      persons: persons
    })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      color: 'white'
    };

    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.changedNameHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    if (this.state.persons.length == 0) {
      classes.push('huge');
    }

    return (
        <div className="App">
          <h1>Hi, I'm React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button style={style} onClick={this.togglePersonHandler}>Show Persons</button>
          {persons}
        </div>
    );
    // return (
    //   React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi I\'m a React App!!!'))
    // );
  }
}

export default App;
