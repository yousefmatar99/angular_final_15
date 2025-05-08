import { ServiceModel } from './service-model.model';
import { Question } from './question.model';

export class Package {
  constructor(
    public id: string,
    public vat: number,
    public country: string,
    public countryCode: string,
    public city: string,
    public packageName: string,
    public currency: string,
    public active: boolean,
    public duration: string,
    public packageDescription: string,
    public privateCars: string,
    public vansOrSimilar: string,
    public suvs: string,
    public caravans: string,
    public services: ServiceModel[],
    public stock: any[],
    public regions: any[],
    public price: any,
    public questions: Question[]
  ) {}

  static fromJson(raw: any): Package {
    return new Package(
      raw.id,
      raw.vat,
      raw.country,
      raw.countryCode,
      raw.city,
      raw.packageName,
      raw.currency,
      raw.active,
      raw.duration,
      raw.packageDescription,
      raw.privateCars,
      raw.vansOrSimilar,
      raw.suvs,
      raw.caravans,
      (raw.services || []).map((s: any) => ServiceModel.fromJson(s)),
      raw.stock || [],
      raw.regions || [],
      raw.price || {},
      (raw.questions || []).map((q: any) => Question.fromJson(q))
    );
  }

  toJson(): any {
    return {
      id: this.id,
      vat: this.vat,
      country: this.country,
      countryCode: this.countryCode,
      city: this.city,
      packageName: this.packageName,
      currency: this.currency,
      active: this.active,
      duration: this.duration,
      packageDescription: this.packageDescription,
      privateCars: this.privateCars,
      vansOrSimilar: this.vansOrSimilar,
      suvs: this.suvs,
      caravans: this.caravans,
      services: this.services.map(s => s.toJson()),
      stock: this.stock,
      regions: this.regions,
      price: this.price,
      questions: this.questions.map(q => q.toJson())
    };
  }
}
