import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile, Button } from './Header_Styles';

import logo from '~/assets/img/edirect-logo.svg';
import { logOut } from '~/store/modules/auth/actions';

export default function Header() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function onHandlerClickLogout() {
        dispatch(logOut());
    }
    return (
        <Container>
            <Content>
                <nav>
                    <h1>
                        <img src={logo} alt="Endirect logos" />
                    </h1>
                    <Link to="/main">Main</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                        </div>
                    </Profile>
                </aside>
                <Button onClick={onHandlerClickLogout}>Logout</Button>
            </Content>
        </Container>
    );
}
