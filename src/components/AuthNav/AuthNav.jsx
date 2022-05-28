import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
text-decoration: none;
position: relative;
color: #000000;
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

const AuthNav = () => {
    return <Stack direction="horizontal" gap={3}>
        <div><StyledNavLink to="/register">Register</StyledNavLink></div>
        <div ><StyledNavLink to="/login">Log In</StyledNavLink></div>
    </Stack>}

export default AuthNav;