import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = req.body.message;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
