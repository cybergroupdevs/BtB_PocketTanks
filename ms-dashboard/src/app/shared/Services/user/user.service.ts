import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private repositoryService: RepositoryService) {}

  getUserList(): any {
    return this.repositoryService.get(
      ""
    );
  }
  getUserDetails(userId): any {
    return this.repositoryService.get(
      `api/user/${userId}`
    );
  }
  createUser(createUserRequest): any {
    return this.repositoryService.post(
      "registration",
      createUserRequest
    );
  }
  loginUser(loginUserRequest): any {
    // debugger;
    return this.repositoryService.post(
      "login",
      loginUserRequest
    );
  }
  verifyEmail(emailVerificationRequest): any {
    debugger;
    return this.repositoryService.post(
      "emailverification",
      emailVerificationRequest
    );
  }
  updateUserDetails(userId, userDetails): any {
    return this.repositoryService.put(
      `api/user/${userId}`,
      userDetails
    );
  }
  deleteUser(user): any {
    return this.repositoryService.delete(
      `api/user/${user}`
    );
  }
}
