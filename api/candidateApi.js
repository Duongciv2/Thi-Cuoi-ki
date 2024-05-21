import axios from 'axios';

const BASE_URL = 'http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345';

export const fetchCandidates = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all`);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching candidates:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCandidate = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const addCandidate = async (candidate) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, candidate);
        return response.data;
    } catch (error) {
        console.error('Error adding candidate:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const deleteCandidate = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting candidate:', error);
        throw error;
    }
};

export const updateCandidate = async (id, candidate) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, candidate, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating candidate:', error);
        throw error;
    }
};
