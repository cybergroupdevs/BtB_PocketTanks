import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {

  constructor(private repositoryService: RepositoryService) { }

  verifyTwitterAccount(twitterAccountRequest): any {
    return this.repositoryService.create(
      "auth/twitter/extracttokens",
      twitterAccountRequest
    );
  }

}
