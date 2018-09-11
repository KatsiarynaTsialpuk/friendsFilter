module.exports = () => {
    const handlers = {
        handlerFilterFriends: event => {
            if (event.target.classList.contains('form__search')) {
                let target = event.target,
                    value = target.value.trim().toLowerCase(),
                    list = target.parentNode.parentNode.querySelector('.friends__list'),
                    items = list.children;

                for (let i = 0, length = items.length; i < length; i++) {
                    let item = items[i],
                        name = item.querySelector('.friend__name').innerText.toLowerCase();

                    if (name.includes(value)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
        }
    }

    document.addEventListener('keyup', handlers.handlerFilterFriends);
};