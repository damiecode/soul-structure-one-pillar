import { AssessmentQuestion, PillarState, ScoreInterpretation } from './types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { text: 'I am deeply convinced that God loves me unconditionally, even when I make mistakes.', reverseCoded: false },
  { text: 'My beliefs about God’s nature come from personal experiences with Him, not just from what I’ve been taught.', reverseCoded: false },
  { text: 'I find it easy to spend unhurried, joyful time in God’s presence.', reverseCoded: false },
  { text: 'I often feel distant from God because I believe I’ve disappointed Him.', reverseCoded: true },
  { text: 'I approach spiritual practices (prayer, study, service) out of love and gratitude, not out of fear or guilt.', reverseCoded: false },
  { text: 'I trust God’s timing for my life, even when things are not happening as I hoped.', reverseCoded: false },
  { text: 'I sometimes struggle with resentment or disappointment toward God over unmet expectations.', reverseCoded: true },
  { text: 'My conversations with God feel honest and authentic, not performance-driven.', reverseCoded: false },
  { text: 'I see God as a loving Father, not a demanding taskmaster.', reverseCoded: false },
  { text: 'I often try to earn God’s favour through my performance.', reverseCoded: true },
  { text: 'I can trace moments this year when I’ve sensed God guiding or comforting me personally.', reverseCoded: false },
  { text: 'I feel safe being vulnerable with God about my doubts, fears, and questions.', reverseCoded: false },
  { text: 'I’m learning to rest in God’s grace rather than striving for perfection.', reverseCoded: false },
  { text: 'My relationship with God feels vibrant, not mechanical.', reverseCoded: false },
  { text: 'I’m confident in my standing with God, regardless of how “spiritually strong” I feel.', reverseCoded: false },
  { text: 'I sense alignment between my spiritual beliefs and the way I live daily.', reverseCoded: false },
];

export const SCORE_INTERPRETATIONS: { [key in PillarState]: ScoreInterpretation } = {
  [PillarState.Strong]: {
    state: PillarState.Strong,
    narrative: 'You’re living from a place of deep trust and intimacy with God. Your faith is experiential, grounded in grace and personal revelation. You rest in His timing, commune with joy, and respond to life from peace, not striving. Keep nurturing your rhythms of devotion, gratitude, and stillness.',
    color: '#6A994E',
  },
  [PillarState.Growing]: {
    state: PillarState.Growing,
    narrative: 'You enjoy a meaningful relationship with God, though moments of striving, guilt, or doubt sometimes cloud your sense of security. You’re learning to unlearn religious performance and lean into grace. To strengthen this pillar, spend time reflecting on God’s consistent nature and practice resting in His love.',
    color: '#F4A261',
  },
  [PillarState.Unsteady]: {
    state: PillarState.Unsteady,
    narrative: 'Your spiritual life may feel inconsistent — some days filled with connection, others distant or uncertain. There may be lingering disappointment, unanswered prayers, or distorted views of God’s love. To begin stabilizing this pillar, give yourself permission to wrestle honestly with God, explore Scripture with fresh eyes, and rebuild trust through small, daily moments of presence and gratitude. You may find it deeply helpful to walk with a faith-based counsellor, mentor, or spiritual leader who can gently help you process and strengthen your spiritual foundations.',
    color: '#E76F51',
  },
  [PillarState.Fragile]: {
    state: PillarState.Fragile,
    narrative: 'Your connection with God may feel strained or performative. You may carry hidden pain, fear, or confusion about His character. This is not condemnation — it’s a gentle call to healing. To begin restoring this pillar, bring your vulnerability before God in prayer or journaling, seek community that embodies His love, and slowly rediscover the joy of intimacy through honesty. Consider engaging in faith-integrated therapy or spiritual counseling to help you unearth deeper wounds and rebuild a secure, grace-filled connection with God.',
    color: '#D00000',
  },
};

export const getInterpretationByScore = (score: number): ScoreInterpretation => {
  if (score >= 4.5) return SCORE_INTERPRETATIONS[PillarState.Strong];
  if (score >= 3.5) return SCORE_INTERPRETATIONS[PillarState.Growing];
  if (score >= 2.5) return SCORE_INTERPRETATIONS[PillarState.Unsteady];
  return SCORE_INTERPRETATIONS[PillarState.Fragile];
};