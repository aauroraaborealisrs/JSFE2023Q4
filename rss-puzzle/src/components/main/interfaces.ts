export interface IWord {
  textExample: string;
  textExampleTranslate: string;
}

export interface IRound {
  words: IWord[];
}

export interface IWordData {
  rounds: IRound[];
}
