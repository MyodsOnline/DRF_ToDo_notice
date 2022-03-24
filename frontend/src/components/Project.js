import React from 'react'


const ProjectItem = ({project}) => {
   return (
        <tr class="table_tr">
            <td>{project.projectName}</td>
            <td><a href={project.repoLink}>link</a></td>
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
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
   )
}

export default ProjectList