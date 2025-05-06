export class ServiceModel {
    constructor(
      public id: string,
      public productCode: string,
      public internalID: string,
      public name: string,
      public description: string,
      public price: number,
      public currency: string,
      public externalID: string,
      public status: string,
      public salePercentage: number,
      public systemProfitPercentage: number,
      public generalCosts: number,
      public categoryDTOList: { id: string; name: string }[],
      public images: string[],
      public tags: string[]
    ) {}
  
    static fromJson(json: any): ServiceModel {
      return new ServiceModel(
        json.id ?? '',
        json.productCode ?? '',
        json.internalID ?? '',
        json.name ?? '',
        json.description ?? '',
        json.price ?? 0,
        json.currency ?? 'USD',
        json.externalID ?? '',
        json.status ?? 'Draft',
        json.salePercentage ?? 0,
        json.systemProfitPercentage ?? 0,
        json.generalCosts ?? 0,
        Array.isArray(json.categoryDTOList)
          ? json.categoryDTOList.map((cat: any) => ({
              id: cat.id ?? '',
              name: cat.name ?? ''
            }))
          : [],
        Array.isArray(json.images) ? json.images : [],
        Array.isArray(json.tags) ? json.tags : []
      );
    }
  }
  