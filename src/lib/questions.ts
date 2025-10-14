import { Question } from './types';

// Base de dados com 25 questões de QI
export const questions: Question[] = [
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 4, 8, 16, ?",
    options: ["24", "32", "30", "20"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 2,
    question: "Se todos os A são B, e alguns B são C, então:",
    options: ["Todos os A são C", "Alguns A são C", "Nenhum A é C", "Não é possível determinar"],
    correctAnswer: 3,
    category: 'logic'
  },
  {
    id: 3,
    question: "Complete a sequência: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "10"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 4,
    question: "Qual palavra não pertence ao grupo: CASA, PRÉDIO, APARTAMENTO, CARRO",
    options: ["CASA", "PRÉDIO", "APARTAMENTO", "CARRO"],
    correctAnswer: 3,
    category: 'logic'
  },
  {
    id: 5,
    question: "Se 3 gatos pegam 3 ratos em 3 minutos, quantos gatos são necessários para pegar 100 ratos em 100 minutos?",
    options: ["100", "33", "3", "300"],
    correctAnswer: 2,
    category: 'logic'
  },
  {
    id: 6,
    question: "Qual número completa a sequência: 100, 50, 25, 12.5, ?",
    options: ["6.25", "6", "5", "7.5"],
    correctAnswer: 0,
    category: 'numeric'
  },
  {
    id: 7,
    question: "Em uma analogia: LIVRO está para PÁGINA assim como CASA está para:",
    options: ["PORTA", "QUARTO", "TELHADO", "JANELA"],
    correctAnswer: 1,
    category: 'abstract'
  },
  {
    id: 8,
    question: "Qual é o próximo número: 3, 7, 15, 31, ?",
    options: ["47", "63", "55", "39"],
    correctAnswer: 1,
    category: 'pattern'
  },
  {
    id: 9,
    question: "Se CÓDIGO é 35469, então DEDO é:",
    options: ["4549", "4594", "9454", "5494"],
    correctAnswer: 0,
    category: 'pattern'
  },
  {
    id: 10,
    question: "Quantos triângulos há na figura? (Imagine um triângulo grande dividido em 9 triângulos menores)",
    options: ["9", "13", "16", "12"],
    correctAnswer: 1,
    category: 'abstract'
  },
  {
    id: 11,
    question: "Complete: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "38", "45"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 12,
    question: "Qual letra vem a seguir: A, D, G, J, ?",
    options: ["K", "L", "M", "N"],
    correctAnswer: 2,
    category: 'pattern'
  },
  {
    id: 13,
    question: "Se você reorganizar as letras 'CIFORP', você obtém o nome de:",
    options: ["Um animal", "Uma cidade", "Uma profissão", "Uma cor"],
    correctAnswer: 2,
    category: 'abstract'
  },
  {
    id: 14,
    question: "Qual número não pertence: 2, 3, 6, 7, 8, 14, 15, 30",
    options: ["8", "6", "14", "30"],
    correctAnswer: 0,
    category: 'logic'
  },
  {
    id: 15,
    question: "Complete a sequência: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 16,
    question: "Em uma analogia: ÁGUA está para SEDE assim como COMIDA está para:",
    options: ["FOME", "PRATO", "GARFO", "MESA"],
    correctAnswer: 0,
    category: 'abstract'
  },
  {
    id: 17,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correctAnswer: 0,
    category: 'logic'
  },
  {
    id: 18,
    question: "Qual é o próximo na sequência: Z, Y, X, W, ?",
    options: ["V", "U", "T", "S"],
    correctAnswer: 0,
    category: 'pattern'
  },
  {
    id: 19,
    question: "Complete: 5, 10, 20, 40, ?",
    options: ["60", "80", "70", "50"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 20,
    question: "Quantos cubos pequenos formam um cubo 3x3x3?",
    options: ["9", "18", "27", "36"],
    correctAnswer: 2,
    category: 'abstract'
  },
  {
    id: 21,
    question: "Se AMOR = 1234, então ROMA = ?",
    options: ["3241", "4321", "2341", "1432"],
    correctAnswer: 0,
    category: 'pattern'
  },
  {
    id: 22,
    question: "Qual número completa: 7, 14, 28, 56, ?",
    options: ["84", "112", "98", "70"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 23,
    question: "Em uma analogia: MÉDICO está para HOSPITAL assim como PROFESSOR está para:",
    options: ["LIVRO", "ESCOLA", "ALUNO", "QUADRO"],
    correctAnswer: 1,
    category: 'abstract'
  },
  {
    id: 24,
    question: "Qual é o menor número que é divisível por 2, 3, 4, 5 e 6?",
    options: ["30", "60", "120", "90"],
    correctAnswer: 1,
    category: 'logic'
  },
  {
    id: 25,
    question: "Complete a sequência: 1, 8, 27, 64, ?",
    options: ["100", "125", "144", "81"],
    correctAnswer: 1,
    category: 'numeric'
  }
];

// Função para calcular o QI baseado na pontuação
export function calculateIQ(score: number, totalQuestions: number): number {
  const percentage = (score / totalQuestions) * 100;
  
  // Fórmula simplificada para calcular QI
  // QI médio é 100, com desvio padrão de 15
  if (percentage >= 95) return 140 + Math.floor(Math.random() * 10);
  if (percentage >= 90) return 130 + Math.floor(Math.random() * 10);
  if (percentage >= 85) return 120 + Math.floor(Math.random() * 10);
  if (percentage >= 75) return 110 + Math.floor(Math.random() * 10);
  if (percentage >= 60) return 100 + Math.floor(Math.random() * 10);
  if (percentage >= 45) return 90 + Math.floor(Math.random() * 10);
  if (percentage >= 30) return 80 + Math.floor(Math.random() * 10);
  return 70 + Math.floor(Math.random() * 10);
}

// Função para determinar o perfil baseado nas respostas
export function determineProfile(answers: any[], iqScore: number): { profile: string; description: string } {
  const categoryScores = {
    logic: 0,
    pattern: 0,
    numeric: 0,
    abstract: 0
  };

  // Calcular pontuação por categoria
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && answer.isCorrect) {
      categoryScores[question.category]++;
    }
  });

  // Determinar perfil dominante
  const maxCategory = Object.entries(categoryScores).reduce((a, b) => 
    categoryScores[a[0] as keyof typeof categoryScores] > categoryScores[b[0] as keyof typeof categoryScores] ? a : b
  )[0];

  const profiles = {
    logic: {
      profile: "Perfil Lógico",
      description: "Você tem uma mente analítica e estruturada. Excele em resolver problemas complexos através de raciocínio dedutivo e pensamento sistemático."
    },
    pattern: {
      profile: "Perfil Reconhecedor de Padrões",
      description: "Sua mente identifica facilmente padrões e sequências. Você tem uma habilidade natural para encontrar ordem no caos e prever tendências."
    },
    numeric: {
      profile: "Perfil Matemático",
      description: "Você possui forte inteligência numérica. Números e cálculos são seu forte, com facilidade para resolver problemas quantitativos complexos."
    },
    abstract: {
      profile: "Perfil Abstrato",
      description: "Sua mente trabalha bem com conceitos abstratos e analogias. Você consegue fazer conexões criativas entre ideias aparentemente não relacionadas."
    }
  };

  return profiles[maxCategory as keyof typeof profiles];
}