import React, { Component } from 'react';
import Item from './Item.js';
import {connect} from 'react-redux';
import {} from '../redux/actions/itemActions';
import { setIsLoggedIn } from '../redux/actions/userActions.js';

const ItemList = ({items, isLoggedIn}) => {
        return (
            <div className="pt-5 container">
                <p className="display-4">Currently posted on the Exchange</p><hr></hr><br />
                <div className="justify-content-center pt-2" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {items.map((item, key) => {
                        return (
                            <div>
                                <br />
                                <div className="card b-3 bg-light px-4 pt-3 pb-3 mx-4" key={key}>    
                                    <div class="card-header border">{item.name}</div>
                                    <div class="card-body">
                                        <h5 class="card-title">${item.price}</h5>
                                        <p class="card-text">{item.description}</p>
                                        <hr/>
                                        <p class="card-text">Seller: {item.seller}</p>
                                        {isLoggedIn && (
                                            <button className="btn btn-secondary mt-2 mb-2" onClick={() => {/*call some function triggering backend service here, update items state for that item*/}}>
                                                 Purchase Item
                                            </button>
                                        )}
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
});

export default connect(mapStateToProps)(ItemList);
