import { useState } from 'react'
import './App.css'

const topics = [
  {
    id: 1,
    title: "Pedagogika nima?",
    icon: "📚",
    short: "Pedagogika — ta'lim va tarbiya haqidagi fan.",
    content: `Pedagogika (yunoncha: paidagogike) — bolalar tarbiyasi va ta'lim berish haqidagi fan. 
    U insonni shakllantirishga qaratilgan jarayonlarni o'rganadi. Pedagogika nazariyasi, 
    didaktika, tarbiya nazariyasi va maktabshunoslikni o'z ichiga oladi.`,
    color: "#6c63ff"
  },
  {
    id: 2,
    title: "Didaktika",
    icon: "🎓",
    short: "O'qitish nazariyasi va amaliyoti.",
    content: `Didaktika — pedagogikaning ta'lim berish qonuniyatlarini o'rganuvchi tarmog'i. 
    U o'qitishning mazmuni, usullari, shakllari va vositalarini belgilaydi. 
    Asosiy tamoyillari: onglilik, faollik, ko'rsatmalilik, tizimlilik, ilmiylik.`,
    color: "#ff6584"
  },
  {
    id: 3,
    title: "Tarbiya nazariyasi",
    icon: "🌱",
    short: "Shaxsni shakllantirish jarayoni.",
    content: `Tarbiya — shaxsni har tomonlama kamol toptirish jarayoni. 
    Axloqiy, jismoniy, mehnat, estetik va aqliy tarbiya turlarini o'z ichiga oladi. 
    Tarbiya oila, maktab va jamiyat hamkorligida amalga oshiriladi.`,
    color: "#43e97b"
  },
  {
    id: 4,
    title: "Ta'lim texnologiyalari",
    icon: "💡",
    short: "Zamonaviy o'qitish usullari.",
    content: `Zamonaviy ta'lim texnologiyalari: interfaol metodlar, loyiha asosidagi ta'lim, 
    muammoli ta'lim, hamkorlikda o'qitish, differensiallashtirilgan yondashuv. 
    Raqamli texnologiyalar va e-learning ham keng qo'llanilmoqda.`,
    color: "#fa709a"
  },
  {
    id: 5,
    title: "Pedagogik psixologiya",
    icon: "🧠",
    short: "O'quvchi psixologiyasini o'rganish.",
    content: `Pedagogik psixologiya o'quvchilarning bilish jarayonlari, motivatsiya, 
    xotira va diqqat xususiyatlarini o'rganadi. Yosh davrlariga mos ta'lim 
    berish usullari asoslanadi. Rivojlanish bosqichlari: bolalik, o'smirlik, o'spirinlik.`,
    color: "#4facfe"
  },
  {
    id: 6,
    title: "Pedagogik mahorat",
    icon: "⭐",
    short: "O'qituvchi kasbiy ko'nikmalari.",
    content: `Pedagogik mahorat — o'qituvchining kasbiy faoliyatini yuksak darajada 
    amalga oshirish qobiliyati. Kommunikativ ko'nikmalar, empatiya, ijodkorlik, 
    dars rejalashtirish va baholash malakalarini o'z ichiga oladi.`,
    color: "#f093fb"
  },
]

const quizData = [
  {
    question: "Pedagogika so'zi qaysi tildan olingan?",
    options: ["Lotincha", "Yunoncha", "Arabcha", "Fransuzcha"],
    correct: 1,
  },
  {
    question: "Didaktikaning asosiy vazifasi nima?",
    options: [
      "Sport mashg'ulotlari",
      "Musiqa o'rgatish",
      "Ta'lim berish qonuniyatlarini o'rganish",
      "Rasm chizish",
    ],
    correct: 2,
  },
  {
    question: "Qaysi olim zamonaviy didaktika asoschilaridan biri hisoblanadi?",
    options: ["Ya.A. Komenskiy", "Nyuton", "Darvin", "Freyd"],
    correct: 0,
  },
  {
    question: "Tarbiyaning nechtа turi mavjud?",
    options: ["2 ta", "3 ta", "5 ta", "7 ta"],
    correct: 2,
  },
  {
    question: "E-learning nima?",
    options: [
      "Elektron ta'lim",
      "Eski usul ta'lim",
      "Jismoniy tarbiya",
      "San'at ta'limi",
    ],
    correct: 0,
  },
]

const glossary = [
  { term: "Pedagogika", def: "Ta'lim va tarbiya haqidagi fan" },
  { term: "Didaktika", def: "O'qitish nazariyasi va amaliyoti" },
  { term: "Tarbiya", def: "Shaxsni har tomonlama shakllantirish jarayoni" },
  { term: "Metod", def: "O'qitishning yo'li va usuli" },
  { term: "Faoliyat", def: "Maqsadga yo'naltirilgan harakat" },
  { term: "Motivatsiya", def: "O'qishga undovchi ichki va tashqi omillar" },
  { term: "Differensiallashtirish", def: "O'quvchilarning individual xususiyatlarini hisobga olish" },
  { term: "Refleksiya", def: "O'z faoliyatini tahlil qilish va baholash" },
]

const noteTemplates = [
  "Bugun darsda nimalarni o'rgandim?",
  "Eng qiziqarli mavzu...",
  "Savol va mulohazalarim...",
]

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [expandedTopic, setExpandedTopic] = useState(null)
  const [quizStep, setQuizStep] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [notes, setNotes] = useState([])
  const [noteInput, setNoteInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [progress, setProgress] = useState({})
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [timerRef, setTimerRef] = useState(null)
  const [glossarySearch, setGlossarySearch] = useState('')

  // Timer
  const startTimer = () => {
    if (timerActive) return
    setTimerActive(true)
    const ref = setInterval(() => setTimer(t => t + 1), 1000)
    setTimerRef(ref)
  }
  const stopTimer = () => {
    clearInterval(timerRef)
    setTimerActive(false)
  }
  const resetTimer = () => {
    clearInterval(timerRef)
    setTimerActive(false)
    setTimer(0)
  }
  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  // Quiz
  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    if (idx === quizData[quizStep].correct) setQuizScore(s => s + 1)
    setTimeout(() => {
      if (quizStep + 1 < quizData.length) {
        setQuizStep(s => s + 1)
        setSelectedAnswer(null)
      } else {
        setQuizDone(true)
      }
    }, 900)
  }
  const restartQuiz = () => {
    setQuizStep(0); setQuizScore(0); setQuizDone(false); setSelectedAnswer(null)
  }

  // Notes
  const addNote = () => {
    if (!noteInput.trim()) return
    setNotes(n => [{ text: noteInput, date: new Date().toLocaleString('uz-UZ') }, ...n])
    setNoteInput('')
  }
  const deleteNote = (i) => setNotes(n => n.filter((_, idx) => idx !== i))

  // Progress
  const markDone = (id) => setProgress(p => ({ ...p, [id]: !p[id] }))
  const doneCount = Object.values(progress).filter(Boolean).length

  // Search
  const filtered = topics.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.short.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredGlossary = glossary.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  )

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">PedagogikaPlus</span>
        </div>
        <div className="navbar-links">
          {['home','topics','quiz','notes','glossary','tools'].map(page => (
            <button
              key={page}
              className={`nav-btn ${activePage === page ? 'active' : ''}`}
              onClick={() => setActivePage(page)}
            >
              {page === 'home' && '🏠 Bosh sahifa'}
              {page === 'topics' && '📖 Mavzular'}
              {page === 'quiz' && '🧩 Test'}
              {page === 'notes' && '📝 Eslatmalar'}
              {page === 'glossary' && '📘 Lug\'at'}
              {page === 'tools' && '🛠️ Vositalar'}
            </button>
          ))}
        </div>
        <button className="dark-toggle" onClick={() => setDarkMode(d => !d)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <main className="main-content">

        {/* HOME PAGE */}
        {activePage === 'home' && (
          <div className="page home-page">
            <div className="hero">
              <div className="hero-badge">✨ Zamonaviy ta'lim platformasi</div>
              <h1 className="hero-title">
                Pedagogika <span className="gradient-text">Ilmi</span>
              </h1>
              <p className="hero-sub">
                Ta'lim va tarbiya sirlarini o'rganing. Interaktiv darslar, testlar va ko'plab foydali materiallar.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => setActivePage('topics')}>
                  📚 O'rganishni boshlash
                </button>
                <button className="btn-secondary" onClick={() => setActivePage('quiz')}>
                  🧩 Test ishlash
                </button>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-num">6</span>
                <span className="stat-label">Mavzu</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">5</span>
                <span className="stat-label">Test savoli</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{doneCount}</span>
                <span className="stat-label">Bajarilgan</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{notes.length}</span>
                <span className="stat-label">Eslatma</span>
              </div>
            </div>

            <div className="progress-section">
              <h3>📊 Umumiy progress</h3>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${(doneCount/6)*100}%` }}></div>
              </div>
              <span className="progress-label">{doneCount}/6 mavzu o'rganildi</span>
            </div>

            <div className="feature-cards">
              {[
                { icon: '📖', title: 'Mavzular', desc: 'Pedagogikaning asosiy bo\'limlari', page: 'topics' },
                { icon: '🧩', title: 'Interaktiv test', desc: 'Bilimingizni sinab ko\'ring', page: 'quiz' },
                { icon: '📝', title: 'Eslatmalar', desc: 'Shaxsiy konspekt yozing', page: 'notes' },
                { icon: '📘', title: 'Lug\'at', desc: 'Pedagogika atamalari', page: 'glossary' },
              ].map(f => (
                <div key={f.page} className="feature-card" onClick={() => setActivePage(f.page)}>
                  <span className="feature-icon">{f.icon}</span>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                  <span className="feature-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOPICS PAGE */}
        {activePage === 'topics' && (
          <div className="page topics-page">
            <div className="page-header">
              <h2>📖 Pedagogika Mavzulari</h2>
              <p>Barcha asosiy bo'limlarni o'rganing</p>
            </div>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Mavzu qidirish..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="topics-grid">
              {filtered.map(topic => (
                <div
                  key={topic.id}
                  className={`topic-card ${expandedTopic === topic.id ? 'expanded' : ''} ${progress[topic.id] ? 'done' : ''}`}
                  style={{ borderTop: `4px solid ${topic.color}` }}
                >
                  <div className="topic-card-header" onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}>
                    <span className="topic-icon">{topic.icon}</span>
                    <div>
                      <h3 className="topic-title">{topic.title}</h3>
                      <p className="topic-short">{topic.short}</p>
                    </div>
                    <span className="topic-chevron">{expandedTopic === topic.id ? '▲' : '▼'}</span>
                  </div>
                  {expandedTopic === topic.id && (
                    <div className="topic-body">
                      <p>{topic.content}</p>
                      <button
                        className={`done-btn ${progress[topic.id] ? 'done-active' : ''}`}
                        onClick={() => markDone(topic.id)}
                      >
                        {progress[topic.id] ? '✅ Bajarildi' : '○ Bajarildi deb belgilash'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ PAGE */}
        {activePage === 'quiz' && (
          <div className="page quiz-page">
            <div className="page-header">
              <h2>🧩 Bilim Testi</h2>
              <p>Pedagogika bo'yicha o'z bilimingizni sinab ko'ring</p>
            </div>
            {!quizDone ? (
              <div className="quiz-box">
                <div className="quiz-progress">
                  <span>{quizStep + 1} / {quizData.length}</span>
                  <div className="quiz-prog-bar">
                    <div className="quiz-prog-fill" style={{ width: `${((quizStep)/quizData.length)*100}%` }}></div>
                  </div>
                </div>
                <h3 className="quiz-question">{quizData[quizStep].question}</h3>
                <div className="quiz-options">
                  {quizData[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`quiz-opt
                        ${selectedAnswer === idx && idx === quizData[quizStep].correct ? 'correct' : ''}
                        ${selectedAnswer === idx && idx !== quizData[quizStep].correct ? 'wrong' : ''}
                        ${selectedAnswer !== null && idx === quizData[quizStep].correct ? 'correct' : ''}
                      `}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="opt-letter">{String.fromCharCode(65+idx)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="quiz-result">
                <div className="result-emoji">
                  {quizScore >= 4 ? '🏆' : quizScore >= 2 ? '👍' : '📚'}
                </div>
                <h3>Test yakunlandi!</h3>
                <p className="result-score">{quizScore} / {quizData.length} to'g'ri javob</p>
                <p className="result-msg">
                  {quizScore === quizData.length ? 'Ajoyib! Barcha savollar to\'g\'ri!' :
                   quizScore >= 3 ? 'Yaxshi natija! Davom eting.' :
                   'Ko\'proq o\'qing va qayta urinib ko\'ring.'}
                </p>
                <button className="btn-primary" onClick={restartQuiz}>🔄 Qayta boshlash</button>
              </div>
            )}
          </div>
        )}

        {/* NOTES PAGE */}
        {activePage === 'notes' && (
          <div className="page notes-page">
            <div className="page-header">
              <h2>📝 Shaxsiy Eslatmalar</h2>
              <p>O'z fikr va xulosalaringizni yozing</p>
            </div>
            <div className="note-templates">
              <span>Shablon:</span>
              {noteTemplates.map((t, i) => (
                <button key={i} className="template-btn" onClick={() => setNoteInput(t)}>{t}</button>
              ))}
            </div>
            <div className="note-input-wrap">
              <textarea
                className="note-textarea"
                placeholder="Eslatma yozing..."
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                rows={4}
              />
              <button className="btn-primary note-add-btn" onClick={addNote}>➕ Qo'shish</button>
            </div>
            <div className="notes-list">
              {notes.length === 0 && <div className="empty-state">📭 Hali eslatma yo'q</div>}
              {notes.map((n, i) => (
                <div key={i} className="note-item">
                  <p>{n.text}</p>
                  <div className="note-meta">
                    <span>🕐 {n.date}</span>
                    <button className="delete-btn" onClick={() => deleteNote(i)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GLOSSARY PAGE */}
        {activePage === 'glossary' && (
          <div className="page glossary-page">
            <div className="page-header">
              <h2>📘 Pedagogika Lug'ati</h2>
              <p>Asosiy atama va tushunchalar</p>
            </div>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Atama qidirish..."
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
              />
            </div>
            <div className="glossary-list">
              {filteredGlossary.map((g, i) => (
                <div key={i} className="glossary-item">
                  <span className="glossary-term">{g.term}</span>
                  <span className="glossary-def">{g.def}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOOLS PAGE */}
        {activePage === 'tools' && (
          <div className="page tools-page">
            <div className="page-header">
              <h2>🛠️ O'quv Vositalari</h2>
              <p>Foydali pedagogik yordamchi vositalar</p>
            </div>

            {/* Timer */}
            <div className="tool-card">
              <h3>⏱️ O'qish Taymer</h3>
              <p>Dars yoki o'qish vaqtingizni hisoblang</p>
              <div className="timer-display">{formatTime(timer)}</div>
              <div className="timer-btns">
                <button className="btn-primary" onClick={startTimer} disabled={timerActive}>▶ Start</button>
                <button className="btn-secondary" onClick={stopTimer} disabled={!timerActive}>⏸ Pause</button>
                <button className="btn-danger" onClick={resetTimer}>↩ Reset</button>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="tool-card">
              <h3>📊 Mavzu Progressi</h3>
              <p>Qaysi mavzularni o'rganganingizni kuzating</p>
              <div className="progress-tracker">
                {topics.map(t => (
                  <div key={t.id} className="tracker-item" onClick={() => markDone(t.id)}>
                    <span className={`tracker-check ${progress[t.id] ? 'checked' : ''}`}>
                      {progress[t.id] ? '✅' : '⬜'}
                    </span>
                    <span>{t.icon} {t.title}</span>
                  </div>
                ))}
              </div>
              <div className="tracker-summary">
                Jami: {doneCount}/{topics.length} mavzu bajarildi
              </div>
            </div>

            {/* Random Topic */}
            <RandomTopic topics={topics} setActivePage={setActivePage} setExpandedTopic={setExpandedTopic} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🎓 PedagogikaPlus — Zamonaviy pedagogik ta'lim platformasi © 2025</p>
      </footer>
    </div>
  )
}

function RandomTopic({ topics, setActivePage, setExpandedTopic }) {
  const [current, setCurrent] = useState(null)
  const getRandom = () => {
    const r = topics[Math.floor(Math.random() * topics.length)]
    setCurrent(r)
  }
  return (
    <div className="tool-card">
      <h3>🎲 Tasodifiy Mavzu</h3>
      <p>Har kuni yangi mavzu o'rganing</p>
      <button className="btn-primary" onClick={getRandom}>🎲 Tasodifiy tanlash</button>
      {current && (
        <div className="random-result" style={{ borderLeft: `4px solid ${current.color}` }}>
          <span className="topic-icon">{current.icon}</span>
          <div>
            <strong>{current.title}</strong>
            <p>{current.short}</p>
          </div>
          <button className="btn-secondary small" onClick={() => { setExpandedTopic(current.id); setActivePage('topics') }}>
            O'qish →
          </button>
        </div>
      )}
    </div>
  )
}
