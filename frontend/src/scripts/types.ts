export interface IChartStatistic {
  accuracy: number,
  speed: number,
  time: number
}

export interface dataLogin {
  email: string,
  password: string
}

export interface dataRegister {
  name: string,
  email: string,
  password: string
}

export interface dataRecover__stageEmail {
  email: string
}
export interface dataRecover__stageCode {
  email: string,
  code: string
}
export interface dataRecover__stagePassword {
  email: string,
  code: string,
  password: string,
  "repeat-password": string
}

export interface dataErrors {
  name?: string,
  email?: string,
  password?: string,
  "repeat-password"?: string
}

export interface backendUrls {
  login: string,
  register: string,
  refreshToken: string,
  logout: string,
  posts: string,
  recover: {
    stageEmail: string,
    stageCode: string,
    stagePassword: string
  }
}