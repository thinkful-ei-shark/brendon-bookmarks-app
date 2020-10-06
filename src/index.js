import $ from 'jquery'
import event from './event'
import app from './app'
import api from './api'
import item from './item'
import store from './store'

function main() {


    event.bindEventListeners()
    app.mainPageHTML()

    api.getBookmarks()
        // .then(bookmarksRes => bookmarksRes.json())
        .then(bookmarksResJson => {
            item.items = bookmarksResJson
            $('.bookmark-head-list').html(store.mapstore(bookmarksResJson))
        }
        )
}


$(main)
