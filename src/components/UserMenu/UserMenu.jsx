import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Span = styled.span`
margin-right: 10px`;

const StyledDiv = styled.div`
margin-left: auto`;

const UserMenu = () => {
    const dispatch = useDispatch();
    const email = useSelector(authSelectors.getUserEmail);

    return <>
        <Stack direction="horizontal" gap={3}>
            <div className="bg-light border"><NavLink to="/contacts">Contacts</NavLink></div>
            <StyledDiv className="ms-auto">
              <Span>{email}</Span>
              <Button type="button" variant="outline-dark" onClick={() => dispatch(authOperations.logout())}>Log Out</Button>
            </StyledDiv>
        </Stack>
        </>
};
export default UserMenu;