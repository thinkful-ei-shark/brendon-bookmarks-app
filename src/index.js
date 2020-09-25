import $ from 'jquery'
import cuid from 'cuid'

//FOCUS ON: CLICKING BOOKMARK HEAD TO OPEN DROP DOWN LIST


// <i class="fas fa-star"></i> THIS IS STAR ICON
// make star icon either appear as many as ratings value is
// or make 5 stars and have it change color according to target
// use a for loop and insert rating value into i < rating


let items = []

//this will have to render with every new bookmark
//make bookmarkTemplate return
//bookmark will need to take in map ...items

function bookmarkTemplate(item) {
    // add if statement for hidden that if hidden is set to false it will show drop down

    let itemTitle = `<li data-item-id="${item.id}" class="bookmark-drop-downs">${item.title}, Rating: ${item.rating}</li>

        <ul class='hidden'>
            <li>${item.url}</li>
            <li>${item.desc}</li>
        </ul>
`

    if (!item.hidden) {
        itemTitle = `<li id='${item.id}'>${item.title}, Rating: ${item.rating}</li>

        <ul>
            <li>${item.url}</li>
            <li>${item.desc}</li>
        </ul>
        `
    }

    return itemTitle
    // this will have to take from the object in items, since items is an array will have
    // to make it find the index of item with indexOf()
    // this will take in a template like this
    //  <li>Title - Rating(How ever many stars)</li>
    //         <ul>
    //         <li>
    //             Url
    //         </li>
    //         <li>
    //             Description
    //         </li>

}
// function that shows how many stars are seen by rating
// take values of
function dropDownForm() {
    return `
    <form id = 'bookmark-form' >

    <label for='title'>Title</label>
    <input id="title" name='bookmark-form' type="text" required>
    <label for='url'>Url</label>
    <input id="url" name='bookmark-form' type="url" required>
    <label for="description">Description</label>
    <textarea id="description" name='bookmark-form'></textarea>
    <label for='rate'>Rate</label>
    <select id='rate' name='bookmark-form' type="text">
        <option value="1">1 Star</option>
        <option value="2">2 Star</option>
        <option value="3">3 Star</option>
        <option value="4">4 Star</option>
        <option value="5">5 Star</option>
    </select>
    <button type='submit'>Submit</button>
    <button type="reset">Cancel</button>

</form>`

}

/////////////////////////////////////
// use this set up for form        //
// const create = function(name) { //
//     return {                    //
//       id: cuid(),               //
//       name,                     //
//       checked: false            //
//     };                          //
//   };                            //
/////////////////////////////////////
//this takes in things like hidden = boolean, title,
//when hidden set to true run if statement that runs the currentTarget drop down from
//bookmark head //createItem should take in #title value
function createItem(title, desc, rating) {

    return {
        id: cuid(),
        title,
        // this will hide the drop down menu that holds description and url
        // make function if currentTarget is clicked then set hidden to opposite boolean
        hidden: true,
        desc,
        rating
    }

}

// make function that spreads items
function handleAddItem() {

    console.log('addItem called')

    $('body').on('submit', '#bookmark-form', e => {

        e.preventDefault()

        let titleValue = $('#title').val()
        let description = $('#description').val()
        let rating = $('#rate').val()
        items.push(createItem(titleValue, description, rating))

        let item = [...items]
        $('.bookmark-head-list').html(mapItems(item))

        console.log(titleValue)
        render()
    })
}

function getIdOfItem(current) {
    return $(current)
        .closest('.bookmark-drop-downs')
        .data('item-id')
}

// use this on both deleteItem and toggleHidden
function findById(id) {

    return items.find(currentItem => currentItem.id === id)

}

// when bookmark head is click this needs to run
function toggleFindAndHidden(id) {

    let current = findById(id)
    console.log(current)
    current.hidden = !current.hidden

}

function handleToggleHidden(){
    console.log('ran handleToggleHidden')
    $('.bookmark-head-list').on('click', 'li', function(e){
        let getId = getIdOfItem(e.target)
        console.log(getId)
        toggleFindAndHidden(getId)
        console.log(items)
        render()
    })

}
console.log(items)

function displayHTML() {
    $('#add-form').html(dropDownForm())
}
//see list of bookmarks in condensed view when app is open
//click on bookmark to display view
//make form collapse into bookmark name when submitted
//set form to be hidden by default
//use if statement to check a boolean value
//if boolean value is set to
//bookmarkHead is going to need the Title and Rating
//the dropdown menu will need the Description and Url

// function bookmarkHead() {

//     return ``

// }
//can remove bookmark from list

// items needs to be spread then joined
function mapItems(i) {
    let item = i.map(item => bookmarkTemplate(item))
    return item.join('')

}



//receive feedback when unable to submit bookmark

//dropdown list <select> with a minimum rating filter to filter bookmarks at or above chosen rating
function render() {
    handleToggleHidden()
    handleAddItem()
    displayHTML()

}


// place 2 types of functions ones with handlers and functions that
// need to display on initial load
$(render)
