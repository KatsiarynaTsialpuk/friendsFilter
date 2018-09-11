module.exports = new Promise((resolve, reject) => {
    VK.init({
        apiId: 6676949
    });

    VK.Auth.login(data => {
        if (data.session) {
            resolve();
        } else {
            reject(new Error('Не удалось авторизироваться'));
        }
    }, 2);
});