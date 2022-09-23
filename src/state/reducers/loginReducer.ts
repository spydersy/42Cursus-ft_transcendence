const initialState = {data: {}, isLoggedIn: false};

const reducer = ( state = initialState, action : any) =>
{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {data: action.user, isLoggedIn: true};
        case 'LOGOUT':
            return {data: {}, isLoggedIn: false};
        default:
            return state;
    }
}
export default reducer;