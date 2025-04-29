import { Partner } from "./partner.model";

export class ExtraDetails {
    language: string;
    regionData: any;

    constructor(language: string = "", regionData: object = { country: "", city: "", id: "", countryCode: ""}) {
        this.language = language;
        this.regionData = regionData;
    }

    static fromJson(json: any): ExtraDetails {
        return new ExtraDetails(
            json["locale"] || 'N/A',
            json["regions"] || 'N/A'
        );
    }
}
