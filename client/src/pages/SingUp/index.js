import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('O Nome e obrigatorio'),
    email: Yup.string()
        .email('Insira um email valido')
        .required('o email e obrigatorio'),
    password: Yup.string().required('A senha e obrigatoria'),
});

export default function SingUp(props) {
    const [messageError, setMessageError] = useState('');
    const [successCreate, setSuccessCreate] = useState('');

    async function handleSubmit(event) {
        try {
            // event.preventDefault();
            // console.tron.log(event);
            // let user = await SingUpService.createUser({
            //     name: event.target.name.value,
            //     email: event.target.email.value,
            //     password: event.target.password.value,
            // });
            // if (user) {
            //     setSuccessCreate(`Successfully created ${user.data.name} user`);
            //     setTimeout(() => {
            //         return props.history.push('/singIn');
            //     }, 5000);
            // }
        } catch (e) {
            let { message } = e.response.data;
            setMessageError(message);
        }
    }

    return (
        <>
            <form schema={schema} onSubmit={handleSubmit}>
                <span>{messageError ? messageError : ''}</span>
                <span>{successCreate ? successCreate : ''}</span>
                <input name="name" type="text" placeholder="Nome completo" />
                <input
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Informe seu e-mail"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Informe uma senha"
                />
                <button type="submit">Cadastrar</button>
                <Link to="/singIn">Já tenho uma conta</Link>
            </form>
        </>
    );
}
