"use client";

import { useMemo, useState } from "react";

type Answer = { label: string; scores: [number, number, number, number] };
type Question = { prompt: string; subtitle: string; answers: Answer[] };

const questions: Question[] = [
  {
    prompt: "When you start liking someone, what feels most natural?",
    subtitle: "Choose the answer that sounds most like you.",
    answers: [
      { label: "I show it. I like making my interest clear.", scores: [3, 0, 0, 1] },
      { label: "I take my time and see if trust develops.", scores: [0, 3, 1, 0] },
      { label: "I keep things playful and see where it goes.", scores: [0, 0, 3, 1] },
      { label: "I think through every signal before acting.", scores: [1, 1, 0, 3] },
    ],
  },
  {
    prompt: "What matters most in a relationship?",
    subtitle: "There are no right or wrong answers.",
    answers: [
      { label: "Feeling loved and emotionally close.", scores: [3, 1, 0, 1] },
      { label: "Trust, stability and being dependable.", scores: [1, 3, 0, 1] },
      { label: "Keeping things fun and full of new experiences.", scores: [0, 0, 3, 1] },
      { label: "Being understood and communicating clearly.", scores: [1, 1, 0, 3] },
    ],
  },
  {
    prompt: "Someone takes longer than usual to reply. You…",
    subtitle: "Think about your usual reaction, not your ideal one.",
    answers: [
      { label: "Send a warm follow-up. I prefer being direct.", scores: [3, 0, 0, 1] },
      { label: "Give them space and carry on with my day.", scores: [0, 3, 1, 0] },
      { label: "Don't worry too much; I'll see them when I see them.", scores: [0, 1, 3, 0] },
      { label: "Wonder if something has changed and replay the conversation.", scores: [1, 0, 0, 3] },
    ],
  },
  {
    prompt: "Your ideal first date is…",
    subtitle: "Picture a date you would genuinely enjoy.",
    answers: [
      { label: "A cosy dinner with plenty of meaningful conversation.", scores: [3, 1, 0, 1] },
      { label: "Coffee somewhere quiet where we can get to know each other.", scores: [1, 3, 0, 1] },
      { label: "Something spontaneous, active or a little unexpected.", scores: [0, 0, 3, 0] },
      { label: "An activity that helps us talk naturally without pressure.", scores: [1, 1, 1, 3] },
    ],
  },
  {
    prompt: "When a disagreement comes up, you usually…",
    subtitle: "Everyone handles tension differently.",
    answers: [
      { label: "Want to talk it through and reconnect quickly.", scores: [3, 0, 0, 1] },
      { label: "Need a little time to think before discussing it.", scores: [0, 3, 0, 1] },
      { label: "Try to lighten the mood before getting too serious.", scores: [0, 0, 3, 0] },
      { label: "Want to understand every side and find the real issue.", scores: [1, 0, 0, 3] },
    ],
  },
  {
    prompt: "What makes you feel cared for?",
    subtitle: "Pick the closest fit.",
    answers: [
      { label: "Affection, thoughtful words and little romantic gestures.", scores: [3, 0, 0, 1] },
      { label: "Consistency: they do what they say they'll do.", scores: [0, 3, 0, 1] },
      { label: "Shared adventures and laughing together.", scores: [0, 0, 3, 0] },
      { label: "Being listened to and understood without judgement.", scores: [1, 1, 0, 3] },
    ],
  },
  {
    prompt: "How quickly do you like a relationship to develop?",
    subtitle: "Go with your real preference.",
    answers: [
      { label: "When it feels right, I like to follow my heart.", scores: [3, 0, 0, 1] },
      { label: "Slowly. Trust needs time to build.", scores: [0, 3, 0, 0] },
      { label: "Naturally, without too many rules or timelines.", scores: [0, 0, 3, 0] },
      { label: "Once I've thought through whether we're compatible.", scores: [1, 1, 0, 3] },
    ],
  },
  {
    prompt: "Which sentence sounds most like you?",
    subtitle: "This helps us round out your result.",
    answers: [
      { label: "Love is worth being brave for.", scores: [3, 0, 0, 1] },
      { label: "The best relationships feel safe and steady.", scores: [0, 3, 0, 1] },
      { label: "The best connections leave room to be yourself.", scores: [0, 0, 3, 0] },
      { label: "Understanding each other makes all the difference.", scores: [1, 1, 0, 3] },
    ],
  },
];

const profiles = [
  {
    name: "The Heart-First Romantic",
    short: "You lead with warmth, hope and a genuine desire to connect.",
    detail: "You tend to value affection, emotional closeness and making the people you care about feel special. Your reminder: keep your own needs in the picture while showing up for someone else.",
    emoji: "♡",
    color: "rose",
    strengths: ["Warm and expressive", "Values emotional connection", "Willing to make an effort"],
    watchout: "You may sometimes invest in potential before you know whether the other person can meet you halfway.",
  },
  {
    name: "The Steady Builder",
    short: "You value trust, consistency and a connection that grows over time.",
    detail: "You tend to feel closest to people whose actions match their words. You may prefer a slower pace, where trust can grow naturally. Your reminder: let people see your softer side, too.",
    emoji: "✳",
    color: "sage",
    strengths: ["Dependable and thoughtful", "Values trust and stability", "Respects personal boundaries"],
    watchout: "Taking your time is a strength, but being too guarded can make it harder for a promising connection to develop.",
  },
  {
    name: "The Free-Spirited Connector",
    short: "You bring playfulness, curiosity and a sense of adventure to dating.",
    detail: "You tend to enjoy connections that feel natural rather than forced. Shared experiences and laughter can be important ways for you to bond. Your reminder: clarity about intentions can make freedom feel safer for both people.",
    emoji: "✦",
    color: "amber",
    strengths: ["Playful and open-minded", "Enjoys new experiences", "Gives relationships room to breathe"],
    watchout: "Keeping things light can be comfortable, but remember to communicate when something starts to matter to you.",
  },
  {
    name: "The Thoughtful Observer",
    short: "You look for understanding and prefer to make sense of a connection.",
    detail: "You tend to notice details and care about being understood. Honest conversation and reflection can help you feel secure with someone. Your reminder: you don't need perfect certainty before taking a small emotional risk.",
    emoji: "⌁",
    color: "blue",
    strengths: ["Reflective and observant", "Values honest communication", "Thinks carefully about compatibility"],
    watchout: "Overanalysing every signal can create uncertainty where a simple, honest conversation might help.",
  },
];

function getProfile(scores: number[]) {
  const highest = Math.max(...scores);
  return profiles[scores.indexOf(highest)] ?? profiles[0];
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totals = useMemo(() => {
    const result = [0, 0, 0, 0];
    answers.forEach((answerIndex, questionIndex) => {
      const score = questions[questionIndex]?.answers[answerIndex]?.scores;
      score?.forEach((value, index) => (result[index] += value));
    });
    return result;
  }, [answers]);

  const profile = getProfile(totals);
  const progress = Math.round((answers.length / questions.length) * 100);

  function chooseAnswer(answerIndex: number) {
    const updated = [...answers];
    updated[step] = answerIndex;
    setAnswers(updated);
  }

  function nextQuestion() {
    if (answers[step] === undefined) return;
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  }

  function restart() {
    setStarted(false);
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); restart(); }}>
          <span className="brand-mark">d</span>
          <span>datetype</span>
        </a>
        <span className="top-note">A little more self-understanding</span>
      </header>

      {!started ? (
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR DATING STYLE, DECODED</div>
            <h1>Love has a style.<br /><em>What's yours?</em></h1>
            <p className="hero-description">
              Discover how you connect, what you value in a relationship, and the little patterns that make you <em>you</em>.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setStarted(true)}>
                Discover my type <span aria-hidden="true">↗</span>
              </button>
              <span className="time-note">3 minutes · 8 quick questions</span>
            </div>
            <div className="social-proof">
              <div className="avatar-stack"><span>♡</span><span>✳</span><span>✦</span></div>
              <span>A thoughtful pause for your love life.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative illustration">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-card card-back"><span className="card-spark">✳</span><span className="card-caption">the way you love</span></div>
            <div className="art-card card-front">
              <div className="heart-shape">♡</div>
              <div className="card-label">YOUR DATING TYPE</div>
              <div className="card-title">A little<br />closer to<br /><em>yourself.</em></div>
              <div className="card-bottom"><span>01 — 04</span><span>✦</span></div>
            </div>
            <div className="floating-note note-top">connection looks<br />different on everyone</div>
            <div className="floating-note note-bottom">made for real life ♡</div>
          </div>
          <div className="hero-foot"><span>MADE FOR CURIOSITY</span><span>NO RIGHT OR WRONG ANSWERS</span><span>JUST YOU, A LITTLE BETTER UNDERSTOOD</span></div>
        </section>
      ) : showResult ? (
        <section className="result-section">
          <div className="result-kicker">YOUR DATING STYLE, DECODED</div>
          <div className="result-symbol">{profile.emoji}</div>
          <h1>You might be<br /><em>{profile.name}.</em></h1>
          <p className="result-intro">{profile.short}</p>
          <div className="result-card">
            <div className="result-card-top"><span>YOUR FIRST IMPRESSION</span><span>01 / 04</span></div>
            <p>{profile.detail}</p>
            <div className="strength-list">
              {profile.strengths.map((strength) => <span key={strength}>✓ {strength}</span>)}
            </div>
            <div className="result-divider" />
            <div className="watchout-label">A GENTLE REMINDER</div>
            <p className="watchout">{profile.watchout}</p>
          </div>
          <div className="unlock-card">
            <div className="unlock-tag">COMING NEXT</div>
            <h2>Your full dating report</h2>
            <p>We're preparing a deeper report with communication tips, relationship reflections and practical prompts.</p>
            <button className="primary-button muted-button" disabled>Full report · Coming soon</button>
            <small>No payment has been taken. The paid report isn't available yet.</small>
          </div>
          <button className="text-button" onClick={restart}>↶ &nbsp; Take the quiz again</button>
          <p className="disclaimer">This quiz is for reflection and entertainment. It is not a psychological assessment or a prediction of relationship outcomes.</p>
        </section>
      ) : (
        <section className="quiz-section">
          <div className="quiz-heading">
            <div className="eyebrow"><span className="eyebrow-dot" /> A MOMENT FOR YOU</div>
            <h1>Let's talk about<br /><em>how you connect.</em></h1>
            <p>Go with your first instinct. There are no wrong answers.</p>
          </div>
          <div className="quiz-panel">
            <div className="progress-meta"><span>QUESTION {String(step + 1).padStart(2, "0")} <span className="muted">/ {String(questions.length).padStart(2, "0")}</span></span><span>{Math.round(((step + 1) / questions.length) * 100)}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            <h2>{questions[step].prompt}</h2>
            <p className="question-subtitle">{questions[step].subtitle}</p>
            <div className="answer-list">
              {questions[step].answers.map((answer, index) => (
                <button key={answer.label} className={answers[step] === index ? "answer-option selected" : "answer-option"} onClick={() => chooseAnswer(index)}>
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{answer.label}</span><span className="answer-check">{answers[step] === index ? "✓" : "↗"}</span>
                </button>
              ))}
            </div>
            <div className="quiz-controls">
              <button className="text-button" onClick={() => step === 0 ? setStarted(false) : setStep(step - 1)}>{step === 0 ? "← Back" : "← Previous"}</button>
              <button className="primary-button" disabled={answers[step] === undefined} onClick={nextQuestion}>{step === questions.length - 1 ? "Reveal my type" : "Next question"} <span aria-hidden="true">→</span></button>
            </div>
          </div>
          <p className="privacy-note">♡ Your answers stay in this browser in this demo. We don't ask for your name or email.</p>
        </section>
      )}

      <footer className="site-footer">
        <a className="footer-brand" href="#" onClick={(event) => { event.preventDefault(); restart(); }}>datetype</a>
        <span>Made for curiosity, not for putting people in boxes.</span>
        <span>© 2026 DateType · <a href="mailto:hello@datetype.example">Contact</a></span>
      </footer>
    </main>
  );
}