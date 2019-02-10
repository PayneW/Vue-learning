import * as types from "./types";
export default {
    increment: ({commit}) => {
        commit(types.INCREMENT)
    },
    decrement: ({commit}) => {
        commit (types.DECREMENT)
    },

    oddIncrement: ({commit, state}) => {
        console.log(state);
        if (state.mutations.count % 2 === 1) {
            commit(types.INCREMENT)
        }
    },

    evenIncrement: ({commit, state}) => {
        if (state.mutations.count % 2 === 0) {
            commit(types.INCREMENT)
        }
    },

    asyncIncrement: ({commit}) => {
        new Promise((resolve) => {
            setTimeout(function () {
                commit(types.INCREMENT)
            }, 1000)
        })
    }
}