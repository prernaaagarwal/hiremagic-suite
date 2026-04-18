import { ChatMessage, WORKFLOW_AGENTS } from './api';

// Keyword fingerprints per agent — kept generous for fuzzy matching against
// the conductor's prose. Order matches WORKFLOW_AGENTS.
const AGENT_KEYWORDS: Record<string, string[]> = {
  'job-description': [
    'job description', 'jd', 'role description', 'responsibilities',
    'requirements', 'posting', 'open role', 'opening',
  ],
  'evaluation-criteria': [
    'evaluation criteria', 'rubric', 'scoring', 'criteria', 'competenc',
    'must-have', 'nice-to-have', 'weight',
  ],
  'resume-evaluation': [
    'resume', 'cv', 'candidate', 'experience', 'background', 'profile',
    'fit score', 'shortlist',
  ],
  'interviewer': [
    'interview', 'question', 'ask the candidate', 'probe', 'follow-up',
    'pm interview', 'behavioral',
  ],
  'interview-evaluator': [
    'interview evaluation', 'interview score', 'performance', 'feedback',
    'assessment', 'verdict', 'recommend hire', 'do not hire',
  ],
};

/**
 * Determine which agent (if any) the conductor most recently invoked.
 * Returns the agent id or null. Looks at the last assistant message.
 */
export function detectActiveAgent(messages: ChatMessage[]): string | null {
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  if (!lastAssistant) return null;

  const text = lastAssistant.content.toLowerCase();
  let best: { id: string; score: number } | null = null;

  for (const agent of WORKFLOW_AGENTS) {
    const keywords = AGENT_KEYWORDS[agent.id] ?? [];
    let score = 0;
    for (const k of keywords) {
      if (text.includes(k)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: agent.id, score };
    }
  }

  return best?.id ?? null;
}

/**
 * When a request is in flight, try to predict which agent the conductor will
 * delegate to based on the user's last message.
 */
export function predictThinkingAgent(messages: ChatMessage[]): string | null {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return null;

  const text = lastUser.content.toLowerCase();
  let best: { id: string; score: number } | null = null;

  for (const agent of WORKFLOW_AGENTS) {
    const keywords = AGENT_KEYWORDS[agent.id] ?? [];
    let score = 0;
    for (const k of keywords) {
      if (text.includes(k)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: agent.id, score };
    }
  }

  return best?.id ?? null;
}
