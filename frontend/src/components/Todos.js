import React from 'react'
import {Link, Outlet} from 'react-router-dom'


const TodoItem = ({note, deleteNote}) => {
    let status = (note.isActive === true) ? 'yes' : 'no';

    return (
        <tr className="table_tr">
            <td>{note.project.projectName}</td>
            <td>{status}</td>
            <td>{note.createdBy}</td>
            <td><Link to={`${note.id}`} key={note.id}>Open</Link></td>
            <td><button type="button" onClick={() => deleteNote(note.id)}>Delete</button></td>
        </tr>
    )
}

const TodoList = ({notes, deleteNote}) => {
   return (
   <div>
        <table>
            <caption>ToDo notes</caption>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Active</th>
                    <th>Note author</th>
                    <th>Note text</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {notes.map((note) => <TodoItem key={note.id} note={note} deleteNote={deleteNote} />)}
                <Outlet />
            </tbody>
        </table>
        <Link to='/notes/create'>Create</Link>
    </div>
   )
}

export default TodoList