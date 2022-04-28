import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr className='table_tr'>
            <td>{project.id}</td>
            <td>{project.projectName}</td>
            <td><a href={project.repoLink}>link</a></td>
            <td>{project.workers}</td>
        </tr>
    )
}

const ProjectName = ({project}) => {
    return (
        <caption>Project "{project.projectName}" detail</caption>
    )
}

const ProjectDetail = ({projects}) => {
    let {id} = useParams();
    let filtered_project = projects.filter((project) => project.id === id)
    console.log('my project - ', filtered_project)

    return (
        <table>
                {filtered_project.map((project) => <ProjectName project={project} key={project.id} />)}
            <thead>
                <tr>
                    <th>Project id</th>
                    <th>Project name</th>
                    <th>Repository</th>
                    <th>Workers</th>
                </tr>
            </thead>
            <tbody>
                {filtered_project.map((project) => <ProjectItem project={project} key={project.id} />)}
            </tbody>
        </table>
    )
}

export default ProjectDetail