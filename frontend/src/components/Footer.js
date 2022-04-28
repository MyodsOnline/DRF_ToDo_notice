import React from 'react'
import {useLocation} from 'react-router-dom'


const FooterItem = () => {
    const {pathname} = useLocation();
    return (
        <footer>
            The awesome footer can be here.
            <span>For example: <u>current path: {pathname}</u></span>
        </footer>
    );
}

export default FooterItem;