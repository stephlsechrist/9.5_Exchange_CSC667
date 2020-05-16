export const setItem = item => ({
    type: 'ITEM_SET_ITEM',
    item,
});

export const addToItems = item => ({
    type: 'ITEM_ADD_ITEMS',
    item,
});

export const getItems = items => ({
    type: 'ITEM_GET_ITEMS',
    items,
});

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