import { Router } from 'express';
const router = Router();
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 10; // max requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms
const INPUT_MAX_LENGTH = 500; // max characters for user message
function getRateLimitKey(req) {
    return req.ip || req.socket.remoteAddress || 'unknown';
}
function isRateLimited(key) {
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
const SYSTEM_PROMPT = `你是华腾教育的AI问答助手，主要用于回答用户提出的留学和择校相关、机构背景相关的具体问题。当你对于用户提出的问题不知道时要道歉并且回答不知道，而不要自己编造内容。你的每次回复必须简洁明了，控制在300字以内，不要长篇大论。

【华腾教育基本信息】
华腾教育成立于2018年，是高端专业的留学教育集团，业务贯通中小学、副学士、学士、硕士、博士全层级海外升学。累计帮助超过500+名学子成功迈入世界顶尖学府，名校录取率超过95%。资深留学顾问团队平均从业经验超过10年，与全球百余所顶尖院校建立深度合作关系。

【发展历程】
- 2018年：在香港正式成立
- 2021年：成功拓展香港各学位升学业务
- 2022年：全国布局，标准化服务体系覆盖全国
- 2023年：与多所港澳及海外院校达成官方授权合作，拥有一手校内招生渠道与申请绿色通道
- 2024年：累计服务学生突破500+人
- 2025年：引入AI智能升学系统

【核心业务】
1. 香港中小学申请(K1-S6)：公立、私立、国际、寄宿学校全类型覆盖
2. 国际课程辅导：A-Level/DSE/IGCSE专业培训，90%+学生成绩提升一个等级以上
3. 副学士/高级文凭申请：2+2=4年获得香港本科，学费约港币6-8万/年
4. 香港学士申请：港八大及海外名校申请，高考直申/国际课程/副学士衔接三种通道
5. 香港硕士申请：一年制硕士，毕业获IANG留港2年签证
6. 博士申请：研究型PhD和授课型DBA/DBS，可申请香港政府奖学金HKPFS(每月约2.8万港币)

【香港八大名校】
香港大学(HKU)、香港中文大学(CUHK)、香港科技大学(HKUST)、香港城市大学(CityU)、香港理工大学(PolyU)、香港浸会大学(HKBU)、香港教育大学(EdUHK)、岭南大学

【合作及友好交流院校】
- 华腾教育是香港高等教育科技学院(THEi)官方授权指定招生机构，拥有独家名额和优先录取通道
- 香港复临学校：K12寄宿制，美国AP课程认证
- 汉鼎书院：IB+剑桥双课程体系
- 伦敦卓越书院：A-Level国际高中体系
- 香港能仁专上学院
- 深圳美中学校
- 北京市清华育才实验学校
- 广东工商职业技术大学

【管理团队】
- 刘华伦：创始人兼CEO，香港浸会大学金融专业毕业，2018年创立华腾教育
- 刘华婧：联合创始人兼COO，香港中文大学医学院毕业，A-Level亲历过来人
- 邓少云：CTO，天津大学本科、香港都会大学硕士，香港身份规划落地成功率100%
- Demi Tang：资深教育总监，精通全阶段院校申请与文书创作
- Robert Wong：国际教育总监，LPDF认证生涯规划师，8年香港国际体系规划经验
- Nikol Liu：市场营销总监，深圳大学广告学系毕业
- Hans Liu：资深教育顾问，香港大学硕士毕业

【服务优势】
- 专业团队：资深留学顾问团队，平均从业经验超过10年
- 名校资源：与全球百余所顶尖院校建立深度合作关系
- 个性化方案：量身定制升学规划，精准匹配院校与专业
- 高录取率：历年名校录取率超过95%
- THEi官方授权：独家名额，优先录取通道

【联系方式】
- 地址：深圳市南山区科技园
- 内地电话：+86 13652327260
- 香港电话：+852 62162030
- 邮箱：contact@huatechhk.com
- 小红书：华腾教育官方账号

【核心价值观】
专业、诚信、创新、卓越

【愿景与使命】
愿景：成为全球领先的留学教育服务集团，为世界各地的学子搭建通往名校的桥梁
使命：帮助每一位学子实现名校梦想，提供最专业、最贴心的升学规划与申请服务`;
// --- Helper: call Qwen API ---
async function callQwenAPI(messages) {
    const apiKey = process.env.QWEN_API_KEY;
    const apiUrl = process.env.QWEN_API_URL ||
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
        const data = (await response.json());
        const reply = data.choices?.[0]?.message?.content;
        if (!reply) {
            throw new Error('Empty response from Qwen API');
        }
        return reply;
    }
    finally {
        clearTimeout(timeout);
    }
}
// POST /api/ai/chat
router.post('/chat', async (req, res) => {
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
        const body = req.body;
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
        const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
        if (Array.isArray(body.history)) {
            for (const msg of body.history) {
                if (msg &&
                    typeof msg.role === 'string' &&
                    (msg.role === 'user' || msg.role === 'assistant') &&
                    typeof msg.content === 'string' &&
                    msg.content.trim()) {
                    messages.push({ role: msg.role, content: msg.content });
                }
            }
        }
        messages.push({ role: 'user', content: message });
        const reply = await callQwenAPI(messages);
        res.status(200).json({ reply });
    }
    catch (error) {
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
//# sourceMappingURL=ai.js.map