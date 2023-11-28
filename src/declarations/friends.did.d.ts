import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type List = [] | [[string, List]];
export interface Friend { 'attributes' : List, 'name' : string }
export type FriendId = number;
export interface _SERVICE {
  'create' : ActorMethod<[Friend], FriendId>,
  'delete' : ActorMethod<[FriendId], boolean>,
  'read' : ActorMethod<[FriendId], [] | [Friend]>,
  'update' : ActorMethod<[FriendId, Friend], boolean>,
}
