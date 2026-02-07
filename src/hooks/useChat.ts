import { useState, useCallback, useEffect } from 'react';
import { sendMessage, generateSessionId, ChatMessage } from '@/lib/api';

const DEFAULT_USER_ID = 'user@example.com';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Initialize session on mount
    const storedSessionId = localStorage.getItem('hr_agent_session_id');
    const storedUserId = localStorage.getItem('hr_agent_user_id');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId(userId);
      setSessionId(newSessionId);
      localStorage.setItem('hr_agent_session_id', newSessionId);
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Load stored messages
    const storedMessages = localStorage.getItem('hr_agent_messages');
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })));
      } catch (e) {
        console.error('Error parsing stored messages:', e);
      }
    }
  }, []);

  const saveMessages = useCallback((msgs: ChatMessage[]) => {
    localStorage.setItem('hr_agent_messages', JSON.stringify(msgs));
  }, []);

  const send = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(userId, sessionId, content.trim());
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.response || response.message || 'No response received.',
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [messages, userId, sessionId, isLoading, saveMessages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('hr_agent_messages');
    const newSessionId = generateSessionId(userId);
    setSessionId(newSessionId);
    localStorage.setItem('hr_agent_session_id', newSessionId);
  }, [userId]);

  const updateUserId = useCallback((newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem('hr_agent_user_id', newUserId);
  }, []);

  return {
    messages,
    isLoading,
    error,
    userId,
    sessionId,
    send,
    clearChat,
    updateUserId,
  };
}
