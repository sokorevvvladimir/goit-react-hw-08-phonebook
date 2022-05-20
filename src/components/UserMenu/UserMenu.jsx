import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';

const UserMenu = () => {
    const dispatch = useDispatch();
    const email = useSelector(authSelectors.getUserEmail);

    return <>
        <span>{email}</span>
        <button type="button" onClick={() => dispatch(authOperations.logout())}>Log Out</button>
    </>
};
export default UserMenu;