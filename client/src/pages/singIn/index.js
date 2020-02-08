import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SingInService from './singInService';

import './styles.css';

export default function SingIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            setMessageError('');
            let session = await SingInService.login({
                email: email,
                password: password,
            });
            if (session) {
                localStorage.setItem('session', JSON.stringify(session.data));
                return props.history.push('/main');
            }
        } catch (e) {
            let { message } = e.response.data;
            setMessageError(message);
        }
    }

    return (
        <div className="SingIn">
            <form onSubmit={handleSubmit}>
                <span className="message-erro-singin">
                    {messageError ? messageError : ''}
                </span>
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type="submit">
                    Login
                </Button>
                <LinkContainer to="/singUp">
                    <Button
                        className="button-singup"
                        variant="secondary"
                        type="button"
                    >
                        SingUp
                    </Button>
                </LinkContainer>
            </form>
        </div>
    );
}
