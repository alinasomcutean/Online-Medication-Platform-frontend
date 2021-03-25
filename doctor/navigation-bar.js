import React from 'react';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
     <div>
         <Navbar color="dark" light expand="md">
             <Nav className="mr-auto" navbar>
                 <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle style={textStyle} nav caret>
                         Menu
                     </DropdownToggle>
                     <DropdownMenu >
                         <DropdownItem>
                             <NavLink href="/patients">Patients</NavLink>
                             <NavLink href="/caregivers">Caregivers</NavLink>
                             <NavLink href="/medications">Medications</NavLink>
                             <NavLink href="/">Logout</NavLink>
                         </DropdownItem>
                     </DropdownMenu>
                 </UncontrolledDropdown>
             </Nav>
         </Navbar>
     </div>
);

export default NavigationBar
