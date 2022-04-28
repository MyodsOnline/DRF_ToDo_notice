import {useParams} from 'react-router-dom'

const UserNoteItem = ({note}) => {
    return (
        <tr className='table_tr'>
            <td>{note.createdBy}</td>
            <td>{note.text}</td>
        </tr>
    )
}

const UserNoteList = ({notes}) => {
    let {username} = useParams();
    let filtered_notes = notes.filter((note) => note.createdBy.username === username)

    return (
        <table>
            <caption>User Notes</caption>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Repository</th>
                </tr>
            </thead>
            <tbody>
                {filtered_notes.map((note) => <UserNoteItem note={note} />)}
            </tbody>
        </table>
    )
}

export default UserNoteList