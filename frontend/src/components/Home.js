import React from 'react'
import {Link} from "react-router-dom"

const Home = () => (
    <div className="home">
        <h1>This is the main page</h1>
        <h4>
            This example demonstrates how to create simple links between pages using <mark>'React Router v6'</mark>
        </h4>
        <ul>
            <li>
                You can check <Link to='/users'>Users</Link> list
            </li>
            <li>Or view <Link to='/projects'>projects</Link> they are working on</li>
            <li>Some projects have <Link to='/notes'>notes</Link>, of course you can check them</li>
        </ul>
        <h5>And nothing bad will happen if you <Link to='/wronglink'>click</Link> on the wrong link</h5>
    </div>
)

export default Home;