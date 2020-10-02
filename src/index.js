import $ from 'jquery'
import event from './event'
import app from './app'


function main() {

    event.bindEventListeners()
    app.mainPageHTML()

}

$(main)
