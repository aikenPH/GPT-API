const express = require('express');
const { Hercai } = require('hercai');

const herc = new Hercai();
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Welcome to the AI service!');
});

const handleGpt4Request = async (req, res) => {
  const ask = req.query.ask;

  if (!ask) {
    res.json({ error: "Please provide 'ask' parameter" });
    return;
  }

  try {
    const answerPromise = herc.question({ model: "v1", content: ask });
    const answer = await answerPromise;
    res.json({ answer: answer.reply });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get('/gpt4', handleGpt4Request);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
