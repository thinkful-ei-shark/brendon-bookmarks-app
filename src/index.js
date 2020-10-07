import $ from 'jquery'
import event from './event'
import store from './store'
import api from './api'
import item from './item'

function main() {


    event.bindEventListeners()
    store.mainPageHTML()

    api.getBookmarks()
        // .then(bookmarksRes => bookmarksRes.json())
        .then(bookmarksResJson => {
            item.items = bookmarksResJson
            console.log(item.items, 'item,items')
            $('.bookmark-head-list').html(store.mapstore(bookmarksResJson))
        }
        )
}


$(main)
