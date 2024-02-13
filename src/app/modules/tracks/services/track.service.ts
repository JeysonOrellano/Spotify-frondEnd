import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracksModel';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly Url = environment.api;
  constructor(private httpClient: HttpClient) {

  }

  private skipByID(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTemp = listTracks.filter(a => a._id !== id)
      resolve(listTemp)
    })
  }


  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.Url}/tracks`,{
      headers:new HttpHeaders({authorization:'Bearer TOKEN'})
    })
      .pipe(
        map((dataRaw: any) => {
          return dataRaw.data
        })
      );
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.Url}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipByID(data, 2)),
          tap(data=>console.log("ok",data)),
          catchError((error)=>{
            console.log("Algo paso");
            return of([])
          })

      )
  }
}
