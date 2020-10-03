import $ from 'jquery'
import app from './app'
import item from './item'
import store from './store'
import api from './api'

function handleAddItem() {

    console.log('addItem called')

    $('body').on('submit', '#bookmark-form', (e) => {

        e.preventDefault()
        try {

            let titleValue = $('#title').val()
            let description = $('#description').val()
            let rating = $('#rate').val()
            let url = $('#url').val()
            item.validateName(titleValue)
            item.validateUrl(url)
            item.items.push(item.createItem(titleValue, description, rating, url))
            let itemList = [...item.items]
            api.getBookmarks.then

            console.log(itemList)

            // Change this to grab from API
            $('.bookmark-head-list').html(store.mapstore(itemList))
            console.log('Submit Triggered')

        }

        catch (error) {

            console.log(error.message)

        }
    })
}

function handleToggleHidden() {

    console.log('ran handleToggleHidden')

    $('body').on('click', '.bookmark-head', function (e) {
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
    $('body').on('click', '.cancel', function () {
        console.log('cancel button clicked')
        return app.mainPageHTML()
    })
}

function handleAddButtonClick() {
    $('body').on('click', '.add', function (e) {
        e.preventDefault()
        return $('body').html(`<h1>Bookmark App</h1> ${app.dropDownForm()} <ul class='bookmark-head-list'> </ul>`)

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
