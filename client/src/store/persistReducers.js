import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    // Aqui vou criar meu persist reducer para salvar minhas informacoes do usuario
    // e login, dizendo que somente os objetos auth e user sao percistidos
    const persistedReducer = persistReducer(
        {
            key: 'todolist-edirectinsure',
            storage,
            whitelist: ['auth', 'user'],
        },
        reducers
    );

    return persistedReducer;
};
