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
                className="w-full bg-white text-[#EE8866] py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg flex items-center justify-center gap-3 print:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" /><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>
                Reservar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Block */}
      <div className="bg-amber-50/50 border border-amber-100 p-10 rounded-3xl space-y-6 print:border-gray-200 print:bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center print:bg-gray-100">
            <svg className="w-5 h-5 text-amber-700 print:text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-amber-900 uppercase tracking-widest text-xs print:text-black">Informe Personalizado del Especialista</h4>
            <p className="text-[10px] text-amber-700/60 font-medium print:text-gray-400">Análisis clínico generado por IA Médica pelviU</p>
          </div>
        </div>

        {isLoadingAI ? (
          <div className="space-y-4 animate-pulse py-4 print:hidden">
            <div className="h-4 bg-amber-200/50 rounded w-full"></div>
            <div className="h-4 bg-amber-200/50 rounded w-11/12"></div>
            <div className="h-4 bg-amber-200/50 rounded w-4/5"></div>
          </div>
        ) : (
          <div className="bg-[#FFFDF5] border border-[#FEF3C7] p-8 md:p-10 rounded-[2rem] relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FDE68A] rounded-full flex items-center justify-center shrink-0">
                <span className="font-serif font-black text-[#B45309] text-2xl">A</span>
              </div>
              <div>
                <h4 className="font-bold text-[#92400E] uppercase tracking-widest text-xs mb-1">INFORME PERSONALIZADO DEL ESPECIALISTA</h4>
                <p className="text-[10px] text-[#D97706] font-medium">Análisis clínico generado por IA Médica pelviU</p>
              </div>
            </div>

            <div className="prose prose-amber max-w-none mb-10">
              <p className="text-[#78350F] leading-7 text-lg font-medium italic">
                {expertAnalysis}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 py-4 px-6 bg-white border-2 border-[#E5E7EB] rounded-2xl text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Descargar Informe Completo (PDF)
              </button>
              <button
                onClick={handleConsultation}
                className="flex items-center justify-center gap-2 py-4 px-6 bg-[#D97706] text-white rounded-2xl font-bold text-sm hover:bg-[#B45309] transition-colors shadow-lg shadow-orange-900/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Solicitar Cita con Especialista
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Membership Block */}
      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 print:border-gray-200 print:shadow-none">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-2xl text-gray-800">Membresía PelviU</h3>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Mantenimiento</span>
          </div>
          <p className="text-gray-500 text-lg max-w-xl">
            El 90% de los pacientes recomiendan continuar con 2 sesiones de refuerzo al mes tras el tratamiento inicial para evitar la atrofia muscular y consolidar los resultados.
          </p>
        </div>
        <div className="flex items-center gap-6 shrink-0 w-full md:w-auto">
          <div className="text-right">
            <p className="text-2xl font-bold text-[#EE8866]">Plan Recurrente</p>
            <p className="text-sm text-gray-400 font-medium">Consolidación garantizada</p>
          </div>
          <button
            onClick={handlePurchase}
            className="flex-1 md:flex-none px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg print:hidden"
          >
            Suscribirme
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 print:hidden">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">Clínica Certificada</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">Médicos Colegiados</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">HIFEM Technology</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">FDA Approved</span>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-16 pt-8 border-t border-gray-100 text-gray-400 text-[10px] leading-relaxed space-y-4 print:mt-10 print:border-gray-200">
        <p className="font-bold uppercase tracking-widest mb-2">Aviso Legal y Exención de Responsabilidad</p>
        <p>
          Este informe ha sido generado automáticamente basándose exclusivamente en las respuestas subjetivas proporcionadas por el usuario durante la evaluación y está fundamentado en criterios orientativos de la escala ICIQ-UI SF. Bajo ninguna circunstancia este documento constituye, sustituye o equivale a un diagnóstico clínico formal, una consulta médica profesional o una prescripción terapéutica vinculante.
        </p>
        <p>
          pelviU declina expresamente cualquier responsabilidad legal derivada de la interpretación de este informe, así como de la idoneidad absoluta de los tratamientos sugeridos para el caso particular de cada individuo sin una valoración presencial previa. La efectividad de la tecnología HIFEM y la consecución de los resultados esperados están sujetos a la variabilidad biológica individual, el historial clínico específico y el cumplimiento íntegro del protocolo asistencial. pelviU no se hace responsable de la evolución clínica del paciente ni de posibles discrepancias entre los resultados proyectados y los obtenidos finalmente. Se recomienda imperativamente la supervisión y validación de este protocolo por parte de nuestro equipo médico facultativo antes del inicio de cualquier intervención.
        </p>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        treatment={treatment}
      />
    </motion.div>
  );
};

export default Results;
