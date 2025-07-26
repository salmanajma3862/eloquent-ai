import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.69.2:5000',
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

    // Transcribe audio file and create session (CEO's new strategy)
    transcribeAudioFile: async (token: string, formData: FormData) => {
        const response = await api.post('/api/test/transcribe', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

// Export transcribeAudioFile as a standalone function for easier access (CEO's new strategy)
export const transcribeAudioFile = (token: string, formData: FormData) => {
  return api.post('/api/test/transcribe', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get AI analysis for a specific session
export const getSessionAnalysis = (token: string, sessionId: string) => {
  return api.get(`/api/analysis/${sessionId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

// Get all sessions for the authenticated user
export const getUserSessions = (token: string) => {
  return api.get('/api/sessions', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export default api;
