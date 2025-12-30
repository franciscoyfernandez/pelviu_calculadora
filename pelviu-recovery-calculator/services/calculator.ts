
import { AssessmentResult, RecommendationType, Gender } from '../types';
import { PRICING, WOMEN_QUESTIONS, MEN_QUESTIONS } from '../constants';

export const calculateResult = (answers: Record<number, number>, gender: Gender): AssessmentResult => {
  const relevantQuestions = gender === 'mujer' ? WOMEN_QUESTIONS : MEN_QUESTIONS;
  
  // Max possible score calculation based on specific question set
  const maxPossibleRawScore = relevantQuestions.reduce((acc, q) => {
    const maxOptionScore = Math.max(...q.options.map(o => o.score));
    return acc + maxOptionScore;
  }, 0);

  const rawScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const normalizedScore = (rawScore / maxPossibleRawScore) * 100;

  let recommendation: RecommendationType = 'Prevention';
  let treatment = PRICING.PREVENTION;

  if (normalizedScore < 25) {
    recommendation = 'Prevention';
    treatment = PRICING.PREVENTION;
  } else if (normalizedScore >= 25 && normalizedScore < 45) {
    recommendation = 'Level 1';
    treatment = PRICING.LEVEL_1;
  } else if (normalizedScore >= 45 && normalizedScore < 70) {
    recommendation = 'Level 2';
    treatment = PRICING.LEVEL_2;
  } else {
    recommendation = 'Level 3';
    treatment = PRICING.LEVEL_3;
  }

  return {
    score: Math.round(normalizedScore),
    recommendation,
    treatment,
    gender
  };
};
