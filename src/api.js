const BASE_URL = `https://thinkful-list-api.herokuapp.com`
const USER = 'brendon-jennett'

const endpoint = `${BASE_URL}/${USER}/bookmarks/`

// This will retrieve the bookmarks and will be placed inside of the
function getBookmarks() {
    return fetch(endpoint)
}


// item will be the item being added
function addNewItem(item) {

    //this will go into body so it has to be an object
    let newItem = JSON.stringify(item);

    return fetch(endpoint), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    }
}

function deleteItem(id) {
    return fetch(endpoint + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
}

export default {

    getBookmarks,
    addNewItem

}
