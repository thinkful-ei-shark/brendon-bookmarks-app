import $ from 'jquery'
import item from './item'
import api from './api'
import store from './store'
// HAVE TO ADD DELETE BUTTON TO EVERY NEW BOOKMARK (An Edit/Patch is optional)


function dropDownForm() {
    return `
    <form id='bookmark-form' >

    <label for='title'>Title</label>
    <input id="title" type="text" placeholder='Required'>
    <label for='url'>Url</label>
    <input id="url" type="url" placeholder='Required'>
    <label for="description">Description</label>
    <textarea id="description" placeholder='Recommended'></textarea>
    <label for='rate'>Rate</label>
    <select id='rate' type="text">
        <option value="1">1 Star</option>
        <option value="2">2 Star</option>
        <option value="3">3 Star</option>
        <option value="4">4 Star</option>
        <option value="5">5 Star</option>
    </select>
    <button class='bookmark-submit-button' type='submit'>Submit</button>
    <button class='cancel' type="reset">Cancel</button>

</form>`

}

function bookmarkTemplate(item) {

    let itemTitle = `<div class='bookmark'><div data-item-id="${item.id}" class="bookmark-head">${item.title},
    Rating: ${item.rating}</div>
    <button class='delete'>Delete</button>

        <ul id='bookmark-dropdown' class='hidden'>
            <li>${item.url}</li>
            <li>${item.desc}</li>
        </ul>
</div>`
    if (item.checked) {
        if (!$('#description').val()) {
            item.desc = 'No Input'
        }
        itemTitle = `<div class='bookmark>'<div data-item-id="${item.id}" class="bookmark-head">${item.title},
        Rating: ${item.rating}</div>
        <button class='delete'>Delete</button>

            <ul id='bookmark-dropdown'>
                <li>${item.url}</li>
                <li>${item.desc}</li>
            </ul>
            </div>
    `
    }

    return itemTitle

}

function addButtonTemplate() {
    return `<button name='add' id='add' class='add'>Add</button>`
}

function mainPageHTML() {

    // Get bookmarks and place them into bookmark-head-list
    return $('main').html(`<h1>Bookmark App</h1> ${addButtonTemplate()} <ul class='bookmark-head-list'></ul>
    `)

}



function getIdOfItem(current) {
    return $(current)
        .closest('.bookmark-head')
        .data('item-id')
}


function findById(id) {
    console.log(item, 'item')
    return item.items.find(currentItem => currentItem.id === id)

}

function displayBookmarkApiList() {
    api.getBookmarks()
        .then(bookmarksResJson => {
            item.items = bookmarksResJson
            $('.bookmark-head-list').html(store.mapstore(item.items))
        }
        )
}


export default {

    displayBookmarkApiList,
    mainPageHTML,
    findById,
    getIdOfItem,
    dropDownForm,
    bookmarkTemplate

}
