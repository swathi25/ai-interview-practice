import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import RoleSelector from "./Components/RoleSelector";
import QuestionCard from "./Components/QuestionCard";
import AnswerBox from "./Components/AnswerBox";
import FeedbackCard from "./Components/FeedbackCard";
import { generateQuestions, evaluateAnswer } from "./Services/OpenaiService";

interface StoredAnswer {
  question: string;
  answer: string;
  feedback: string;
}

const App: React.FC = () => {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [storedAnswers, setStoredAnswers] = useState<StoredAnswer[]>([]);
  const [roleSessions, setRoleSessions] = useState<
    Record<string, StoredAnswer[]>
  >({});

  useEffect(() => {
    const saved = localStorage.getItem("interviewSessions");
    if (saved) {
      setRoleSessions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("interviewSessions", JSON.stringify(roleSessions));
  }, [roleSessions]);

  const handleRoleSelect = async (selectedRole: string) => {
    setRole(selectedRole);
    const qs = await generateQuestions(selectedRole);
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setFeedback("");

    const previous = roleSessions[selectedRole] || [];
    setStoredAnswers(previous);
  };

  const handleAnswerSubmit = async (answer: string) => {
    const question = questions[currentQuestionIndex];
    const fb = await evaluateAnswer(answer);

    const newEntry: StoredAnswer = { question, answer, feedback: fb };
    const updatedAnswers = [...storedAnswers, newEntry];

    setStoredAnswers(updatedAnswers);
    setFeedback(fb);

    setRoleSessions((prev) => ({
      ...prev,
      [role]: updatedAnswers,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleClearAnswers = () => {
    if (!role) return;
    const updated = { ...roleSessions };
    delete updated[role];

    setRoleSessions(updated);
    setStoredAnswers([]);
    setFeedback("");
    localStorage.setItem("interviewSessions", JSON.stringify(updated));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(storedAnswers, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${role.replace(/\s+/g, "_")}_interview_answers.json`;
    link.click();
  };

  const handleExportPDF = async () => {
    const htmlContent = storedAnswers
      .map(
        (item, i) => `
      <h3>Q${i + 1}: ${item.question}</h3>
      <p><strong>Your Answer:</strong> ${item.answer}</p>
      <p><strong>Feedback:</strong> ${item.feedback}</p>
      <hr />`
      )
      .join("");

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
        <head><title>${role} - Interview Feedback</title></head>
        <body>${htmlContent}</body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Interview Practice
      </Typography>

      {!role && <RoleSelector onSelect={handleRoleSelect} />}

      {role &&
        questions.length > 0 &&
        currentQuestionIndex < questions.length && (
          <>
            <QuestionCard question={questions[currentQuestionIndex]} />
            <AnswerBox onSubmit={handleAnswerSubmit} />
            {feedback && <FeedbackCard feedback={feedback} />}
          </>
        )}

      {storedAnswers.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Your Answers for: {role}</Typography>
          {storedAnswers.map((item, idx) => (
            <Box key={idx} mt={2}>
              <Typography>
                <strong>Q:</strong> {item.question}
              </Typography>
              <Typography>
                <strong>Your Answer:</strong> {item.answer}
              </Typography>
              <Typography>
                <strong>Feedback:</strong> {item.feedback}
              </Typography>
              <hr />
            </Box>
          ))}

          <Box mt={2}>
            <Button
              onClick={handleClearAnswers}
              color="error"
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Clear All Answers
            </Button>
            <Button
              onClick={handleExportJSON}
              variant="contained"
              sx={{ mr: 2 }}
            >
              Export to JSON
            </Button>
            <Button onClick={handleExportPDF} variant="contained">
              Export to PDF
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default App;
