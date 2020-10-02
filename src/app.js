import $ from 'jquery'
import item from './item'



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

    let itemTitle = `<li data-item-id="${item.id}" class="bookmark-head">${item.title}, Rating: ${item.rating}</li>

        <ul id='bookmark-dropdown' class='hidden'>
            <li>${item.url}</li>
            <li>${item.desc}</li>
        </ul>
`
    if (item.checked) {
        if (!$('#description').val()) {
            item.desc = 'No Input'
        }
        itemTitle = `<li data-item-id="${item.id}" class="bookmark-head">${item.title}, Rating: ${item.rating}</li>

    <ul id='bookmark-dropdown'>
        <li>Url: ${item.url}</li>
        <li>Desc: ${item.desc}</li>
    </ul>
`

    }

    return itemTitle

}

function addButtonTemplate() {
    return `<button name='add' id='add' class='add'>Add</button>`
}

function mainPageHTML() {

    // Get bookmarks and place them into bookmark-head-list
    return $('body').html(`<h1>Bookmark App</h1> ${addButtonTemplate()} <ul class='bookmark-head-list'></ul>`)

}



function getIdOfItem(current) {
    return $(current)
        .closest('.bookmark-head')
        .data('item-id')
}


function findById(id) {

    return item.items.find(currentItem => currentItem.id === id)

}


export default {

    mainPageHTML,
    findById,
    getIdOfItem,
    dropDownForm,
    bookmarkTemplate

}
