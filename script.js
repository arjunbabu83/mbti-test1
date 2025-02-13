const questions = [
  { question: "You enjoy vibrant social events with lots of people.", dimension: "EI", value: 1 },
  { question: "You often spend time exploring unrealistic yet intriguing ideas.", dimension: "SN", value: 1 },
  { question: "You prioritize logic over feelings when making decisions.", dimension: "TF", value: 1 },
  { question: "You prefer to plan and organize rather than be spontaneous.", dimension: "JP", value: 1 },
  // Add more questions here...
];

const personalityTypes = {
  ISTJ: "ISTJs are responsible and detail-oriented, valuing tradition and order. They are reliable and practical, often excelling in structured environments.",
  ISFJ: "ISFJs are warm and caring, dedicated to helping others. They are meticulous and loyal, often putting others' needs before their own.",
  INFJ: "INFJs are insightful and visionary, driven by strong values. They are compassionate and idealistic, often working towards a greater good.",
  INTJ: "INTJs are strategic and analytical, always seeking improvement. They are independent and determined, often excelling in complex problem-solving.",
  ISTP: "ISTPs are adventurous and practical, thriving in hands-on activities. They are flexible and observant, often excelling in troubleshooting.",
  ISFP: "ISFPs are gentle and artistic, valuing personal freedom. They are sensitive and kind, often expressing themselves through creativity.",
  INFP: "INFPs are idealistic and empathetic, driven by their values. They are creative and compassionate, often seeking meaningful connections.",
  INTP: "INTPs are curious and logical, always seeking knowledge. They are innovative and analytical, often excelling in theoretical thinking.",
  ESTP: "ESTPs are energetic and action-oriented, thriving in dynamic environments. They are bold and practical, often excelling in hands-on challenges.",
  ESFP: "ESFPs are lively and spontaneous, bringing joy to those around them. They are fun-loving and sociable, often excelling in entertaining others.",
  ENFP: "ENFPs are enthusiastic and imaginative, always exploring new possibilities. They are charismatic and empathetic, often inspiring others.",
  ENTP: "ENTPs are inventive and curious, always seeking new ideas. They are quick-witted and adaptable, often excelling in debates.",
  ESTJ: "ESTJs are organized and decisive, valuing structure and efficiency. They are practical and dependable, often excelling in leadership roles.",
  ESFJ: "ESFJs are warm and sociable, dedicated to helping others. They are responsible and caring, often excelling in nurturing roles.",
  ENFJ: "ENFJs are charismatic and empathetic, driven by a desire to help others. They are inspiring and supportive, often excelling in mentoring roles.",
  ENTJ: "ENTJs are strategic and assertive, always seeking to achieve their goals. They are confident and decisive, often excelling in leadership positions.",
};

const form = document.getElementById("mbtiTest");
const resultDiv = document.getElementById("result");
const typeSpan = document.getElementById("type");
const descriptionPara = document.getElementById("description");

function renderQuestions() {
  const questionsDiv = document.getElementById("questions");
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      <label><input type="radio" name="${q.dimension}" value="1"> Agree</label>
      <label><input type="radio" name="${q.dimension}" value="0"> Disagree</label>
    `;
    questionsDiv.appendChild(questionDiv);
  });
}

function calculateResult() {
  const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  questions.forEach(q => {
    const selected = document.querySelector(`input[name="${q.dimension}"]:checked`);
    if (selected) {
      dimensions[q.dimension[0]] += parseInt(selected.value);
      dimensions[q.dimension[1]] += 1 - parseInt(selected.value);
    }
  });

  const type = [
    dimensions.E >= dimensions.I ? "E" : "I",
    dimensions.S >= dimensions.N ? "S" : "N",
    dimensions.T >= dimensions.F ? "T" : "F",
    dimensions.J >= dimensions.P ? "J" : "P",
  ].join("");

  return type;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = calculateResult();
  typeSpan.textContent = type;
  descriptionPara.textContent = personalityTypes[type];
  resultDiv.classList.remove("hidden");
});

renderQuestions();
