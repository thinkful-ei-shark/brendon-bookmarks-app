const BASE_URL = `https://thinkful-list-api.herokuapp.com`
const USER = 'brendon-jennett'

const endpoint = `${BASE_URL}/${USER}/bookmarks/`


function getBookmarks() {
    return fetch(endpoint).then(res => res.json())
}


function addNewItem(item) {

    let newItem = JSON.stringify(item);
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    })
}

function deleteItem(id) {
    return fetch(endpoint + id, {
        method: 'DELETE'
    })
}

export default {

    deleteItem,
    getBookmarks,
    addNewItem

}
