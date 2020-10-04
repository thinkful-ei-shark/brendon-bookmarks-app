import $, { map } from 'jquery'
import app from './app'
import item from './item'
import store from './store'
import api from './api'
import event from './event'


console.log(api.getBookmarks())

function handleAddItem() {

    console.log('addItem called')

    $('main').on('submit', '#bookmark-form', (e) => {

        e.preventDefault()
        try {

            // I can change the properties of items to what these are
            // then push them to the api storage

            // FOR EXAMPLE instead of createItem(etc.) we could do
            // item.items.title = $('#title').val()

            let titleValue = $('#title').val()
            let description = $('#description').val()
            let rating = $('#rate').val()
            let url = $('#url').val()
            item.validateName(titleValue)
            item.validateUrl(url)

            //instead of pushing we could make this a variable
            let bookmark = item.createItem(titleValue, description, rating, url)

            // This has a chance of not being needed
            // CANNOT GRAB FROM FETCH, SOLUTION: UPLOAD TO item.items ALSO
            // from the item.js
            item.items.push(bookmark)
            let itemList = [...item.items]
            console.log(itemList)

            // I want a single object to be pushed to the API
            // DONT USE ITEMLIST BECAUSE IT CONTAINS ALL THE ITEMS
            api.addNewItem(bookmark)
            api.getBookmarks()
                .then(bookmarksRes => bookmarksRes.json())
                .then(bookmarksResJson => {
                    console.log(bookmarksResJson)
                    $('.bookmark-head-list').html(store.mapstore(bookmarksResJson))
                }
                )

            // .then(
            //     api.getBookmarks().then(res => res.json()).then()
            // ).then(console.log(bookmark))

            //Change this to grab from API

            console.log('Submit Triggered')

        }

        catch (error) {

            console.log(error.message)

        }
    })
}

function handleToggleHidden() {

    console.log('ran handleToggleHidden')

    $('main').on('click', '.bookmark-head', function (e) {
        console.log('Ran handleToggleButton')
        let getId = app.getIdOfItem(e.target)
        console.log(getId)
        let id = app.findById(getId)
        id.checked = !id.checked
        console.log(id)
        console.log(item.items)
        let itemList = [...item.items]
        console.log(itemList)
        $('.bookmark-head-list').html(store.mapstore(itemList))

    })
}

function handleCancelButtonClick() {

    $('main').on('click', '.cancel', function () {
        console.log('cancel button clicked')
        return app.mainPageHTML()
    })

}

function handleAddButtonClick() {

    $('main').on('click', '.add', function (e) {
        e.preventDefault()
        return $('main').html(`<h1>Bookmark App</h1> ${app.dropDownForm()} <ul class='bookmark-head-list'> </ul>`)

    })
}




const bindEventListeners = () => {

    handleCancelButtonClick()
    handleAddButtonClick()
    handleToggleHidden()
    handleAddItem()

}

export default {

    bindEventListeners,


}
