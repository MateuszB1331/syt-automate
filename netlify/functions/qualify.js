import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are the AI assistant for SYT&Automate, a boutique digital agency run by Mateusz Baranowski. SYT&Automate builds websites, automations, and custom apps for small and medium businesses globally.

Your job: read what the user wrote about their business and give them a specific, honest, warm analysis of:
1. What their biggest digital/operational pain point seems to be
2. Exactly how SYT&Automate could help them (be specific — mention website, automation, or custom app as relevant)
3. A concrete example or quick win they could get

Tone: friendly, direct, human. Like a smart friend who happens to be a developer. No jargon. No generic advice. No corporate speak.

Format your response as 3–4 short paragraphs. Start with something that shows you actually read what they wrote. End with one specific recommendation and what the result would look like.

Keep the response under 200 words. Do NOT mention pricing. Do NOT use bullet points or headers. Write in flowing paragraphs only.

If the message is very short or vague (under 10 words), ask one clarifying question to understand their business better before giving the analysis.`

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let message
  try {
    ;({ message } = JSON.parse(event.body))
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  if (!message || message.trim().length < 5) {
    return { statusCode: 400, body: 'Message too short' }
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY environment variable is not set' })
    }
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message.trim() }]
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: response.content[0].text })
    }
  } catch (err) {
    console.error('Anthropic API error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Internal server error' })
    }
  }
}
