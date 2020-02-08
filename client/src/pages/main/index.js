import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { Container } from './styles';

import api from '~/services/api';

export default function Main() {
    const [lists, setLists] = useState([]);
    const [boards, setBoards] = useState([]);
    const [boardId, setBoardId] = useState('');

    useEffect(() => {
        async function onLoad() {
            try {
                /**
                 * Carrega os boards do content
                 */
                const boards = await api.get('', { params: { '': '' } });
                setBoards(boards);
                setBoardId(document.querySelector('[name="lista"]').value);
                setLists(boards[0].lists);
            } catch (e) {
                console.log(e);
            }
        }
        onLoad();
    }, []);

    /************************   HANDLERS   ******************************/
    /**
     * Botao remove mesa selecionada
     */
    async function handlerRemoveBoard(event) {
        try {
            event.preventDefault();
            let board = await api.get('', { params: { '': '' } });
            if (board) {
                let boards = await api.get('', { params: { '': '' } });
                setBoards(boards);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Troca de board
     */
    async function handleBoardChange(event) {
        try {
            setBoardId(event.target.value);
            const boardsById = await api.get('', { params: { '': '' } });
            setLists(boardsById.lists);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Botao adicionar nova mesa
     */
    async function handlerAddBoard(event) {
        try {
            event.preventDefault();
            let board = await api.get('', { params: { '': '' } });
            if (board) {
                let boards = await api.get('', { params: { '': '' } });
                setBoards(boards);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /************************   RENDERS   ******************************/
    function renderButtonAddListFromBoard() {
        return (
            <div className="lists-content">
                <Form>
                    <Form.Label>Lists</Form.Label>
                    <br />
                    <Link key="new" to={`/list/new/${boardId}`}>
                        <Button className="button-new-list" variant="info">
                            <b>{'\uFF0B'}</b>&nbsp;Add
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    }

    function renderBoardList(boards) {
        return (
            <div className="boards-content">
                <Form onSubmit={handlerRemoveBoard}>
                    <Form.Label>Projects</Form.Label>
                    <Form.Control onChange={handleBoardChange} name="lista" as="select">
                        {renderBoardOptions(boards)}
                    </Form.Control>

                    <Button className="button-add-board" onClick={handlerAddBoard} variant="info">
                        <b>{'\uFF0B'}</b>&nbsp;Add
                    </Button>
                    <Button className="button-remove-board" type="submit" variant="secondary">
                        Delete
                    </Button>
                </Form>
            </div>
        );
    }

    function renderBoardOptions(boards) {
        return [].concat(boards).map((board, i) => (
            <option key={i} value={board._id}>
                {board.title}
            </option>
        ));
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-6">{renderButtonAddListFromBoard()}</div>
                <div className="col-md-6">{renderBoardList(boards)}</div>
            </div>
            {/* <div className="row">{renderListFromBoard(lists)}</div> */}
        </Container>
    );
}
