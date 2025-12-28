export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY; // Charge depuis .env

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Vous êtes un assistant virtuel pour CPropre... (ton prompt ici)' },
          { role: 'user', content: message }
        ],
        max_tokens: 300
      })
    });

    if (!response.ok) throw new Error('Erreur OpenAI');

    const data = await response.json();
    res.status(200).json({ response: data.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}