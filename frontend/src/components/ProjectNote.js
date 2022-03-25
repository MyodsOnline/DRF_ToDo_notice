import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectNoteItem = ({note}) => {
    return (
        <tr class='table_tr'>
            <td>{note.text}</td>
        </tr>
    )
}

const ProjectNoteList = ({notes}) => {
    let {uid} = useParams();
    console.log('id', uid)

    return (
        <table>
            <caption>User notes</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )
}

export default ProjectNoteList;