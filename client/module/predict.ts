import axios from 'axios';

export default async function fetchPrediction(lyrics: string, model: number) {
    const endpoint = process.env.NEXT_PUBLIC_API_URL || ''; // Replace with your API endpoint

    try {
        const response = await axios.post(`${endpoint}/predict`, {
            model : model,
            lyric: lyrics,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
}
