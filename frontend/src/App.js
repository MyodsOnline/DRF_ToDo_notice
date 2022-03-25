import React from 'react'
import axios from 'axios';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css';
import './App.css';

import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todos.js';

import Home from './components/Home.js';
import HeaderItem from './components/Header.js';
import FooterItem from './components/Footer.js';
import NotFound404 from './components/NotFound404.js';

import UserProjectList from './components/UserProject.js';
import UserNoteList from './components/UserNotes.js';
import ProjectNoteList from './components/ProjectNote.js';


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
               const users = response.data.results;
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
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/users' element={<UserList users={this.state.users}/>} />
                        <Route path='/projects/*' element={<ProjectList projects={this.state.projects} notes={this.state.notes}/>} />
                        <Route path='/notes' element={<TodoList notes={this.state.notes} />} />
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>
                    <FooterItem/>
                </BrowserRouter>
            </div>
        )
   }
}

export default App;
