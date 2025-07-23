export const generateQuestions = async (role: string): Promise<string[]> => {
  return [
    `What are the key responsibilities of a ${role}?`,
    `How do you handle performance optimization in a ${role} context?`,
    `What tools and technologies are essential for a ${role}?`,
    `Describe a challenge you've faced as a ${role} and how you solved it.`,
    `How do you stay updated with the latest trends in the ${role} field?`,
  ];
};

export const evaluateAnswer = async (answer: string): Promise<string> => {
  return `Thank you for your answer. You provided a good overview, but consider being more specific with examples or tools you used.`;
};
