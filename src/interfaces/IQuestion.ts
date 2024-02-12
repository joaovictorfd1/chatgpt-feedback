interface IFeedback {
  id: number,
  question: string,
  awnser_feedback: string
  type: "positive" | "negative",
}

export interface IBotAnwser {
  id: string
  docgptId: string
  question: string
  reply: string
  threadId: string
}