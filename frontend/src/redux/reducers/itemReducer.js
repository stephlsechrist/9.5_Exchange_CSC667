const DEFAULT_STATE = {
    item : "",
    items: [],
};

const itemReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ITEM_SET_ITEM':
      return {
        ...state,
        note: action.note,
    }
    case 'ITEM_ADD_ITEMS': 
    return { 
        ...state,
        items: [...state.items, state.item]
    }
    default:
        return state;
  }
};

export default itemReducer;