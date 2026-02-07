const API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
const API_KEY = 'sk-default-Oo7diA3oWnCnVFdNW4DUdxhp4qbXgXot';
const AGENT_ID = '6987001def705c6443e1db66';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  user_id: string;
  agent_id: string;
  session_id: string;
  message: string;
}

export interface ChatResponse {
  response?: string;
  message?: string;
  error?: string;
}

export function generateSessionId(userId: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${AGENT_ID}-${randomString}`;
}

export async function sendMessage(
  userId: string,
  sessionId: string,
  message: string
): Promise<ChatResponse> {
  const requestBody: ChatRequest = {
    user_id: userId,
    agent_id: AGENT_ID,
    session_id: sessionId,
    message: message,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export const WORKFLOW_AGENTS = [
  {
    id: 'job-description',
    name: 'Job Description Generator',
    description: 'Creates comprehensive job descriptions',
    icon: 'FileText',
  },
  {
    id: 'evaluation-criteria',
    name: 'Evaluation Criteria Generator',
    description: 'Generates structured hiring criteria',
    icon: 'CheckSquare',
  },
  {
    id: 'resume-evaluation',
    name: 'Resume Evaluation Agent',
    description: 'Evaluates candidate resumes',
    icon: 'UserCheck',
  },
  {
    id: 'interviewer',
    name: 'PM Interviewer Agent',
    description: 'Conducts structured interviews',
    icon: 'MessageSquare',
  },
  {
    id: 'interview-evaluator',
    name: 'Interview Evaluator Agent',
    description: 'Evaluates interview performance',
    icon: 'Award',
  },
];
