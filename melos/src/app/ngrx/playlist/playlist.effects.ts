import * as PlaylistActions from './playlist.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PlaylistService } from '../../services/playlist/playlist.service';

export const getDetailPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylistById),
      exhaustMap((action) =>
        playlistService.getPlaylistDetail(action.id).pipe(
          map((playlistDetail) =>
            PlaylistActions.getPlaylistByIdSuccess({ playlistDetail }),
          ),
          catchError((error) =>
            of(PlaylistActions.getPlaylistByIdFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const getListPlaylists = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylistByUserId),
      exhaustMap((action) =>
        playlistService.getPlaylistById(action.uid, action.idToken).pipe(
          map((playlistList) =>
            PlaylistActions.getPlaylistByUserIdSuccess({ playlistList }),
          ),
          catchError((error) =>
            of(PlaylistActions.getPlaylistUserIdFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

// tạo mới playlist
export const createPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      exhaustMap((action) =>
        playlistService.createPlaylist(action.playlist, action.idToken).pipe(
          map((playlist) =>
            PlaylistActions.createPlaylistSuccess({ playlist }),
          ),
          catchError((error) =>
            of(PlaylistActions.createPlaylistFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteDetailPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.deletePlaylistById),
      exhaustMap((action) =>
        playlistService
          .deletePlaylistById(action.id, action.uid, action.idToken)
          .pipe(
            map(() => PlaylistActions.deletePlaylistByIdSuccess()),
            catchError((error) =>
              of(PlaylistActions.deletePlaylistByIdFailure({ error })),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const editDetailPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.editPlaylistById),
      exhaustMap((action) =>
        playlistService
          .updatePlaylistById(action.playlist, action.idToken)
          .pipe(
            map((playlist) =>
              PlaylistActions.editPlaylistByIdSuccess({ playlist }),
            ),
            catchError((error) =>
              of(PlaylistActions.editPlaylistByIdFailure({ error })),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const addSongToPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.addSongToPlaylist),
      exhaustMap((action) =>
        playlistService
          .addSongToPlaylist(
            action.playlistId,
            action.songId,
            action.uid,
            action.idToken,
          )
          .pipe(
            map(() => PlaylistActions.addSongToPlaylistSuccess()),
            catchError((error) =>
              of(PlaylistActions.addSongToPlaylistFailure({ error })),
            ),
          ),
      ),
    );
  },
  { functional: true },
);
