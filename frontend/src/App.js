import React from 'react'
import axios from 'axios';
import './index.css';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todos.js';
import HeaderItem from './components/Header.js';
import FooterItem from './components/Footer.js';



class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'notes': [],
       }
   }

    componentDidMount() {
       axios.get('http://127.0.0.1:8081/api/users/')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8081/api/projects/')
           .then(response => {
               const projects = response.data.results;
                   this.setState(
                   {
                       'projects': projects
                   }
               )
           }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8081/api/todo/')
           .then(response => {
               const notes = response.data.results;
                   this.setState(
                   {
                       'notes': notes
                   }
               )
           }).catch(error => console.log(error))
    }

   render () {
        return (
            <div className="App">
                <HeaderItem/>
                <UserList users={this.state.users} />
                <ProjectList projects={this.state.projects} />
                <TodoList notes={this.state.notes} />
                <FooterItem/>
            </div>
        )
   }
}

export default App;
