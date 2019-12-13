import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import  *  as  data  from  '../../../../../config.json';

@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  // Read json file
  private devData = data.DEV;
  private devAnalytics = this.devData.ANALYTICS;

  private envUrl=`http://${this.devAnalytics.MONGO_DB_IP}:${this.devAnalytics.PORT}${this.devAnalytics.PREFIX}${this.devAnalytics.VERSION}`;

  constructor(
    private http: HttpClient
  ) {
  }

  public getData(route: string, headers?) {
    return this.http.get(
      this.createCompleteRoute(route, this.envUrl),
      headers
        ? headers
        : this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  public post(route: string, body, headers?) {

    return this.http.post(
      this.createCompleteRoute(route, this.envUrl),
      body,
      headers
        ? headers
        : this.generateHeaders(true, localStorage.getItem("authToken"))
    );
  }

  public put(route: string, body) {
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
          "x_api_key" : this.devData["X-API-KEY"],
          "x_api_secret_key" : this.devData["X-API-SECRET_KEY"],
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
    }
  }
}
