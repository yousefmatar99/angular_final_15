export class Question {
  constructor(
    public id: string | null,
    public text: string,
    public type: number,
    public expectedAnswer: string,
    public mandatory: boolean
  ) {}

  static fromJson(raw: any): Question {
    if (!raw) {
      return new Question('', '', 0, '', false);
    }
    return new Question(
      raw.id ?? '',
      raw.text ?? '',
      raw.type ?? 0,
      raw.expectedAnswer ?? '',
      raw.mandatory ?? false
    );
  }

  toJson(): any {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      expectedAnswer: this.expectedAnswer,
      mandatory: this.mandatory ?? false
    };
  }
}