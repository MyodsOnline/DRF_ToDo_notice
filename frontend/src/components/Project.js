import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'

import ProjectNoteList from './ProjectNote.js';



const ProjectItem = ({project}) => {
   return (
        <tr className="table_tr">
            <td>{project.projectName}</td>
            <td><a href={project.repoLink} target="_blank">link</a></td>
            <td>{project.workers}</td>
            <td>
                <Link to={project.uid} key={project.uid}>See</Link>
            </td>
        </tr>
   )
}

const ProjectList = ({projects, notes}) => {
   return (
        <table>
            <caption>Active projects</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                    <th>Workers</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} key={project.uid} />)}
            </tbody>

        <Routes>
            <Route path=":uid" element={<ProjectNoteList notes={notes} />} />
        </Routes>

        </table>
   )
}

export default ProjectList