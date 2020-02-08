import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import AuthLayout from '@/pages/_layouts/AuthLayout';
import DefaultLayout from '@/pages/_layouts/DefaultLayout';

import { store } from '@/store';

export default function RouterWrapper({
    // aqui eu faco a verificar das nossas paginas privadas
    // esse nosso component faz a verificacao baseada em condicoes
    component: Component,
    isPrivate,
    ...rest
}) {
    // Verificacao se o usuario esta logado
    // caso nao esteja redireciona para o login
    // pega via desestruturacao meu objeto singned do auth
    const { signed } = store.getState().auth;

    if (!signed && isPrivate) {
        return <Redirect to="/singIn" />;
    }

    // Se ele tiver logado e nao for privada ele manda pro main
    if (signed && !isPrivate) {
        return <Redirect to="/main" />;
    }

    // Valido se o usuario esta logado definindo o tipo
    const Layout = signed ? DefaultLayout : AuthLayout;

    // dentro do metodo render, passamos uma funcao que recebe todas as propriedades da tela
    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

RouterWrapper.propTypes = {
    isPrivate: PropTypes.bool, // definindo que meu atributo e boolean e nao e required
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired, // Estou definido que o tipo do atributo de entrada pode ser element e func e ele e required
};

RouterWrapper.defaultProps = {
    // Estou definindo que o valor padrao do atributo e false
    isPrivate: false,
};
