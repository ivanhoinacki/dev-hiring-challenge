import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    .description-card {
        font-size: 12px;
        font-family: Arial, Helvetica, sans-serif;
        text-align: justify;
    }

    .button-edit-card {
        font-size: 10px;
        float: right;
    }

    .button-new-list {
        font-size: 10px;
        width: 90px;
        height: 29px;
    }

    .button-remove-list {
        float: right;
    }

    .lists-content {
        float: left;
        width: 200px;
        margin-bottom: 15px;
    }

    .projects-content {
        float: right;
        width: 200px;
        margin-bottom: 15px;
    }
    .button-add-project {
        font-size: 10px;
        margin: 5px;
        width: 90px;
    }
    .button-remove-project {
        font-size: 10px;
        margin: 5px;
        width: 90px;
    }
`;
