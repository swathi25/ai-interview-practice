import React from "react";
import { Alert, Typography } from "@mui/material";

interface FeedbackCardProps {
  feedback: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => (
  <Alert severity="info" sx={{ mt: 2 }}>
    <Typography variant="subtitle1">AI Feedback:</Typography>
    <Typography>{feedback}</Typography>
  </Alert>
);

export default FeedbackCard;
