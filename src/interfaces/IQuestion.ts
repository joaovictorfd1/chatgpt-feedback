interface IFeedback {
  id: number,
  question: string,
  awnser_feedback: string
  type: "positive" | "negative",
}

export interface IQuestion {
  id: number
  question: string
  awnser: string
  feedback: string[]
}