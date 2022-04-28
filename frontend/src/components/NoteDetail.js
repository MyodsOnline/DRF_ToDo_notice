import React from 'react'
import {useParams} from 'react-router-dom'

const NoteDetail = ({notes}) => {
    let { id } = useParams();
    console.log(id)
    console.log('i have', notes)

    let filtered_note = notes.filter((note) => note.id === id);
    console.log(filtered_note)

    return (
    <tr>
        <td colspan="4">
            {id}
        </td>
    </tr>
    )
}

export default NoteDetail;