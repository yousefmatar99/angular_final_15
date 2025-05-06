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

    // Extra details
    public duration: string,
    public packageDescription: string,
    public privateCars: string,
    public vansOrSimilar: string,
    public suvs: string,
    public caravans: string,

    // Nested structures
    public serviceProducts: any[],
    public stockProducts: any[],
    public regionDTOs: any,
    public priceDTO: any,
    public questions: any[]
  ) {}

  static fromJson(json: any): Package {
    const extra = json.extraDetails || {};
    return new Package(
      json.id ?? '',
      parseFloat(json.vat ?? 0),
      json.country ?? 'N/A',
      json.countryCode ?? 'N/A',
      json.city ?? 'N/A',
      json.packageName ?? 'N/A',
      json.currency ?? 'N/A',
      json.active ?? false,

      // extraDetails
      extra.duration ?? '',
      extra.packageDescription ?? '',
      extra.PrivateCars ?? '-',
      extra.VansOrSimilar ??'-',
      extra.SUVs ?? '-',
      extra.Caravans ?? '-',

      // arrays
      Array.isArray(json.serviceProducts) ? json.serviceProducts : [],
      Array.isArray(json.stockProducts) ? json.stockProducts : [],
      Array.isArray(json.regionDTOs) ? json.regionDTOs : [],
      json.priceDTO ?? {},
      Array.isArray(json.questions) ? json.questions : []
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
      extraDetails: {
        duration: this.duration,
        packageDescription: this.packageDescription,
        PrivateCars: this.privateCars,
        VansOrSimilar: this.vansOrSimilar,
        SUVs: this.suvs,
        Caravans: this.caravans,
        additionalProp1: this.duration,
        additionalProp2: this.packageDescription,
        additionalProp3: this.privateCars
      },
      serviceProducts: this.serviceProducts,
      stockProducts: this.stockProducts,
      regionDTOs: this.regionDTOs,
      priceDTO: this.priceDTO || {"netPrice": null,
            "totalPrice": null,
            "price": null,
            "salePrice": null,
            "vat": 0.17,
            "systemProfitPercentage": 0.1,
            "salePercentage": null},
      questions: this.questions
    };
  }
}
