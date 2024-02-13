import { Component, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracksModel';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnDestroy {
  data:Array<any>=[]

  mackCover: TrackModel =
    {
      cover: 'https://cdn.icon-icons.com/icons2/1904/PNG/512/playbutton_121290.png',
      name: "beber",
      album: "Gaa",
      url: "asd",
      _id: 1
    }

    listObservers$:Array<Subscription>=[]
    constructor( private multimediaService:MultimediaService){
    }

    ngOnInit(): void {
    const observar$:Subscription=this.multimediaService.callBack.subscribe((data:TrackModel)=>{
       console.log("dataaaaa",data)
    })

    this.listObservers$=[observar$];

    }

    ngOnDestroy(): void {
   this.listObservers$.forEach(u=>u.unsubscribe)
      
    }
}
