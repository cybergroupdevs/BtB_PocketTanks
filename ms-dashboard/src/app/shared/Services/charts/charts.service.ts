import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';
// import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private repositoryService: RepositoryService) {}

  getPieChartData() :any
  {
    return this.repositoryService.get(
      "twitter/sentiment?type=average"
    );
  }
  
  getSentimentLine(): any 
  {
    return this.repositoryService.get(
      "twitter/sentiment?type=timeseries"
    );
  }
}
