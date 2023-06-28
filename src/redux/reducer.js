import ACTIONS from "./actions";

const reducer = (state = {
    isShow: 1, // 初始状态下是否展示侧边栏
    is_login: true,
    username: "",
}, action) => {
    switch (action.type) {
        case ACTIONS.SWITCH_SIDEBAR:
            return {
                isShow: state.isShow ^ 1
            }
        case ACTIONS.LOGIN_TOKEN:
            // console.log("action-login");
            return {
                is_login: action.is_login,
                username: action.username,
            }
        case ACTIONS.LOGOUT:
            return {
                is_login: false,
                username: "",
            }
        default:
            return state
    }
};

export default reducer;