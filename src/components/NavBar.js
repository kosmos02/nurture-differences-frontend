import React, { Component } from 'react'
import { menuItems } from "./MenuItems"
import './NavBar.css'

class NavBar extends Component {
    
    state = { active: false }

handleClick = () => {
    this.setState( { active: !this.state.active})
}
    
    render() {
        return(
            <nav className="navBarItems">
                <h1 className="navBar-logo">Alliday<i className="fab fa-react"></i></h1>
                <div className="menu-icon"  onClick={this.handleClick}>
                    <i className={this.state.active ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.active ? 'nav-menu active' : 'nav-menu'}>
                    {menuItems.map((item, index) => {
                        return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.label}
                            </a>
                        </li>
                        )
                    })}
                </ul>
            </nav>  
        )
    }
}

export default NavBar