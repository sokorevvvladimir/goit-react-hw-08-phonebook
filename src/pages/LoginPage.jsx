import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations } from '../redux/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styled from 'styled-components';
import { authSelectors } from "../redux/auth";
import Alert from 'react-bootstrap/Alert';

const StyledDiv = styled.div`
display: flex;
justify-content: center;`;

const CenteredHeader = styled.h1`
text-align: center`;

const ButtonDiv = styled.div`
margin-top: 1rem;`;

const AlertDiv = styled.div`
margin-top: 1rem;`;

const LoginPage = () => {
    const dispatch = useDispatch();
    const isLogInAlertShown = useSelector(authSelectors.getIsLogInAlertShown);
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
        
    };


    return (
        <StyledDiv>
        <div>
            <CenteredHeader>Log In</CenteredHeader>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
    controlId="floatingEmail"
    label="Email"
    className="mb-3"><Form.Control required placeholder="Enter email" type="text" name="email" value={email} onChange={handleChange} /></FloatingLabel>   
                  
                </Form.Group>
                <Form.Group>
                  <FloatingLabel controlId="floatingPassword" label="Password"><Form.Control required placeholder="Enter password" type="password" name="password" value={password} onChange={handleChange} /></FloatingLabel>
                  
                    </Form.Group>
                    <ButtonDiv className="d-grid gap-2">
                      <Button size="lg" variant="primary" type="submit">Log In</Button>
                   </ButtonDiv>
                </Form>
                {isLogInAlertShown && <AlertDiv><Alert variant="danger">Wrong email or password!</Alert></AlertDiv>}
            </div>
            
        </StyledDiv>
    )

    
}
export default LoginPage;