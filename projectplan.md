Project Plan: AI IELTS Tutor (Sliced Approach)
Slice 1: Core User Authentication & Session Foundation
Goal: A user can create an account, log in, and log out. This is the bedrock of the entire application.
Features:
Frontend (Vite/React/Zustand):
Setup basic project structure with routing.
Create UI components for Login, Sign Up, and a placeholder Dashboard page.
Implement "Continue with Google" authentication flow.
Implement standard email/password Sign Up and Login forms.
Use a Zustand store to manage the user's authentication state globally (e.g., user, isLoggedIn).
Backend (Node.js/Express):
Set up a basic Express server.
Establish a connection to a MongoDB database.
Create API endpoints for user registration (/api/auth/register), login (/api/auth/login), Google Auth (/api/auth/google), and fetching the current user's profile (/api/me).
Implement JWT (JSON Web Tokens) for managing user sessions.
Database (MongoDB):
Define a User schema with fields for email, password (hashed), googleId, and testsRemaining (defaulting to 3).
End State of Slice 1: A user can successfully create an account and log in. The frontend knows who the user is, and the backend has a corresponding user record in the database.
Slice 2: The Speaking Test Core Experience
Goal: A logged-in user can start a test, receive a topic, record their voice, and have the session saved.
Features:
Frontend (Vite/React/Zustand):
Create a "Test" page that fetches a topic from the backend.
Implement a "Start Recording" button that captures microphone audio.
Integrate the Deepgram SDK: Stream the captured audio to Deepgram and display the live transcription in a text area.
Add a 2-minute timer that automatically stops the recording.
Upon completion, upload the final audio recording directly to Cloudflare R2 and send the final transcript and R2 URL to our backend.
Backend (Node.js/Express):
Create a simple array of IELTS topics to serve to the user.
Create an endpoint GET /api/test/topic to provide a random topic.
Create an endpoint to generate a secure, pre-signed URL for the frontend to upload the audio file to R2.
Create an endpoint POST /api/test/session to receive the final transcript and audio URL, then save it.
Database (MongoDB):
Define a Session schema with fields for userId (linking to the User), topic, transcribedText, and audioUrl.
End State of Slice 2: A user can complete a full speaking test. Their speech is transcribed, and both the text and the audio recording are saved to our database and cloud storage, linked to their user profile.
Slice 3: AI Tutor Analysis & Feedback
Goal: After completing a test, the user receives a detailed, AI-powered analysis of their performance.
Features:
Backend (Node.js/Express):
Integrate the Anthropic Claude API.
Modify the POST /api/test/session endpoint. After saving the session, it will make an asynchronous call to Claude.
Engineer a specific prompt for Claude, asking it to analyze the provided transcript for Fluency, Lexical Resource, and Grammatical Range, and to return the analysis in a structured JSON format.
Update the Session document in MongoDB with the analysis from Claude.
Frontend (Vite/React/Zustand):
Create a "Results" page.
After a test, redirect the user to this page and show a loading indicator.
Fetch the completed analysis from the backend.
Display the results in a clear, structured format: Word Count/Speed, Grammatical Feedback, Lexical Feedback, Fluency Feedback, and the AI-improved text.
End State of Slice 3: The core value loop is complete. A user can speak, and our app provides actionable, intelligent feedback.
Slice 4: User Dashboard, History & Freemium Logic
Goal: Users can review their past performance and are gated by the freemium model.
Features:
Backend (Node.js/Express):
When a user starts a test, check their testsRemaining count. If it's zero, return an error.
After a successful test, decrement the testsRemaining count for that user.
Create an endpoint GET /api/test/sessions to fetch all past sessions for the logged-in user.
Frontend (Vite/React/Zustand):
On the Dashboard, replace the placeholder with a list of the user's past tests (e.g., "Topic: Describe a city you love - Score: 7.5").
Make each past test clickable, linking to its "Results" page.
If a user has no tests remaining, disable the "Start New Test" button and display a message prompting them to subscribe.
End State of Slice 4: We have a feature-complete MVP with a clear monetization path.