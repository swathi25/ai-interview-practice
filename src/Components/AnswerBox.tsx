import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AnswerBoxProps {
  onSubmit: (answer: string) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Your Answer"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => onSubmit(answer)}
        disabled={!answer.trim()}
      >
        Submit Answer
      </Button>
    </Box>
  );
};

export default AnswerBox;
