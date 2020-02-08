import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { singInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email valido')
        .required('o email e obrigatorio'),
    password: Yup.string().required('A senha e obrigatoria'),
});

export default function SingIn() {
    const dispatch = useDispatch(singInRequest);

    async function handleSubmit({ email, password }) {
        try {
            dispatch(singInRequest(email, password));
        } catch (e) {}
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
