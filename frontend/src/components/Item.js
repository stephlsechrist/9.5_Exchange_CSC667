import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import io from 'socket.io-client'
import $ from "jquery";
import {populateItems} from '../redux/actions/itemActions';

var count = 0;
var id = null;
class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {item: {}, visit:0}
        this.socket = io.connect('http://localhost:4200', {query: `itemId=${this.props.userid}`});
    }

    componentDidMount() {
        let me = this;
        const search = window.location.search;
        const params = new URLSearchParams(search);
        id = params.get('id');
            this.socket.on('connect', function(data) {
                // socket.emit('join', 'Hello World from client');
            });
           

            this.socket.on('liveV', function(data) {
                // this.setState({visit: data})	
            });


        axios.get(`http://localhost:4001/api/viewItem?itemId=${id}`)
	        .then(response => {
                var obj = {};
		        this.setState({visit: response.data.visit})	;
                // obj.visit = response.data.visit;
                obj.id = id;
                obj.userid =this.props.userid;
                console.log(this.props.userid);
                this.socket.emit("visitadd", obj);
	        })
	        .catch(err => {
		         console.log("Error")
            })

        for(var i = 0; i < this.props.itemsState.length; i++) {
            if(this.props.itemsState[i]._id == id) {
                this.setState({
                    item: this.props.itemsState[i]
                })
            }
        }
    }

    componentWillUnmount() {
        console.log("unmounting");
        var obj = {};
        // this.setState({visit: response.data.visit})	;
        // obj.visit = response.data.visit;
        obj.id = id;
        obj.userid =this.props.userid;
        this.socket.emit("visitdel", obj);
        console.log(1111);
        console.log(this.state.item._id);

        populateItems();
        // axios.get(`http://localhost:4001/api/newviewItem?itemId=${this.state.item._id}`)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(err => {
        //         console.log("Error")
        // });
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
                    {/* <p>Total visits {this.state.visit}</p> */}
                </div>
            </div>
        )
    }
}

const UsersInfor = state => ({
    userid : state.userReducer.user
});

export default connect(UsersInfor)(Item);
