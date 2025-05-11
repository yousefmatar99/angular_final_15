import { Region } from './region.model';

export class ExtraDetails {
  constructor(
    public language: string,
    public regionData: Region[]
  ) {}

  static fromJson(json: any): ExtraDetails {
    const locale = json.locale || {};
    const language =
      locale.displayLanguage
      || locale.language
      || '';
    const regions = (json.regions || [])
      .map((r: any) => Region.fromJson(r));
    return new ExtraDetails(language, regions);
  }
}
