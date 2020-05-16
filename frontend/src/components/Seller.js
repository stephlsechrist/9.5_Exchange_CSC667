import React, {useState} from 'react'
import {connect} from 'react-redux'

const Seller = ({isLoggedIn, dispatch, role, user, items}) => {
    const [showSoldItems, toggleShowSoldItems] = useState(false);
    const [showListedItems, toggleShowListedItems] = useState(false);
    const [showPostForm, toggleShowPostForm] = useState(true);

    return (
        <div className="mt-4">
            {isLoggedIn && role == "seller" && (
                <div className="parent-container d-flex">
                    <div className="container">                  
                            <div className="display-4 ">Welcome {user}</div>

                            <div className="">
                                <button className="btn btn-primary mt-4 mb-4 mr-3" onClick={() => toggleShowSoldItems(!showSoldItems)}>
                                    Toggle Sold Items
                                </button>
                                <button className="btn btn-primary mt-4 mb-4 ml-3" onClick={() => toggleShowListedItems(!showListedItems)}>
                                    Toggle Listed Items
                                </button>
                            </div>
                   
                   
                            {showSoldItems && (<div><h5 className ="mt-5">Sold Items</h5> <br/></div>)}
                            <div className="justify-content-center pt-2" style={{display: 'flex', flexWrap: 'wrap'}}>
                                {showSoldItems && (items.map((item, key) => {
                                    return (
                                        <div>
                                            {item.purchasers.length > 0 && item.seller == user && (
                                                <div className="card b-3 bg-light px-4 pt-3 pb-3 mx-4" key={key}>    
                                                    <div class="card-header border">{item.name}</div>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Sold for ${item.price}</h5>
                                                        <hr/>
                                                        <p class="card-text">Times sold: {item.purchasers.length}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }))}
                            </div>
                            {showListedItems && (<div><h5 className ="mt-5">Listed Items</h5> <br/></div>)}
                            <div className="justify-content-center pt-2" style={{display: 'flex', flexWrap: 'wrap'}}>
                                {showListedItems && (items.map((item, key) => {
                                    return (
                                        <div>
                                            {item.seller == user && (
                                                <div className="card b-3 bg-light px-4 pt-3 mt-3 pb-3 mx-4" key={key}>    
                                                    <div class="card-header border">{item.name}</div>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Description given:<br/> {item.description}</h5>
                                                        <hr/>
                                                        <h5 class="card-title">Listed for ${item.price}</h5>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }))}
                            </div>
                    </div>

                    <div className="container mt-5">
                            {showPostForm && (                   
                                <div className="card bg-light col-md-8">       
                                    <br /><br /><br />              
                                    <br /><h3 className="text-left pb-3 mt-3"><em>Post an item to the 9.5 Exchange's Catalog</em></h3>
                                    <div className="pb-2 col-md-10">
                                        <label className="float-left">Item Name</label>
                                        <input type="text" className="form-control mb-2" placeholder=" enter item name" onChange={() => {}}/>
                                    </div>
                                    <div className="pb-2 col-md-10">
                                        <label className="float-left">Description</label>
                                        <textarea className="form-control" placeholder="enter item description" rows="5" onChange={() => {}}/>
                                    </div>
                                    <div className="pb-2 col-md-4">
                                        <label className="float-left">Price</label>
                                        <input type="text" className="form-control" placeholder="" onChange={() => {}}/>
                                    </div>

                                    <div className="text-left col-md-2 mt-2">
                                        <button 
                                            onClick={() => {}}
                                            className="btn btn-primary mb-2">
                                            Sell!
                                        </button>
                                    </div>                   
                                </div>
                            
                            )}
                        
                    </div>
                </div>
            )}
             {/*<h5 className="mt-5">TEST: value of role is {role}</h5> <h5 className="mt-5">TEST: value of user is {user}</h5> */}
        </div>
    );
    
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    //password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    role: state.userReducer.role,
    items: state.itemReducer.items,
});

export default connect(mapStateToProps)(Seller);
