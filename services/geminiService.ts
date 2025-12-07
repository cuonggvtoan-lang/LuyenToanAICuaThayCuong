
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, GradeLevel, MathProblem, TextbookSet } from "../types";

const apiKey = process.env.GENIMI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMathProblem = async (
  grade: GradeLevel,
  difficulty: Difficulty,
  textbook: TextbookSet,
  chapter: string
): Promise<MathProblem> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Bạn là một giáo viên dạy toán Trung học cơ sở (THCS) tại Việt Nam.
    Hãy tạo một bài toán trắc nghiệm hoặc trả lời ngắn cho học sinh ${grade}, bộ sách "${textbook}", nội dung "${chapter}", mức độ ${difficulty}.
    Bài toán cần rõ ràng, chính xác, bám sát nội dung sách giáo khoa "${textbook}" và phù hợp với chương trình giáo dục Việt Nam.
    Hãy trả về kết quả dưới dạng JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: "Nội dung câu hỏi toán học",
            },
            type: {
              type: Type.STRING,
              enum: ["multiple_choice", "short_answer"],
              description: "Loại câu hỏi",
            },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Các lựa chọn trả lời (nếu là trắc nghiệm)",
            },
            correctAnswer: {
              type: Type.STRING,
              description: "Đáp án đúng chính xác",
            },
            hint: {
              type: Type.STRING,
              description: "Gợi ý ngắn gọn để giải bài toán",
            },
          },
          required: ["question", "type", "correctAnswer", "hint"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as MathProblem;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating problem:", error);
    // Fallback problem in case of API error
    return {
      question: "Không thể tạo câu hỏi lúc này. Vui lòng thử lại.",
      type: "short_answer",
      correctAnswer: "",
      hint: "Kiểm tra kết nối mạng hoặc API key.",
    };
  }
};

export const explainSolution = async (
  problem: string,
  userAnswer: string,
  correctAnswer: string
): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    Bài toán: ${problem}
    Đáp án đúng: ${correctAnswer}
    Học sinh trả lời: ${userAnswer}

    Hãy đóng vai giáo viên, nhận xét câu trả lời của học sinh (đúng hay sai) và giải thích chi tiết từng bước cách giải bài toán này một cách dễ hiểu, thân thiện. Sử dụng định dạng Markdown cho công thức toán học nếu cần.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Không thể tạo lời giải thích.";
  } catch (error) {
    console.error("Error explaining solution:", error);
    return "Đã xảy ra lỗi khi tạo lời giải thích.";
  }
};

export const chatWithTutor = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
   const modelId = "gemini-2.5-flash";
   
   // Convert simple history to content format if needed, but generateContent allows passing prompt directly
   // For better context, we structure the prompt with history
   let context = "Bạn là gia sư toán thân thiện. Hãy giúp học sinh giải đáp thắc mắc.\n\n";
   history.forEach(msg => {
     context += `${msg.role === 'user' ? 'Học sinh' : 'Gia sư'}: ${msg.text}\n`;
   });
   context += `Học sinh: ${newMessage}\nGia sư:`;

   try {
    const response = await ai.models.generateContent({
        model: modelId,
        contents: context,
    });
    return response.text || "Xin lỗi, tôi không hiểu câu hỏi.";
   } catch (error) {
       console.error("Chat error", error);
       return "Đã xảy ra lỗi kết nối.";
   }
}
