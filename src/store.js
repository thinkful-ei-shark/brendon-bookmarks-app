import $ from 'jquery'
import item from './item'
import api from './api'

// HAVE TO ADD DELETE BUTTON TO EVERY NEW BOOKMARK (An Edit/Patch is optional)

// call rating value <div >
function dropDownForm() {
    return `
    <form id='bookmark-form' >

    <label for='title'>Title</label>
    <input id="title" type="text" placeholder='Required' required>
    <label for='url'>Url</label>
    <input id="url" type="url" placeholder='Required' required>
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
    let fafastar = `<div class='fa fa-star'></div>`.repeat(item.rating);

    let itemTitle = `<div data-item-id="${item.id}" class="bookmark-head black">${item.title},
        Rating: ${fafastar} <br>
        <button class='delete'>Delete</button>
        <ul id='bookmark-dropdown' class='hidden'>
            <a href=${item.url}><li>${item.url}</li></a>
            <li>${item.desc}</li>
        </ul>
    </div>`

    if (item.checked) {
        if (!$('#description').val()) {
            item.desc = 'N/A'
        }
        itemTitle = `<div data-item-id="${item.id}" class="bookmark-head black">${item.title},
        Rating: ${fafastar} <br>
            <button class='delete'>Delete</button>
            <ul id='bookmark-dropdown'>
            <a href=${item.url}><li>${item.url}</li></a>
            <li>${item.desc}</li>
        </ul>
    </div>


    </div>`

    }

    return itemTitle

}

function addButtonTemplate() {
    return `<button name='add' id='add' class='add'>Add</button> `

}

function filterSelectTemplate() {
    return `<select class='filter'>
        <option value=${1}>1+ Stars</option>
        <option value=${2}>2+ Stars</option>
        <option value=${3}>3+ Stars</option>
        <option value=${4}>4+ Stars</option>
        <option value=${5}>5+ Stars</option>
    </select>`

}



function mainPageHTML() {

    // Get bookmarks and place them into bookmark-head-list
    return $('main').html(`<div class='main'> <h1>Bookmark App</h1> ${addButtonTemplate()} FilterBy: ${filterSelectTemplate()} <ul class='bookmark-head-list'></div></ul >`)

}



function getIdOfItem(current) {
    console.log(current, 'current')
    return $(current)
        .closest('.bookmark-head')
        .data('item-id')
}


function findById(id) {

    console.log(item, 'item')
    return item.items.find(currentItem => currentItem.id === id)

}

function displayBookmarkApiList() {
    // when filter changes we want to render()
    api.getBookmarks()
        .then(bookmarksResJson => {
            console.log(bookmarksResJson, 'bookmarkResJson')
            item.items = bookmarksResJson.filter(item => item.rating >= $('.filter').val())
            $('.bookmark-head-list').html(mapstore(item.items))
        }
        )

}


function mapstore(i) {

    let item = i.map(item => bookmarkTemplate(item))
    return item.join('')

}

const render = () => {

    //For some reason page will not update unless there is 2 displayBookmarkApiList
    // and will not delete unless there is 3...
    displayBookmarkApiList()
    displayBookmarkApiList()
    displayBookmarkApiList()
    mainPageHTML()
    bookmarkTemplate()

}

export default {

    render,
    mapstore,
    displayBookmarkApiList,
    mainPageHTML,
    findById,
    getIdOfItem,
    dropDownForm,
    bookmarkTemplate

}
