/**
 * API 服务层 - 封装前端与后端的 HTTP 请求
 * 开发环境通过 vite.config.ts 中的 proxy 配置将 /api 请求代理到 http://localhost:3001
 */

export interface ContactFormData {
  name: string;
  phone: string;
  organization: string;
  intention: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export interface AIChatRequest {
  message: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface AIChatResponse {
  reply?: string;
  error?: string;
}

/**
 * 提交联系表单（合作加盟）
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json() as Promise<ContactResponse>;
}

/**
 * 发送 AI 问答消息
 */
export async function sendAIChatMessage(request: AIChatRequest): Promise<AIChatResponse> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<AIChatResponse>;
}

/**
 * 健康检查接口
 */
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  const response = await fetch('/api/health');
  return response.json();
}
