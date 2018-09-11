import '../scss/main.scss';
import templateItem from '../template/friend.hbs';

const api = require('./modules/vkApi.js');
const auth = require('./modules/vkAuth.js');
const renderData = require('./modules/renderData.js');
const eventButton = require('./modules/eventButton.js')();
const filterFriends = require('./modules/filterFriends.js')();
const dragAndDrop = require('./modules/dragAndDrop.js')();
let friendsObj;

window.addEventListener('load', () => {
    auth
        .then(() => {
            return api('users.get', { v: 5.68, fields: 'first_name, last_name, photo_100' });
        })
        .then((data) => {
            const [user] = data;
            
            return api('friends.get', { v: 5.68, fields: 'first_name, last_name, photo_100' });
        })
        .then(data => {
            friendsObj = require('./modules/getData.js')(data);
            renderData(friendsObj.firstList, '#friends__list_0', templateItem);
            renderData(friendsObj.secondList, '#friends__list_1', templateItem);
        })
        .catch(function(e) {
            alert('Ошибка: ' + e.message);
        });
});

eventButton.setSelector('.lists-friends');
dragAndDrop.setSelector('#friends__list_0');

const save = document.querySelector('#save');

save.addEventListener('click', () => {
    localStorage.myFriends = JSON.stringify(friendsObj);
    alert('сохранено!');
});

export { friendsObj };