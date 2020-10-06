import item from './item'
import app from './app'

function findById(id) {

    return item.items.find(currentItem => currentItem.id === id)

}


function mapstore(i) {
    
    let item = i.map(item => app.bookmarkTemplate(item))
    return item.join('')

}

export default {

    findById,
    mapstore

}
