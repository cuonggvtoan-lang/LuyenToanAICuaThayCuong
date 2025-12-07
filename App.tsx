
import React, { useState, useEffect } from 'react';
import { GradeLevel, Difficulty, MathProblem, TextbookSet } from './types';
import { CURRICULUM } from './data/curriculum';
import { generateMathProblem } from './services/geminiService';
import { ProblemView } from './components/ProblemView';
import { ChatTutor } from './components/ChatTutor';
import { Button } from './components/Button';

// SVG Icons
const Icons = {
  BookOpen: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'practice' | 'chat'>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(GradeLevel.GRADE_8);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookSet>(TextbookSet.KET_NOI);
  // Default to first chapter of grade 8 KET_NOI
  const [selectedChapter, setSelectedChapter] = useState<string>(CURRICULUM[GradeLevel.GRADE_8][TextbookSet.KET_NOI][0]);
  
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update chapters when Grade or Textbook changes
  useEffect(() => {
    const chapters = CURRICULUM[selectedGrade][selectedTextbook];
    if (chapters && chapters.length > 0) {
      setSelectedChapter(chapters[0]);
    } else {
      setSelectedChapter("");
    }
  }, [selectedGrade, selectedTextbook]);

  const handleGenerateProblem = async () => {
    setIsLoading(true);
    setCurrentView('practice');
    const problem = await generateMathProblem(
      selectedGrade, 
      selectedDifficulty,
      selectedTextbook,
      selectedChapter
    );
    setCurrentProblem(problem);
    setIsLoading(false);
  };

  const NavButton = ({ view, label, icon }: { view: 'home' | 'practice' | 'chat', label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        currentView === view 
          ? 'bg-cyan-100 text-cyan-800' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-cyan-600'
      }`}
    >
      <span className="text-cyan-600">{icon}</span>
      <span>{label}</span>
    </button>
  );

  const availableChapters = CURRICULUM[selectedGrade][selectedTextbook] || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg text-white">
                <Icons.Calculator />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">
                MathGenius VN
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <NavButton view="home" label="Trang chủ" icon={<Icons.BookOpen />} />
              <NavButton view="practice" label="Luyện tập" icon={<Icons.Brain />} />
              <NavButton view="chat" label="Hỏi gia sư" icon={<span className="text-lg">💬</span>} />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-2 space-y-1 shadow-lg absolute w-full">
             <NavButton view="home" label="Trang chủ" icon={<Icons.BookOpen />} />
             <NavButton view="practice" label="Luyện tập" icon={<Icons.Brain />} />
             <NavButton view="chat" label="Hỏi gia sư" icon={<span className="text-lg">💬</span>} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {currentView === 'home' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center space-y-4 py-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Luyện toán THCS cùng <span className="text-cyan-500">trợ lý AI của Thầy Cường</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Hệ thống bài tập bám sát chương trình sách giáo khoa mới (Kết nối tri thức, Cánh Diều, Chân trời sáng tạo).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-cyan-100/50 border border-cyan-100 space-y-8">
              
              {/* Row 1: Grade & Textbook */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Grade */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">📚</span> Khối lớp
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(GradeLevel).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                          selectedGrade === grade 
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm' 
                            : 'border-slate-100 hover:border-cyan-200 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textbook */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">📖</span> Bộ sách
                  </label>
                  <div className="flex flex-col gap-3">
                    {Object.values(TextbookSet).map((book) => (
                      <button
                        key={book}
                        onClick={() => setSelectedTextbook(book)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium text-left text-sm ${
                          selectedTextbook === book 
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm' 
                            : 'border-slate-100 hover:border-cyan-200 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {book}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Chapter */}
              <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">📑</span> Chương / Bài học
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableChapters.map((chap) => (
                       <button
                          key={chap}
                          onClick={() => setSelectedChapter(chap)}
                          className={`p-3 rounded-lg border-2 transition-all text-xs md:text-sm font-medium text-left ${
                             selectedChapter === chap
                             ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm' 
                             : 'border-slate-100 hover:border-cyan-300 text-slate-600 bg-slate-50'
                          }`}
                          title={chap}
                       >
                          {chap}
                       </button>
                    ))}
                  </div>
                  {availableChapters.length === 0 && (
                     <p className="text-sm text-red-500">Chưa có dữ liệu chương trình cho lựa chọn này.</p>
                  )}
              </div>

              {/* Row 3: Difficulty (Topic removed) */}
              <div className="border-t border-slate-100 pt-8">
                 {/* Difficulty */}
                 <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">🎯</span> Độ khó
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.values(Difficulty).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium text-sm text-center ${
                          selectedDifficulty === diff 
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm' 
                            : 'border-slate-100 hover:border-cyan-200 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Button 
                  onClick={handleGenerateProblem} 
                  isLoading={isLoading} 
                  className="w-full py-4 text-lg shadow-lg shadow-cyan-200 hover:shadow-cyan-300 transform hover:-translate-y-0.5"
                >
                  Bắt đầu luyện tập ngay
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'practice' && (
          <div className="animate-fadeIn">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <button 
                onClick={() => setCurrentView('home')} 
                className="flex items-center text-slate-500 hover:text-cyan-600 transition-colors w-fit"
              >
                <Icons.ArrowLeft />
                <span className="ml-1 font-medium">Chọn lại</span>
              </button>
              <div className="flex flex-wrap gap-2 text-xs md:text-sm font-medium">
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">{selectedGrade}</span>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">{selectedTextbook}</span>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">{selectedChapter}</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{selectedDifficulty}</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 text-lg animate-pulse">Đang tạo bài toán phù hợp...</p>
              </div>
            ) : currentProblem ? (
              <ProblemView problem={currentProblem} onNewProblem={handleGenerateProblem} />
            ) : (
               <div className="text-center py-20 text-slate-400">
                  Chưa có bài tập nào. Hãy nhấn nút quay lại để tạo.
               </div>
            )}
          </div>
        )}

        {currentView === 'chat' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="mb-6">
               <h1 className="text-2xl font-bold text-slate-800 mb-2">Góc Hỏi Đáp</h1>
               <p className="text-slate-600">Hỏi bất kỳ câu hỏi toán học nào, gia sư AI sẽ giải đáp ngay lập tức.</p>
            </div>
            <ChatTutor />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} MathGenius VN. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
