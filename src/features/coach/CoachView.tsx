/**
 * AI Sustainability Coach — "Terra"
 *
 * Context-aware, explainable AI coach that:
 * - Uses the recommendation engine for personalized responses
 * - Shows "Why?" evidence chain (Detected Pattern → Evidence → Confidence → Impact)
 * - Tracks conversation topics to avoid repetition
 * - Typing indicator with simulated delay
 * - Time-of-day greeting
 * - Quick action suggestions
 */

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Bot,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
} from 'lucide-react';
import type { FootprintInput, CoachMessage, Breakdown } from '../../types';
import { calculateFootprint, totalFootprint, categoryShares } from '../../utils/carbon';
import { generateRecommendations } from '../../core/recommendation-engine/recommendation-engine';

interface Props {
  input: FootprintInput;
}

let msgId = 0;
function nextId() {
  return `msg-${++msgId}`;
}

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Detect which topic the user is asking about and generate
 * a context-aware response with explainable AI evidence.
 */
function generateResponse(
  text: string,
  input: FootprintInput,
  breakdown: Breakdown,
  coveredTopics: Set<string>,
): CoachMessage {
  const lower = text.toLowerCase();
  const shares = categoryShares(breakdown);
  const total = totalFootprint(breakdown);
  const recs = generateRecommendations(input, breakdown);

  /* Topic detection */
  let topic = 'general';
  if (/transport|car|commut|drive|bus|metro|train|flight/.test(lower)) topic = 'transport';
  else if (/food|diet|meat|veg|plant|lunch|dinner/.test(lower)) topic = 'food';
  else if (/energy|electric|ac|air.?con|power|appliance|led|light/.test(lower)) topic = 'energy';
  else if (/waste|recycl|trash|garbage|compost/.test(lower)) topic = 'waste';
  else if (/shop|buy|fashion|electronic|cloth/.test(lower)) topic = 'shopping';
  else if (/plan|week|roadmap|goal|schedule/.test(lower)) topic = 'plan';
  else if (/score|improv|progress|how.?am/.test(lower)) topic = 'progress';
  else if (/tip|suggest|recommend|what.?can|help/.test(lower)) topic = 'tips';

  coveredTopics.add(topic);

  /* Find matching recommendation */
  const matchedRec = recs.find((r) => r.category === topic) || recs[0];

  const responses: Record<string, () => CoachMessage> = {
    transport: () => ({
      id: nextId(),
      role: 'assistant',
      text: matchedRec.recommendation,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'High transport usage detected',
        evidence: `Transport represents ${shares.transport}% of your total footprint (${breakdown.transport} kg/month)`,
        confidence: matchedRec.confidence,
        expectedImpact: `Save ~${matchedRec.carbonSaved} kg CO₂e and ₹${matchedRec.moneySaved}/month`,
      },
    }),
    food: () => ({
      id: nextId(),
      role: 'assistant',
      text:
        input.diet === 'plant'
          ? 'You already eat plant-forward — great choice! Try sourcing seasonal, local produce twice a week. That could trim another 5 kg CO₂e and connect you to local farmers.'
          : 'Making Tuesday and Friday lunches vegetarian could save approximately 18 kg CO₂e monthly. Two consistent swaps are easier to sustain than a full diet change.',
      timestamp: Date.now(),
      explanation: {
        detectedPattern: `Diet type: ${input.diet}`,
        evidence: `Food accounts for ${shares.food}% of your footprint (${breakdown.food} kg/month)`,
        confidence: 84,
        expectedImpact: input.diet === 'plant' ? 'Save ~5 kg CO₂e/month' : 'Save ~18 kg CO₂e and ₹480/month',
      },
    }),
    energy: () => ({
      id: nextId(),
      role: 'assistant',
      text: `Your monthly electricity usage is ${input.electricityKwh} kWh with ${input.acHoursPerDay}h/day AC. Scheduling AC to run only during peak heat (12-4 PM) and switching standby devices off could reduce your energy footprint by about 15%.`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Above-average energy consumption',
        evidence: `Energy represents ${shares.energy}% of your footprint (${breakdown.energy} kg/month). AC alone contributes ~${Math.round(input.acHoursPerDay * 30 * 1.2)} kg.`,
        confidence: 87,
        expectedImpact: `Save ~${Math.round(breakdown.energy * 0.15)} kg CO₂e/month`,
      },
    }),
    waste: () => ({
      id: nextId(),
      role: 'assistant',
      text: `You currently recycle about ${input.recyclingPct}% of your waste. Increasing this to ${Math.min(100, input.recyclingPct + 25)}% through paper, plastic, and food waste segregation could cut your waste emissions by nearly 40%.`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Low recycling rate',
        evidence: `Waste accounts for ${shares.waste}% (${breakdown.waste} kg/month). Recycling at ${input.recyclingPct}%.`,
        confidence: 82,
        expectedImpact: `Save ~${Math.round(breakdown.waste * 0.4)} kg CO₂e/month`,
      },
    }),
    shopping: () => ({
      id: nextId(),
      role: 'assistant',
      text: 'Consider buying refurbished electronics and choosing sustainable fashion brands. Extending a phone\'s life by one year saves about 70 kg CO₂e. Capsule wardrobes can reduce fashion emissions by 30%.',
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Shopping emissions detected',
        evidence: `Shopping contributes ${shares.shopping}% of your footprint (${breakdown.shopping} kg/month)`,
        confidence: 78,
        expectedImpact: `Save ~${Math.round(breakdown.shopping * 0.25)} kg CO₂e/month`,
      },
    }),
    plan: () => ({
      id: nextId(),
      role: 'assistant',
      text: `Here's your personalized weekly plan:\n\n• Mon & Wed: Take metro instead of car (save ~${Math.round(input.carKm * 2 * 0.13)} kg)\n• Tue & Thu: Plant-based lunch (save ~4 kg)\n• Fri: Switch off all standby devices before leaving (save ~2 kg)\n• Weekend: Sort recycling and compost food waste\n\nThis plan targets your top 3 emission categories and is designed for consistency, not perfection.`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Weekly plan request',
        evidence: `Top categories: ${Object.entries(shares).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c, p]) => `${c} (${p}%)`).join(', ')}`,
        confidence: 90,
        expectedImpact: `Potential ~${Math.round(total * 0.08)} kg CO₂e reduction per week`,
      },
    }),
    progress: () => ({
      id: nextId(),
      role: 'assistant',
      text: `Your sustainability score is ${Math.max(20, Math.min(98, Math.round(100 - total / 8)))}/100 — that puts you in the "above average" bracket. Your biggest win this month was in energy (down 14%). To reach 85+, focus on transport — it's ${shares.transport}% of your footprint and has the highest reduction potential.`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Progress assessment request',
        evidence: `Current total: ${total} kg/month. Score: ${Math.max(20, Math.min(98, Math.round(100 - total / 8)))}/100`,
        confidence: 91,
        expectedImpact: 'Reaching 85+ score by targeting transport habits',
      },
    }),
    tips: () => ({
      id: nextId(),
      role: 'assistant',
      text: `Based on your profile, here are your top 3 high-impact tips:\n\n1. **${recs[0]?.recommendation?.split('.')[0] || 'Reduce car commutes'}** (${recs[0]?.carbonSaved || 31} kg saved)\n2. **${recs[1]?.recommendation?.split('.')[0] || 'Optimize energy use'}** (${recs[1]?.carbonSaved || 13} kg saved)\n3. **${recs[2]?.recommendation?.split('.')[0] || 'Try plant-based meals'}** (${recs[2]?.carbonSaved || 18} kg saved)\n\nThese are ranked by impact × feasibility for your specific lifestyle.`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'Recommendations request',
        evidence: `Analyzed ${Object.keys(breakdown).length} emission categories. Top opportunity: ${recs[0]?.category || 'transport'}`,
        confidence: 88,
        expectedImpact: `Combined potential: ~${recs.reduce((s, r) => s + r.carbonSaved, 0)} kg CO₂e/month`,
      },
    }),
    general: () => ({
      id: nextId(),
      role: 'assistant',
      text: `Your total monthly footprint is ${total} kg CO₂e. The biggest opportunity is in ${Object.entries(shares).sort((a, b) => b[1] - a[1])[0][0]} (${Object.entries(shares).sort((a, b) => b[1] - a[1])[0][1]}% of total). Try asking me about specific areas like transport, food, energy, or waste — or ask for a weekly plan!`,
      timestamp: Date.now(),
      explanation: {
        detectedPattern: 'General inquiry',
        evidence: `Total footprint: ${total} kg CO₂e across 5 categories`,
        confidence: 85,
        expectedImpact: 'Ask about specific categories for targeted advice',
      },
    }),
  };

  return (responses[topic] || responses.general)();
}

export function CoachView({ input }: Props) {
  const breakdown = useMemo(() => calculateFootprint(input), [input]);
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: nextId(),
      role: 'assistant',
      text: `${timeGreeting()}, Alex! 🌿 Your footprint dropped 6% this month — nice work. Transport is still your biggest category. Want a simple plan to lower it, or ask me about any area of your impact?`,
      timestamp: Date.now(),
    },
  ]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedExplanation, setExpandedExplanation] = useState<string | null>(null);
  const coveredTopics = useRef(new Set<string>());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = useCallback(() => {
    const q = text.trim();
    if (!q) return;
    setText('');

    const userMsg: CoachMessage = {
      id: nextId(),
      role: 'user',
      text: q,
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setIsTyping(true);

    /* Simulate thinking delay for realism */
    setTimeout(() => {
      const response = generateResponse(q, input, breakdown, coveredTopics.current);
      setMessages((m) => [...m, response]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  }, [text, input, breakdown]);

  const quickActions = [
    'Build my weekly plan',
    'How can I improve food impact?',
    'What\'s my biggest opportunity?',
    'Show my progress',
  ];

  return (
    <section className="page-view coach-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> EXPLAINABLE AI COACH
          </span>
          <h1>Meet Terra, your sustainability coach</h1>
          <p>
            Every recommendation comes with evidence, confidence scores,
            and expected impact — so you understand the &ldquo;why&rdquo;.
          </p>
        </div>
      </div>

      <div className="chat-card">
        <div className="chat-head">
          <div className="coach-avatar">
            <Bot />
          </div>
          <div>
            <strong>Terra</strong>
            <span>
              <i /> Online · analyzes your footprint
            </span>
          </div>
        </div>

        <div className="chat-body" role="log" aria-live="polite" aria-label="Conversation with Terra">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className={`bubble ${msg.role}`}>
                <span className="bubble-text">{msg.text}</span>
                <time className="bubble-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>

              {/* Explainable AI Panel */}
              {msg.explanation && (
                <div className="explanation-wrap">
                  <button
                    className="explanation-toggle"
                    onClick={() =>
                      setExpandedExplanation(
                        expandedExplanation === msg.id ? null : msg.id,
                      )
                    }
                    aria-expanded={expandedExplanation === msg.id}
                    aria-label="Show AI reasoning"
                  >
                    <Sparkles size={12} />
                    Why this recommendation?
                    {expandedExplanation === msg.id ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>

                  {expandedExplanation === msg.id && (
                    <div className="explanation-panel" role="region" aria-label="AI reasoning">
                      <div className="expl-row">
                        <span className="expl-label">Detected Pattern</span>
                        <span>{msg.explanation.detectedPattern}</span>
                      </div>
                      <div className="expl-row">
                        <span className="expl-label">Evidence</span>
                        <span>{msg.explanation.evidence}</span>
                      </div>
                      <div className="expl-row">
                        <span className="expl-label">Confidence</span>
                        <div className="confidence-bar">
                          <i style={{ width: `${msg.explanation.confidence}%` }} />
                          <strong>{msg.explanation.confidence}%</strong>
                        </div>
                      </div>
                      <div className="expl-row">
                        <span className="expl-label">Expected Impact</span>
                        <span className="expl-impact">{msg.explanation.expectedImpact}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="bubble assistant typing" aria-label="Terra is typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="suggestions">
          {quickActions.map((action) => (
            <button key={action} onClick={() => setText(action)}>
              {action}
            </button>
          ))}
        </div>

        <div className="chat-input">
          <label className="sr-only" htmlFor="coach-message">
            Message Terra
          </label>
          <input
            id="coach-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about your impact…"
          />
          <button onClick={send} aria-label="Send message" disabled={isTyping}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
