import React, { Component } from 'react'

const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get('id');

class Item extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <div className="card bg-light mt-5 col-md-4 offset-md-4">
                <div className="card-header border h4">Page for a item with id ({id}) reached</div>
                <div className="card-body">
                    <div class="card-title h3">Name of item: {this.props.itemsState[id].name}</div><hr/>
                    <p class="card-text h4">Price: ${this.props.itemsState[id].price}</p>
                    <p class="card-text h4">Description: {this.props.itemsState[id].description}</p>
                    <p class="card-text h4">Seller: {this.props.itemsState[id].seller}</p>
                </div>
            </div>
        )
    }
}

export default Item;
