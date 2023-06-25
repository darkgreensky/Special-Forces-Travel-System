import ACTIONS from "./actions";

const reducer = (state = {
    isShow: 1, // 初始状态下是否展示侧边栏
}, action) => {
    switch (action.type) {
        case ACTIONS.SWITCH_SIDEBAR:
            return {
                isShow: state.isShow ^ 1
            }
        case ACTIONS.LOGIN_TOKEN:
            return {

            }
        default:
            return state
    }
};

export default reducer;