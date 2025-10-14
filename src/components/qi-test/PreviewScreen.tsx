'use client';

import { motion } from 'framer-motion';
import { Brain, Star, Lock } from 'lucide-react';

interface PreviewScreenProps {
  score: number;
  totalQuestions: number;
  onPayment: () => void;
  onRestart: () => void;
}

export function PreviewScreen({ score, totalQuestions, onPayment, onRestart }: PreviewScreenProps) {
  const percentage = (score / totalQuestions) * 100;
  
  // Determinar mensagem baseada na pontuação
  const getPreviewMessage = () => {
    if (percentage >= 85) return "Seu QI está muito acima da média! 🎯";
    if (percentage >= 70) return "Seu QI está acima da média! 📈";
    if (percentage >= 50) return "Seu QI está na média! 📊";
    return "Você tem potencial para melhorar! 💪";
  };

  const getMotivationalText = () => {
    if (percentage >= 85) return "Parabéns! Você demonstrou excelente capacidade de raciocínio.";
    if (percentage >= 70) return "Muito bem! Suas habilidades cognitivas estão acima da média.";
    if (percentage >= 50) return "Bom trabalho! Você está na faixa média de inteligência.";
    return "Continue praticando! Todo mundo pode desenvolver suas habilidades.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center"
      >
        {/* Ícone de resultado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-slate-800 mb-4"
        >
          Teste Concluído!
        </motion.h1>

        {/* Pontuação parcial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="text-4xl font-bold text-slate-800 mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-slate-600 mb-4">
            {Math.round(percentage)}% de acertos
          </div>
          
          <div className="text-lg font-semibold text-green-600 mb-3">
            {getPreviewMessage()}
          </div>
          
          <div className="text-sm text-slate-600">
            {getMotivationalText()}
          </div>
        </motion.div>

        {/* Resultado bloqueado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Resultado Completo
          </h3>
          
          <div className="text-sm text-amber-700 mb-4 space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Pontuação de QI estimada</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Análise detalhada do perfil</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Comparação com a população</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Certificado personalizado</span>
            </div>
          </div>
        </motion.div>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={onPayment}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ver Resultado Completo — R$ 5,00
          </button>
          
          <button
            onClick={onRestart}
            className="w-full bg-white text-slate-700 font-medium py-3 px-8 rounded-2xl shadow-md hover:bg-slate-50 transition-all duration-300"
          >
            Fazer Teste Novamente
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-slate-500 mt-4"
        >
          Pagamento seguro • Resultado instantâneo • Satisfação garantida
        </motion.p>
      </motion.div>
    </div>
  );
}