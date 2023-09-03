import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useNavigate } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideNavbar = ({ details }) => {
    const navigate = useNavigate();
    return (
        <SideNav
            onSelect={(selected) => {
                console.log(selected);
                navigate('/' + selected)
            }}
            className='side-navbar shadow'
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="dashboard">
                {details.map((element, index) => {
                    return (
                        <NavItem eventKey={element.eventUri} key={index}>
                            <NavIcon>
                                <i className={`fa ${element.icon} fs-4`} />
                            </NavIcon>
                            <NavText>
                                {element.title}
                            </NavText>
                        </NavItem>
                    )
                })}
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideNavbar