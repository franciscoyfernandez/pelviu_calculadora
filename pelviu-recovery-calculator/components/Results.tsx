import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AssessmentResult } from '../types';
import { PRICING } from '../constants';
import { GoogleGenAI } from "@google/genai";
import BookingModal from './BookingModal';

interface ResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const { score, recommendation, treatment } = result;
  const [expertAnalysis, setExpertAnalysis] = useState<string>("");
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const generateAnalysis = async () => {
      setIsLoadingAI(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          Actúa como un experto senior en fisioterapia de suelo pélvico de pelviU. 
          Un paciente ha obtenido una puntuación de ${score}% en su evaluación de salud pélvica. 
          Se le ha recomendado el ${treatment.name} (${treatment.sessions} sesiones de tecnología HIFEM).

          1. Explica brevemente por qué esta fase intensiva es crucial para su recuperación inicial basándote en la reeducación neuromuscular.
          2. Justifica por qué es fundamental continuar después con la membresía de mantenimiento (que incluye 2 sesiones de refuerzo al mes) para evitar que la musculatura vuelva a debilitarse y consolidar los resultados. 
          
          IMPORTANTE: No menciones precios específicos de la membresía en este texto.
          
          Mantén un tono clínico, profesional y alentador. Máximo 120 palabras. No uses formato markdown complejo, solo texto fluido y profesional.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            temperature: 0.7,
            topP: 0.9,
          }
        });

        setExpertAnalysis(response.text || "No se pudo generar el análisis en este momento.");
      } catch (error) {
        console.error("Error generating AI analysis:", error);
        setExpertAnalysis("Basándonos en tu perfil clínico, la fase intensiva restaurará la fuerza tensora de tus fibras musculares. La membresía posterior es vital para mantener el tono muscular alcanzado y evitar recidivas.");
      } finally {
        setIsLoadingAI(false);
      }
    };

    generateAnalysis();
  }, [score, treatment]);

  const getProgramDuration = () => {
    switch (recommendation) {
      case 'Level 1': return "4 semanas";
      case 'Level 2': return "10 semanas";
      case 'Level 3': return "15 semanas";
      default: return "1 sesión";
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleConsultation = () => {
    window.open("https://wa.me/34676399138", "_blank");
  };

  const handlePurchase = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-24 space-y-8 print:p-0 print:py-4"
    >
      <div className="text-center mb-16 space-y-4 print:mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Tu Diagnóstico de <span className="text-[#EE8866]">Recuperación</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Basado en tus respuestas, hemos diseñado un protocolo específico para restaurar la funcionalidad de tu suelo pélvico.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-stretch print:grid-cols-1">
        {/* Score Card Simplificado */}
        <div className="md:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-center items-center space-y-6 print:shadow-none print:border-gray-200">
          <div className="text-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Índice de Afectación</span>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="text-7xl font-black text-[#EE8866]">{score}</span>
              <span className="text-2xl font-bold text-gray-300">%</span>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{recommendation}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
              {treatment.idealFor}
            </p>
          </div>

          <button
            onClick={onRestart}
            className="text-xs font-bold text-gray-400 hover:text-[#EE8866] transition-colors uppercase tracking-widest border-t border-gray-50 pt-4 w-full print:hidden"
          >
            Repetir Evaluación
          </button>
        </div>

        {/* Treatment Recommendation */}
        <div className="md:col-span-2">
          <div className="bg-[#EE8866] text-white p-10 rounded-3xl shadow-2xl shadow-[#EE8866]/30 relative overflow-hidden h-full flex flex-col justify-between print:shadow-none print:text-black print:border-2 print:border-[#EE8866] print:bg-white">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl print:hidden"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest print:bg-gray-100 print:text-gray-600">Tratamiento Recomendado</span>
                  <h2 className="text-3xl font-bold mt-4">{treatment.name}</h2>
                </div>
                <div className="sm:text-right">
                  <span className="text-4xl font-black">{treatment.price}€</span>
                  <p className="text-sm text-white/80 mt-1 print:text-gray-500">Precio Total</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 print:bg-gray-50 print:border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70 print:text-gray-400">Sesiones Totales</p>
                  <p className="text-2xl font-bold print:text-black">{treatment.sessions}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 print:bg-gray-50 print:border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70 print:text-gray-400">Duración Programa</p>
                  <p className="text-2xl font-bold print:text-black">{getProgramDuration()}</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 print:bg-gray-50 print:border-gray-200">
                <p className="text-sm font-medium text-white/90 print:text-black">
                  <span className="font-bold">Protocolo:</span> Sesiones de 25 minutos, 2 días a la semana para garantizar la reeducación neuromuscular óptima.
                </p>
                <p className="text-xs text-white/70 italic leading-relaxed print:text-gray-500">
                  "{treatment.description}"
                </p>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-white text-[#EE8866] py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg flex items-center justify-center gap
