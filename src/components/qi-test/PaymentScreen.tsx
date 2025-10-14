'use client';

import { motion } from 'framer-motion';
import { CreditCard, Shield, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentScreenProps {
  onPaymentSuccess: () => void;
  onBack: () => void;
}

export function PaymentScreen({ onPaymentSuccess, onBack }: PaymentScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 ml-4">
            Finalizar Compra
          </h1>
        </motion.div>

        {/* Resumo do pedido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Resumo do Pedido
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Resultado Completo do QI Test</span>
              <span className="font-semibold">R$ 5,00</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">R$ 5,00</span>
              </div>
            </div>
          </div>

          {/* Benefícios inclusos */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">Incluído:</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Pontuação de QI detalhada</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Análise completa do perfil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Certificado personalizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Comparação populacional</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Métodos de pagamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Método de Pagamento
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('pix')}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === 'pix'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === 'pix' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'pix' && (
                    <div className="w-full h-full bg-white rounded-full scale-50" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold">PIX</div>
                  <div className="text-sm text-slate-600">Pagamento instantâneo</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'card' && (
                    <div className="w-full h-full bg-white rounded-full scale-50" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Cartão de Crédito</span>
                  </div>
                  <div className="text-sm text-slate-600">Visa, Mastercard, Elo</div>
                </div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-sm text-slate-600 mb-6"
        >
          <Shield className="w-4 h-4" />
          <span>Pagamento 100% seguro e criptografado</span>
        </motion.div>

        {/* Botão de pagamento */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 px-8 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 ${
            isProcessing
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-blue-600 hover:shadow-xl hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processando...</span>
            </div>
          ) : (
            `Pagar R$ 5,00 via ${paymentMethod === 'pix' ? 'PIX' : 'Cartão'}`
          )}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-slate-500 text-center mt-4"
        >
          Ao continuar, você concorda com nossos termos de uso e política de privacidade
        </motion.p>
      </div>
    </div>
  );
}