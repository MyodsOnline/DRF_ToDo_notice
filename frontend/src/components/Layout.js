import {Outlet, NavLink} from 'react-router-dom'

import HeaderItem from './Header.js';
import FooterItem from './Footer.js';

const Layout = () => {
    return (
        <>
        <HeaderItem />
        <Outlet />
        <FooterItem />
        </>
    )
}

export default Layout
