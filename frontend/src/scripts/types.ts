
export interface IMatchPagesUrl {
  [namePath: string]: {
    pathname: string,
    possibleSearchValue: string[],
    possibleHashValue: string[]
  }
}

export interface IChartStatistic {
  accuracy: number,
  speed: number,
  time: number
}

export interface IDataLogin {
  email: string,
  password: string
}

export interface IDataRegister {
  name: string,
  email: string,
  password: string
}

export interface IDataRecover__stageEmail {
  email: string
}
export interface IDataRecover__stageCode {
  email: string,
  code: string
}
export interface IDataRecover__stagePassword {
  email: string,
  code: string,
  password: string,
  "repeat-password": string
}

export interface IDataErrors {
  name?: string,
  email?: string,
  password?: string,
  "repeat-password"?: string
}

export interface IBackendUrls {
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