import React from 'react'
import {NavLink} from 'react-router-dom'


const HeaderItem = () => {
    return (
        <header>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <NavLink to='/projects'>projects</NavLink>
                <NavLink to='/notes'>notes</NavLink>
            </nav>
        </header>
    )
}

export default HeaderItem;