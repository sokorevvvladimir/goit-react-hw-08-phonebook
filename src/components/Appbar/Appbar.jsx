import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';

const Header = styled.header`
background-color: #39C0ED;
padding: 1rem 10rem;

@media (max-width: 767px){
    padding: 1rem 2rem;
  };`;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
color: #000000;
position: relative;
text-transform: uppercase;
transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

&:hover {
  color: #ffffff;
};

&.active{
  color: #ffffff;
  
  };

&::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover::after {
    transform: scaleX(1);
  }`;

const StyledNav = styled(Nav)`
align-items: center`;

const Appbar = () => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)
    return (
        <Header>
            <StyledNav>
                <Nav.Item><StyledNavLink to="/">Home</StyledNavLink ></Nav.Item>
                {isLoggedIn && <Nav.Item className="ms-auto"><UserMenu /></Nav.Item>}
                {!isLoggedIn && <Nav.Item className="ms-auto"><AuthNav /></Nav.Item>}
            </StyledNav>    
    </Header>
    )
};

export default Appbar;