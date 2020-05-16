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

export const postItemToDB = () => (getState) => {
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
    const url = `http://localhost:4001/api/populateItems`;

    fetch(url)
      //.then(res => console.log(res))
      .then(res => res.json())
      .then(data => {
        console.log(data.items);

        dispatch(getItems(data.items));
      })
      .catch(console.log);
}