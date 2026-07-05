// 测试阿里云百炼 API 连通性
// 使用方法: npx ts-node test-ai.ts

import 'dotenv/config';

const API_KEY = process.env.QWEN_API_KEY;
const API_URL = process.env.QWEN_API_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

async function testAPI() {
  console.log('=== 阿里云百炼 API 测试 ===\n');
  console.log('API URL:', API_URL);
  console.log('API Key 是否配置:', API_KEY ? `是 (前5位: ${API_KEY.substring(0, 5)}...)` : '否');
  console.log('');

  if (!API_KEY) {
    console.error('错误: QWEN_API_KEY 环境变量未配置');
    return;
  }

  console.log('正在测试 API 调用...\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: [
          { role: 'system', content: '你是一个友好的助手。' },
          { role: 'user', content: '你好，请回复"测试成功"' }
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    console.log('HTTP 状态码:', response.status);
    console.log('');

    const data = await response.json();

    if (!response.ok) {
      console.error('API 调用失败:');
      console.error(JSON.stringify(data, null, 2));
      
      // 解析常见错误
      if (data.error) {
        console.log('\n=== 错误分析 ===');
        if (data.error.code === 'InvalidApiKey') {
          console.log('原因: API Key 无效或已过期');
        } else if (data.error.code === 'InsufficientBalance') {
          console.log('原因: 账户余额不足，请充值');
        } else if (data.error.code === 'RateLimitExceeded') {
          console.log('原因: 请求频率超限，请稍后重试');
        } else if (response.status === 401) {
          console.log('原因: 认证失败，请检查 API Key 是否正确');
        } else if (response.status === 403) {
          console.log('原因: 无权限访问，请检查 API Key 权限');
        } else if (response.status === 404) {
          console.log('原因: API 地址错误或模型不存在');
        }
      }
      return;
    }

    console.log('API 调用成功!');
    console.log('响应内容:', JSON.stringify(data, null, 2));
    
    if (data.choices?.[0]?.message?.content) {
      console.log('\nAI 回复:', data.choices[0].message.content);
    }
  } catch (error) {
    console.error('请求失败:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('fetch failed')) {
        console.log('\n=== 错误分析 ===');
        console.log('原因: 无法连接到 API 服务器，请检查网络或 API 地址是否正确');
      }
    }
  }
}

testAPI();
