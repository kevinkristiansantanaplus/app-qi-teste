'use client';

import { motion } from 'framer-motion';
import { Brain, Share2, RotateCcw, Trophy, Target, TrendingUp } from 'lucide-react';
import { TestResult } from '@/lib/types';
import { generateWhatsAppLink, generateInstagramText } from '@/lib/storage';

interface ResultScreenProps {
  result: TestResult;
  onRestart: () => void;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const handleWhatsAppShare = () => {
    const link = generateWhatsAppLink(result.iqScore, result.profile);
    window.open(link, '_blank');
  };

  const handleInstagramShare = () => {
    const text = generateInstagramText(result.iqScore, result.profile);
    navigator.clipboard.writeText(text);
    alert('Texto copiado! Cole no seu Instagram.');
  };

  const getIQCategory = (iq: number) => {
    if (iq >= 140) return { label: 'Genial', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (iq >= 130) return { label: 'Muito Superior', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (iq >= 120) return { label: 'Superior', color: 'text-green-600', bg: 'bg-green-100' };
    if (iq >= 110) return { label: 'Acima da Média', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (iq >= 90) return { label: 'Média', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (iq >= 80) return { label: 'Abaixo da Média', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: 'Baixo', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const category = getIQCategory(result.iqScore);
  const percentage = (result.score / result.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-4"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Seu Resultado Completo
          </h1>
          <p className="text-slate-600">
            Análise detalhada da sua inteligência
          </p>
        </motion.div>

        {/* Pontuação Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center"
        >
          <div className="text-6xl font-bold text-slate-800 mb-2">
            {result.iqScore}
          </div>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${category.bg} ${category.color} mb-4`}>
            {category.label}
          </div>
          <div className="text-slate-600">
            Seu QI estimado baseado em {result.totalQuestions} questões
          </div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-800">{result.score}</div>
            <div className="text-sm text-slate-600">Acertos</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-800">{Math.round(percentage)}%</div>
            <div className="text-sm text-slate-600">Precisão</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-800">
              {result.iqScore > 100 ? '+' : ''}{result.iqScore - 100}
            </div>
            <div className="text-sm text-slate-600">vs. Média (100)</div>
          </div>
        </motion.div>

        {/* Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            {result.profile}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {result.profileDescription}
          </p>
        </motion.div>

        {/* Comparação populacional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Comparação com a População
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Seu QI ({result.iqScore})</span>
              <span className="font-semibold text-blue-600">
                {result.iqScore >= 130 ? 'Top 2%' : 
                 result.iqScore >= 115 ? 'Top 15%' :
                 result.iqScore >= 100 ? 'Top 50%' : 'Abaixo de 50%'}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                style={{ width: `${Math.min((result.iqScore / 160) * 100, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>70</span>
              <span>100 (Média)</span>
              <span>130</span>
              <span>160+</span>
            </div>
          </div>
        </motion.div>

        {/* Ações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          {/* Compartilhar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Compartilhar Resultado</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </button>
              
              <button
                onClick={handleInstagramShare}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Instagram
              </button>
            </div>
          </div>

          {/* Refazer teste */}
          <button
            onClick={onRestart}
            className="w-full bg-slate-100 text-slate-700 font-medium py-4 px-8 rounded-2xl hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Fazer Teste Novamente</span>
          </button>
        </motion.div>

        {/* Data do teste */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-slate-500">
            Teste realizado em {result.completedAt.toLocaleDateString('pt-BR')} às {result.completedAt.toLocaleTimeString('pt-BR')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}