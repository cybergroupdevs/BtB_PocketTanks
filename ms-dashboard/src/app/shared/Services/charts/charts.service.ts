import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private repositoryService: RepositoryService) {}

}
