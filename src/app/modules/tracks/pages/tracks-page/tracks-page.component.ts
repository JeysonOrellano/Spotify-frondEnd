import { Component } from '@angular/core';

import { TrackModel } from '@core/models/tracksModel';

import { Subscriber, Subscription } from 'rxjs';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) {

  }

  ngOnInit(): void {



  }

  ngOnDestroy(): void {

  }

  loadDataAll() {
    this.trackService.getAllTracks$().toPromise();
  }

  loadDataRAndom() {
    this.trackService.getAllRandom$().subscribe((res: TrackModel[]) => {
      this.tracksRandom = res;
    }, error => {
      console.log("Error")
    })
  }

}
