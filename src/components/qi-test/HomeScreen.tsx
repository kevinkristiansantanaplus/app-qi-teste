'use client';

import { motion } from 'framer-motion';
import { Brain, Clock, Trophy } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-slate-800 mb-4"
        >
          QI Test
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-600 mb-8 text-lg leading-relaxed"
        >
          Descubra seu nível de inteligência com nosso teste científico de 25 questões
        </motion.p>

        {/* Informações do teste */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8 space-y-4"
        >
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm">Dura cerca de 3 minutos</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <Trophy className="w-5 h-5" />
            <span className="text-sm">25 questões de múltipla escolha</span>
          </div>

          <div className="text-xs text-slate-500 border-t pt-4">
            Teste baseado em padrões científicos de avaliação cognitiva
          </div>
        </motion.div>

        {/* Botão Começar */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Começar Teste
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-slate-500 mt-4"
        >
          Seus dados são salvos localmente e não são compartilhados
        </motion.p>
      </motion.div>
    </div>
  );
}