import React from 'react';

import PropTypes from 'prop-types';
// meu component css criado pelo styled-components
import { Wrapper, WrapperRegistration } from './styles';
// - children Sao todos os componentes que sao filhos do meu Wrapper

import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
    let register = null;
    switch (children.props.match.path) {
        case '/project/new/:id':
        case '/list/new/:id':
        case '/task/new/:id':
            register = true;
            break;
        default:
            register = false;
            break;
    }
    console.log(register);
    console.log(children.props.match.path);
    return register ? (
        <WrapperRegistration>
            <Header />
            {children}
        </WrapperRegistration>
    ) : (
        <Wrapper>
            <Header />
            {children}
        </Wrapper>
    );
}

// toda vez que criamos um component e o mesmo faz uso de atributos devemos declare eles
// como prop-types, definindo assim seu tipo
// ex: AuthLayout - Proptype do tipo func
// ex: <AuthLayout/> - Proptype do tipo elemento

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
