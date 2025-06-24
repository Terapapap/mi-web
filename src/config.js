
export const config = {
    openai: {
        apiKey: () => localStorage.getItem('openai_api_key'),
    }
};
