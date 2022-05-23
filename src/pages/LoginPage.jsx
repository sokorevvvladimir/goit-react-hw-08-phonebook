import { useState } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from '../redux/auth';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(authOperations.login({ email, password }));
        setEmail('');
        setPassword('');
        
    }

    return (
        <div>
            <h1>Log In</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="text" name="email" value={email} onChange={handleChange} />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={password} onChange={handleChange} />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    )

    
}
export default LoginPage;