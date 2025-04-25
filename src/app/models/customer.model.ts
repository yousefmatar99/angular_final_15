export class Customer {
    id: string;
    name: string;
    displayName: string;
    email: string;
    isAdmin: boolean;
    isSuspended: boolean;
    phoneNumber: string;

    constructor (id: string = "", name: string = "", displayName: string = "", email: string = "",
                  isAdmin: boolean = false, isSuspended: boolean = true, phoneNumber: string = "") {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isSuspended = isSuspended;
        this.phoneNumber = phoneNumber;
    }

    static fromJson(json: any): Customer {
        return new Customer(
          json["id"],
          json["name"],
          json["displayName"],
          json["email"],
          json["isAdmin"],
          json["isSuspended"],
          json["phoneNumber"]
        );
      }
}
