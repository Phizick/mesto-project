export default class Section {
    constructor( {renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderDefaultItems(items, userId) {
        items.forEach(item => this._appendItem(this._renderer(item, userId)));
    }

    _appendItem(item) {
        this._container.append(item);
    }

    _prependItem(item) {
        this._container.prepend(item);
      }

    renderNewItem(itemData) {        
        this._prependItem(this._renderer(itemData, itemData.owner._id));
    }    
}