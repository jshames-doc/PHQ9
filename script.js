const translations = {
    en: {
        back_text: "Back",
        score_label: "Score",
        opening_title: "PHQ-9 Depression Screening",
        opening_info: "The Patient Health Questionnaire (PHQ-9) is a multipurpose instrument for screening, monitoring and measuring the severity of depression.",
        opening_instructions_title: "Instructions",
        opening_instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems? Click \"Next\" to begin.",
        start_btn: "Start Assessment",
        next_btn: "Next",
        prev_btn: "Previous",
        summary_btn: "Show Summary",
        summary_title: "Screening Results",
        interpretation_label: "Interpretation:",
        breakdown_title: "Responses Breakdown",
        restart_btn: "Restart",
        email_btn_text: "Email Report",
        q_num_prefix: "Question",
        options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day"
        ],
        questions: [
            "Little interest or pleasure in doing things",
            "Feeling down, depressed, or hopeless",
            "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy",
            "Poor appetite or overeating",
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
            "Trouble concentrating on things, such as reading the newspaper or watching television",
            "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
            "Thoughts that you would be better off dead or of hurting yourself in some way"
        ],
        interpretations: [
            { max: 4, label: "None-minimal", note: "Minimal depression. No specific intervention required." },
            { max: 9, label: "Mild", note: "Mild depression. Monitor; support, education." },
            { max: 14, label: "Moderate", note: "Moderate depression. Consider counseling, follow-up and/or pharmacotherapy." },
            { max: 19, label: "Moderately severe", note: "Moderately severe depression. Active treatment with pharmacotherapy and/or psychotherapy." },
            { max: 27, label: "Severe", note: "Severe depression. Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist." }
        ],
        email_subject: "PHQ-9 Screening Results",
        email_body_intro: "PHQ-9 Assessment Results:",
        email_body_score: "Total Score:",
        email_body_interpretation: "Interpretation:"
    },
    he: {
        back_text: "חזור",
        score_label: "ציון",
        opening_title: "שאלון PHQ-9 לאבחון דיכאון",
        opening_info: "שאלון בריאות המטופל (PHQ-9) הוא כלי רב-תכליתי לסינון, ניטור ומדידת חומרת הדיכאון.",
        opening_instructions_title: "הוראות",
        opening_instructions: "במהלך השבועיים האחרונים, באיזו תדירות הוטרדת על ידי הבעיות הבאות? לחץ על \"הבא\" כדי להתחיל.",
        start_btn: "התחל הערכה",
        next_btn: "הבא",
        prev_btn: "הקודם",
        summary_btn: "הצג סיכום",
        summary_title: "תוצאות הסריקה",
        interpretation_label: "פרשנות:",
        breakdown_title: "פירוט תשובות",
        restart_btn: "התחל מחדש",
        email_btn_text: "שלח דו\"ח במייל",
        q_num_prefix: "שאלה",
        options: [
            "בכלל לא",
            "מספר ימים",
            "יותר ממחצית מהימים",
            "כמעט כל יום"
        ],
        questions: [
            "עניין מועט או חוסר הנאה בביצוע דברים",
            "תחושת דכדוך, דיכאון או חוסר תקווה",
            "קושי להירדם, קושי להישאר לישון, או שינה מרובה מדי",
            "תחושת עייפות או חוסר אנרגיה",
            "תיאבון ירוד או אכילת יתר",
            "תחושה רעה כלפי עצמך - או שאתה כישלון או שאכזבת את עצמך או את משפחתך",
            "קושי להתרכז בדברים, כגון קריאת עיתון או צפייה בטלוויזיה",
            "תנועה או דיבור בצורה איטית עד כדי כך שאנשים אחרים יכלו להבחין בכך? או ההפך - תזזיתיות או חוסר מנוחה שגרמו לך להסתובב הרבה מהרגיל?",
            "מחשבות שעדיף היה לו היית מת או על פגיעה בעצמך בדרך כלשהי"
        ],
        interpretations: [
            { max: 4, label: "מינימלי", note: "דיכאון מינימלי. לא נדרשת התערבות ספציפית." },
            { max: 9, label: "קל", note: "דיכאון קל. ניטור; תמיכה, הדרכה." },
            { max: 14, label: "בינוני", note: "דיכאון בינוני. לשקול ייעוץ, מעקב ו/או טיפול תרופתי." },
            { max: 19, label: "בינוני-חמור", note: "דיכאון בינוני-חמור. טיפול פעיל בתרופות ו/או פסיכותרפיה." },
            { max: 27, label: "חמור", note: "דיכאון חמור. התחלה מיידית של טיפול תרופתי, ואם קיימת פגיעה חמורה או תגובה ירודה לטיפול, הפניה מזורזת למומחה לבריאות הנפש." }
        ],
        email_subject: "תוצאות שאלון PHQ-9",
        email_body_intro: "תוצאות הערכת PHQ-9:",
        email_body_score: "ציון כולל:",
        email_body_interpretation: "פרשנות:"
    }
};

let currentLanguage = 'en';
let currentPage = 0;
let responses = Array(9).fill(null);
const totalQuestions = 9;

function init() {
    createQuestions();
    updateUI();
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${lang}'`));
    });

    updateUI();
    renderQuestions();
    if (currentPage === totalQuestions + 1) {
        updateSummary();
    }
}

function updateUI() {
    const t = translations[currentLanguage];
    
    // Update translated elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.placeholder) {
                el.placeholder = t[key];
            } else if (el.querySelector('span')) {
                // Keep icon if exists
                const icon = el.querySelector('i');
                el.innerHTML = '';
                if (icon) el.appendChild(icon);
                const span = document.createElement('span');
                span.textContent = t[key];
                el.appendChild(span);
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update back button visibility
    const backBtn = document.getElementById('back-btn');
    backBtn.style.visibility = currentPage > 0 ? 'visible' : 'hidden';
}

function createQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    for (let i = 0; i < totalQuestions; i++) {
        const section = document.createElement('section');
        section.id = `page-${i + 1}`;
        section.className = 'page';
        container.appendChild(section);
    }
    renderQuestions();
}

function renderQuestions() {
    const t = translations[currentLanguage];
    
    for (let i = 0; i < totalQuestions; i++) {
        const section = document.getElementById(`page-${i + 1}`);
        if (!section) continue;

        section.innerHTML = `
            <div class="card">
                <span class="question-number">${t.q_num_prefix} ${i + 1} / ${totalQuestions}</span>
                <div class="question-text">${t.questions[i]}</div>
                <div class="options-list">
                    ${t.options.map((option, idx) => `
                        <label class="option-item ${responses[i] === idx ? 'selected' : ''}">
                            <input type="radio" name="q${i}" value="${idx}" ${responses[i] === idx ? 'checked' : ''} onchange="handleOptionSelect(${i}, ${idx})">
                            <span class="option-label">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="btn-container">
                <button class="secondary-btn" onclick="prevPage()">${t.prev_btn}</button>
                <button class="primary-btn" onclick="nextPage()" ${responses[i] === null ? 'disabled' : ''}>
                    ${i === totalQuestions - 1 ? t.summary_btn : t.next_btn}
                </button>
            </div>
        `;
    }
}

function handleOptionSelect(qIdx, score) {
    responses[qIdx] = score;
    
    // Update badges and totals
    const total = responses.reduce((acc, val) => acc + (val || 0), 0);
    document.getElementById('total-score').textContent = total;

    // Refresh current question to show selection and enable next button
    renderQuestions();
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
        nextPage();
    }, 400);
}

function nextPage() {
    if (currentPage < totalQuestions + 1) {
        if (currentPage > 0 && currentPage <= totalQuestions) {
            if (responses[currentPage - 1] === null) return; // Prevent advancing if no response
        }
        
        document.getElementById(`page-${currentPage === totalQuestions + 1 ? 'summary' : currentPage}`).classList.remove('active');
        currentPage++;
        
        if (currentPage === totalQuestions + 1) {
            document.getElementById('page-summary').classList.add('active');
            updateSummary();
        } else {
            document.getElementById(`page-${currentPage}`).classList.add('active');
        }
        updateUI();
    }
}

function prevPage() {
    if (currentPage > 0) {
        document.getElementById(`page-${currentPage === totalQuestions + 1 ? 'summary' : currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page-${currentPage}`).classList.add('active');
        updateUI();
    }
}

function updateSummary() {
    const total = responses.reduce((acc, val) => acc + (val || 0), 0);
    const t = translations[currentLanguage];
    
    document.getElementById('final-score').textContent = total;
    
    // Find Interpretation
    const interpretation = t.interpretations.find(interp => total <= interp.max);
    const interpretationText = document.getElementById('interpretation-text');
    interpretationText.innerHTML = `<strong>${interpretation.label}</strong><br>${interpretation.note}`;
    
    // Position Arrow
    const arrow = document.getElementById('score-arrow');
    const percent = (total / 27) * 100;
    arrow.style.left = `${percent}%`;

    // Render Breakdown
    const list = document.getElementById('responses-list');
    list.innerHTML = responses.map((score, i) => `
        <li>
            <span class="resp-q-text">${t.questions[i]}</span>
            <span class="resp-score">${score} pts</span>
        </li>
    `).join('');
}

function restartTest() {
    responses = Array(9).fill(null);
    currentPage = 0;
    document.getElementById('total-score').textContent = 0;
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-0').classList.add('active');
    
    renderQuestions();
    updateUI();
}

function emailReport() {
    const total = responses.reduce((acc, val) => acc + (val || 0), 0);
    const t = translations[currentLanguage];
    const interpretation = t.interpretations.find(interp => total <= interp.max);
    
    let body = `${t.email_body_intro}\r\n\r\n`;
    body += `${t.email_body_score} ${total}/27\r\n`;
    body += `${t.email_body_interpretation} ${interpretation.label}\r\n\r\n`;
    body += `${t.breakdown_title}:\r\n`;
    
    responses.forEach((score, i) => {
        body += `${i + 1}. ${t.questions[i]}: ${score} pts (${t.options[score]})\r\n`;
    });
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(t.email_subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

// Start the app
window.onload = init;
