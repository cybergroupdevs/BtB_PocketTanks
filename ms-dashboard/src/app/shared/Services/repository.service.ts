import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  private envUrl="{{Backend application URL here}}";

  constructor(
    private http: HttpClient
  ) { }

  public getData(route: string, headers?) {
    return this.http.get(
      this.createCompleteRoute(route, this.envUrl),
      headers
        ? headers
        : this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  public create(route: string, body, headers?) {
    return this.http.post(
      this.createCompleteRoute(route, this.envUrl),
      body,
      headers
        ? headers
        : this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  public update(route: string, body) {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl),
      body,
      this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  public delete(route: string) {
    return this.http.delete(
      this.createCompleteRoute(route, this.envUrl),
      this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public generateHeaders(isAuthRequired: boolean, token?: any) {
    if (isAuthRequired) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0"
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0"
        })
      };
    }
  }
}
