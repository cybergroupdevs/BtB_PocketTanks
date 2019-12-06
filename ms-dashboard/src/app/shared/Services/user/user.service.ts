import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private repositoryService: RepositoryService) {}

  getUserList(): any {
    return this.repositoryService.getData(
      ""
    );
  }
  getUserDetails(userId): any {
    return this.repositoryService.getData(
      `api/user/${userId}`
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
  updateUserDetails(userId, userDetails): any {
    return this.repositoryService.update(
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
