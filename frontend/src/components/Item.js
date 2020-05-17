import React, {Component} from 'react'
import axios from 'axios';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {item: {}, visit:0}
    }

    componentDidMount() {  
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log(id, 'test');

        axios.get(`http://localhost:4001/api/viewItem?itemId=${id}`)
	        .then(response => {
		        this.setState({visit: response.data.visit})	
	        })
	        .catch(err => {
		         console.log("Error")
            })

        for(var i = 0; i < this.props.itemsState.length; i++) {
            if(this.props.itemsState[i]._id == id) {
                console.log()
                this.setState({
                    item: this.props.itemsState[i]
                })
            }
        }
    }

    render() {
        return (
            <div className="card bg-light mt-5 col-md-4 offset-md-4">
                <div className="card-header border h4">Page for a item with id ({this.state.item._id}) reached</div>
                <div className="card-body">
                    <div className="card-title h3">Name of item: {this.state.item.name}</div><hr/>
                    <p className="card-text h4">Price: ${this.state.item.price}</p>
                    <p className="card-text h4">Description: {this.state.item.description}</p>
                    <p className="card-text h4">Seller: {this.state.item.seller}</p>
                    <p>Total visits {this.state.visit}</p>
                </div>
            </div>
        )
    }
}

export default Item;
