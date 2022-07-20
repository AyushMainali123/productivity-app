interface WorkSessionApiResponse {
  createdAt:          Date
  updatedAt:          Date
  id:                 string
  sessionType:        SessionType
  isSessionStarted:   boolean
  isSessionCompleted: boolean
  completedPercentage: number  
}