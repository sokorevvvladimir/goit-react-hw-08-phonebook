import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import styled from 'styled-components';

const StyledDiv = styled.nav`
display: flex;
justify-content: space-between;
`;

const UserMenu = () => {
    const dispatch = useDispatch();
    const email = useSelector(authSelectors.getUserEmail);

    return <>
        <StyledDiv>
        
            <NavLink to="/contacts">Contacts</NavLink>
            <div>
        <span>{email}</span>
        <button type="button" onClick={() => dispatch(authOperations.logout())}>Log Out</button>
    </div>
        </StyledDiv>
        </>
};
export default UserMenu;