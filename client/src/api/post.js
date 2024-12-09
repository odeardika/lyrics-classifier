import axios from 'axios'

export const predict = async (data) => {
    const response = await axios.post('http://127.0.0.1:8000/predict', data)
    return response.data
}

export const searchAndPredict = async (data) => {
    const response = await axios.post('http://127.0.0.1:8000/search', data)
    return response.data
}