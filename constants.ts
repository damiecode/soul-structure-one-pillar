import { AssessmentQuestion, PillarState, ScoreInterpretation } from "./types";

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    text: "I eat foods that nourish and energize me rather than deplete me.",
    reverseCoded: false,
  },
  {
    text: "I often skip meals, eat mindlessly, or ignore my body’s hunger cues.",
    reverseCoded: true,
  },
  {
    text: "I enjoy movement or exercise that feels good to my body.",
    reverseCoded: false,
  },
  {
    text: "I see exercise as punishment for eating or for how my body looks.",
    reverseCoded: true,
  },
  {
    text: "I get enough sleep and feel rested when I wake up.",
    reverseCoded: false,
  },
  {
    text: "I often push through exhaustion or deny myself rest to keep working.",
    reverseCoded: true,
  },
  {
    text: "I take time to notice and respond to signs of physical fatigue, tension, or pain.",
    reverseCoded: false,
  },
  {
    text: "I treat my body with kindness, respect, and gratitude.",
    reverseCoded: false,
  },
  {
    text: "I feel disconnected from my body or often resent how it looks or feels.",
    reverseCoded: true,
  },
  {
    text: "I intentionally slow down or take breaks during busy days to restore energy.",
    reverseCoded: false,
  },
  {
    text: "I frequently feel stressed, tense, or physically unwell due to constant pressure.",
    reverseCoded: true,
  },
  {
    text: "I am mindful of what I consume — not just food, but media, noise, and emotional energy.",
    reverseCoded: false,
  },
  {
    text: "I feel strong, balanced, and present in my body most days.",
    reverseCoded: false,
  },
  {
    text: "I experience frequent headaches, stomach tension, or other stress-related discomforts.",
    reverseCoded: true,
  },
  {
    text: "I feel guilty or lazy when I rest or take time off.",
    reverseCoded: true,
  },
  {
    text: "I see my body as a partner in purpose, deserving of care, rest, and nourishment.",
    reverseCoded: false,
  },
];

export const ASSESSMENT_CATEGORIES: { [key: string]: number[] } = {
  Nourishment: [0, 1, 11],
  Movement: [2, 3],
  "Rest & Recovery": [4, 5, 9, 14],
  "Body Mindset": [6, 7, 8, 10, 12, 13, 15],
};

export const SCORE_INTERPRETATIONS: {
  [key in PillarState]: ScoreInterpretation;
} = {
  [PillarState.Strong]: {
    state: PillarState.Strong,
    narrative:
      "You have a balanced and nurturing relationship with your body. You eat, rest, and move with intention — not out of guilt or pressure, but out of care. You understand that strength is both physical and soulful, and you honour your body as a sacred partner in your purpose. Keep reinforcing this rhythm through consistent nourishment, joyful movement, and restorative rest.",
    color: "#6A994E",
  },
  [PillarState.Growing]: {
    state: PillarState.Growing,
    narrative:
      "You are cultivating a healthier relationship with your body, though you may still struggle with inconsistency or guilt around rest and self-care. You’re learning to listen more closely to your body’s needs and to separate worth from productivity. Continue fine-tuning your routines, paying attention to your body’s cues, and letting love — not pressure — guide your health habits.",
    color: "#F4A261",
  },
  [PillarState.Unsteady]: {
    state: PillarState.Unsteady,
    narrative:
      "Your body and mind may not yet feel in sync. You may oscillate between overexertion and neglect, or rely on willpower rather than rhythm. You might experience fatigue, stress-related discomfort, or self-criticism around food, rest, or appearance. This pillar would benefit from gentle recalibration — beginning with self-compassion, structured rest, and professional guidance in nutrition, exercise, or therapy where needed.",
    color: "#E76F51",
  },
  [PillarState.Fragile]: {
    state: PillarState.Fragile,
    narrative:
      "You may feel physically drained, tense, or disconnected from your body. Sleep, nourishment, or movement may be inconsistent or guilt-driven. Your body might be signalling exhaustion or burnout through illness, pain, or emotional fatigue. This is a loving reminder to rebuild trust with your body — to slow down, seek holistic or medical support, and begin nurturing strength through small, consistent acts of care. Healing your relationship with your body will re-anchor your soul’s vitality.",
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
