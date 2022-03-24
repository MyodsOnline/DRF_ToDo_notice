import React from 'react'


const TodoItem = ({note}) => {
    let st = (note.isActive === true) ? 'yes' : 'no';
    return (
        <tr class="table_tr">
            <td>{note.project.projectName}</td>
            <td>{note.text}</td>
            <td>{note.createdBy}</td>
            <td>{st}</td>
        </tr>
    )
}

const TodoList = ({notes}) => {
   return (
        <table>
            <caption>ToDo notes</caption>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Note text</th>
                    <th>Note author</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {notes.map((note) => <TodoItem note={note} />)}
            </tbody>
        </table>
   )
}

export default TodoList