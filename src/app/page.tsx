'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppScreen, TestState, UserAnswer, TestResult } from '@/lib/types';
import { questions, calculateIQ, determineProfile } from '@/lib/questions';
import { 
  saveTestState, 
  loadTestState, 
  clearTestState, 
  saveTestResult, 
  checkPaymentStatus, 
  markAsPaid 
} from '@/lib/storage';

// Componentes das telas
import { HomeScreen } from '@/components/qi-test/HomeScreen';
import { TestScreen } from '@/components/qi-test/TestScreen';
import { PreviewScreen } from '@/components/qi-test/PreviewScreen';
import { PaymentScreen } from '@/components/qi-test/PaymentScreen';
import { ResultScreen } from '@/components/qi-test/ResultScreen';

export default function QITestApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: [],
    startTime: new Date(),
    isCompleted: false,
    isPaid: false
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Carregar estado salvo ao inicializar
  useEffect(() => {
    const savedState = loadTestState();
    if (savedState) {
      setTestState(savedState);
      
      // Se o teste foi completado, ir para a tela de preview ou resultado
      if (savedState.isCompleted) {
        if (savedState.isPaid || checkPaymentStatus()) {
          // Calcular resultado se necessário
          const score = savedState.answers.filter(a => a.isCorrect).length;
          const iqScore = calculateIQ(score, questions.length);
          const profile = determineProfile(savedState.answers, iqScore);
          
          const result: TestResult = {
            score,
            totalQuestions: questions.length,
            iqScore,
            profile: profile.profile,
            profileDescription: profile.description,
            completedAt: new Date()
          };
          
          setTestResult(result);
          setCurrentScreen('result');
        } else {
          setCurrentScreen('preview');
        }
      } else {
        setCurrentScreen('test');
        // Carregar resposta da questão atual se existir
        const currentAnswer = savedState.answers.find(
          a => a.questionId === questions[savedState.currentQuestion].id
        );
        setSelectedAnswer(currentAnswer ? currentAnswer.selectedAnswer : null);
      }
    }
  }, []);

  // Salvar estado sempre que mudar
  useEffect(() => {
    if (currentScreen !== 'home') {
      saveTestState(testState);
    }
  }, [testState, currentScreen]);

  const startTest = () => {
    const newState: TestState = {
      currentQuestion: 0,
      answers: [],
      startTime: new Date(),
      isCompleted: false,
      isPaid: false
    };
    
    setTestState(newState);
    setSelectedAnswer(null);
    setCurrentScreen('test');
    clearTestState(); // Limpar estado anterior
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const currentQuestion = questions[testState.currentQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Atualizar ou adicionar resposta
    const newAnswers = testState.answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect
    });
    
    setTestState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const goToNextQuestion = () => {
    if (testState.currentQuestion < questions.length - 1) {
      const newQuestionIndex = testState.currentQuestion + 1;
      setTestState(prev => ({
        ...prev,
        currentQuestion: newQuestionIndex
      }));
      
      // Carregar resposta da próxima questão se existir
      const nextAnswer = testState.answers.find(
        a => a.questionId === questions[newQuestionIndex].id
      );
      setSelectedAnswer(nextAnswer ? nextAnswer.selectedAnswer : null);
    } else {
      // Finalizar teste
      finishTest();
    }
  };

  const goToPreviousQuestion = () => {
    if (testState.currentQuestion > 0) {
      const newQuestionIndex = testState.currentQuestion - 1;
      setTestState(prev => ({
        ...prev,
        currentQuestion: newQuestionIndex
      }));
      
      // Carregar resposta da questão anterior
      const prevAnswer = testState.answers.find(
        a => a.questionId === questions[newQuestionIndex].id
      );
      setSelectedAnswer(prevAnswer ? prevAnswer.selectedAnswer : null);
    }
  };

  const finishTest = () => {
    const completedState = {
      ...testState,
      isCompleted: true
    };
    
    setTestState(completedState);
    setCurrentScreen('preview');
  };

  const handlePayment = () => {
    setCurrentScreen('payment');
  };

  const handlePaymentSuccess = () => {
    // Marcar como pago
    markAsPaid();
    
    const updatedState = {
      ...testState,
      isPaid: true
    };
    setTestState(updatedState);
    
    // Calcular resultado final
    const score = testState.answers.filter(a => a.isCorrect).length;
    const iqScore = calculateIQ(score, questions.length);
    const profile = determineProfile(testState.answers, iqScore);
    
    const result: TestResult = {
      score,
      totalQuestions: questions.length,
      iqScore,
      profile: profile.profile,
      profileDescription: profile.description,
      completedAt: new Date()
    };
    
    // Salvar resultado
    saveTestResult(result);
    setTestResult(result);
    setCurrentScreen('result');
  };

  const handleRestart = () => {
    clearTestState();
    setTestState({
      currentQuestion: 0,
      answers: [],
      startTime: new Date(),
      isCompleted: false,
      isPaid: false
    });
    setSelectedAnswer(null);
    setTestResult(null);
    setCurrentScreen('home');
  };

  const currentQuestion = questions[testState.currentQuestion];
  const score = testState.answers.filter(a => a.isCorrect).length;

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomeScreen onStart={startTest} />
          </motion.div>
        )}

        {currentScreen === 'test' && currentQuestion && (
          <motion.div
            key="test"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TestScreen
              question={currentQuestion}
              currentIndex={testState.currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onNext={goToNextQuestion}
              onPrevious={goToPreviousQuestion}
              canGoNext={selectedAnswer !== null}
              canGoPrevious={testState.currentQuestion > 0}
            />
          </motion.div>
        )}

        {currentScreen === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PreviewScreen
              score={score}
              totalQuestions={questions.length}
              onPayment={handlePayment}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {currentScreen === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentScreen
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => setCurrentScreen('preview')}
            />
          </motion.div>
        )}

        {currentScreen === 'result' && testResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResultScreen
              result={testResult}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}