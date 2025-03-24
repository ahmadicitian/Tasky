import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/task";

export const getTasks = async (params = {}) => {
    const response = await axios.get(API_URL, {
        params: {
            page: params.page || 1,
            itemsPerPage: params.itemsPerPage || 10,
            searchBy: params.searchBy || undefined
        }
    });
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}