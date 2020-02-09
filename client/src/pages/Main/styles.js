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
        border-top-width: none !important;
        border-bottom-right-radius: none !important;
        border-bottom-left-radius: none !important;
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
        padding-top: 42px;
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

export const Spanstatus = styled.span`
    position: relative;
    padding: -0.25rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: ${props => (props.attrDone ? '#155724' : '#856404')};
    background-color: ${props => (props.attrDone ? '#d4edda' : '#fff3cd')};
    border-color: ${props => (props.attrDone ? '#c3e6cb' : '#ffeeba')};
`;
