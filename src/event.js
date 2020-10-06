import $ from 'jquery'
import app from './app'
import item from './item'
import store from './store'
import api from './api'


console.log(api.getBookmarks())

function handleAddItem() {

    console.log('addItem called')

    $('main').on('submit', '#bookmark-form', (e) => {

        e.preventDefault()
        try {

            let titleValue = $('#title').val()
            let description = $('#description').val()
            let rating = $('#rate').val()
            let url = $('#url').val()
            item.validateName(titleValue)
            item.validateUrl(url)

            let bookmark = item.createItem(titleValue, description, rating, url)

            item.items.push(bookmark)
            let itemList = [...item.items]

            console.log(itemList)
            app.mainPageHTML()
            api.addNewItem(bookmark)
            app.displayBookmarkApiList()

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

function handleDelete() {
    $('main').on('click', '.delete', function (e) {
        e.preventDefault()

        console.log('Clicked Delete')

        let getId = app.getIdOfItem(e.target)
        console.log(getId, "Get Id")
        let id = app.findById(getId)
        console.log(id, 'id')

        api.deleteItem(id)
        app.mainPageHTML()
    })

}

function handleCancelButtonClick() {

    $('main').on('click', '.cancel', function () {
        console.log('cancel button clicked')
        app.mainPageHTML()
        app.displayBookmarkApiList()

    })

}

function handleAddButtonClick() {

    $('main').on('click', '.add', function (e) {
        e.preventDefault()
        return $('main').html(`<h1>Bookmark App</h1> ${app.dropDownForm()} <ul class='bookmark-head-list'> </ul>`)

    })
}




const bindEventListeners = () => {

    handleDelete()
    handleCancelButtonClick()
    handleAddButtonClick()
    handleToggleHidden()
    handleAddItem()

}

export default {

    bindEventListeners,


}
