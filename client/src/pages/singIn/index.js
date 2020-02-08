import React from 'react';
import SingInService from './singInService';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email valido')
        .required('o email e obrigatorio'),
    password: Yup.string().required('A senha e obrigatoria'),
});

export default function SingIn(props) {
    async function handleSubmit(event) {
        try {
            event.preventDefault();
            console.tron.log(event);

            let session = await SingInService.login({
                email: event.target.email.value,
                password: event.target.password.value,
            });
            if (session) {
                localStorage.setItem('session', JSON.stringify(session.data));
                return props.history.push('/main');
            }
        } catch (e) {
            // let { message } = e.response.data;
        }
    }

    return (
        <>
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input
                    name="email"
                    autoFocus
                    type="email"
                    placeholder="Digite seu e-mail"
                />
                <Input
                    name="password"
                    placeholder="Digite sua senha"
                    type="password"
                />
                <button type="submit">Acessar</button>
                <Link to="/singUp">Criar uma conta</Link>
            </Form>
        </>
    );
}
