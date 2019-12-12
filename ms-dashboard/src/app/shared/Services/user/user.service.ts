import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private repositoryService: RepositoryService) {}

  getKPIData(): any {
    return this.repositoryService.getData(
      `twitter/kpis`
    );
  }

  getLineChartData(): any {
    return this.repositoryService.getData(
      `twitter/sentiment?type=timeseries`
    );
  }

  getPieChartData(): any {
    return this.repositoryService.getData(
      `twitter/sentiment?type=average`
    );
  }
  
  getHistogramData(): any {
    return this.repositoryService.getData(
      `twitter/profilestats`
    );
  }
  
  createUser(createUserRequest): any {
    return this.repositoryService.create(
      "registration",
      createUserRequest
    );
  }
  loginUser(loginUserRequest): any {
    return this.repositoryService.create(
      "login",
      loginUserRequest
    );
  }
  verifyEmail(emailVerificationRequest): any {
    debugger;
    return this.repositoryService.create(
      "emailverification",
      emailVerificationRequest
    );
  }
}
