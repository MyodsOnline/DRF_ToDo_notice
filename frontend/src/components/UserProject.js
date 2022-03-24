import React from 'react'
import {useParams} from 'react-router-dom'

const UserProjectItem = ({project}) => {
    return (
        <tr class='table_tr'>
            <td>{project.projectName}</td>
            <td><a href={project.repoLink}>link</a></td>
        </tr>
    )
}

const UserProjectList = ({projects}) => {
    let {uid} = useParams();
    let filtered_projects = projects.filter((project) => project.workers.uid === uid)

    return (
        <table>
            <caption>Active projects</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                </tr>
            </thead>
            <tbody>
                {filtered_projects.map((project) => <UserProjectItem project={project} />)}
            </tbody>
        </table>
    )
}

export default UserProjectList