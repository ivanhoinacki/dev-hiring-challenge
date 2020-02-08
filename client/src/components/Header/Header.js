import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './Header_Styles';

import logo from '@/assets/img/edirect-logo.svg';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <h1>
                        <img src={logo} alt="GoBarber" />
                    </h1>
                    <Link to="/main">Dashboard</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                        </div>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
