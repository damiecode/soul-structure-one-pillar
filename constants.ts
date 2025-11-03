import { AssessmentQuestion, PillarState, ScoreInterpretation } from "./types";

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    text: "I generally believe people are kind and trustworthy unless proven otherwise.",
    reverseCoded: false,
  },
  {
    text: "I often expect people to hurt, disappoint, or leave me.",
    reverseCoded: true,
  },
  {
    text: "I believe healthy relationships require both honesty and grace.",
    reverseCoded: false,
  },
  {
    text: "I have at least a few relationships where I feel emotionally safe and deeply seen.",
    reverseCoded: false,
  },
  {
    text: "I often hide my true feelings because I fear being judged or misunderstood.",
    reverseCoded: true,
  },
  {
    text: "I can count on the people in my life to show up for me when I truly need support.",
    reverseCoded: false,
  },
  {
    text: 'I can say "no" without feeling guilty or afraid of losing people\'s approval.',
    reverseCoded: false,
  },
  {
    text: "I often prioritize others' comfort over my own wellbeing.",
    reverseCoded: true,
  },
  {
    text: "I communicate my needs clearly, even when it feels uncomfortable.",
    reverseCoded: false,
  },
  {
    text: "My relationships feel mutually supportive — I give and receive love in healthy measure.",
    reverseCoded: false,
  },
  {
    text: "I often feel resentful because I over-give or overextend myself for others.",
    reverseCoded: true,
  },
  {
    text: "I am learning to let people help me, instead of feeling like I must do everything alone.",
    reverseCoded: false,
  },
  {
    text: "I can freely express my opinions, even when they differ from those of people I care about.",
    reverseCoded: false,
  },
  {
    text: "I have friendships where I experience fun, laughter, and lightness.",
    reverseCoded: false,
  },
  {
    text: "I feel comfortable initiating connections and nurturing relationships that matter to me.",
    reverseCoded: false,
  },
  {
    text: "I can end or redefine relationships that no longer align with my peace or purpose.",
    reverseCoded: false,
  },
];

export const ASSESSMENT_CATEGORIES: { [key: string]: number[] } = {
  "Trust & Safety": [0, 1, 3, 4, 5],
  "Boundaries & Balance": [6, 7, 8, 10, 15],
  "Mutual Support": [2, 9, 11],
  "Authentic Expression": [12, 13, 14],
};

export const SCORE_INTERPRETATIONS: {
  [key in PillarState]: ScoreInterpretation;
} = {
  [PillarState.Strong]: {
    state: PillarState.Strong,
    narrative:
      "You have cultivated relationships that are both nurturing and boundaried. You experience mutual trust, joy, and authenticity in your connections. You know how to show up for others without losing yourself, and you communicate openly while honouring your needs. Continue investing intentionally in your relationships — practicing vulnerability, gratitude, and emotional availability while maintaining healthy boundaries.",
    color: "#6A994E",
  },
  [PillarState.Growing]: {
    state: PillarState.Growing,
    narrative:
      "You are building healthier relational patterns and becoming more discerning about who has access to your emotional space. You're learning to communicate your needs, say no without guilt, and find joy in authentic connection. To strengthen this pillar, focus on reinforcing your boundaries, expressing appreciation in your relationships, and allowing yourself to receive love as freely as you give it.",
    color: "#F4A261",
  },
  [PillarState.Unsteady]: {
    state: PillarState.Unsteady,
    narrative:
      "Your relational world feels inconsistent — you may oscillate between closeness and withdrawal, openness and guardedness. There may be traces of over-giving, resentment, or fear of rejection. It is important for you to start observing your patterns with curiosity, not judgment. Lean into safe relationships, seek to heal old wounds that affect trust, and practice balanced reciprocity in your interactions. You may find it deeply helpful to process these patterns in counselling or guided support, where you can learn healthier attachment rhythms and rebuild relational safety.",
    color: "#E76F51",
  },
  [PillarState.Fragile]: {
    state: PillarState.Fragile,
    narrative:
      "Relationships may often leave you feeling unseen, drained, or unsafe. You might struggle with trust, boundary-setting, or fear of abandonment. This pillar is signalling the need for relational renewal. To begin healing, create safety within yourself first — reconnect with your sense of worth and seek spaces where you can experience genuine care, healthy support, and the slow rebuilding of trust in others. Working with a trauma-informed counsellor or therapist can offer the structure and safety you need to heal deeply and restore balance in this pillar.",
    color: "#D00000",
  },
};

export const getInterpretationByScore = (
  score: number
): ScoreInterpretation => {
  if (score >= 4.5) return SCORE_INTERPRETATIONS[PillarState.Strong];
  if (score >= 3.5 && score < 4.5)
    return SCORE_INTERPRETATIONS[PillarState.Growing];
  if (score >= 2.5 && score < 3.5)
    return SCORE_INTERPRETATIONS[PillarState.Unsteady];
  return SCORE_INTERPRETATIONS[PillarState.Fragile];
};
