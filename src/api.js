const { post } = require("jquery");

const BASE_URL = `https://thinkful-list-api.herokuapp.com`
const USER = 'brendon-jennett'

const endpoint = `${BASE_URL}/${USER}/bookmarks`

function getBookmarks() {
    return fetch(`${endpoint}`)
}

function addNewItem(item) {

    let newItem = JSON.stringify(item);

    return fetch(`${endpoint}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    }
}

export default {

    getBookmarks,
    addNewItem

}
