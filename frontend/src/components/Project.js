import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, users}) => {
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
        </tr>
   )
}

const ProjectList = ({projects, users}) => {
   return (
        <table>
            <caption>Active projects</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                    <th>Workers</th>
                    <th>Project details</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} users={users} key={project.id} />)}
            </tbody>
        </table>
   )
}

export default ProjectList