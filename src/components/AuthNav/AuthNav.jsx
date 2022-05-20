import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
display: flex;
justify-content: space-between;
`;

const AuthNav = () => {
    return <StyledNav>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Log In</NavLink>
    </StyledNav>}

export default AuthNav;