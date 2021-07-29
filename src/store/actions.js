import { login } from '@/api/user'

export default {
    async setToken({ commit, state}) {
        const { data : token } = await login();
        console.log(token);
        commit('setToken', token);
    }
};

