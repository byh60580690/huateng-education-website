import { Router, Request, Response } from 'express';

const router = Router();

// --- Rate limiting ---
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;       // max requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms
const INPUT_MAX_LENGTH = 500;    // max characters for user message

function getRateLimitKey(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// --- System prompt ---
const SYSTEM_PROMPT =
  '华腾集团是一家知名的留学教育集团，主要的业务为本科、研究生的留学申请，尤其专注于香港学士升学，' +
  '致力于帮助学生实现顶尖大学的入学目标。你是华腾集团的AI问答助手，主要用于回答用户提出的留学和择校相关、' +
  '集团背景相关的具体问题，当你对于用户提出的问题不知道时要道歉并且回答不知道，而不要自己编造内容。';

// --- Types ---
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIChatRequestBody {
  message?: string;
  history?: ChatMessage[];
}

// --- Helper: call Qwen API ---
async function callQwenAPI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.QWEN_API_KEY;
  const apiUrl =
    process.env.QWEN_API_URL ||
    'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

  if (!apiKey) {
    throw new Error('AI_DISABLED');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Qwen API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('Empty response from Qwen API');
    }

    return reply;
  } finally {
    clearTimeout(timeout);
  }
}

// POST /api/ai/chat
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    // Rate limiting
    const clientKey = getRateLimitKey(req);
    if (isRateLimited(clientKey)) {
      res.status(429).json({ error: '请求过于频繁，请稍后再试' });
      return;
    }

    // Check if AI is enabled
    if (!process.env.QWEN_API_KEY) {
      res.status(503).json({ error: 'AI 功能未启用，请联系管理员配置 API Key' });
      return;
    }

    const body = req.body as AIChatRequestBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      res.status(400).json({ error: '请输入您的问题' });
      return;
    }

    // Input length limit
    if (message.length > INPUT_MAX_LENGTH) {
      res.status(400).json({ error: `输入内容不能超过${INPUT_MAX_LENGTH}个字符` });
      return;
    }

    // Build messages array: system prompt + history + user message
    const messages: ChatMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];

    if (Array.isArray(body.history)) {
      for (const msg of body.history) {
        if (
          msg &&
          typeof msg.role === 'string' &&
          (msg.role === 'user' || msg.role === 'assistant') &&
          typeof msg.content === 'string' &&
          msg.content.trim()
        ) {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    const reply = await callQwenAPI(messages);
    res.status(200).json({ reply });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        res.status(504).json({ error: 'AI 服务响应超时，请稍后重试' });
        return;
      }
      if (error.message === 'AI_DISABLED') {
        res.status(503).json({ error: 'AI 功能未启用' });
        return;
      }
      console.error('AI chat error:', error.message);
    }
    res.status(500).json({ error: 'AI 服务暂时不可用，请稍后重试' });
  }
});

export default router;
