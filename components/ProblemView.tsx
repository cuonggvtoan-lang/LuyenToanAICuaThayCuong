import React, { useState, useEffect } from 'react';
import { MathProblem } from '../types';
import { Button } from './Button';
import { explainSolution } from '../services/geminiService';

interface ProblemViewProps {
  problem: MathProblem;
  onNewProblem: () => void;
}

// Helper function to play sounds using Web Audio API
const playFeedbackSound = (isCorrect: boolean) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (isCorrect) {
      // Correct sound: Pleasant "Ding" (Sine wave, ascending pitch)
      oscillator.type = 'sine';
      // Start at 500Hz, ramp up to 1000Hz quickly
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
      
      // Volume envelope: Attack fast, decay slow
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } else {
      // Incorrect sound: Low "Buzz/Thud" (Triangle wave, descending pitch)
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);

      // Volume envelope
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    }
  } catch (error) {
    console.error("Audio playback failed", error);
  }
};

export const ProblemView: React.FC<ProblemViewProps> = ({ problem, onNewProblem }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset state when problem changes
  useEffect(() => {
    setUserAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setExplanation(null);
    setShowHint(false);
    setLoadingExplanation(false);
  }, [problem]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;

    // Basic normalization for text comparison
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = problem.correctAnswer.trim().toLowerCase();
    
    // Simple checking logic (for exact match or option letter)
    const correct = normalizedUser === normalizedCorrect || 
                   (problem.type === 'multiple_choice' && normalizedCorrect.startsWith(normalizedUser));

    setIsCorrect(correct);
    setIsSubmitted(true);
    playFeedbackSound(correct);

    // Auto-fetch explanation
    setLoadingExplanation(true);
    const expl = await explainSolution(problem.question, userAnswer, problem.correctAnswer);
    setExplanation(expl);
    setLoadingExplanation(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-cyan-100 border border-cyan-100 overflow-hidden max-w-3xl mx-auto">
      <div className="bg-cyan-600 p-6 text-white">
        <h2 className="text-xl font-bold">Câu hỏi</h2>
      </div>
      
      <div className="p-6 md:p-8 space-y-6">
        <div className="text-lg text-slate-800 font-medium leading-relaxed">
          {problem.question}
        </div>

        {problem.type === 'multiple_choice' && problem.options && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problem.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !isSubmitted && setUserAnswer(option)}
                className={`p-4 rounded-xl text-left border-2 transition-all ${
                  userAnswer === option 
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-800' 
                    : 'border-slate-100 hover:border-cyan-200 bg-slate-50'
                } ${isSubmitted ? 'cursor-default opacity-80' : ''}`}
                disabled={isSubmitted}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {problem.type === 'short_answer' && (
          <div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-0 outline-none text-lg"
              disabled={isSubmitted}
            />
          </div>
        )}

        {/* Hint Section */}
        {!isSubmitted && (
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-cyan-600 hover:text-cyan-800 underline decoration-dotted"
            >
              {showHint ? 'Ẩn gợi ý' : 'Cần gợi ý?'}
            </button>
            {showHint && (
              <div className="mt-2 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-100 animate-fadeIn">
                💡 {problem.hint}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            className="w-full py-4 text-lg"
            disabled={!userAnswer}
          >
            Kiểm tra đáp án
          </Button>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500 text-green-900' : 'bg-red-50 border-red-500 text-red-900'}`}>
              <div className="font-bold text-lg mb-1">
                {isCorrect ? '🎉 Chính xác!' : '😔 Chưa đúng rồi'}
              </div>
              <div>Đáp án đúng là: <span className="font-semibold">{problem.correctAnswer}</span></div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-cyan-800 font-bold mb-3 flex items-center">
                <span className="mr-2">🧑‍🏫</span> Lời giải chi tiết
              </h3>
              {loadingExplanation ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base text-slate-700 whitespace-pre-wrap">
                  {explanation}
                </div>
              )}
            </div>

            <Button onClick={onNewProblem} variant="secondary" className="w-full py-3">
              Bài tập tiếp theo →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};