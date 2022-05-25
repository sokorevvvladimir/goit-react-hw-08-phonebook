import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';

const AuthNav = () => {
    return <Stack direction="horizontal" gap={3}>
        <div className="bg-light border"><NavLink to="/register">Register</NavLink></div>
        <div className="bg-light border"><NavLink to="/login">Log In</NavLink></div>
    </Stack>}

export default AuthNav;