
import { Question, TreatmentLevel } from './types';

const COMMON_BASE = [
  {
    id: 1,
    text: "¿Con qué frecuencia experimentas pérdidas de orina?",
    description: "La frecuencia es el primer indicador de la debilidad del soporte pélvico.",
    options: [
      { label: "Nunca", score: 0 },
      { label: "Una vez a la semana o menos", score: 5 },
      { label: "Varias veces por semana", score: 10 },
      { label: "Una vez al día", score: 15 },
      { label: "Continuamente", score: 25 }
    ]
  },
  {
    id: 2,
    text: "¿Qué cantidad de orina sueles perder?",
    description: "Evaluamos el volumen para determinar el grado de insuficiencia muscular.",
    options: [
      { label: "Nada", score: 0 },
      { label: "Gotas o cantidad muy pequeña", score: 10 },
      { label: "Cantidad moderada", score: 20 },
      { label: "Cantidad severa", score: 30 }
    ]
  }
];

export const WOMEN_QUESTIONS: Question[] = [
  ...COMMON_BASE,
  {
    id: 3,
    text: "¿Sientes pesadez o presión en la zona vaginal (sensación de bulto)?",
    description: "Este es un síntoma clave de prolapso de órganos pélvicos.",
    options: [
      { label: "Nunca", score: 0 },
      { label: "Ocasionalmente al final del día", score: 10 },
      { label: "Frecuentemente tras esfuerzos", score: 20 },
      { label: "De forma constante", score: 30 }
    ]
  },
  {
    id: 4,
    text: "¿Pierdes orina al toser, estornudar, reír o saltar?",
    description: "Incontinencia de esfuerzo, común tras partos o durante la menopausia.",
    options: [
      { label: "Nunca", score: 0 },
      { label: "A veces", score: 10 },
      { label: "Casi siempre que ocurre el esfuerzo", score: 20 }
    ]
  },
  {
    id: 5,
    text: "¿Has notado una disminución en la sensibilidad o satisfacción sexual?",
    description: "La laxitud vaginal afecta directamente a la calidad de las relaciones íntimas.",
    options: [
      { label: "No, todo normal", score: 0 },
      { label: "He notado un cambio leve", score: 10 },
      { label: "Ha afectado significativamente mi bienestar", score: 20 }
    ]
  }
];

export const MEN_QUESTIONS: Question[] = [
  ...COMMON_BASE,
  {
    id: 103,
    text: "¿Sufres de goteo post-miccional (gotas al terminar de orinar)?",
    description: "Falla en el músculo bulbocavernoso, muy común en la salud pélvica masculina.",
    options: [
      { label: "Nunca", score: 0 },
      { label: "A veces", score: 10 },
      { label: "Siempre me ocurre", score: 20 }
    ]
  },
  {
    id: 104,
    text: "¿Has pasado por una cirugía de próstata o tienes problemas de flujo débil?",
    description: "La recuperación funcional post-quirúrgica es crítica para el control.",
    options: [
      { label: "No / Flujo fuerte", score: 0 },
      { label: "Cirugía previa / Flujo algo débil", score: 15 },
      { label: "Post-operatorio reciente / Flujo muy débil", score: 25 }
    ]
  },
  {
    id: 105,
    text: "¿Sientes que tus erecciones han perdido firmeza o duración?",
    description: "Los músculos isquiocavernosos son los responsables mecánicos de la erección.",
    options: [
      { label: "Todo normal", score: 0 },
      { label: "Siento una pérdida de potencia", score: 15 },
      { label: "Afectación severa del rendimiento", score: 25 }
    ]
  }
];

export const PRICING = {
  PREVENTION: {
    name: "Plan Prevención",
    sessions: 1,
    price: 65,
    description: "Mantenimiento preventivo para una salud pélvica óptima.",
    idealFor: "Usuarios con suelo pélvico saludable que buscan fortalecer."
  },
  LEVEL_1: {
    name: "Nivel 1 (Leve)",
    sessions: 8,
    price: 380,
    description: "Ciclo inicial de tonificación con tecnología HIFEM.",
    idealFor: "Pérdidas ocasionales y debilidad muscular inicial."
  },
  LEVEL_2: {
    name: "Nivel 2 (Moderado)",
    sessions: 20,
    price: 800,
    description: "Protocolo intensivo de recuperación funcional profunda.",
    idealFor: "Pérdidas recurrentes que afectan la calidad de vida."
  },
  LEVEL_3: {
    name: "Nivel 3 (Complejo)",
    sessions: 30,
    price: 1050,
    description: "Tratamiento avanzado de reeducación neuromuscular completa.",
    idealFor: "Casos severos con alta afectación de la musculatura pélvica."
  },
  MEMBERSHIP: 79
};
