import $ from 'jquery'
import cuid from 'cuid'
import item from './items'
//FOCUS ON: CLICKING BOOKMARK HEAD TO OPEN DROP DOWN LIST


// <i class="fas fa-star"></i> THIS IS STAR ICON
// make star icon either appear as many as ratings value is
// or make 5 stars and have it change color according to target
// use a for loop and insert rating value into i < rating




function bookmarkTemplate(item) {

    let itemTitle = `<li data-item-id="${item.id}" class="bookmark-head">${item.title}, Rating: ${item.rating}</li>

        <ul id='bookmark-dropdown' class='hidden'>
            <li>${item.url}</li>
            <li>${item.desc}</li>
        </ul>
`

    return itemTitle

}
// function that shows how many stars are seen by rating

function dropDownForm() {
    return `
    <form id = 'bookmark-form' >

    <label for='title'>Title</label>
    <input id="title" name='bookmark-form' type="text" placeholder='Required' required>
    <label for='url'>Url</label>
    <input id="url" name='bookmark-form' type="url" placeholder='Required' required>
    <label for="description">Description</label>
    <textarea id="description" name='bookmark-form' placeholder='Recommended'></textarea>
    <label for='rate'>Rate</label>
    <select id='rate' name='bookmark-form' type="text">
        <option value="1">1 Star</option>
        <option value="2">2 Star</option>
        <option value="3">3 Star</option>
        <option value="4">4 Star</option>
        <option value="5">5 Star</option>
    </select>
    <button type='submit'>Submit</button>
    <button class='cancel' type="reset">Cancel</button>

</form>`

}

function addButtonTemplate() {
    return `<button name='add' id='add' class='add'>Add</button>`
}

function createItem(title, desc, rating) {

    return {

        id: cuid(),
        title,
        desc,
        rating

    }

}


function handleAddItem() {

    console.log('addItem called')

    $('#bookmark-form').on('submit', (e) => {

        e.preventDefault()

        let titleValue = $('#title').val()
        let description = $('#description').val()
        let rating = $('#rate').val()
        item.items.push(createItem(titleValue, description, rating))
        let item = [...item.items]

        $('.bookmark-head-list').html(mapItems(item))

        console.log(titleValue)

    })
}

function getIdOfItem(current) {
    return $(current)
        .closest('.bookmark-head')
        .data('item-id')
}

// use this on delete
function findById(id) {

    return item.items.find(currentItem => currentItem.id === id)

}

function handleToggleHidden() {

    console.log('ran handleToggleHidden')

    $('.bookmark-head-list').on('click', '.bookmark-head', function (e) {

        let getId = getIdOfItem(e.target)
        console.log(getId)
        let id = findById(getId)
        $('.bookmark-head').children('#bookmark-dropdown').toggleClass('hidden')

        console.log(item.items)
    })

}
console.log(item.items)

function mainPageHTML() {
    return $('body').html(`<h1>Bookmark App</h1> ${addButtonTemplate()} <ul class='bookmark-head-list'></ul>`)
}

function addButtonClick() {
    $('body').on('click', '.add', function (e) {
        e.preventDefault()
        return $('body').html(`<h1>Bookmark App</h1> ${dropDownForm()} <ul class='bookmark-head-list'> </ul>`)

    })
}

function cancelButtonClick() {
    $('body').on('click', '.cancel', function () {
        console.log('cancel button clicked')
        return mainPageHTML()
    })
}
//see list of bookmarks in condensed view when app is open
//click on bookmark to display view
//make form collapse into bookmark head when submitted

function mapItems(i) {
    let item = i.map(item => bookmarkTemplate(item))
    return item.join('')

}



//receive feedback when unable to submit bookmark

//dropdown list <select> with a minimum rating filter to filter bookmarks at or above chosen rating


function render() {
    handleAddItem()
    mainPageHTML()
    cancelButtonClick()
    addButtonClick()
    handleToggleHidden()



}


// place 2 types of functions ones with handlers and functions that
// need to display on initial load
$(render)
