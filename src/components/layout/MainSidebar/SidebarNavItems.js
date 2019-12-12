import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

import AuthContext from './../../../context/auth-context';

class SidebarNavItems extends React.Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props);
    //const userData = JSON.parse(localStorage.getItem(USER_DATA));
    const userData = context.userData;
    let role = '';
    if(userData.roles.includes("ROLE_ADMIN")) {
        role = 'admin';
    } else if(userData.roles.includes("ROLE_ADVERTISER")) {
        role = 'adv';
    } else {
        role = 'user';
    }
    this.state = {
      role: role,
      navItems: Store.getSidebarItems()[role]
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    console.log('SideBarNav changed.');
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()[this.state.role]
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
