import axios from 'axios';

const state = {
    products: {},
};

const getters = {
    products: state => state.products,
};

const actions = {
    initStore: ({ commit }) => {
        axios.get('static/products.json').then((response) => {
            console.log(response.data.products);
            commit('SET_STORE', response.data.products);
        }).catch((e) => {
            console.log('error', e);
        });
    },
};

const mutations = {
    'SET_STORE' (state, products) {
        state.products = products;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}