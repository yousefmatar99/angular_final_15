import { ServiceModel } from './service-model.model';
import { Question }     from './question.model';
import { Region }       from './region.model';

export interface ExtraDetailsDTO {
  duration: string;
  packageDescription: string;
  privateCars: string;
  vansOrSimilar: string;
  suvs: string;
  caravans: string;
  numberOfServices: number;
}

export interface PriceDTO {
  netPrice?: number;
  totalPrice?: number;
  price?: number;
  salePrice?: number;
  vat?: number;
  systemProfitPercentage?: number;
  salePercentage?: number;
}

export class Package {
  constructor(
    public id: string,
    public vat: number,
    public country: string,
    public countryCode: string,
    public city: string,
    public packageName: string,
    public currency: string,
    public extraDetails: ExtraDetailsDTO,
    public serviceProducts: ServiceModel[],
    public stockProducts: any[],
    public questions: Question[],
    public regionDTOs: Region[],
    public priceDTO: PriceDTO,
    public active: boolean
  ) {}

  static fromJson(raw: any): Package {
    return new Package(
      raw.id ?? '',
      raw.vat ?? 0,
      raw.country ?? '',
      raw.countryCode ?? '',
      raw.city ?? '',
      raw.packageName ?? '',
      raw.currency ?? '',
      {
        duration:           raw.extraDetails?.duration           ?? '',
        packageDescription: raw.extraDetails?.packageDescription ?? '',
        privateCars:        raw.extraDetails?.privateCars        ?? '',
        vansOrSimilar:      raw.extraDetails?.vansOrSimilar      ?? '',
        suvs:               raw.extraDetails?.suvs               ?? '',
        caravans:           raw.extraDetails?.caravans           ?? '',
        numberOfServices:   raw.extraDetails?.numberOfServices   ?? 0
      },
      (raw.serviceProducts || []).map((s: any) => ServiceModel.fromJson(s)),
      raw.stockProducts || [],
      (raw.questions       || []).map((q: any) => Question.fromJson(q)),
      (raw.regionDTOs      || []).map((r: any) => Region.fromJson(r)),
      raw.priceDTO   || {},
      raw.active     ?? false
    );
  }

  toJson(): any {
    return {
      id:              this.id,
      vat:             this.vat,
      country:         this.country,
      countryCode:     this.countryCode,
      city:            this.city,
      packageName:     this.packageName,
      currency:        this.currency,
      extraDetails:    { ...this.extraDetails },
      serviceProducts: this.serviceProducts.map(s => s.toJson()),
      stockProducts:   this.stockProducts,
      questions:       this.questions.map(q => q.toJson()),
      regionDTOs:      this.regionDTOs.map(r => r.toJson()),
      priceDTO:        { ...this.priceDTO },
      active:          this.active
    };
  }
}
