import React from 'react'
import {Link} from 'react-router-dom'

const UserItem = ({user}) => {
    return (
        <tr className="table_tr">
            <td>
                <Link to={`/usersnotes/${user.username}`}>{user.username}</Link>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
   return (
        <table>
            <caption>Users list</caption>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem key={user.id} user={user} />)}
            </tbody>
        </table>
   )
}

export default UserList