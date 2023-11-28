import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Friend { 'name' : string, 'attributes' : List }
export type FriendId = number;
export type List = [] | [[string, List]];
export interface _SERVICE {
  'create' : ActorMethod<[Friend], FriendId>,
  'delete' : ActorMethod<[FriendId], boolean>,
  'read' : ActorMethod<[FriendId], [] | [Friend]>,
  'update' : ActorMethod<[FriendId, Friend], boolean>,
}
