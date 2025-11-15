# 🤖 AI Chatbot Setup - Moominpappa

Moominpappa is powered by OpenAI's GPT-4o-mini to provide intelligent, personalized financial advice to teens!

## 🎯 Features

- **Real AI Conversations**: Uses OpenAI's API for natural, context-aware responses
- **Financial Expertise**: Trained specifically to teach teens about investing, budgeting, and saving
- **Moominpappa Personality**: Warm, encouraging, grandfatherly tone with wholesome emojis
- **Fallback System**: Works with basic responses if API is unavailable
- **Context Awareness**: References app features (Learn, Invest, Budget, Future Me, Compete)

## 🔧 Setup Instructions

### Step 1: Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key (you won't be able to see it again!)

### Step 2: Add Key to Your Project

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder with your actual key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. Save the file

### Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

## 💰 Pricing

- **Model**: GPT-4o-mini (cost-effective choice)
- **Cost**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Average**: Each chat message costs less than $0.001
- **Limits**: Set up usage limits in your OpenAI dashboard to control costs

## 🎨 AI Personality

Moominpappa has been programmed with:

- **Warm & Encouraging**: Grandfatherly, patient, never condescending
- **Teen-Friendly**: Simple language for ages 13-17
- **Financial Expert**: Knows stocks, ETFs, budgeting, compound interest
- **Responsible**: Never suggests risky investments or debt
- **Engaging**: Uses emojis, calls users "young adventurer"
- **App-Aware**: References Aura's features naturally in conversation

## 🔒 Security

- Never commit your `.env` file to version control
- The `.env` file is in `.gitignore` by default
- Keep your API key private
- Set up usage limits in OpenAI dashboard
- Monitor your usage at [OpenAI Usage](https://platform.openai.com/usage)

## 🛠️ Fallback Mode

If the API key is missing or the API fails:
- Chatbot uses pre-written mock responses
- Users see a note: "[Note: AI connection unavailable...]"
- Basic financial questions still get answered
- No errors or broken functionality

## 📊 Monitoring

Check your OpenAI usage:
1. Go to [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. Monitor tokens used
3. Set up billing alerts
4. Review conversation quality

## 🎯 Customization

To modify Moominpappa's personality, edit the system prompt in `/components/FloatingChatbot.tsx`:

```typescript
{
  role: 'system',
  content: `You are Moominpappa...`
}
```

You can adjust:
- Tone and personality
- Response length (max_tokens)
- Creativity (temperature: 0-1)
- Topics covered
- References to app features

## 🚀 Alternative AI Providers

The code can be adapted for other AI providers:

- **Anthropic Claude**: Change endpoint and model
- **Google Gemini**: Use Google's API
- **Local LLMs**: Use Ollama or similar
- **Other OpenAI Models**: Change model to `gpt-4`, `gpt-3.5-turbo`, etc.

## ❓ Troubleshooting

**"Invalid API key"**
- Check that your key starts with `sk-`
- Ensure no extra spaces in `.env`
- Restart dev server after changing `.env`

**"Rate limit exceeded"**
- You've hit OpenAI's rate limit
- Wait a few minutes
- Consider upgrading your OpenAI plan

**"Connection failed"**
- Check your internet connection
- Verify OpenAI's status at [status.openai.com](https://status.openai.com)
- Fallback responses will be used automatically

**Responses are too long/short**
- Adjust `max_tokens` parameter (currently 300)
- Lower for shorter, higher for longer responses

**Responses aren't on-brand**
- Edit the system prompt
- Adjust `temperature` (0 = focused, 1 = creative)

## 📝 Notes

- The chatbot remembers conversation history within a session
- History is reset when chat window is closed
- All conversation data stays client-side
- No data is stored long-term (privacy-first!)

---

Built with ❤️ for **Aura | Finance for Teens by Teens**
