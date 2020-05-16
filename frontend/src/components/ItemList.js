import React, {useEffect} from 'react';
import Item from './Item.js';
import {connect} from 'react-redux';
import {populateItems} from '../redux/actions/itemActions';
import { setIsLoggedIn } from '../redux/actions/userActions.js';

const ItemList = ({items, isLoggedIn, dispatch}) => {
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
                            <div className="card b-3 bg-light px-4 pt-3 pb-3 mx-4">    
                                <div className="card-header border">{item.name}</div>
                                <div className="card-body">
                                    <h5 className="card-title">${item.price}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <hr/>
                                    <p className="card-text">Seller: {item.seller}</p>
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
