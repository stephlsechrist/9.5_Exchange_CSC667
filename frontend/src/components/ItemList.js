import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {populateItems} from '../redux/actions/itemActions';
import {NavLink} from 'react-router-dom';
import io from 'socket.io-client';
import $ from "jquery";
import axios from 'axios';

var count = 0;
var socket = null;

const ItemList = ({items, isLoggedIn, dispatch,role}) => {
    if(isLoggedIn == true) {
        count+=1;

        if(count == 1) {
            socket = io.connect('http://localhost:4200', {query: `itemId=${1234}`});
            socket.on('connect', function(data) {
                socket.on("allsend", function (data) {
                    $("#"+data.id).text(data.count);
                })

                socket.on("allreceive", function (data) {
                    $("#"+data.id).text(data.count);
                })
            });
        }
    }

    useEffect(() => {   
        dispatch(populateItems());
    }, []);

    return (
        <div className="pt-5 container">
            <p className="display-4">Currently posted on the Exchange</p><hr></hr><br />
            <div className="justify-content-center pt-2" style={{display: 'flex', flexWrap: 'wrap'}}>
                {items.map((item, key) => {
                    return (
                        <div key={key}>
                            <br />
                            <div className="card b-3 bg-light px-4 pt-3 pb-3 mx-4 col-md-11">  
                                <div className="card-header border">
                                
                                {item.name}</div>
                                <div className="card-body">
                                    <h5 className="card-title">${item.price}</h5>
                                    <div></div>
                                    <p className="card-text">{item.description}</p>
                                    <hr/>
                                    <p className="card-text">Seller: {item.seller}</p>
                                    <div id = {item._id} style = {{
                                        background: 'rgb(255, 64, 129)', 
                                        color: 'rgb(255, 255, 255)', 
                                        borderRadius: '50%', 
                                        width: '25px', 
                                        position: 'absolute', 
                                        bottom: '34px',
                                        left: '20px'}}>
                                        {item.count}
                                    </div>
                                    {isLoggedIn && (
                                        <div>
                                            <NavLink className="btn btn-secondary" to={{pathname:`/item`, search: `?id=${item._id}`}} >View Item</NavLink>
                                        </div>
                                    )}<br/>
                                    <span className="text-center align-bottom">Viewing Item Page!&nbsp;&nbsp;</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        
        </div>
    );  
}

const mapStateToProps = state => ({
    items: state.itemReducer.items,
    isLoggedIn: state.userReducer.isLoggedIn,
    role : state.userReducer.role
});

export default connect(mapStateToProps)(ItemList);
