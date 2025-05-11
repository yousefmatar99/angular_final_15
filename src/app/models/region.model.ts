export class Region {
  constructor(
    public id: string,
    public countryCode: string,
    public country: string,
    public city: string
  ) {}

  static fromJson(raw: any): Region {
    return new Region(
      raw.id ?? '',
      raw.countryCode ?? '',
      raw.country ?? '',
      raw.city ?? ''
    );
  }

  toJson(): any {
    return {
      id: this.id,
      countryCode: this.countryCode,
      country: this.country,
      city: this.city
    };
  }
}