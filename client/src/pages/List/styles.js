import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    @media all and (min-width: 480px) {
        .new-board {
            padding: 60px 0;
        }

        .new-board form {
            margin: 0 auto;
            max-width: 320px;
        }
    }
    .button-board-actions {
        width: 100%;
    }

    .button-save-list {
        width: 150px;
        margin: 5px;
    }
    .button-cancel-list {
        width: 150px;
        margin: 5px;
    }
`;
