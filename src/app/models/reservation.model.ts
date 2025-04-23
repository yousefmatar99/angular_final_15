export class Reservation {
    resNum: number;
    cName: string;
    pName: string;
    fTime: string;
    tTime: string;
    status: string;
    totalPrice: number;
    transAmount: number;

    constructor (resNum: number = 0, cName: string = "", pName: string = "", fTime: string = "", tTime: string,
        status: string = "", totalPrice: number = 0, transAmount: number = 0) {
        this.resNum = resNum;
        this.cName = cName;
        this.pName = pName;
        this.fTime = fTime;
        this.tTime = tTime;
        this.status = status;
        this.totalPrice = totalPrice;
        this.transAmount = transAmount;
    }

    static fromJson(json: any): Reservation {
      const partnerName =
        json.assignedPartners && json.assignedPartners.length > 0
          ? json.assignedPartners[0].name || json.assignedPartners[0].displayName
          : 'N/A';
    
      return new Reservation(
        json["number"],
        json["customer"]?.["name"] || 'N/A',
        partnerName,
        json["arrivalTimeFrom"],
        json["arrivalTimeTo"],
        json["lastReservationEvents"]?.["reservationStatus"] || 'N/A',
        json["totalItemsPrice"] || 0,
        json["totalTransactionsAmount"] || 0
      );
    }
    
}