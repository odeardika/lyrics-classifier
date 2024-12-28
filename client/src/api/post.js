import axios from 'axios'

export const predict = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, data)
    return response.data
}

export const searchAndPredict = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/search`, data)
    return response.data
}