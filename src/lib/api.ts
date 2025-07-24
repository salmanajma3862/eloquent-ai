import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Test API functions for Slice 2
export const testApi = {
    // Get a random IELTS speaking topic
    getTestTopic: async (token: string) => {
        const response = await api.get('/api/test/topic', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Get Deepgram API token for speech recognition
    getDeepgramToken: async (token: string) => {
        const response = await api.get('/api/test/deepgram-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Get presigned URL for uploading audio to Cloudflare R2
    getPresignedR2Url: async (token: string) => {
        const response = await api.get('/api/test/r2-upload-url', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Create a new test session with results
    createTestSession: async (token: string, sessionData: {
        topicText: string;
        audioUrl: string;
        durationInSeconds: number;
        transcribedText: string;
    }) => {
        const response = await api.post('/api/test/session', sessionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Upload audio blob directly to Cloudflare R2 using presigned URL
    uploadAudioToR2: async (uploadUrl: string, audioBlob: Blob) => {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: audioBlob,
            headers: {
                'Content-Type': 'audio/webm',
            },
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return response;
    },
};

export default api;
