import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, users, deleteProject}) => {
    console.log(users)
    console.log(project)
   return (
        <tr className="table_tr">
            <td>{project.projectName}</td>
            <td><a href={project.repoLink} target="_blank">link</a></td>
            <td>{project.workers}</td>
            <td>
                <Link to={`/projects/${project.id}`} key={project.id}>Open</Link>
            </td>
            <td><button type="button" onClick={() => deleteProject(project.id)}>Delete</button></td>
        </tr>
   )
}

const ProjectList = ({projects, users, deleteProject}) => {
   return (
        <div>
        <table>
            <caption>Active projects</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                    <th>Workers</th>
                    <th>Project details</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} users={users} key={project.id} />)}
            </tbody>
        </table>
        <Link to='create'>Create</Link>
        </div>
   )
}

export default ProjectList