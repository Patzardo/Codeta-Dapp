export const idlFactory = ({ IDL }) => {
  const Contact = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'title' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'email' : IDL.Text,
  });
  const Property = IDL.Record({
    'id' : IDL.Text,
    'ownerId' : IDL.Text,
    'area' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'price' : IDL.Nat,
    'forSale' : IDL.Bool,
    'location' : IDL.Text,
  });
  const PropertyHistory = IDL.Record({
    'propertyId' : IDL.Text,
    'event' : IDL.Text,
    'timestamp' : IDL.Int,
    'details' : IDL.Text,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Text,
    'principal' : IDL.Principal,
    'contacts' : IDL.Vec(IDL.Text),
    'properties' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addProperty' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
        ],
        [IDL.Text],
        [],
      ),
    'buyProperty' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'closeContactRequest' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'createContact' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'deleteContact' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getActiveContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'getAllContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'getClosedContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'getContact' : IDL.Func([IDL.Text], [IDL.Opt(Contact)], ['query']),
    'getContactCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getPropertiesForSale' : IDL.Func([], [IDL.Vec(Property)], ['query']),
    'getPropertyById' : IDL.Func([IDL.Text], [IDL.Opt(Property)], ['query']),
    'getPropertyHistory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(PropertyHistory)],
        ['query'],
      ),
    'getUserProfileById' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'loginUser' : IDL.Func([IDL.Text], [UserProfile], []),
    'updateContact' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'updateUserProfile' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
