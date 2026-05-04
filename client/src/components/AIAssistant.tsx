import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { sendAIChatMessage } from '../services/api';
import styles from './AIAssistant.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 20;

export default function AIAssistant() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    setMessages(prev => {
      const updated = [...prev, userMessage];
      return updated.slice(-MAX_MESSAGES);
    });
    setInputValue('');
    setIsLoading(true);
    setError(null);
    setLastFailedMessage(null);

    try {
      const data = await sendAIChatMessage({
        message: content.trim(),
        history: messages.slice(-MAX_MESSAGES),
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || t('ai.error'),
      };
      setMessages(prev => {
        const updated = [...prev, assistantMessage];
        return updated.slice(-MAX_MESSAGES);
      });
    } catch {
      setError(t('ai.error'));
      setLastFailedMessage(content.trim());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      setError(null);
      sendMessage(lastFailedMessage);
    }
  };

  return (
    <>
      {/* 折叠按钮 */}
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label={t('ai.title')}
      >
        💬
      </button>

      {/* 聊天窗口 */}
      <div
        className={`${styles.chatWindow} ${isOpen ? styles.chatWindowOpen : ''}`}
        role="dialog"
        aria-label={t('ai.title')}
      >
        {/* 标题栏 */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>{t('ai.title')}</span>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* 消息列表 */}
        <div className={styles.messageList} ref={messageListRef}>
          {messages.length === 0 && !isLoading && (
            <div className={styles.welcome}>{t('ai.welcome')}</div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.message} ${
                msg.role === 'user' ? styles.messageUser : styles.messageAssistant
              }`}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              <span>{error}</span>
              <button className={styles.retryButton} onClick={handleRetry}>
                {t('ai.retry')}
              </button>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('ai.placeholder')}
            disabled={isLoading}
            maxLength={500}
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            aria-label={t('ai.send')}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
