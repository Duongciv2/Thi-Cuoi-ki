import axios from 'axios';

const BASE_URL = 'http://kiemtra.stecom.vn:8888/api/vien-phi/LVM12345';

export const fetchCosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all`);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching costs:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCost = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const addCost = async (cost) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, cost);
        return response.data;
    } catch (error) {
        console.error('Error adding cost:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteCost = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting cost:', error);
        throw error;
    }
};

export const updateCost = async (id, cost) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, cost, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cost:', error);
        throw error;
    }
};
