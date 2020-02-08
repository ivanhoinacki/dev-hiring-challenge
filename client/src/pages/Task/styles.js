import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    width: 360px;
    padding: 20px;
    @media all and (min-width: 480px) {
        .new-task {
            padding: 60px 0;
        }

        .new-task form {
            margin: 0 auto;
            max-width: 320px;
        }
    }
    .button-board-actions {
        width: 100%;
    }

    .button-save-task {
        width: 150px;
        margin: 5px;
    }
    .button-cancel-task {
        width: 150px;
        margin: 5px;
    }
`;
