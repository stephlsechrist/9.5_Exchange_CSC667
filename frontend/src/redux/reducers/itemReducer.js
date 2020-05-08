var item1Test = {
    name: "Widget",
    description: "An exquistite widget",
    price: 10.99,
    seller: "John",
}

var item2Test = {
    name: "A shrubbery",
    description: "Who wouldn't want this?",
    price: 50,
    seller: "Jill",
}

var item3Test = {
    name: "Yo-Yo",
    description: "It's a yoyo",
    price: 220,
    seller: "George",
}

const DEFAULT_STATE = {
    item : {
        name: "",
        description: "",
        price: 0,
        seller: "",
    },
    items: [item1Test, item2Test, item3Test,item1Test, item2Test, item3Test],
};

const itemReducer = (state = DEFAULT_STATE, action) => {
switch (action.type) {
    case 'ITEM_SET_ITEM':
        return {
            ...state,
            items: action.note,
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