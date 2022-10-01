import { SET_USER_LOGGED, SET_IS_ACTIVE, SET_USER_BOARDED, SET_FALLBACK_ROUTE, SET_FALLBACK_ROUTE_PARAM, SET_USER_BOARDED_View,SAVE_CONTACTS,SET_USER_JWT, SET_USER_DATA ,SET_WITHDRAWAL_AMOUNT, SET_DEPOSIT_AMOUNT, SET_DEPOSIT_REF, SET_NETWORK_TYPE, SET_ASSET_TYPE, SET_MODAL_VIEW, SET_WITHDRAW_VIEW, SET_SEND_VIEW, SET_SEND_AMOUNT, SET_LSCAN_VIEW } from "./actions";


const initialState={
    isLoggedIn: false,
    isActive: false,
    isBoarded: false,
    isBoardedView: '',
    userJwt: '',
    userData:{},
    withdrawalamount: 0,
    depositamount: 0,
    depositref: '',
    networktype: {},
    assettype: '',
    modalVisible: false,
    withdrawVisible: false,
    sendVisible: false,
    sendamount: 0,
    lscanVisible: false,
    savedcontact: [],
    fallbackRoute:'',
    fallbackRouteParam:'',
}

function userReducer (state= initialState, action){
    switch(action.type){
        case SET_USER_LOGGED:
            return {...state, isLoggedIn: action.payload}
        case SET_IS_ACTIVE:
            return {...state, isActive: action.payload}
        case SET_USER_BOARDED:
            return {...state, isBoarded: action.payload}
        case SET_USER_BOARDED_View:
            return {...state, isBoardedView: action.payload}
        case SET_USER_JWT:
            return {...state, userJwt: action.payload}
        case SET_USER_DATA:
            return {...state, userData: action.payload}
        case SET_WITHDRAWAL_AMOUNT:
            return {...state, withdrawalamount: action.payload}
        case SET_DEPOSIT_AMOUNT:
            return {...state, depositamount: action.payload}
        case SET_DEPOSIT_REF:
            return {...state, depositref: action.payload}
        case SET_NETWORK_TYPE:
            return {...state, networktype: action.payload}
        case SET_ASSET_TYPE:
            return {...state, assettype: action.payload}
        case SET_MODAL_VIEW:
            return {...state, modalVisible: action.payload}
        case SET_WITHDRAW_VIEW:
            return {...state, withdrawVisible: action.payload}
        case SET_SEND_VIEW:
            return {...state, sendVisible: action.payload}
        case SET_SEND_AMOUNT:
            return {...state, sendamount: action.payload}
        case SET_LSCAN_VIEW:
            return {...state, lscanVisible: action.payload}
        case SAVE_CONTACTS:
            return {...state, savedcontact: action.payload}
        case SET_FALLBACK_ROUTE:
            return {...state, fallbackRoute: action.payload}
        case SET_FALLBACK_ROUTE_PARAM:
            return {...state, fallbackRouteParam: action.payload}


        default:
            return state;
    }
}

export default userReducer;