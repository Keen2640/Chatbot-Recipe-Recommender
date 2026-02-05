import express from 'express';

const app = express();
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log('Received prompt:', prompt);

    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: `Answer in under 200 words: ${prompt}`,
        stream: false,
      }),
    });

    console.log('Ollama response status:', response.status);

    const data = await response.json();
    console.log('Ollama raw data:', data);

    // ✅ enforce hard cutoff at 200 words
    let output = data.response || '';
    const words = output.split(/\s+/);
    if (words.length > 200) {
      output = words.slice(0, 200).join(' ') + '...';
    }

    return res.json({ output, meta: { id: Date.now() } });
  } catch (err) {
    console.error('Error calling Ollama:', err);
    return res.status(500).json({ output: 'Something went wrong.' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));