export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const Friend = IDL.Record({ 'attributes' : List, 'name' : IDL.Text });
  const FriendId = IDL.Nat32;
  return IDL.Service({
    'create' : IDL.Func([Friend], [FriendId], []),
    'delete' : IDL.Func([FriendId], [IDL.Bool], []),
    'read' : IDL.Func([FriendId], [IDL.Opt(Friend)], ['query']),
    'update' : IDL.Func([FriendId, Friend], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
