
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WOMEN_QUESTIONS, MEN_QUESTIONS } from '../constants';
import { Gender, Question } from '../types';
import ProgressBar from './ProgressBar';

interface AssessmentProps {
  onComplete: (answers: Record<number, number>, gender: Gender) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [gender, setGender] = useState<Gender | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = gender === 'mujer' ? WOMEN_QUESTIONS : (gender === 'hombre' ? MEN_QUESTIONS : []);
  const currentQuestion = questions[currentIndex];

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setCurrentIndex(0);
  };

  const handleSelect = (score: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        if (gender) onComplete(updatedAnswers, gender);
      }, 400);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setGender(null);
    }
  };

  if (!gender) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl text-center space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Empecemos tu evaluación</h2>
            <p className="text-xl text-gray-500">Para ofrecerte un diagnóstico preciso, necesitamos saber tu género biológico.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleGenderSelect('mujer')}
              className="group bg-white p-10 rounded-[2.5rem] border-2 border-gray-100 hover:border-[#EE8866] transition-all flex flex-col items-center gap-6 shadow-sm hover:shadow-xl hover:shadow-[#EE8866]/10"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">♀</div>
              <span className="text-2xl font-bold text-gray-800">Soy Mujer</span>
            </button>
            <button 
              onClick={() => handleGenderSelect('hombre')}
              className="group bg-white p-10 rounded-[2.5rem] border-2 border-gray-100 hover:border-[#EE8866] transition-all flex flex-col items-center gap-6 shadow-sm hover:shadow-xl hover:shadow-[#EE8866]/10"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">♂</div>
              <span className="text-2xl font-bold text-gray-800">Soy Hombre</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-400">Tus datos son tratados de forma 100% confidencial bajo protocolo clínico.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <div className="mb-12">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-wider">
            Evaluación {gender} • Pregunta {currentIndex + 1} de {questions.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {currentQuestion.text}
              </h2>
              {currentQuestion.description && (
                <p className="text-gray-500 text-lg">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option.score)}
                  className={`
                    w-full text-left p-6 rounded-2xl border-2 transition-all duration-200
                    flex items-center justify-between group
                    ${answers[currentQuestion.id] === option.score 
                      ? 'border-[#EE8866] bg-[#EE8866]/5 shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-[#EE8866]/30 hover:bg-gray-50'}
                  `}
                >
                  <span className={`text-lg font-medium ${answers[currentQuestion.id] === option.score ? 'text-[#EE8866]' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${answers[currentQuestion.id] === option.score ? 'border-[#EE8866] bg-[#EE8866]' : 'border-gray-200 group-hover:border-[#EE8866]/50'}
                  `}>
                    {answers[currentQuestion.id] === option.score && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-sm font-semibold flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
