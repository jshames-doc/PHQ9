const translations = {
    en: {
        back_text: "Back",
        score_label: "Score",
        opening_title: "PHQ-3 Depression Screening",
        opening_info: "The Patient Health Questionnaire-3 (PHQ-3) is a brief screening tool for depression.",
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
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down"
        ],
        interpretations: [
            { max: 2, label: "Minimal", note: "Low risk for depression. No specific intervention required." },
            { max: 5, label: "Mild/Moderate", note: "Potential depression. Consider clinical follow-up or further screening." },
            { max: 9, label: "High Risk", note: "High risk for major depression. Clinical assessment and further screening is strongly recommended." }
        ],
        email_subject: "PHQ-3 Screening Results",
        email_body_intro: "PHQ-3 Assessment Results:",
        email_body_score: "Total Score:",
        email_body_interpretation: "Interpretation:"
    },
    he: {
        back_text: "חזור",
        score_label: "ציון",
        opening_title: "שאלון PHQ-3 לאבחון דיכאון",
        opening_info: "שאלון בריאות המטופל-3 (PHQ-3) הוא כלי קצר לסריקת דיכאון.",
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
            "תחושה רעה כלפי עצמך - או שאתה כישלון או שאכזבת את עצמך או את משפחתך"
        ],
        interpretations: [
            { max: 2, label: "מינימלי", note: "סיכון נמוך לדיכאון. לא נדרשת התערבות ספציפית." },
            { max: 5, label: "קל/בינוני", note: "חשד לדיכאון. מומלץ מעקב קליני או ביצוע שאלון מורחב." },
            { max: 9, label: "סיכון גבוה", note: "סיכון גבוה לדיכאון מז'ורי. מומלץ מאוד ביצוע הערכה קלינית מקיפה." }
        ],
        email_subject: "תוצאות שאלון PHQ-3",
        email_body_intro: "תוצאות הערכת PHQ-3:",
        email_body_score: "ציון כולל:",
        email_body_interpretation: "פרשנות:"
    }
};

let currentLanguage = 'en';
let currentPage = 0;
let responses = Array(3).fill(null);
const totalQuestions = 3;

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
        // Smooth scroll to next item for better clinical flow
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 500);
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
    const percent = (total / 9) * 100;

    if (currentLanguage === 'he') {
        arrow.style.left = 'auto';
        arrow.style.right = `${percent}%`;
    } else {
        arrow.style.right = 'auto';
        arrow.style.left = `${percent}%`;
    }

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
    responses = Array(totalQuestions).fill(null);
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
    body += `${t.email_body_score} ${total}/9\r\n`;
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
