// eg: type ABC = 'A' | 'B' | 'C' => ['A', 'B', 'C']
export type ExtractStrings<T> = T extends `${infer U}` ? U : never;

export enum StatusEnum {
  SUCCESS = 'success',
  FAIL = 'failure',
}

export interface ISortType {
  sortBy: string;
  sortType: string;
}

export enum LevelEnum {
  emergency,
  alert,
  critical,
  error,
  warning,
  notice,
  info,
  debug,
}
