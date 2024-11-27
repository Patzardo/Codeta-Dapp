import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Contact {
  'id' : string,
  'status' : string,
  'title' : string,
  'name' : string,
  'description' : string,
  'email' : string,
}
export interface Property {
  'id' : string,
  'ownerId' : string,
  'area' : string,
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'image' : string,
  'price' : bigint,
  'forSale' : boolean,
  'location' : string,
}
export interface PropertyHistory {
  'propertyId' : string,
  'event' : string,
  'timestamp' : bigint,
  'details' : string,
}
export interface UserProfile {
  'id' : string,
  'principal' : Principal,
  'contacts' : Array<string>,
  'properties' : Array<string>,
}
export interface _SERVICE {
  'addProperty' : ActorMethod<
    [string, string, string, string, string, bigint, string, string],
    string
  >,
  'buyProperty' : ActorMethod<[string, string], string>,
  'closeContactRequest' : ActorMethod<[string], boolean>,
  'createContact' : ActorMethod<
    [string, string, string, string, string, string],
    boolean
  >,
  'deleteContact' : ActorMethod<[string], boolean>,
  'getActiveContacts' : ActorMethod<[], Array<Contact>>,
  'getAllContacts' : ActorMethod<[], Array<Contact>>,
  'getClosedContacts' : ActorMethod<[], Array<Contact>>,
  'getContact' : ActorMethod<[string], [] | [Contact]>,
  'getContactCount' : ActorMethod<[], bigint>,
  'getPropertiesForSale' : ActorMethod<[], Array<Property>>,
  'getPropertyById' : ActorMethod<[string], [] | [Property]>,
  'getPropertyHistory' : ActorMethod<[string], Array<PropertyHistory>>,
  'getUserProfileById' : ActorMethod<[string], [] | [UserProfile]>,
  'loginUser' : ActorMethod<[string], UserProfile>,
  'updateContact' : ActorMethod<
    [string, string, string, string, string],
    boolean
  >,
  'updateUserProfile' : ActorMethod<[string, Array<string>], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
