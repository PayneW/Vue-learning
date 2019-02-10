import { INCREMENT, DECREMENT } from "./types";
import getters from "./getters"
const state = {
    count: 20
};

const mutations = {
    [INCREMENT](state) {
        state.count++;
    },
    [DECREMENT](state) {
        state.count--;
    }
};

export default {
    getters,
    state,
    mutations,
}