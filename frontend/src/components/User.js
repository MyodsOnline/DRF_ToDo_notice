import React from 'react'
import {Link} from 'react-router-dom'


const UserItem = ({user}) => {
   return (
       <tr class="table_tr">
           <td>{user.username}</td>
           <td>{user.firstName}</td>
           <td>{user.lastName}</td>
           <td>{user.email}</td>
           <td><Link to={`user/${user.uid}`}>See all</Link></td>
           <td><Link to={`usernotes/${user.uid}`}>See all</Link></td>
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
                    <th>Member of project</th>
                    <th>Created notes</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
   )
}

export default UserList