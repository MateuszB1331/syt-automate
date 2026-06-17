import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT_EN = `You are the AI assistant for SYT&Automate, a boutique digital agency run by Mateusz Baranowski. SYT&Automate builds websites, automations, and custom apps for small and medium businesses globally.

Your job: read what the user wrote about their business and give them a specific, honest, warm analysis of:
1. What their biggest digital/operational pain point seems to be
2. Exactly how SYT&Automate could help them (be specific — mention website, automation, or custom app as relevant)
3. A concrete example or quick win they could get

Tone: friendly, direct, human. Like a smart friend who happens to be a developer. No jargon. No generic advice. No corporate speak.

Format your response as 3–4 short paragraphs. Start with something that shows you actually read what they wrote. End with one specific recommendation and what the result would look like.

Keep the response under 200 words. Do NOT mention pricing. Do NOT use bullet points or headers. Write in flowing paragraphs only.

If the message is very short or vague (under 10 words), ask one clarifying question to understand their business better before giving the analysis.`

const SYSTEM_PROMPT_PL = `Jesteś asystentem AI dla SYT&Automate — butikowej agencji cyfrowej prowadzonej przez Mateusza Baranowskiego. SYT&Automate buduje strony internetowe, automatyzacje i dedykowane aplikacje dla małych i średnich firm na całym świecie.

Twoje zadanie: przeczytaj, co użytkownik napisał o swojej firmie, i daj mu konkretną, szczerą, ciepłą analizę:
1. Co wydaje się być ich największym cyfrowym/operacyjnym problemem
2. Jak dokładnie SYT&Automate może im pomóc (bądź konkretny — wspomnij o stronie, automatyzacji lub aplikacji, jeśli pasuje)
3. Konkretny przykład lub szybkie usprawnienie, które mogą uzyskać

Ton: przyjazny, bezpośredni, ludzki. Jak mądry znajomy, który jest też programistą. Bez żargonu. Bez ogólnych rad. Bez korporacyjnego języka.

Odpowiedź sformatuj jako 3–4 krótkie akapity. Zacznij od czegoś, co pokazuje, że naprawdę przeczytałeś, co napisali. Zakończ jedną konkretną rekomendacją i tym, jak wyglądałby rezultat.

Odpowiedź max 200 słów. NIE wspominaj o cenach. NIE używaj list punktowanych ani nagłówków. Pisz wyłącznie płynnymi akapitami. Odpowiadaj po polsku.

Jeśli wiadomość jest bardzo krótka lub niejasna (poniżej 10 słów), zadaj jedno pytanie wyjaśniające, zanim przejdziesz do analizy.`

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let message, lang
  try {
    ;({ message, lang } = JSON.parse(event.body))
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

    const systemPrompt = lang === 'pl' ? SYSTEM_PROMPT_PL : SYSTEM_PROMPT_EN

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: systemPrompt,
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
