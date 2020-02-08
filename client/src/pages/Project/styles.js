import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    width: 360px;
    padding: 20px;
    @media all and (min-width: 480px) {
        .new-project {
            padding: 60px 0;
        }

        .new-project form {
            margin: 0 auto;
            max-width: 320px;
        }
    }
    .button-project-actions {
        width: 100%;
    }

    .button-save-project {
        width: 150px;
        margin: 5px;
    }
    .button-cancel-project {
        width: 150px;
        margin: 5px;
    }
`;
