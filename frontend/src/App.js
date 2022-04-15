import React from 'react'
import axios from 'axios';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Cookies from 'universal-cookie';
import './index.css';
import './App.css';

import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todos.js';

import Layout from './components/Layout.js';
import Home from './components/Home.js';
import NotFound404 from './components/NotFound404.js';
import LoginForm from './components/Auth.js';

import ProjectDetail from './components/ProjectDetail.js';
import UserNoteList from './components/UserNotes.js';
import NoteDetail from './components/NoteDetail.js';


const API_URL = 'http://127.0.0.1:8081/'

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'notes': [],
           'token': '',
       }
   }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post(API_URL + 'api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
            if (this.is_authenticated()) {
                headers['Authorization'] = 'Token ' + this.state.token;
            }
        return headers
    }

    load_data () {
        const headers = this.get_headers()
        axios.get(API_URL + 'api/1/users/', {headers})
           .then(response => {
               const users = response.data.results;
                   this.setState(
                   {
                       'users': users
                   }
               )
           }).catch(error => console.log(error))

       axios.get(API_URL + 'api/projects/', {headers})
           .then(response => {
               const projects = response.data.results;
                   this.setState(
                   {
                       'projects': projects
                   }
               )
           }).catch(error => console.log(error))

       axios.get(API_URL + 'api/todo/', {headers})
           .then(response => {
               const notes = response.data.results;
                   this.setState(
                   {
                       'notes': notes
                   }
               )
           }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8081/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />} >
                            <Route index element={<Home />} />
                            <Route path="users" element={<UserList users={this.state.users} />} />
                            <Route path="usersnotes/:id" element={<UserNoteList notes={this.state.notes} />} />
                            <Route path="projects"
                                element={<ProjectList
                                    projects={this.state.projects}
                                    users={this.state.users}
                                    deleteProject={(id) => this.deleteProject(id)} />} />
                            <Route path="projects/:id"
                                element={<ProjectDetail
                                    projects={this.state.projects}
                                    users={this.state.users} />} />
                            <Route path="notes/*" element={<TodoList notes={this.state.notes} />} >
                                <Route path=":id" element={<NoteDetail notes={this.state.notes} />} />
                            </Route>
                            <Route path="login" element={<LoginForm get_token={
                                (username, password) => this.get_token(username, password)} />} />
                            <Route path="*" element={<NotFound404 />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
   }
}

export default App;
