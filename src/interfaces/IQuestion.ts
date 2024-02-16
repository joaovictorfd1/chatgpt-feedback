export interface IFeedback {
  id?: number,
  question: string,
  answer: string
  evaluationId: string
}

export interface IBotAnwser {
  id: string
  docgptId: string
  question: string
  reply: string
  threadId: string
}

export interface IEvoluationQuestion {
  id?: string
  score: number
  positiveCount: number
  negativeCount: number
  botAnswerId?: string
}
