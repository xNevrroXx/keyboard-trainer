
export interface IMatchPagesUrl {
  [namePath: string]: {
    pathname: string,
    possibleSearchValue?: {
      [searchName: string]: string
    },
    possibleHashValue?: {
      [searchName: string]: string
    }
  }
}

/*
* char - some one character;
*
* speedArr - speedArr values typing of this character(x);
*
* example: {char: "a", speedArr: [250]}
* */
export interface IDataStatisticSpeed {
  char: string,
  speedArr: number[]
  accuracyArr: number[]
}
export interface IAdditionalDataStatistic {
  char: string,
  speed: number,
  accuracy: number
}

export interface IDataStatistic {
  [timestamp: string]: {
    char: string
    speed: number,
    accuracy: number
  }[]
}


export interface IResponseStatistic {
  [timestamp: string]: {
    text: string,
    statistic: IAdditionalDataStatistic[]
  }
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
  authenticate: string,
  recover: {
    stageEmail: string,
    stageCode: string,
    stagePassword: string
  },
  statistic: {
    post: {
      speed: string,
      accuracy: string
    },
    get: {
      speed: string,
      accuracy: string
    }
  }
}