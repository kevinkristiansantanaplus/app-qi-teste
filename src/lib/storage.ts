import { TestState, UserAnswer, TestResult } from './types';

const STORAGE_KEY = 'qi-test-data';

// Salvar estado do teste no localStorage
export function saveTestState(state: TestState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

// Carregar estado do teste do localStorage
export function loadTestState(): TestState | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Converter strings de data de volta para objetos Date
        if (parsed.startTime) {
          parsed.startTime = new Date(parsed.startTime);
        }
        return parsed;
      } catch (error) {
        console.error('Erro ao carregar estado do teste:', error);
        return null;
      }
    }
  }
  return null;
}

// Limpar dados do teste
export function clearTestState(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Salvar resultado final
export function saveTestResult(result: TestResult): void {
  if (typeof window !== 'undefined') {
    const results = getTestResults();
    results.push(result);
    localStorage.setItem('qi-test-results', JSON.stringify(results));
  }
}

// Carregar resultados anteriores
export function getTestResults(): TestResult[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('qi-test-results');
    if (saved) {
      try {
        return JSON.parse(saved).map((result: any) => ({
          ...result,
          completedAt: new Date(result.completedAt)
        }));
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        return [];
      }
    }
  }
  return [];
}

// Verificar se o usuário já pagou
export function checkPaymentStatus(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('qi-test-paid') === 'true';
  }
  return false;
}

// Marcar como pago
export function markAsPaid(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('qi-test-paid', 'true');
  }
}

// Gerar link de compartilhamento para WhatsApp
export function generateWhatsAppLink(iqScore: number, profile: string): string {
  const message = `🧠 Acabei de fazer um teste de QI e meu resultado foi ${iqScore}! Meu perfil é: ${profile}. Faça você também: ${window.location.origin}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// Gerar texto para compartilhamento no Instagram
export function generateInstagramText(iqScore: number, profile: string): string {
  return `🧠 QI: ${iqScore}\n✨ ${profile}\n\n#QITest #Inteligencia #TesteMental`;
}