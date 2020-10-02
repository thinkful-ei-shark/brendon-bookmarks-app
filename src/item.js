import cuid from 'cuid'

let items = []

const validateName = function (name) {
    if (!name) throw new TypeError('Name must not be blank');
};

const validateUrl = function (url) {
    if (!url || url[0, 4] === 'http') throw new TypeError('URL must not be blank');
};

function createItem(title, desc, rating, url) {

    return {

        id: cuid(),
        title,
        url,
        desc,
        rating,
        checked: false

    }

}

export default {
    validateUrl,
    validateName,
    items,
    createItem

}
