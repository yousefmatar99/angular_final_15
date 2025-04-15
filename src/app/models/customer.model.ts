export class Customer {
    id: string;
    name: string;
    displayName: string;
    email: string;
    isAdmin: boolean;
    isSuspended: boolean;

    constructor (id: string = "", name: string = "", displayName: string = "", email: string = "", isAdmin: boolean = false, isSuspended: boolean = true) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isSuspended = isSuspended;
    }

    static fromJson(json: any): Customer {
        return new Customer(
          json["id"],
          json["name"],
          json["displayName"],
          json["email"],
          json["isAdmin"],
          json["isSuspended"]
        );
      }
}
