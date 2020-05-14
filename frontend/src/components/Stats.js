import React, { Component } from 'react';
import Item from './Item.js';
import {connect} from 'react-redux';
import {} from '../redux/actions/itemActions';
import { setIsLoggedIn } from '../redux/actions/userActions.js';
// import stats from '../../../backend/api/stats.js';
// display stats: from lab 7
// need to have redis open

const Stats = ({pageViews, page}) => {
        return (
            <div className="pt-5 container">
                <p className="display-4">Page View Stats</p><hr></hr><br />

                <div className="card bg-light mt-5 col-md-4 offset-md-4">
                    <div className="card-body">
                        <p class="card-text h4">Browse Items: </p>
                        <p class="card-text h4">Login: </p>
                        <p class="card-text h4">Register: </p>
                        <p class="card-text h4">Stats: </p>
                        <p class="card-text h4">Cart: </p>
                    </div>
                </div>
            </div>
        );  
}

const mapStateToProps = state => ({
    // isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Stats);
