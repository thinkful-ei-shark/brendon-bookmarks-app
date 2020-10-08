import $ from 'jquery'
import item from './item'
import store from './store'
import api from './api'

function handleAddItem() {

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
            api.addNewItem(bookmark).then(() => store.displayBookmarkApiList())


            store.render()





        }

        catch (error) {

        }
    })
}

function handleToggleHidden() {

    $('main').on('click', '.bookmark-head', function (e) {
        let getId = store.getIdOfItem(e.target)
        let id = store.findById(getId)
        id.checked = !id.checked
        let itemList = [...item.items]
        $('.bookmark-head-list').html(store.mapstore(itemList))
    })
}

function handleFilter() {

    $('main').on('change', '.filter', function () {
        store.displayBookmarkApiList()
    })

}

function handleDelete() {
    $('main').on('click', '.delete', function (e) {
        e.preventDefault()
        let getId = store.getIdOfItem(e.currentTarget)
        let id = store.findById(getId)
        api.deleteItem(id.id).then(() => store.displayBookmarkApiList())
        store.render()
    })

}

function handleCancelButtonClick() {

    $('main').on('click', '.cancel', function () {
        store.render()

    })

}

function handleAddButtonClick() {

    $('main').on('click', '.add', function (e) {
        e.preventDefault()

        return $('main').html(`<div class='main'><h1>Bookmark App</h1> ${store.dropDownForm()} <ul class='bookmark-head-list'></ul><div>`)

    })
}




const bindEventListeners = () => {

    handleFilter()
    handleDelete()
    handleCancelButtonClick()
    handleAddButtonClick()
    handleToggleHidden()
    handleAddItem()

}

export default {

    bindEventListeners,


}
