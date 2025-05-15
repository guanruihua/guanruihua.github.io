export type PkgType = 'Non-Open-Source' | 'default' | string

export type Shield = {
  type?: PkgType
  url: string
  logo: string
}

export interface PkgConf {
  label: string
  logo?: string
  type?: PkgType
  install?: boolean
  name?: string
  github?: string
  home?: string
  desc?: string
  license?: string
  licensePath?: string
  tags?: string[] | string
  shields?: Shield[]
  [key: string]: any
}
