//rest-api.service.ts - Type script file to provide REST(GET,POST) Services in the elearning application

//including required files and services
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./models/user";
import { Product } from "./models/product";
import { Contact } from "./models/contact";
import { Claim } from "./models/claim";

//exporting the RestAPi Service
@Injectable()

export class RestApiService {

//   private URL = 'http://thecourierclub.herokuapp.com';
  private URL = 'http://localhost:3000';
    
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem("token");
    return token ? new HttpHeaders().set("Authorization", token) : null;
  }

  getUsers() : Promise<void | User[]>{
    return this.http.get(this.URL + '/users/')
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }

  getProducts() : Promise<void | Product[]>{
    return this.http.get(this.URL + '/products/')
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  getClaims() : Promise<void | Claim[]>{
    return this.http.get(this.URL + '/claims/')
      .toPromise()
      .then(response => response as Claim[])
      .catch(this.handleError);
  }

  getProductsByUserid(userid : string) : Promise<void | Product[]>{
    return this.http.get(this.URL + '/products/'+ userid)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  getProduct(productId: string) : Promise<void | Product>{
    return this.http.get(this.URL + '/product/' + productId)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  getClaim(claimId: string) : Promise<void | Claim>{
    return this.http.get(this.URL + '/claim/' + claimId)
      .toPromise()
      .then(response => response as Claim)
      .catch(this.handleError);
  }


  getSingleUser(userId: string): Promise<void | User>{
    return this.http.get(this.URL + '/users/' + userId)
    .toPromise()
    .then(response => response as User)
    .catch(this.handleError);
  }

  deleteProduct(productId: string): Promise<void | Product>{
    return this.http.get(this.URL + '/products/delete/' + productId,)
    .toPromise()
    .then(response => response as Product)
    .catch(this.handleError);
  }
    
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.URL + '/users/', newUser)
    .toPromise()
    .then(response => response as User)
    .catch(this.handleError);
  }

  createClaim(newClaim: Claim): Promise<void | Claim> {
    return this.http.post(this.URL + '/claim/', newClaim)
    .toPromise()
    .then(response => response as Claim)
    .catch(this.handleError);
  }

  saveContact(contact: Contact): Promise<void | Contact> {
    return this.http.post(this.URL + '/contacts/', contact)
    .toPromise()
    .then(response => response as Contact)
    .catch(this.handleError);
  }

  updateUser(user : User) : Promise<void | User> {
    const data = new FormData();
    data.append("name", user.name);
    data.append("email",user.email);
    data.append("password", user.password);
    data.append("image",user.image,user.imagePath);
    return this.http.post(this.URL + '/user/'+ user._id, data)
    .toPromise()
    .then(response => response as User)
    .catch(this.handleError);
  }

  updateProduct(product : Product) {
    return this.http.post(this.URL + '/product/'+ product._id, product);
  }

  updateClaim(claim : Claim) {
    return this.http.post(this.URL + '/claim/'+ claim._id, claim);
  }



  
  createProduct(name: string, description: string, price: string, schedule: string, image: File,fullname: string,
    address: string, state: string, phonenumber : string, status: string, userid: string){
    const data = new FormData();
    data.append("title", name);
    data.append("description",description);
    data.append("price", price);
    data.append("schedule", schedule);
    data.append("image", image, name);
    data.append("fullname", fullname);
    data.append("address", address);
    data.append("state", state);
    data.append("phonenumber", phonenumber);
    data.append("status", status);
    data.append("userid", userid);
    return this.http
      .post<{ product: Product }>(this.URL + '/products/', data);
  }
    
  private handleError(error: any){
    console.log("error");
  }

}
