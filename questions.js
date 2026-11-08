const questions = [
  // [PART 1] 무대 (Scope): S vs C
  {
    id: 1,
    axis: "Scope",
    axisName: "무대 (Scope)",
    question: "3월 첫날, 나를 진짜 설레게 하는 것은?",
    choiceA: { text: "올해 내가 주도해서 뜯어고칠 학교 전체 사업과 굵직한 예산 계획", trait: "S" },
    choiceB: { text: "이름표 붙이고 게시판 꾸며놓은 아늑한 내 교실과 새 아이들 명렬표", trait: "C" }
  },
  {
    id: 2,
    axis: "Scope",
    axisName: "무대 (Scope)",
    question: "학교에서 내가 낸 아이디어가 대박이 났다! 더 뿌듯한 순간은?",
    choiceA: { text: "관리자분들이 '선생님 덕에 우리 학교가 교육청에서 이름 날렸네!' 할 때", trait: "S" },
    choiceB: { text: "평소 엎드려 자던 우리 반 금쪽이가 '선생님, 오늘 수업 짱 재밌었어요' 할 때", trait: "C" }
  },
  {
    id: 3,
    axis: "Scope",
    axisName: "무대 (Scope)",
    question: "1학기 학부모 총회 날, 내가 더 잘해보고 싶은 역할은?",
    choiceA: { text: "강당 무대에 서서 전체 학부모를 휘어잡는 카리스마 넘치는 총괄 사회자", trait: "S" },
    choiceB: { text: "교실 문 닫고 우리 반 학부모들과 1:1로 도란도란 털어놓는 심층 상담", trait: "C" }
  },
  {
    id: 4,
    axis: "Scope",
    axisName: "무대 (Scope)",
    question: "학교 안에서 내가 더 신경 쓰는 '내 구역'은?",
    choiceA: { text: "중앙 현관, 방송실, 교무실 등 학교 전체 분위기를 좌우하는 메인 공간", trait: "S" },
    choiceB: { text: "온갖 학용품과 간식이 완벽하게 세팅된 내 책상과 우리 반 교실 구석구석", trait: "C" }
  },
  {
    id: 5,
    axis: "Scope",
    axisName: "무대 (Scope)",
    question: "교직 10년 차, 내 이름이 어떻게 불리면 더 기분이 좋을까?",
    choiceA: { text: "'그 선생님 기획력 하나는 교육청에서도 인정하는 에이스잖아!'", trait: "S" },
    choiceB: { text: "'그 선생님 반 아이들은 1년 내내 진짜 행복하게 배운다더라!'", trait: "C" }
  },

  // [PART 2] 동기 (Driver): I vs A
  {
    id: 6,
    axis: "Driver",
    axisName: "동기 (Driver)",
    question: "교직 생활 중 나를 가장 킹받게(열받게) 만드는 상황은?",
    choiceA: { text: "내 기안이 윗선에서 이유 없이 반려당해 단순 전달자 노릇만 해야 할 때", trait: "I" },
    choiceB: { text: "퇴근 찍고 집 가는 중인데 메신저 울리거나 학부모 장문의 카톡 올 때", trait: "A" }
  },
  {
    id: 7,
    axis: "Driver",
    axisName: "동기 (Driver)",
    question: "동학년 회의 때 의견 갈등이 터졌다! 이때 나의 본능은?",
    choiceA: { text: "'자자, 기준 딱 정합시다!' 교통정리하고 결론을 직접 주도한다.", trait: "I" },
    choiceB: { text: "'좋은 게 좋은 거지...' 조용히 듣다가 다수결 흐름에 묻어간다.", trait: "A" }
  },
  {
    id: 8,
    axis: "Driver",
    axisName: "동기 (Driver)",
    question: "교장선생님이 '올해 고생 많았으니 원하는 걸 주겠다'고 한다면?",
    choiceA: { text: "'승진하고 싶습니다. 부장 자리와 실권, 확실히 밀어주세요.'", trait: "I" },
    choiceB: { text: "'올해는 업무 제로! 수업이랑 담임만 딱 하고 칼퇴하게 해주세요.'", trait: "A" }
  },
  {
    id: 9,
    axis: "Driver",
    axisName: "동기 (Driver)",
    question: "교무실에서 일 잘하기로 소문난 '초특급 에이스 교사'를 보았을 때?",
    choiceA: { text: "'오호라... 나도 질 수 없지. 다음엔 내가 더 큰 프로젝트 터뜨린다!'", trait: "I" },
    choiceB: { text: "'와, 대단하시다... 근데 난 저렇게 살면 수명 깎일 듯 ㅠㅠ'", trait: "A" }
  },
  {
    id: 10,
    axis: "Driver",
    axisName: "동기 (Driver)",
    question: "내가 꿈꾸는 궁극의 교직 라이프스타일은?",
    choiceA: { text: "내 말 한마디에 학교가 착착 돌아가는 카리스마 넘치는 실력파 리더", trait: "I" },
    choiceB: { text: "아무도 내 교실에 간섭 안 하고, 4시 30분 칼퇴해서 내 삶을 즐기는 자유인", trait: "A" }
  },

  // [PART 3] 행정 적응 (System Fit): F vs E
  {
    id: 11,
    axis: "SystemFit",
    axisName: "체제 적응 (System Fit)",
    question: "교육청에서 A4 15장짜리 신규 공모 사업 계획서가 내려왔다!",
    choiceA: { text: "'예산 쏠쏠하네?' 매뉴얼 쓱 훑고 규격 맞춰 기안문 뚝딱 써 내려간다.", trait: "F" },
    choiceB: { text: "'아니 수업은 언제 하라고 또 서류야?!' 첫 장 열자마자 한숨부터 나온다.", trait: "E" }
  },
  {
    id: 12,
    axis: "SystemFit",
    axisName: "체제 적응 (System Fit)",
    question: "관리자(교감·교장) 결재받으러 교장실 문을 두드릴 때 내 기분은?",
    choiceA: { text: "이번에 내가 짠 계획이 얼마나 완벽한지 브리핑하고 도장 받아낼 생각에 당당함.", trait: "F" },
    choiceB: { text: "사소한 문구 하나 트집 잡힐까 봐 긴장되고, 문손잡이 잡는 것 자체가 스트레스임.", trait: "E" }
  },
  {
    id: 13,
    axis: "SystemFit",
    axisName: "체제 적응 (System Fit)",
    question: "교무회의 시간, 교감선생님이 애매모호한 지침을 던졌을 때?",
    choiceA: { text: "손들고 관련 교육부 규정과 선례를 짚어가며 명확한 기준 정리를 요구한다.", trait: "F" },
    choiceB: { text: "딴생각하거나 수업 준비하면서 '빨리 회의나 끝났으면 좋겠다' 모드 발동.", trait: "E" }
  },
  {
    id: 14,
    axis: "SystemFit",
    axisName: "체제 적응 (System Fit)",
    question: "방학식 당일 오후 3시, 텅 빈 교무실에 혼자 남아 복무를 지키는 중이다.",
    choiceA: { text: "밀린 서류함 착착 정리하고 2학기 사업 계획 세우기 딱 좋은 집중의 꿀시간!", trait: "F" },
    choiceB: { text: "아무도 없는데 자리만 지키고 앉아있는 이 시스템... 1분이 1시간 같음.", trait: "E" }
  },
  {
    id: 15,
    axis: "SystemFit",
    axisName: "체제 적응 (System Fit)",
    question: "'선생님은 수업만 잘하면 장땡이지, 공문이 뭐가 중요해?'라는 말에 내 생각은?",
    choiceA: { text: "'현실 모르는 소리! 행정과 규정을 꽉 쥐어야 내 수업도 보호받는 법이야.'", trait: "F" },
    choiceB: { text: "'완전 맞는 말! 서류 꾸미느라 정작 수업 준비 못 하는 게 진짜 코미디지.'", trait: "E" }
  },

  // [PART 4] 위험 감수 (Risk Profile): R vs V
  {
    id: 16,
    axis: "RiskProfile",
    axisName: "위험 감수 (Risk Profile)",
    question: "나에게 '공무원 연금과 62세 정년 보장'이란?",
    choiceA: { text: "이 험한 세상에서 밤에 두 발 뻗고 잘 수 있게 해주는 최고의 든든한 방패!", trait: "R" },
    choiceB: { text: "마음 한구석에서 '내가 겨우 이 연금 받으려고 여기에 갇혀있나?' 싶은 족쇄!", trait: "V" }
  },
  {
    id: 17,
    axis: "RiskProfile",
    axisName: "위험 감수 (Risk Profile)",
    question: "'월급 1.5배 줄 테니 남미나 동남아 재외한국학교로 3년 떠나라'고 한다면?",
    choiceA: { text: "'물도 안 맞고 치안도 불안한 곳을 굳이 왜 가요? 한국 학교가 최고지.'", trait: "R" },
    choiceB: { text: "'언제 짐 싸면 되나요? 내일 당장 비행기 티켓 끊어주세요!'", trait: "V" }
  },
  {
    id: 18,
    axis: "RiskProfile",
    axisName: "위험 감수 (Risk Profile)",
    question: "내 인생의 게임 룰을 고를 수 있다면?",
    choiceA: { text: "1레벨부터 만렙까지 호봉 차곡차곡 쌓으며 정해진 코스대로 안전하게 클리어하기", trait: "R" },
    choiceB: { text: "중간에 히든 맵이나 보너스 스테이지로 빠져서 판을 확 뒤흔들어보기", trait: "V" }
  },
  {
    id: 19,
    axis: "RiskProfile",
    axisName: "위험 감수 (Risk Profile)",
    question: "교직 외에 내 취미나 재능(유튜브, 개발, 글쓰기, 창업)에 대박 조짐이 보인다면?",
    choiceA: { text: "'오 쏠쏠한데?' 겸직 허가 알아보고 교직 안에서 안전한 부캐로 즐긴다.", trait: "R" },
    choiceB: { text: "'드디어 탈출 각 떴다!' 가슴속에 품어둔 사직서를 만지작거리며 전업을 꿈꾼다.", trait: "V" }
  },
  {
    id: 20,
    axis: "RiskProfile",
    axisName: "위험 감수 (Risk Profile)",
    question: "60세 은퇴 시점이 되었을 때, 나에게 더 뼈아플 것 같은 후회는?",
    choiceA: { text: "무리하게 딴짓하다가 안정적인 교직 연금과 평온한 일상을 날려먹은 것", trait: "R" },
    choiceB: { text: "'안정'이라는 핑계로 평생 교실에 안주하며 내 진짜 잠재력과 다른 세상을 시험해보지 못한 것", trait: "V" }
  }
];