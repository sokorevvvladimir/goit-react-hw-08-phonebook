import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations } from '../redux/auth';
import { authSelectors } from "../redux/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';

const StyledDiv = styled.div`
display: flex;
justify-content: center;
max-width: 50%;
margin: 0 auto;`;

const WidthDiv = styled.div`
width: 100%`;

const CenteredHeader = styled.h1`
text-align: center`;

const ButtonDiv = styled.div`
margin-top: 1rem;`;

const AlertDiv = styled.div`
margin-top: 1rem;`;

const RegisterPage = () => {
    const dispatch = useDispatch();
    const isRegisterEmailAlertShown = useSelector(authSelectors.getIsRegisterEmailAlertShown);
    const isRegisterPasswordAlertShown = useSelector(authSelectors.getIsRegisterPasswordAlertShown);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'name':
                return setName(value);
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
        dispatch(authOperations.register({ name, email, password }));
        setName('');
        setEmail('');
        setPassword('');
        
    }

    return (
        <StyledDiv>
            <WidthDiv>
                <CenteredHeader>Register</CenteredHeader>
                    
                <Form style={{margin: '0 auto'} } onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName"> 
                      <FloatingLabel
    controlId="floatingName"
    label="Name"
    className="mb-3"><Form.Control required placeholder="Enter name" type="text" name="name" value={name} onChange={handleChange} /></FloatingLabel>
                      
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FloatingLabel
    controlId="floatingEmail"
    label="Email"
    className="mb-3"><Form.Control required placeholder="Enter email" type="text" name="email" value={email} onChange={handleChange} /></FloatingLabel>
                      
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <FloatingLabel controlId="floatingPassword" label="Password"><Form.Control required placeholder="Enter password" type="password" name="password" value={password} onChange={handleChange} /></FloatingLabel>
                      
                    </Form.Group>
                    <Form.Text id="passwordHelpBlock" muted>
    Your password must be at least 7 characters long.
                    </Form.Text>
                    <ButtonDiv className="d-grid gap-2">
                      <Button size="lg" variant="primary" type="submit">Register</Button>
                    </ButtonDiv>    
                </Form>
                {isRegisterEmailAlertShown && <AlertDiv><Alert variant="danger">This email is already have an account here. Try another email for registration or Log In with the existing one.</Alert></AlertDiv>}
                {isRegisterPasswordAlertShown && <AlertDiv><Alert variant="danger">Your password is shorter than the minimum allowed length (7).</Alert></AlertDiv>}
            </WidthDiv>
        </StyledDiv>
    )
}

export default RegisterPage;