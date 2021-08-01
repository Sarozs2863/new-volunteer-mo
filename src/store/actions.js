import { getVolunteerToken } from '@/api/user';
export default {
    async setVolunteerToken({ commit, state }) {
        const { data : token } = await getVolunteerToken();
        window.localStorage.volunteerToken = JSON.stringify(token);
        commit('setVolunteerToken', token);
    }
};

