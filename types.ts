
export enum GradeLevel {
  GRADE_6 = "Lớp 6",
  GRADE_7 = "Lớp 7",
  GRADE_8 = "Lớp 8",
  GRADE_9 = "Lớp 9",
}

export enum TextbookSet {
  KET_NOI = "Kết nối tri thức",
  CANH_DIEU = "Cánh Diều",
  CHAN_TRO = "Chân trời sáng tạo",
}

export type Chapter = string;

export enum Difficulty {
  EASY = "Cơ bản",
  MEDIUM = "Vận dụng",
  HARD = "Vận dụng cao",
}

export interface MathProblem {
  question: string;
  type: 'multiple_choice' | 'short_answer';
  options?: string[];
  correctAnswer: string;
  hint: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
