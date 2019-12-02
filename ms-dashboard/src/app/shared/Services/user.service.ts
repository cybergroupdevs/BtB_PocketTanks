import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private repositoryService: RepositoryService) {}

  getUserList(): any {
    return this.repositoryService.getData(
      "api/user"
    );
  }
  getUserDetails(userId): any {
    return this.repositoryService.getData(
      `api/user/${userId}`
    );
  }
  createUser(user): any {
    return this.repositoryService.create(
      "api/user",
      user
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
