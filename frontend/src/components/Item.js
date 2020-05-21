import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import io from 'socket.io-client'
import $ from "jquery";
import {populateItems, purchaseItem} from '../redux/actions/itemActions';


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
        obj.id = id;
        obj.userid =this.props.userid;
        this.socket.emit("visitdel", obj);
        console.log(1111);
        console.log(this.state.item._id);

        populateItems();
    }

    render() {
        return (
            <div>
                <div className="card  bg-light mt-5  offset-lg-4" style={{maxWidth: '50rem' }}>
                    <div className="card-header display-4">Item: {this.state.item.name}</div>
                    <div className="card-body">
                        <div className="card-title h4">Posted by {this.state.item.seller} for ${this.state.item.price}</div><hr/>
                        <p className="card-text h4"><i>Description</i></p>
                        <p>{this.state.item.description}</p>
                        <hr />

                        {<p>Total visits {this.state.visit}</p>}
                    </div>
                    <div className="mt-3">
                {this.props.loginState && this.props.userRole=="buyer" && ( 
                    <button className="btn btn-primary mb-3" onClick={purchaseItem(this.state.item._id, this.state.item.name, 
                        this.state.item.price, this.state.item.description, this.state.item.seller)}>
                            Purchase Item
                    </button>  
                    
                )}
                </div>
                </div>
            </div>
        )
    }
}

const UsersInfor = state => ({
    userid : state.userReducer.user
});

export default connect(UsersInfor)(Item);
