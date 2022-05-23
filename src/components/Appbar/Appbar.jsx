import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';


const Appbar = () => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)
    return (
        <header>
            {isLoggedIn ? <UserMenu /> : <AuthNav/>}        
    </header>
    )
};

export default Appbar;