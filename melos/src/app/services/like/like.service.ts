import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(songId: string, uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.post<any>(
      `${environment.apiUrl}like/create-like`,
      { song_id: songId, uid: uid },
      { headers },
    );
  }

  getSongIdLiked(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.get<string[]>(
      `${environment.apiUrl}like/get-song-id-liked-by-uid?uid=${uid}`,
      { headers },
    );
  }

  deleteLike(songId: string, uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.delete<SongModel[]>(
      `${environment.apiUrl}like/delete-like?uid=${uid}&song_id=${songId}`,
      { headers },
    );
  }
}
