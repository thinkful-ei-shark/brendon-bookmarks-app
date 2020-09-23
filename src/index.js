import $ from 'jquery'
//FOCUS ON: MAKING BOOKMARK HEADS



//build a createItem function that takes in the values of title to display bookmark name
//and rating in bookmark head
let items = []
//make form with title, url link, description, rating
//this will have to render with every new bookmark

//for every bookmark head it will need to be put into a <li></li>

//make bookmarkTemplate return
function bookmarkTemplate() { }

// take values of
function dropDownForm() {
    return `
    <form>

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
function createItem(title) {

    return {
        title,
        id: cuid(),
        hidden: false
    }

}

function addItem() {
    let titleValue = $('#title').val()
    $('form').on('submit', e => {
        e.preventDefault()
        items.push(createItem(titleValue))
        console.log(titleValue)
    })
}
console.log(items)

function displayHTML() {
    $('#result').html(dropDownForm)
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

//receive feedback when unable to submit bookmark

//dropdown list <select> with a minimum rating filter to filter bookmarks at or above chosen rating
function render() {
    displayHTML
    dropDownForm
}

$(render)
