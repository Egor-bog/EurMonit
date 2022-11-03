import axios from 'axios'

export const mapModule = {
    state: {
        mapInstance: null,
        isLoadingFUO: false,
        pointsItem: {}
    },
    getters: {

    },
    mutations: {
        SET_MAP_INSTANCE (state, mapInstance) {
            state.mapInstance = mapInstance
        },
        SET_IS_LOADING_FUO (state, isLoading) {
            state.isLoadingFUO = isLoading
        },
        SET_POINTSITEM_API (state, pointsItem) {
            state.pointsItem = pointsItem
        }

    },
    actions: {
        async GET_POINTSITEM_API({commit}) {
            try {
                commit('SET_IS_LOADING_FUO', true);
                return await axios('http://localhost:3000/points', {
                metod: 'GET'
            })
                .then((respons) => {
                    commit('SET_POINTSITEM_API', respons.data)
            })
            } catch  (error) {
                alert ('Error')
            } finally {
                commit('SET_IS_LOADING_FUO', false); 
            }
        },

        async DELETE_POINTSISTEM_API({commit, dispatch}, pointId) {
            try {
                commit('SET_IS_LOADING_FUO', true);  
                const respons = await axios(`http://localhost:3000/points/${pointId}`, {
                method: 'DELETE'
            })
                if (respons.status == 200) {
                    dispatch('GET_POINTSITEM_API')
                }
            } catch  (error) {
                alert ('Error')
            } finally {
                commit('SET_IS_LOADING_FUO', false); 
            }
        }
    },
      namespaced: true
}