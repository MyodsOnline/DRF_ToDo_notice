import React from 'react'
import {Link} from 'react-router-dom'


const HeaderItem = () => {
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/users'>Users</Link>
                <Link to='/projects'>projects</Link>
                <Link to='/notes'>notes</Link>
            </nav>
        </header>
    )
}

export default HeaderItem;