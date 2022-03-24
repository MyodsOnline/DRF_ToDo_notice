import React from 'react'
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import './index.css';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todos.js';
import HeaderItem from './components/Header.js';
import FooterItem from './components/Footer.js';
import UserProjectList from './components/UserProject.js';
import UserNoteList from './components/UserNotes.js';


const NotFound404 = ({location}) => {
    return (
        <div>
            <p>Page with url <code>{location.pathname}</code> not fonud</p>
        </div>
    )
}

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
                <BrowserRouter>
                    <HeaderItem/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                        <Route exact path='/notes' component={() => <TodoList notes={this.state.notes} />} />
                        <Route path='/userprojects/:uid'>
                            <UserProjectList projects={this.state.projects} />
                        </Route>
                        <Route path='/usernotes/:uid'>
                            <UserNoteList notes={this.state.notes} />
                        </Route>
                        <Redirect from='/users' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                    <FooterItem/>
                </BrowserRouter>

            </div>
        )
   }
}

export default App;
