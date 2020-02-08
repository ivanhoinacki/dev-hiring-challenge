import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    *{
        /** remove as margins e padding etc.. */
        margin:0;
        padding:0;
        outline:0;
        box-sizing:border-box;
    }

    *:focus{
        outline:0; /** remove o focus do chrome */
    }

    html, body, #root{
        height:100%;
    }


    body{
        -webkit-font-smoothing:antialiased;/** Deixar as fontes mais definidas */
    }

    /** definindo a fonte e tamanho padrao */
    body, input, button{
        font-size:14px 'Roboto', sans-serif;
    }

    a{
        text-decoration:none;
    }

    ul{
        list-style:none;
    }

    button{
        cursor:pointer;
    }
`;
