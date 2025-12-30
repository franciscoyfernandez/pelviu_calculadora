
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreatmentLevel } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatment: TreatmentLevel;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, treatment }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const handleWhatsApp = () => {
    const message = `Hola pelviU, he realizado mi evaluación y me gustaría reservar mi ${treatment.name}.`;
    window.open(`https://wa.me/34676399138?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {step === 'form' ? (
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-[#EE8866]/10 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-[#EE8866]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reserva tu sesión</h2>
                  <p className="text-gray-500">Completa tus datos para que un especialista valide tu protocolo de {treatment.name}.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nombre Completo</label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#EE8866] focus:ring-0 transition-all outline-none bg-gray-50/50"
                      placeholder="Ej: Ana García"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                      <input
                        required
                        type="email"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#EE8866] focus:ring-0 transition-all outline-none bg-gray-50/50"
                        placeholder="ana@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Teléfono</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#EE8866] focus:ring-0 transition-all outline-none bg-gray-50/50"
                        placeholder="600 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-[#EE8866] text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#EE8866]/20"
                    >
                      Confirmar Reserva Previa
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.061-4.512 10.063-10.066.002-2.69-1.047-5.216-2.954-7.126-1.907-1.91-4.434-2.962-7.113-2.962-5.545 0-10.01 4.451-10.111 9.944-.041 2.245.548 4.09 1.621 5.768l-.946 3.454 3.521-.905zm12.388-10.384c-.303-.151-1.789-.882-2.067-.981-.277-.1-.48-.151-.681.151-.2.303-.784.981-.958 1.182-.175.201-.35.226-.653.076-.303-.151-1.282-.471-2.441-1.503-.902-.803-1.51-1.795-1.687-2.097-.175-.3-.021-.462.13-.611.135-.134.303-.353.454-.529.151-.176.202-.303.303-.504.101-.201.051-.377-.025-.529-.076-.151-.681-1.639-.933-2.244-.245-.589-.494-.51-.681-.519l-.581-.01c-.201 0-.53.076-.807.377-.277.303-1.059 1.033-1.059 2.52s1.084 2.922 1.235 3.123c.151.201 2.134 3.259 5.168 4.568.721.312 1.284.498 1.723.638.724.23 1.382.197 1.902.12.58-.087 1.789-.731 2.042-1.437.252-.707.252-1.313.176-1.437-.076-.126-.277-.201-.58-.352z"/></svg>
                      Hablar con Especialista
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors py-2"
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">¡Solicitud Recibida!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Un especialista de pelviU revisará tu caso y te contactará en menos de 24h para confirmar tu cita y validar tu protocolo personalizado.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all"
                >
                  Entendido
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
