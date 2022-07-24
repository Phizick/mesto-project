export default class Section {
    constructor( {renderer}, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    renderItems( items, userId) {
        items.forEach(item => {this._appendItem(this._renderer(item, userId))});
    }

    _appendItem(item) {
        this._container.append(item);
    }

    addItem( item, userId) {
        this._appendItem(this._renderer(item. userId));
    }

    
}