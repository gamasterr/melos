import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class LikeService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async create(song_id: string, uid: string) {
    console.log('song_id', song_id);
    console.log('uid', uid);
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('create_like', {
        v_song_id: song_id,
        v_uid: uid,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    console.log('data', data.song_id);

    return data;
  }

  async getSongLikedByUid(uid: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_song_liked_by_uid', {
        v_uid: uid,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async getSongIdLikedByUid(uid: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_liked_song_ids', {
        v_uid: uid,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async remove(uid: string, song_id: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('delete_like', {
        v_uid: uid,
        v_song_id: song_id,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
