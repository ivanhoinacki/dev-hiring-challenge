module.exports = {
    url: 'http://localhost:8000',
    token: getToken(),
    user: getUser(),
};

function getToken() {
    try {
        return JSON.parse(localStorage.getItem('session'))['token'];
    } catch (error) {
        return {};
    }
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem('session'))['user'];
    } catch (error) {
        return {};
    }
}
