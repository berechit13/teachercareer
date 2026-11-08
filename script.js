// 교원 진로 적합도 원픽 (MBTI형 2지선다) 게임 로직

let currentQuestionIndex = 0;
let userSelections = []; // 사용자의 문항별 선택 기록

// 각 유형별 이모지 매핑
const careerEmojis = {
  principal: "👑",
  supervisor: "⚡",
  masterTeacher: "🧘",
  teacher: "🏖️",
  overseas: "✈️",
  resignation: "🐅"
};

// 스탯 한글 라벨 맵
const statLabels = {
  ambition: "야망 & 리더십",
  adminSkill: "행정 & 기안력",
  patience: "인내심 & 결재력",
  multitasking: "멀티태스킹",
  stamina: "체력 & 야근력",
  teachingLove: "수업 애정도",
  autonomy: "자율성 추구",
  adminResistance: "공문 저항력",
  workLifeBalance: "워라밸 사수력",
  classroomPeace: "교실 평화도",
  stability: "안정성 선호",
  adventurous: "모험심",
  adaptability: "현지 적응력",
  languageSense: "어학 감각",
  entrepreneurship: "사업가 기질",
  independence: "독립심",
  riskTaking: "위험 감수력"
};

// DOM 요소 캐싱
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const axisBadge = document.getElementById('axis-badge');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');

const optionABtn = document.getElementById('option-a-btn');
const optionBBtn = document.getElementById('option-b-btn');
const optionAText = document.getElementById('option-a-text');
const optionBText = document.getElementById('option-b-text');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const userCodeBadge = document.getElementById('user-code-badge');
const bestEmoji = document.getElementById('best-emoji');
const bestTitle = document.getElementById('best-title');
const bestSubtitle = document.getElementById('best-subtitle');
const bestSummary = document.getElementById('best-summary');
const statsContainer = document.getElementById('stats-container');
const axisBarsContainer = document.getElementById('axis-bars-container');
const bestTip = document.getElementById('best-tip');

const runnerUpCard = document.getElementById('runner-up-card');
const runnerUpToggleBtn = document.getElementById('runner-up-toggle-btn');
const runnerUpDetail = document.getElementById('runner-up-detail');
const runnerUpEmoji = document.getElementById('runner-up-emoji');
const runnerUpTitle = document.getElementById('runner-up-title');
const runnerUpSubtitle = document.getElementById('runner-up-subtitle');
const runnerUpReason = document.getElementById('runner-up-reason');
const runnerUpSummary = document.getElementById('runner-up-summary');
const runnerUpStats = document.getElementById('runner-up-stats');
const runnerUpTip = document.getElementById('runner-up-tip');

const shareBtn = document.getElementById('share-btn');
const restartBtn = document.getElementById('restart-btn');
const toast = document.getElementById('toast');

// 화면 전환 헬퍼
function switchScreen(targetScreen) {
  [introScreen, quizScreen, resultScreen].forEach(screen => {
    screen.classList.remove('active');
  });
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 시작 버튼 이벤트
startBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  userSelections = [];
  switchScreen(quizScreen);
  loadQuestion();
});

// 질문 화면 로드
function loadQuestion() {
  const total = questions.length;
  const current = questions[currentQuestionIndex];

  // 진행률 업데이트
  progressText.textContent = `${currentQuestionIndex + 1} / ${total}`;
  const percentage = Math.round(((currentQuestionIndex + 1) / total) * 100);
  progressFill.style.width = `${percentage}%`;

  // 축 배지 업데이트
  let partNumber = 1;
  if (current.axis === 'Driver') partNumber = 2;
  else if (current.axis === 'SystemFit') partNumber = 3;
  else if (current.axis === 'RiskProfile') partNumber = 4;
  axisBadge.textContent = `[PART ${partNumber}/4] ${current.axisName}`;

  // 질문 및 선택지 텍스트
  questionText.textContent = current.question;
  optionAText.textContent = current.choiceA.text;
  optionBText.textContent = current.choiceB.text;

  // 이전 선택 상태 복원
  optionABtn.classList.remove('selected');
  optionBBtn.classList.remove('selected');
  if (userSelections[currentQuestionIndex]) {
    if (userSelections[currentQuestionIndex].choice === 'A') {
      optionABtn.classList.add('selected');
    } else if (userSelections[currentQuestionIndex].choice === 'B') {
      optionBBtn.classList.add('selected');
    }
  }

  // 이전 버튼 활성화 상태
  prevBtn.disabled = currentQuestionIndex === 0;
}

// 선택지 클릭 핸들러
function handleChoice(choice) {
  const current = questions[currentQuestionIndex];
  const choiceObj = choice === 'A' ? current.choiceA : current.choiceB;

  // 선택 상태 표시
  optionABtn.classList.toggle('selected', choice === 'A');
  optionBBtn.classList.toggle('selected', choice === 'B');

  // 사용자 응답 저장
  userSelections[currentQuestionIndex] = {
    id: current.id,
    axis: current.axis,
    choice: choice,
    trait: choiceObj.trait
  };

  // 0.25초 후 자동 다음 문항 이동
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResult();
    }
  }, 250);
}

optionABtn.addEventListener('click', () => handleChoice('A'));
optionBBtn.addEventListener('click', () => handleChoice('B'));

// 이전 버튼
prevBtn.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

// 다음 버튼
nextBtn.addEventListener('click', () => {
  if (!userSelections[currentQuestionIndex]) {
    alert("A 또는 B 선택지 중 하나를 선택해 주세요!");
    return;
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResult();
  }
});

// [교원 진로 적합도 계산 함수]
function calculateCareerMatch(userScores) {
  // userScores 형태: { S, C, I, A, F, E, R, V } (각 0 ~ 100)
  const { S, C, I, A, F, E, R, V } = userScores;

  // 진로별 적합도 산출 (모험/탈체제 특성에 1.2배 변별력 가중치 적용)
  const careerScores = [
    {
      type: "resignation",
      name: "의원면직",
      score: S + I + (E * 1.2) + (V * 1.3), // 높은 V와 E가 결합될 때 강력한 시너지
      code: "SIEV"
    },
    {
      type: "supervisor",
      name: "장학사",
      score: S + I + (F * 1.2) + (V * 0.9), // 장학사는 F(행정)가 핵심이며 무작정 V만 높다고 매칭되지 않음
      code: "SIFV"
    },
    {
      type: "overseas",
      name: "해외파견교사",
      score: S + A + (E * 1.1) + (V * 1.2),
      code: "SAEV"
    },
    {
      type: "principal",
      name: "교장",
      score: S + I + (F * 1.2) + (R * 1.2),
      code: "SIFR"
    },
    {
      type: "masterTeacher",
      name: "수석교사",
      score: C + A + (E * 1.2) + (R * 1.1),
      code: "CAER"
    },
    {
      type: "teacher",
      name: "평교사",
      score: C + A + (F * 1.0) + (R * 1.2),
      code: "CAFR"
    }
  ];

  // 점수 내림차순 정렬
  careerScores.sort((a, b) => b.score - a.score);

  return {
    bestMatch: careerScores[0],      // 1순위 최적 진로
    runnerUp: careerScores[1],       // 2순위 추천 진로
    allRanking: careerScores         // 전체 순위 및 점수
  };
}

// 결과 계산 연동 함수
function calculateResult() {
  // 1. 각 trait 카운트 집계 (각 축 5문항)
  const counts = { S: 0, C: 0, I: 0, A: 0, F: 0, E: 0, R: 0, V: 0 };
  userSelections.forEach(sel => {
    if (sel && sel.trait) {
      counts[sel.trait] = (counts[sel.trait] || 0) + 1;
    }
  });

  // 2. 카운트(0~5)를 0 ~ 100 스코어로 환산
  const userScores = {
    S: (counts.S / 5) * 100,
    C: (counts.C / 5) * 100,
    I: (counts.I / 5) * 100,
    A: (counts.A / 5) * 100,
    F: (counts.F / 5) * 100,
    E: (counts.E / 5) * 100,
    R: (counts.R / 5) * 100,
    V: (counts.V / 5) * 100
  };

  // 3. 교원 진로 적합도 계산 함수 호출
  const matchResult = calculateCareerMatch(userScores);

  // 4. 4대 축 우세 기호 산출 (5문항 중 3문항 이상)
  const codeScope = counts.S >= 3 ? 'S' : 'C';
  const codeDriver = counts.I >= 3 ? 'I' : 'A';
  const codeFit = counts.F >= 3 ? 'F' : 'E';
  const codeRisk = counts.R >= 3 ? 'R' : 'V';
  const userCode = `${codeScope}${codeDriver}${codeFit}${codeRisk}`;

  const bestCareer = resultsData[matchResult.bestMatch.type];
  const runnerCareer = resultsData[matchResult.runnerUp.type];

  return {
    userCode,
    counts,
    userScores,
    bestMatch: {
      ...matchResult.bestMatch,
      career: bestCareer,
      emoji: careerEmojis[matchResult.bestMatch.type] || "🏫"
    },
    runnerUp: {
      ...matchResult.runnerUp,
      career: runnerCareer,
      emoji: careerEmojis[matchResult.runnerUp.type] || "🏫"
    },
    allRanking: matchResult.allRanking
  };
}

// 결과 화면 렌더링
function showResult() {
  const result = calculateResult();
  const best = result.bestMatch.career;
  const runner = result.runnerUp.career;
  const counts = result.counts;

  // 4자리 사용자 코드 배지
  userCodeBadge.textContent = `${result.userCode[0]} - ${result.userCode[1]} - ${result.userCode[2]} - ${result.userCode[3]}`;

  // 1순위 최적 진로 카드 정보 주입
  bestEmoji.textContent = result.bestMatch.emoji;
  bestTitle.textContent = best.title;
  bestSubtitle.textContent = best.subtitle;
  bestSummary.textContent = best.summary;

  // 특화 능력치 스탯 (Stats) 렌더링
  statsContainer.innerHTML = '';
  if (best.stats) {
    Object.entries(best.stats).forEach(([statKey, statValue]) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const label = statLabels[statKey] || statKey;
      card.innerHTML = `
        <span class="stat-name">${label}</span>
        <span class="stat-value">${statValue}</span>
        <div class="stat-track">
          <div class="stat-fill" style="width: ${statValue};"></div>
        </div>
      `;
      statsContainer.appendChild(card);
    });
  }

  // 4대 축 게이지 바 생성
  renderAxisBars(counts);

  // 추천 꿀팁 (Tip)
  bestTip.textContent = best.tip;

  // 2순위 추천 진로 카드 초기화 및 기본 정보 주입
  runnerUpCard.classList.remove('open');
  runnerUpDetail.style.display = 'none';
  runnerUpToggleBtn.textContent = '설명 보기 ▼';

  runnerUpEmoji.textContent = result.runnerUp.emoji;
  runnerUpTitle.textContent = runner.title;
  runnerUpSubtitle.textContent = runner.subtitle;
  const scoreDiff = Math.round(result.bestMatch.score - result.runnerUp.score);
  runnerUpReason.textContent = scoreDiff <= 30
    ? `1순위와 근소한 점수 차이(${scoreDiff}점)를 보이는 강력한 유력 대안 진로입니다.`
    : `나의 잠재적 성향과 높은 친화력을 지닌 추천 대안 진로입니다.`;

  // 2순위 상세 설명 및 스탯 주입
  runnerUpSummary.textContent = runner.summary;
  runnerUpTip.textContent = runner.tip;
  runnerUpStats.innerHTML = '';
  if (runner.stats) {
    Object.entries(runner.stats).forEach(([statKey, statValue]) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const label = statLabels[statKey] || statKey;
      card.innerHTML = `
        <span class="stat-name">${label}</span>
        <span class="stat-value">${statValue}</span>
        <div class="stat-track">
          <div class="stat-fill" style="width: ${statValue};"></div>
        </div>
      `;
      runnerUpStats.appendChild(card);
    });
  }

  // 화면 전환
  switchScreen(resultScreen);
}

// 4대 축 게이지 바 렌더링
function renderAxisBars(counts) {
  axisBarsContainer.innerHTML = '';

  const axesData = [
    {
      name: '무대 (Scope)',
      leftKey: 'S', leftLabel: '학교체제 (S)',
      rightKey: 'C', rightLabel: '교실밀착 (C)'
    },
    {
      name: '동기 (Driver)',
      leftKey: 'I', leftLabel: '영향력 (I)',
      rightKey: 'A', rightLabel: '자율평온 (A)'
    },
    {
      name: '체제 적응 (System Fit)',
      leftKey: 'F', leftLabel: '순응행정 (F)',
      rightKey: 'E', rightLabel: '탈출자유 (E)'
    },
    {
      name: '위험 감수 (Risk Profile)',
      leftKey: 'R', leftLabel: '안정안전 (R)',
      rightKey: 'V', rightLabel: '모험도전 (V)'
    }
  ];

  axesData.forEach(axis => {
    const leftCount = counts[axis.leftKey] || 0;
    const rightCount = counts[axis.rightKey] || 0;
    const total = leftCount + rightCount || 5;

    const leftPercent = Math.round((leftCount / total) * 100);
    const rightPercent = 100 - leftPercent;

    const barItem = document.createElement('div');
    barItem.className = 'axis-bar-item';

    barItem.innerHTML = `
      <div class="axis-bar-header">
        <span class="axis-name">${axis.name}</span>
        <div class="axis-ratio-text">
          <span class="${leftPercent >= 50 ? 'dominant' : ''}">${axis.leftLabel} ${leftPercent}%</span>
          <span class="vs-text">vs</span>
          <span class="${rightPercent > 50 ? 'dominant' : ''}">${rightPercent}% ${axis.rightLabel}</span>
        </div>
      </div>
      <div class="dual-progress-bar">
        <div class="bar-left" style="width: ${leftPercent}%;"></div>
        <div class="bar-right" style="width: ${rightPercent}%;"></div>
      </div>
    `;

    axisBarsContainer.appendChild(barItem);
  });
}

// 토스트 메시지 표시
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// 결과 공유 / 클립보드 복사
shareBtn.addEventListener('click', () => {
  const result = calculateResult();
  const best = result.bestMatch.career;
  const runner = result.runnerUp.career;

  const shareText = `[🏫 교원 진로 적합도 원픽 검사 결과]
내 교직 DNA 코드: ${result.userCode[0]}-${result.userCode[1]}-${result.userCode[2]}-${result.userCode[3]}
🏆 1순위 최적 진로: ${result.bestMatch.emoji} ${best.title} (${best.subtitle})
${best.summary}
💡 교직 꿀팁: ${best.tip}

🥈 2순위 추천 진로: ${result.runnerUp.emoji} ${runner.title} (${runner.subtitle})

선생님의 잠재된 교직 라이프스타일을 지금 확인해보세요!
👉 ${window.location.href}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast('📋 결과가 클립보드에 복사되었습니다! 동료 선생님들과 공유해보세요.');
    }).catch(() => {
      fallbackCopyText(shareText);
    });
  } else {
    fallbackCopyText(shareText);
  }
});

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('📋 결과가 클립보드에 복사되었습니다! 동료 선생님들과 공유해보세요.');
  } catch (err) {
    alert('결과 복사에 실패했습니다. 수동으로 복사해 주세요.');
  }
  document.body.removeChild(textarea);
}

// 2순위 추천 진로 카드 클릭 토글 핸들러
function toggleRunnerUpDetail() {
  const isOpen = runnerUpCard.classList.toggle('open');
  runnerUpDetail.style.display = isOpen ? 'block' : 'none';
  runnerUpToggleBtn.textContent = isOpen ? '접기 ▲' : '설명 보기 ▼';
}

if (runnerUpCard) {
  runnerUpCard.addEventListener('click', toggleRunnerUpDetail);
  runnerUpCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleRunnerUpDetail();
    }
  });
}

// 다시 하기 버튼
restartBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  userSelections = [];
  if (runnerUpCard) {
    runnerUpCard.classList.remove('open');
    runnerUpDetail.style.display = 'none';
    runnerUpToggleBtn.textContent = '설명 보기 ▼';
  }
  switchScreen(introScreen);
});