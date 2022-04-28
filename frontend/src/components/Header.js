import React from 'react'
import {NavLink} from 'react-router-dom'


const HeaderItem = () => {
    return (
        <header>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <NavLink to='/projects'>Projects</NavLink>
                <NavLink to='/notes'>Notes</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </nav>
        </header>
    )
}

export default HeaderItem;