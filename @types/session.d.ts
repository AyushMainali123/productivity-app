interface WorkSessionApiResponse {
  createdAt:          Date
  updatedAt:          Date
  id:                 string
  sessionType:        SessionType
  isSessionStarted:   boolean
  isSessionCompleted: boolean
  isSessionOngoing: boolean 
  completedPercentage: number  
}