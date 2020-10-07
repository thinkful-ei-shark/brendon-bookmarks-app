import $ from 'jquery'
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

            console.log(bookmark)

            api.addNewItem(bookmark)

            //item.items.push(bookmark)
            //let itemList = [...item.items]
            //console.log(itemList)

            store.mainPageHTML()
            store.displayBookmarkApiList()



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
        +
            console.log('Ran handleToggleButton')
        let getId = store.getIdOfItem(e.target)
        console.log(getId)
        let id = store.findById(getId)
        console.log(item.items, 'Before id.check')
        id.checked = !id.checked
        //console.log(id, 'id')
        console.log(item.items, 'item.items')
        let itemList = [...item.items]
        console.log(itemList, 'itemList')
        $('.bookmark-head-list').html(store.mapstore(itemList))


    })
}

function handleDelete() {
    $('main').on('click', '.delete', function (e) {
        e.preventDefault()
        console.log(store, 'store')

        console.log('Clicked Delete')

        let getId = store.getIdForDelete(e.currentTarget)
        console.log(e.currentTarget, 'currentTarget')
        console.log(getId, "Get Id")
        let id = store.findById(getId)
        console.log(id.id, 'id delete')

        api.deleteItem(id.id)
        store.mainPageHTML()
        store.displayBookmarkApiList()

    })

}

function handleCancelButtonClick() {

    $('main').on('click', '.cancel', function () {
        console.log('cancel button clicked')
        store.mainPageHTML()
        store.displayBookmarkApiList()

    })

}

function handleAddButtonClick() {

    $('main').on('click', '.add', function (e) {
        e.preventDefault()
        return $('main').html(`<div class='main'><h1>Bookmark App</h1> ${store.dropDownForm()} <ul class='bookmark-head-list'></ul><div>`)

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
