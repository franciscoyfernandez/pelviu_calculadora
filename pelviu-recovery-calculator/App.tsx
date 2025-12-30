
import React, { useState } from 'react';
import Header from './components/Header';
import Assessment from './components/Assessment';
import Results from './components/Results';
import { AssessmentResult, Gender } from './types';
import { calculateResult } from './services/calculator';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'calculating' | 'results' | 'how-it-works'>('welcome');
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [genderView, setGenderView] = useState<'mujer' | 'hombre' | null>(null);

  const startQuiz = () => {
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (answers: Record<number, number>, gender: Gender) => {
    setStep('calculating');
    setTimeout(() => {
      const calculated = calculateResult(answers, gender);
      setResults(calculated);
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const restart = () => {
    setStep('welcome');
    setResults(null);
    setGenderView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openHowItWorks = () => {
    setStep('how-it-works');
    setGenderView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#EE8866]/30">
      <Header onOpenHowItWorks={openHowItWorks} onGoHome={restart} />

      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[85vh] flex flex-col justify-center items-center px-6 text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-4 py-1.5 bg-[#EE8866]/10 rounded-full mb-6">
                <span className="text-[#EE8866] text-sm font-bold uppercase tracking-widest">Assessment Tool</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                Recupera el <span className="text-[#EE8866]">control</span> de tu suelo pélvico.
              </h1>
              <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                Resuelve nuestro test basado en el estándar ICIQ-UI y obtén un protocolo de recuperación personalizado con tecnología HIFEM.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={startQuiz}
                  className="bg-[#EE8866] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#EE8866]/20 hover:scale-[1.03] transition-all active:scale-[0.97]"
                >
                  Empezar Evaluación Gratuita
                </button>
              </div>
              <div className="mt-16 flex items-center justify-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm font-medium">3 Minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm font-medium">100% Privado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm font-medium">Aval Clínico</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'how-it-works' && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-20"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Ciencia y Tecnología a tu Servicio</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">Selecciona tu perfil para descubrir cómo pelviU transforma tu salud mediante un método indoloro y altamente eficaz.</p>
              </div>

              {/* Gender Selection - The trigger for everything else */}
              <div className="flex flex-col md:flex-row gap-6 mb-12">
                <button
                  onClick={() => setGenderView('mujer')}
                  className={`flex-1 group relative overflow-hidden py-10 px-6 rounded-[2.5rem] border-2 transition-all font-bold text-2xl flex items-center justify-center gap-4 ${genderView === 'mujer' ? 'border-[#EE8866] bg-[#EE8866]/5 text-[#EE8866] shadow-lg shadow-[#EE8866]/10' : 'border-gray-100 bg-white hover:border-[#EE8866]/30'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl relative z-10 transition-transform group-hover:scale-125">♀</span>
                  <span className="relative z-10">Soy Mujer</span>
                </button>
                <button
                  onClick={() => setGenderView('hombre')}
                  className={`flex-1 group relative overflow-hidden py-10 px-6 rounded-[2.5rem] border-2 transition-all font-bold text-2xl flex items-center justify-center gap-4 ${genderView === 'hombre' ? 'border-[#EE8866] bg-[#EE8866]/5 text-[#EE8866] shadow-lg shadow-[#EE8866]/10' : 'border-gray-100 bg-white hover:border-[#EE8866]/30'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl relative z-10 transition-transform group-hover:scale-125">♂</span>
                  <span className="relative z-10">Soy Hombre</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {genderView && (
                  <motion.div
                    key={genderView}
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="space-y-16 overflow-hidden pt-8"
                  >
                    {/* SECTION 1: SCIENTIFIC EVIDENCE */}
                    <div className="space-y-10">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-1.5 bg-[#EE8866] rounded-full"></div>
                        <h3 className="text-3xl font-extrabold text-gray-900 m-0">Evidencia Científica y Beneficios</h3>
                      </div>

                      <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        Nuestra metodología utiliza tecnología <strong>HIFEM</strong> para generar contracciones musculares supra-máximas, imposibles de replicar con ejercicios convencionales.
                      </p>

                      {genderView === 'mujer' ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">💧</span> Incontinencia Urinaria
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Avalado para curar o mejorar drásticamente la incontinencia por esfuerzo y urgencia. Eficacia clínica demostrada en el 95% de los casos.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">👶</span> Recuperación Post-Parto
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Restaura la elasticidad vaginal y fortalece el periné tras el trauma del parto, previniendo secuelas a largo plazo.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🔄</span> Diástasis Abdominal
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Fortalece el core profundo para favorecer el cierre de la separación de los rectos abdominales y recuperar la silueta.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">❤️</span> Salud Sexual
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">El aumento del tono muscular y la irrigación sanguínea mejora significativamente la sensibilidad y la respuesta orgásmica.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🛡️</span> Prevención de Prolapsos
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Refuerza las estructuras de sostén de vejiga y útero, evitando descensos orgánicos y la necesidad de cirugía futura.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🧘</span> Estabilidad y Espalda
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Un suelo pélvico fuerte es el pilar de tu postura, reduciendo el dolor lumbar crónico por debilidad del core.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🚻</span> Control Post-Cirugía
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Acelera drásticamente el control urinario tras prostatectomías, reduciendo el tiempo de recuperación funcional.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">⚡</span> Rendimiento Sexual
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Fortalece los músculos isquiocavernosos y mejora la microcirculación, favoreciendo erecciones más firmes.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🏃</span> Potencia Deportiva
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Estabiliza la base del abdomen, permitiendo mayor potencia en levantamientos y mejor técnica de carrera de impacto.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🩸</span> Salud Prostática
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Mejora el drenaje linfático y sanguíneo de la zona pélvica profunda, favoreciendo un entorno tisular más saludable.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🎈</span> Urgencia Urinaria
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Reeduca la señal del detrusor, disminuyendo la frecuencia de visitas al baño y la sensación de apremio constante.</p>
                          </div>
                          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-[#EE8866] mb-3 text-lg flex items-center gap-3">
                              <span className="text-xl">🏗️</span> Soporte Lumbo-Sacro
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Elimina la debilidad en la base del abdomen, corrigiendo desequilibrios que provocan fatiga y dolor de espalda.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: HOW IT WORKS (THE PROCESS) */}
                    <div className="bg-gray-900 text-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#EE8866]/20 rounded-full blur-[100px]"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-12">
                          <div className="h-10 w-1.5 bg-[#EE8866] rounded-full"></div>
                          <h3 className="text-3xl font-extrabold m-0">¿Cómo es una sesión en pelviU?</h3>
                        </div>

                        {/* The 4 pillars of functioning */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center">
                            <div className="text-3xl mb-4">✨</div>
                            <h4 className="font-bold text-lg mb-1">Fácil</h4>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Sin esfuerzo</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h4 className="font-bold text-lg mb-1">No invasivo</h4>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Sin sondas</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center">
                            <div className="text-3xl mb-4">👔</div>
                            <h4 className="font-bold text-lg mb-1">Vestido</h4>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Total discreción</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center">
                            <div className="text-3xl mb-4">⏱️</div>
                            <h4 className="font-bold text-lg mb-1">25 Minutos</h4>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Sesión rápida</p>
                          </div>
                        </div>

                        <div className="space-y-8 max-w-2xl mx-auto">
                          <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-[#EE8866] rounded-full flex items-center justify-center shrink-0 font-black text-xl text-white shadow-lg shadow-[#EE8866]/30">1</div>
                            <p className="text-lg md:text-xl leading-relaxed">
                              <span className="font-bold text-[#EE8866]">Solo tienes que sentarte</span> cómodamente en nuestro dispositivo médico. Sin quitarte la ropa, sin geles ni procedimientos incómodos.
                            </p>
                          </div>
                          <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-[#EE8866] rounded-full flex items-center justify-center shrink-0 font-black text-xl text-white shadow-lg shadow-[#EE8866]/30">2</div>
                            <p className="text-lg md:text-xl leading-relaxed">
                              Realizarás el <span className="font-bold text-[#EE8866]">número de sesiones</span> que tu programa de mejora determine tras la evaluación clínica para alcanzar el tono muscular óptimo.
                            </p>
                          </div>
                          <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-[#EE8866] rounded-full flex items-center justify-center shrink-0 font-black text-xl text-white shadow-lg shadow-[#EE8866]/30">3</div>
                            <p className="text-lg md:text-xl leading-relaxed">
                              Tras finalizar, recomendamos un <span className="font-bold text-[#EE8866]">seguimiento mensual</span>. Como cualquier entrenamiento neuromuscular, el mantenimiento garantiza resultados para toda la vida.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center bg-orange-50/50 p-12 rounded-[3rem] border border-orange-100">
                      <p className="text-gray-500 text-sm mb-6 uppercase tracking-[0.2em] font-bold">Inicia tu camino hacia la recuperación</p>
                      <button
                        onClick={startQuiz}
                        className="bg-[#EE8866] text-white px-12 py-6 rounded-[2rem] font-bold text-xl hover:bg-[#d67a5b] transition-all shadow-2xl shadow-[#EE8866]/40 hover:scale-[1.05] active:scale-[0.98]"
                      >
                        Hacer mi evaluación personalizada ahora
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'quiz' && (
            <Assessment onComplete={handleAssessmentComplete} />
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-[70vh] flex flex-col justify-center items-center text-center p-6"
            >
              <div className="w-20 h-20 border-4 border-gray-100 border-t-[#EE8866] rounded-full animate-spin mb-8"></div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Analizando respuestas...</h2>
              <p className="text-gray-500">Calculando tu protocolo de recuperación personalizado.</p>
            </motion.div>
          )}

          {step === 'results' && results && (
            <Results result={results} onRestart={restart} />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-60">
            <div className="w-6 h-6 rounded-full bg-[#EE8866] flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold tracking-tight text-gray-800">pelvi<span className="text-[#EE8866]">U</span></span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} pelviU Clinic. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#EE8866]">Privacidad</a>
            <a href="#" className="hover:text-[#EE8866]">Términos</a>
            <a href="#" className="hover:text-[#EE8866]">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
