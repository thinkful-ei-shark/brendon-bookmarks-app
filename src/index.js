import $ from 'jquery'
import event from './event'
import store from './store'



function main() {


    event.bindEventListeners()
    store.render()

}



$(main)
