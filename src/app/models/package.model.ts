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
      // From extraDetails
      public duration: string,
      public packageDescription: string,
      public privateCars: string,
      public vansOrSimilar: string,
      public suvs: string,
      public caravans: string,
      // From top-level
      public questions: any[] // assuming array of any, adjust if needed
    ) {}
  
    static fromJson(json: any): Package {
      const extra = json.extraDetails || {};
      //console.log("f7s: " + json.id);
      
      return new Package(
        json.id ?? '',
        parseFloat(json.vat ?? 0),
        json.country ?? '',
        json.countryCode ?? '',
        json.city ?? '',
        json.packageName ?? '',
        json.currency ?? '',
        json.active ?? false,
  
        // extraDetails
        extra.duration ?? '',
        extra.packageDescription ?? '',
        extra.PrivateCars ?? '',
        extra.VansOrSimilar ?? '',
        extra.SUVs ?? '',
        extra.Caravans ?? '',
  
        // questions array
        Array.isArray(json.questions) ? json.questions : []
      );
    }
  }
  