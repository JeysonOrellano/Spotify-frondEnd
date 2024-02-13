import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracksModel';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent {
  @Input() mode: "small" | "big"="small";
  @Input() track!:TrackModel;
  
  constructor( private multimediaService:MultimediaService){

  }
  sendData(track:TrackModel):void{
    this.multimediaService.callBack.emit();
  }

}
