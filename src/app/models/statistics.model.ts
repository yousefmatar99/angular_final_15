export class Statistics {
    customersNum: number;
    partnersNum: number;
    carsNum: number;
    totalReservationsNum: number;
    problematicReservationsNum: number;
    closedReservationsNum: number;

    constructor(cNum: number, pNum: number, carsNum: number, totalResNum: number, problematocResNum: number, closedResNum: number){
        this.customersNum = cNum;
        this.partnersNum = pNum;
        this.carsNum = carsNum;
        this.totalReservationsNum = totalResNum;
        this.problematicReservationsNum = problematocResNum;
        this.closedReservationsNum = closedResNum;
    }

    static fromJson(json: any): Statistics {
        return new Statistics(
          json["customersNumber"],
          json["partnersNumber"],
          json["carsNumber"],
          json["totalReservations"],
          json["problematicReservations"],
          json["closedReservations"]
        );
      }
}
