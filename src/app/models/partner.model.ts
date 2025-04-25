export class Partner {
    id: string;
    name: string;
    email: string;
    phone: string;
    isApproved: boolean;
    isSuspended: boolean;
    isAdmin: boolean;
    photoUrl: string;

    constructor(id: string = "", name: string = "", email: string = "", phone: string = "",
                isApproved: boolean = false, isSuspended: boolean = false, isAdmin: boolean = false, photoUrl: string = ""
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.isApproved = isApproved;
        this.isSuspended = isSuspended;
        this.isAdmin = isAdmin;
        this.photoUrl = photoUrl;
    }

    static fromJson(json: any): Partner {
        return new Partner(
          json["id"],
          json["name"],
          json["email"],
          json["phoneNumber"] ? json["phoneNumber"] : '-',
          json["isApproved"],
          json["isSuspended"],
          json["isAdmin"],
          json["photoUrl"]
        );
      }
}
