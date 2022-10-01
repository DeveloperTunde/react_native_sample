export const SET_USER_LOGGED = 'SET_USER_LOGGED';
export const SET_IS_ACTIVE  = 'SET_IS_ACTIVE';
export const SET_USER_BOARDED = 'SET_USER_BOARDED';
export const SET_USER_BOARDED_View = 'SET_USER_BOARDED_View';

export const SET_USER_JWT  = 'SET_USER_JWT';
export const SET_USER_DATA  = 'SET_USER_DATA';

export const SET_WITHDRAWAL_AMOUNT  = 'SET_WITHDRAWAL_AMOUNT';
export const SET_DEPOSIT_AMOUNT  = 'SET_DEPOSIT_AMOUNT';
export const SET_DEPOSIT_REF  = 'SET_DEPOSIT_REF';

export const SET_NETWORK_TYPE  = 'SET_NETWORK_TYPE';
export const SET_ASSET_TYPE  = 'SET_ASSET_TYPE';

export const SET_MODAL_VIEW  = 'SET_MODAL_VIEW';
export const SET_WITHDRAW_VIEW  = 'SET_WITHDRAW_VIEW';

export const SET_SEND_VIEW  = 'SET_SEND_VIEW';
export const SET_SEND_AMOUNT  = 'SET_SEND_AMOUNT';

export const SAVE_CONTACTS  = 'SAVE_CONTACTS';


export const SET_LSCAN_VIEW  = 'SET_LSCAN_VIEW';

export const SET_FALLBACK_ROUTE  = 'SET_FALLBACK_ROUTE';

export const SET_FALLBACK_ROUTE_PARAM  = 'SET_FALLBACK_ROUTE_PARAM';






export const setIsLoggedIn = isLoggedIn => dispatch =>{
    dispatch({
        type: SET_USER_LOGGED,
        payload: isLoggedIn,
    })
}


export const setIsActive = isActive => dispatch =>{
    dispatch({
        type: SET_IS_ACTIVE,
        payload: isActive,
    })
}


export const setIsBoarded = isBoarded => dispatch =>{
    dispatch({
        type: SET_USER_BOARDED,
        payload: isBoarded,
    })
}

export const setIsBoardedView = isBoardedView => dispatch =>{
    dispatch({
        type: SET_USER_BOARDED_View,
        payload: isBoardedView,
    })
}


export const setUserJwt = userJwt => dispatch =>{
    dispatch({
        type: SET_USER_JWT,
        payload: userJwt,
    })
}

export const setUserData = userData => dispatch =>{
    dispatch({
        type: SET_USER_DATA,
        payload: userData,
    })
}


export const saveContact = savedcontact => dispatch =>{
    dispatch({
        type: SAVE_CONTACTS,
        payload: savedcontact,
    })
}


export const setWithdrawalAmount = withdrawalamount => dispatch =>{
    dispatch({
        type: SET_WITHDRAWAL_AMOUNT,
        payload: withdrawalamount,
    })
}



export const setDepositAmount = depositamount => dispatch =>{
    dispatch({
        type: SET_DEPOSIT_AMOUNT,
        payload: depositamount,
    })
}


export const setDepositRef = depositref => dispatch =>{
    dispatch({
        type: SET_DEPOSIT_REF,
        payload: depositref,
    })
}



export const setNetworkType = networktype => dispatch =>{
    dispatch({
        type: SET_NETWORK_TYPE,
        payload: networktype,
    })
}


export const setAssetType = assettype => dispatch =>{
    dispatch({
        type: SET_ASSET_TYPE,
        payload: assettype,
    })
}



export const setModalVisibleAction = modalVisible => dispatch =>{
    dispatch({
        type: SET_MODAL_VIEW,
        payload: modalVisible,
    })
}

export const setWithdrawVisibleAction = withdrawVisible => dispatch =>{
    dispatch({
        type: SET_WITHDRAW_VIEW,
        payload: withdrawVisible,
    })
}

export const setSendVisibleAction = sendVisible => dispatch =>{
    dispatch({
        type: SET_SEND_VIEW,
        payload: sendVisible,
    })
}
export const setSendAmountR = sendamount => dispatch =>{
    dispatch({
        type: SET_SEND_AMOUNT,
        payload: sendamount,
    })
}


export const setLscanVisibleAction = lscanVisible => dispatch =>{
    dispatch({
        type: SET_LSCAN_VIEW,
        payload: lscanVisible,
    })
}



export const setFallbackRoute = fallbackRoute => dispatch =>{
    dispatch({
        type: SET_FALLBACK_ROUTE,
        payload: fallbackRoute,
    })
}

export const setFallbackRouteParam = fallbackRouteParam => dispatch =>{
    dispatch({
        type: SET_FALLBACK_ROUTE_PARAM,
        payload: fallbackRouteParam,
    })
}





