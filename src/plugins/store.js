import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: []
    },
    mutations: {
        SET_PRODUCTS: (state, products) => {
            state.products = products;
        },
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExist = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {
                        isProductExist = true;
                        item.quantity++
                    }
                    })
                if (!isProductExist) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product)
            }

        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index,1)
        },
        INCREMENT: (state, index) => {
            state.cart[index].quantity++
        },
        DECREMENT: (state, index) => {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        }
    },
actions: {
    GET_PRODUCTS({commit})
    {
        return axios('http://localhost:3000/products', {
            method: "GET"
        })
            .then((products) => {
                commit("SET_PRODUCTS", products.data);
                console.log('it is working normally');
            })
            .catch(() =>{
                    console.log('it is not working normally, please check the code again!');

            })
    },
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product);
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    }
}
,
getters: {
    PRODUCTS(state)
    {
        return state.products;
    },
    CART(state) {
        return state.cart;
    }
}
})
;

export default store;