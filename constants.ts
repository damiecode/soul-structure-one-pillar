import { AssessmentQuestion, PillarState, ScoreInterpretation } from "./types";

// Pillar 2: IDENTITY — Self-Relationship
// Reverse-coded: #2, #6, #10, #13, #16
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    text: "I feel comfortable being fully myself, even when others may not understand me.",
    reverseCoded: false,
  },
  {
    text: "I often hide parts of who I am to fit in or avoid disapproval.",
    reverseCoded: true,
  },
  {
    text: "I am at peace with my humanity — my strengths, flaws, and everything in between.",
    reverseCoded: false,
  },
  {
    text: "I can laugh at myself without feeling ashamed or embarrassed.",
    reverseCoded: false,
  },
  {
    text: "I speak to myself with kindness and encouragement, especially when I make mistakes.",
    reverseCoded: false,
  },
  {
    text: "I often criticize myself harshly for not being “enough.”",
    reverseCoded: true,
  },
  {
    text: "I believe I am intrinsically valuable, even when I’m not achieving or producing.",
    reverseCoded: false,
  },
  {
    text: "I feel proud of how far I’ve come, even if I’m still a work in progress.",
    reverseCoded: false,
  },
  {
    text: "I listen to my body and honour its needs for rest, food, and rejuvenation.",
    reverseCoded: false,
  },
  {
    text: "I ignore my emotional or physical needs because others’ needs feel more important.",
    reverseCoded: true,
  },
  {
    text: "I make time for things that bring me joy, not just things that are “necessary.”",
    reverseCoded: false,
  },
  {
    text: "I feel excited to discover new dimensions of myself as I evolve.",
    reverseCoded: false,
  },
  {
    text: "I feel pressure to remain who people have always known me to be.",
    reverseCoded: true,
  },
  {
    text: "I am loyal to who I am becoming, even when it requires letting go of outdated versions of myself.",
    reverseCoded: false,
  },
  {
    text: "I have made peace with past mistakes and no longer define myself by them.",
    reverseCoded: false,
  },
  {
    text: "I feel ashamed of parts of my story and struggle to see myself through a lens of grace.",
    reverseCoded: true,
  },
];

// Thematic groupings (0-based question indices) for the results breakdown.
export const ASSESSMENT_CATEGORIES: { [key: string]: number[] } = {
  Authenticity: [0, 1, 3],
  "Self-Compassion & Worth": [2, 4, 5, 6, 7, 14, 15],
  "Self-Care": [8, 9, 10],
  "Growth & Becoming": [11, 12, 13],
};

export const SCORE_INTERPRETATIONS: {
  [key in PillarState]: ScoreInterpretation;
} = {
  [PillarState.Strong]: {
    state: PillarState.Strong,
    narrative:
      "You have a deeply grounded sense of self rooted in authenticity, compassion, and purpose. You embrace your full humanity — strengths, flaws, and all — without fear of judgment. You make conscious choices aligned with your values and feel confident showing up as your true self. Continue nurturing your inner dialogue with grace, celebrating your evolution, and protecting the rhythms that help you stay connected to your essence.",
    color: "#2ECC71",
  },
  [PillarState.Growing]: {
    state: PillarState.Growing,
    narrative:
      "You have a fairly secure relationship with yourself, though some areas still call for gentle care. You’re learning to release old habits of self-criticism, perfectionism, or people-pleasing. You’re discovering what it means to live authentically and honour your evolving truth. To strengthen this pillar, be intentional about affirming your worth, celebrating progress over perfection, and creating space for reflection that deepen self-connection.",
    color: "#F1C40F",
  },
  [PillarState.Unsteady]: {
    state: PillarState.Unsteady,
    narrative:
      "Your sense of identity fluctuates with seasons, opinions, or external validation. You may experience clarity in some moments and confusion or self-doubt in others. Some parts of you may still seek permission to exist or feel “enough.” To begin stabilizing this pillar, practice compassionate awareness — notice your triggers without judgment, challenge negative self-talk, and begin redefining yourself from a place of truth, not performance. You may find it valuable to work with a counselor or coach who can help you untangle identity distortions and build a more grounded sense of self.",
    color: "#E67E22",
  },
  [PillarState.Fragile]: {
    state: PillarState.Fragile,
    narrative:
      "Your relationship with yourself may feel strained, marked by shame, criticism, or disconnection. You might struggle to see your value beyond achievements or approval. This is not a failure — it’s an invitation to rebuild your self-relationship on grace and divine truth. To begin healing, engage in practices that restore self-trust. Consider partnering with a compassionate therapist or soul coach who can guide you through the deeper layers of healing and help you restore wholeness in this pillar.",
    color: "#E74C3C",
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

