export const setItem = item => ({
    type: 'ITEM_SET_ITEM',
    item,
});

export const setName = name => ({
    type: 'ITEM_SET_NAME',
    name,
});

export const setDescription = description => ({
    type: 'ITEM_SET_DESCRIPTION',
    description,
});

export const setPrice = price => ({
    type: 'ITEM_SET_PRICE',
    price,
});

export const addToItems = item => ({
    type: 'ITEM_ADD_ITEMS',
    item,
});

export const getItems = items => ({
    type: 'ITEM_GET_ITEMS',
    items,
});

export const postItemToDB = () => (dispatch, getState) => {
    const url = `http://localhost:4001/api/postItem`;
    console.log(getState().itemReducer.name);
    console.log(getState().itemReducer.description);

    fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      body: JSON.stringify({
        name: getState().itemReducer.name,
        description: getState().itemReducer.description,
        price: getState().itemReducer.price,
        seller: getState().userReducer.user,
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
          //add code to show success or failure
      }
    }).catch(console.log);
};

export const populateItems = () => (dispatch, getState) => {
  console.log('33333333333333333333333');
    const url = `http://localhost:4001/api/populateItems`;
    fetch(url)
      //.then(res => console.log(res))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var rdata = data.items['items'];
        var cdata = data.items['cuitems'];
        var  rows = [];
        for(var i = 0 ; i < rdata.length ; i++){
          var row = {};
          row['description'] = rdata[i]['description'];
          row['name'] = rdata[i]['name'];
          row['numTimeSold'] = rdata[i]['numTimeSold'];
          row['price'] = rdata[i]['price'];
          row['purchasers'] = rdata[i]['purchasers'];
          row['seller'] = rdata[i]['seller'];
          row['_id'] = rdata[i]['_id'];
          row['count'] = 0;
          for(var j = 0 ; j < cdata.length ; j++)
          {
            if(rdata[i]['_id'] == cdata[j]['id'])
            {
              row['count'] = cdata[j]['count'];
            }
          }
          rows.push(row);
        }
        console.log(rows);
        dispatch(getItems(rows));
      })
      .catch(console.log);
}