// controllers/quizController.js

const axios = require('axios');

exports.getQuestion = async (req, res) => {
    const topic = req.query.topic || 'general knowledge';

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: "system", content: "You are a quiz generator."},
                    {role: "user", content: `Generate a multiple-choice question about ${topic}.`},
                ],
                max_tokens: 150,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const questionData = response.data.choices[0].message.content;
        res.json({ question: questionData });
    } catch (error) {
        if (error.response) {
            console.error("Error response from API:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received from API:", error.request);
        } else {
            console.error("Error in setting up request:", error.message);
        }
        res.status(500).json({ error: 'Error generating question' });
    }
};
