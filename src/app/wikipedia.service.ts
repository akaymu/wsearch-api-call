import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  };
}



@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  public search(term: string) {
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: term,
        utf8: '1',
        format: 'json',
        origin: '*'
      }
    }).pipe(
      map((response) => response.query.search)
    );
  }
}


// Url
/*
https://en.wikipedia.org/w/api.php?
       action=query&
       list=search&
       srsearch=space&
       utf8=1&
       format=json
*/