import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { //para ocupar este debo tener en module el
    //HttpClientModule
    console.log('Spotify Service Listo');
   }

   getQuery(query:string){
     const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQArOXJ7FF3v2aNpdmFCYnQAFcKZp3mKY7MBM4PKxqN06XbmORQ8Zpl6yxCncjn7-aCtOwvCprQhZPksPbQ'
    });

    return this.http.get(url, { headers });
   }


   getNewReleases() {

     /*const headers = new HttpHeaders({
       'Authorization': 'Bearer BQDzKyqExzebXRhkbXK6-XCv2IyGytRcBt6u_i3HhrBj2QQBgVtHwEBTc9lXPnv0Sbkm4U3KShMf1HbKDHU'
     })*/

     return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));
     //.subscribe(data=>{
       //console.log(data);
     //});
    }

  getArtistas(termino:string ) {
    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDzKyqExzebXRhkbXK6-XCv2IyGytRcBt6u_i3HhrBj2QQBgVtHwEBTc9lXPnv0Sbkm4U3KShMf1HbKDHU'
    })*/

    return this.getQuery(`search?q=${termino}&type=artist&market=CL&limit=15`)
    .pipe(map(data=> data['artists'].items));
  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=CL`)
                .pipe( map( data => data['tracks']));

  }

}
