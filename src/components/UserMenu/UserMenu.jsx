import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Span = styled.span`
margin-right: 10px`;

const StyledDiv = styled.div`
margin-left: auto;
display: flex;
align-items: center;`;

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

const UserMenu = () => {
    const dispatch = useDispatch();
    const name = useSelector(authSelectors.getUserName);

    return <>
        <Stack direction="horizontal" gap={3}>
            <div><StyledNavLink to="/contacts">Contacts</StyledNavLink></div>
            <StyledDiv className="ms-auto">
              <Span>{name}</Span>
              <Button type="button" variant="outline-dark" onClick={() => dispatch(authOperations.logout())}>Log Out</Button>
            </StyledDiv>
        </Stack>
        </>
};
export default UserMenu;