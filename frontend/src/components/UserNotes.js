import React from 'react'
import {useParams} from 'react-router-dom'

const UserNoteItem = ({note}) => {
    return (
        <tr class='table_tr'>
            <td>{note.text}</td>
        </tr>
    )
}

const UserNoteList = ({notes}) => {
    let {uid} = useParams();
    let filtered_notes = notes.filter((note) => note.created_by.uid === uid)

    return (
        <table>
            <caption>User notes</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                </tr>
            </thead>
            <tbody>
                {filtered_notes.map((note) => <UserNoteItem note={note} />)}
            </tbody>
        </table>
    )
}

export default UserNoteList