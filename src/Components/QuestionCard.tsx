import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface QuestionCardProps {
  question: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => (
  <Card sx={{ my: 2 }}>
    <CardContent>
      <Typography variant="h6">Interview Question</Typography>
      <Typography>{question}</Typography>
    </CardContent>
  </Card>
);

export default QuestionCard;
