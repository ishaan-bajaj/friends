import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";

actor Friends {

  /**
   * Types
   */

  // The type of a Friend identifier.
  public type FriendId = Nat32;

  // The type of a Friend.
  public type Friend = {
    name : Text;
    attributes : List.List<Text>;
  };

  /**
   * Application State
   */

  // The next available Friend identifier.
  private stable var next : FriendId = 0;

  // The Friend data store.
  private stable var Friends : Trie.Trie<FriendId, Friend> = Trie.empty();

  /**
   * High-Level API
   */

  // Create a Friend.
  public func create(Friend : Friend) : async FriendId {
    let FriendId = next;
    next += 1;
    Friends := Trie.replace(
      Friends,
      key(FriendId),
      Nat32.equal,
      ?Friend,
    ).0;
    return FriendId;
  };

  // Read a Friend.
  public query func read(FriendId : FriendId) : async ?Friend {
    let result = Trie.find(Friends, key(FriendId), Nat32.equal);
    return result;
  };

  // Update a Friend.
  public func update(FriendId : FriendId, Friend : Friend) : async Bool {
    let result = Trie.find(Friends, key(FriendId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      Friends := Trie.replace(
        Friends,
        key(FriendId),
        Nat32.equal,
        ?Friend,
      ).0;
    };
    return exists;
  };

  // Delete a Friend.
  public func delete(FriendId : FriendId) : async Bool {
    let result = Trie.find(Friends, key(FriendId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      Friends := Trie.replace(
        Friends,
        key(FriendId),
        Nat32.equal,
        null,
      ).0;
    };
    return exists;
  };

  /**
   * Utilities
   */

  // Create a trie key from a Friend identifier.
  private func key(x : FriendId) : Trie.Key<FriendId> {
    return { hash = x; key = x };
  };
};
