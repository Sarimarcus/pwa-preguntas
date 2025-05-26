export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

let questionsCache: Question[] | null = null;

export async function loadQuestions(): Promise<Question[]> {
  if (questionsCache) {
    return questionsCache;
  }

  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const questions: Question[] = await response.json();
    questionsCache = questions;
    return questions;
  } catch (err) {
    console.error('Error loading questions:', err);
    throw new Error('Could not load questions');
  }
}

export async function getRandomQuestion(excludeIds: number[] = []): Promise<Question | null> {
  try {
    const questions = await loadQuestions();
    
    const availableQuestions = questions.filter(q => !excludeIds.includes(q.id));
    
    if (availableQuestions.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  } catch (err) {
    console.error('Error getting random question:', err);
    return null;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getShuffledOptions(question: Question): { options: string[]; correctAnswerIndex: number } {
  const originalOptions = question.options;
  
  const indexedOptions = originalOptions.map((option: string, index: number) => ({
    option,
    originalIndex: index
  }));
  
  const shuffledIndexedOptions = shuffleArray(indexedOptions);
  
  const correctAnswerIndex = shuffledIndexedOptions.findIndex(
    item => item.originalIndex === question.correctAnswer
  );
  
  return {
    options: shuffledIndexedOptions.map(item => item.option),
    correctAnswerIndex
  };
}
