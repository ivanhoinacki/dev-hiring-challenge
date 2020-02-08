import React from 'react';

import PropTypes from 'prop-types';
// meu component css criado pelo styled-components
import { Wrapper } from './styles';
// - children Sao todos os componentes que sao filhos do meu Wrapper
export default function DefaultLayout({ children }) {
    return <Wrapper>{children}</Wrapper>;
}

// toda vez que criamos um component e o mesmo faz uso de atributos devemos declare eles
// como prop-types, definindo assim seu tipo
// ex: AuthLayout - Proptype do tipo func
// ex: <AuthLayout/> - Proptype do tipo elemento

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
