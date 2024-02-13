import { ArtistModel } from "./artistsModel";

export interface TrackModel {
    name: string;
    album: string;
    cover: string;
    url: string;
    _id: string | number;
    artist?: ArtistModel;
}