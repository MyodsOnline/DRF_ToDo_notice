import React from 'react'


const ProjectItem = ({project}) => {
   return (
        <tr className="table_tr">
            <td>{project.projectName}</td>
            <td><a href={project.repoLink} target="_blank">link</a></td>
            <td>{project.workers}</td>
        </tr>
   )
}

const ProjectList = ({projects}) => {
   return (
        <table>
            <caption>Active projects</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                    <th>Workers</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} key={project.uid} />)}
            </tbody>
        </table>
   )
}

export default ProjectList