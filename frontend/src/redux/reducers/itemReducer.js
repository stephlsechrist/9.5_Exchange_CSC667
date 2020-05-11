var item1Test = {
    name: "Widget",
    description: "An exquistite widget",
    price: 10.99,
    seller: "default",
    numTimeSold: 2,
    purchasers: [],
}

var item2Test = {
    name: "A shrubbery",
    description: "Who wouldn't want this?",
    price: 50,
    seller: "default",
    numTimeSold: 0,
    purchasers: [],
}

var item3Test = {
    name: "Yo-Yo",
    description: "It's a yoyo",
    price: 220,
    seller: "default",
    numTimeSold: 3,
    purchasers: ['default'],
}

const DEFAULT_STATE = {
    item : {
        name: "",
        description: "",
        price: 0,
        seller: "",
        numTimeSold: 0,
        purchasers: [],
    },
    items: [item1Test, item2Test, item3Test, item1Test, item2Test, item3Test],
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