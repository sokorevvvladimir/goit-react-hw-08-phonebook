import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import Stack from 'react-bootstrap/Stack';
import styled from 'styled-components';

const Header = styled.header`
background-color: #39C0ED;
padding: 1rem 10rem;`;

const Appbar = () => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)
    return (
        <Header>
            <Stack direction="horizontal" gap={3}>
                <div className="bg-light border"><NavLink to="/">Home</NavLink></div>
                {isLoggedIn && <div className="ms-auto"><UserMenu /></div>}
                {!isLoggedIn && <div className="ms-auto"><AuthNav /></div>}
            </Stack>    
    </Header>
    )
};

export default Appbar;