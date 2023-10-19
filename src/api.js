import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39170790-720d13338eae2dc65ab148b0f';


export const fetchImages = async (query, page) => {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 12,
        page: page
    });
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data
}

