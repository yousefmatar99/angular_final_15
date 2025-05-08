export class Question {
    constructor(
      public id: string,
      public text: string,
      public type: number,
      public expectedAnswer: string,
      public mandatory: boolean
    ) {}
  
    static fromJson(raw: any): Question {
      return new Question(
        raw.id,
        raw.text,
        raw.type,
        raw.expectedAnswer,
        raw.mandatory
      );
    }
  
    toJson(): any {
      return {
        id: this.id,
        text: this.text,
        type: this.type,
        expectedAnswer: this.expectedAnswer,
        mandatory: this.mandatory
      };
    }
  }