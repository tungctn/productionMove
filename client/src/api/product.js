import axios from "./axios"

export const updateProduct = async (data, id) => {
    const response = await axios.put(`/product/${id}`, data)
    return response.data
}