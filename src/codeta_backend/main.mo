import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor PropertyManager {

  type UserProfile = {
    id : Text;
    principal : Principal;
    properties : [Text]; // List of property IDs owned by the user
    contacts : [Text]; // List of contact IDs associated with the user
  };
  // Define a Property type
  type Property = {
    id : Text;
    ownerId : Text;
    name : Text;
    description : Text;
    location : Text;
    area : Text;
    price : Nat;
    image : Text;
    forSale : Bool;
    createdAt : Int;
  };

  // Define a Contact type
  type Contact = {
    id : Text;
    name : Text;
    email : Text;
    description : Text;
    title : Text;
    status : Text; // "active" or "closed"
  };

  // Define a PropertyHistory type
  type PropertyHistory = {
    event : Text; // "created", "purchased", "listed", "unlisted"
    propertyId : Text;
    timestamp : Int;
    details : Text; // Additional details (e.g., buyer/seller ID, price)
  };

  // HashMap to store property history as a list of events per property ID
  private stable var propertyHistoryEntries : [(Text, [PropertyHistory])] = [];
  private var propertyHistory = HashMap.HashMap<Text, [PropertyHistory]>(0, Text.equal, Text.hash);

  // Function to add a history record for a property
  private func addPropertyHistory(propertyId : Text, event : Text, details : Text) : async () {
    let timestamp = Time.now();
    let historyRecord : PropertyHistory = {
      event = event;
      propertyId = propertyId;
      timestamp = timestamp;
      details = details;
    };

    // Add the history record to the property history map
    switch (propertyHistory.get(propertyId)) {
      case (null) {
        propertyHistory.put(propertyId, [historyRecord]);
      };
      case (?historyList) {
        propertyHistory.put(propertyId, Array.append(historyList, [historyRecord]));
      };
    };
  };

  public func createContact(userId : Text, id : Text, name : Text, email : Text, description : Text, title : Text) : async Bool {
    switch (users.get(userId)) {
      case (null) {

      }; // User does not exist
      case (?userProfile) {
        let updatedUser = {
          userProfile with contacts = [id]
        };
        users.put(userId, updatedUser);
        return true;
      };
    };
    switch (contacts.get(id)) {
      case (null) {
        let newContact : Contact = {
          id = id;
          name = name;
          email = email;
          description = description;
          title = title;
          status = "active"; // All new requests start as active
        };
        contacts.put(id, newContact);
        return true;
      };
      case (?_) {
        // Contact with the same ID already exists
        return false;
      };
    };
  };
  // Function to update an existing contact
  public func updateContact(id : Text, name : Text, email : Text, description : Text, title : Text) : async Bool {
    switch (contacts.get(id)) {
      case (?contact) {
        let updatedContact = {
          contact with
          name = name;
          email = email;
          description = description;
          title = title;
          updatedAt = Time.now();
        };
        contacts.put(id, updatedContact);
        return true;
      };
      case (null) {
        // Contact not found
        return false;
      };
    };
  };

  // Function to delete a contact
  public func deleteContact(id : Text) : async Bool {
    switch (contacts.get(id)) {
      case (?_) {
        contacts.delete(id);
        return true;
      };
      case (null) {
        // Contact not found
        return false;
      };
    };
  };

  // Function to get a contact by ID
  public query func getContact(id : Text) : async ?Contact {
    return contacts.get(id);
  };

  // Function to get all contacts
  public query func getAllContacts() : async [Contact] {
    return Iter.toArray(contacts.vals());
  };

  // Function to get the total number of contacts
  public query func getContactCount() : async Nat {
    return Iter.toArray(contacts.entries()).size();
  };

  // Function to mark a contact request as closed
  public func closeContactRequest(id : Text) : async Bool {
    switch (contacts.get(id)) {
      case (?contact) {
        let updatedContact = {
          contact with
          status = "closed";
        };
        contacts.put(id, updatedContact);
        return true;
      };
      case (null) {
        // Contact not found
        return false;
      };
    };
  };

  // Function to get all active contacts
  public query func getActiveContacts() : async [Contact] {
    let allContacts = Iter.toArray(contacts.vals());
    return Array.filter<Contact>(
      allContacts,
      func(contact) : Bool {
        contact.status == "active";
      },
    );
  };

  // Function to get all closed contacts
  public query func getClosedContacts() : async [Contact] {
    let allContacts = Iter.toArray(contacts.vals());
    return Array.filter<Contact>(
      allContacts,
      func(contact) : Bool {
        contact.status == "closed";
      },
    );
  };

  // Stable variables to store user profiles, properties, and contacts
  private var users = HashMap.HashMap<Text, UserProfile>(0, Text.equal, Text.hash);
  private var properties = HashMap.HashMap<Text, Property>(0, Text.equal, Text.hash);
  private var contacts = HashMap.HashMap<Text, Contact>(0, Text.equal, Text.hash);

  // Temporary storage arrays for upgrade
  private stable var userEntries : [(Text, UserProfile)] = [];
  private stable var propertyEntries : [(Text, Property)] = [];
  private stable var contactEntries : [(Text, Contact)] = [];

  // User login function, creating a new profile if one does not exist
  public func loginUser(principalId : Text) : async UserProfile {
    switch (users.get(principalId)) {
      case (null) {
        let newUser : UserProfile = {
          id = principalId;
          principal = Principal.fromText(principalId);
          properties = [];
          contacts = [];
        };
        users.put(principalId, newUser);
        return newUser;
      };
      case (?userProfile) {
        return userProfile;
      };
    };
  };

  // Update user profile
  public func updateUserProfile(principalId : Text, newContacts : [Text]) : async Bool {
    switch (users.get(principalId)) {
      case (null) { return false }; // User does not exist
      case (?userProfile) {
        let updatedUser = {
          userProfile with contacts = newContacts
        };
        users.put(principalId, updatedUser);
        return true;
      };
    };
  };

  // Retrieve an individual user's profile by ID
  public query func getUserProfileById(principalId : Text) : async ?UserProfile {
    return users.get(principalId);
  };

  // Admin function to create a property and assign it to a user
  // public func adminCreateProperty(adminPrincipal : Principal, userPrincipalId : Text, id : Text, name : Text, description : Text, location : Text, price : Nat) : async Text {
  //   if (adminPrincipal != Principal.fromText("admin-principal-id")) {
  //     // Replace "admin-principal-id" with the actual admin principal
  //     return "Not authorized";
  //   };

  //   switch (users.get(userPrincipalId)) {
  //     case (null) { return "User not found" };
  //     case (?userProfile) {
  //       let propertyId = id;
  //       let newProperty : Property = {
  //         id = propertyId;
  //         ownerId = userProfile.id;
  //         name = name;
  //         description = description;
  //         location = location;
  //         price = price;
  //         forSale = true;
  //         createdAt = Time.now();
  //       };
  //       properties.put(propertyId, newProperty);

  //       // Update user profile with the new property
  //       let updatedUser = {
  //         userProfile with properties = Array.append(userProfile.properties, [propertyId])
  //       };
  //       users.put(userPrincipalId, updatedUser);

  //       return propertyId;
  //     };
  //   };
  // };

  // Add a property for sale
  public func addProperty(principalId : Text, id : Text, name : Text, description : Text, location : Text, price : Nat, area : Text, image : Text) : async Text {
    let propertyId = id;
    let newProperty : Property = {
      id = propertyId;
      ownerId = principalId;
      name = name;
      description = description;
      location = location;
      price = price;
      image = image;
      forSale = true;
      area = area;
      createdAt = Time.now();
    };

    // Use switch to get and update the user profile
    switch (users.get(principalId)) {
      case (null) {
        return "no user exists";
      };
      case (?userProfile) {
        // If user profile exists, update it with the new property
        let updatedUser = {
          userProfile with properties = Array.append(userProfile.properties, [propertyId])
        };
        users.put(principalId, updatedUser);
        properties.put(propertyId, newProperty);
        await addPropertyHistory(propertyId, "created", "Property created by admin");
      };
    };

    return propertyId; // Return the new property's ID
  };

  // Query to get properties for sale
  public query func getPropertiesForSale() : async [Property] {
    let allProperties = Iter.toArray(properties.vals());
    return Array.filter<Property>(allProperties, func(prop) { prop.forSale });
  };

  public func buyProperty(buyerId : Text, propertyId : Text) : async Text {
    switch (properties.get(propertyId)) {
      case (null) {
        return "Property not found";
      };
      case (?property) {
        if (not property.forSale) {
          return "Property is not for sale";
        };
        if (property.ownerId == buyerId) {
          return "Buyer already owns this property";
        };

        // Update seller's profile to remove the property
        switch (users.get(property.ownerId)) {
          case (?sellerProfile) {
            let updatedSellerProfile = {
              sellerProfile with properties = Array.filter<Text>(sellerProfile.properties, func(propId) { propId != propertyId })
            };
            users.put(property.ownerId, updatedSellerProfile);
          };
          case (null) {};
        };

        // Update buyer's profile to add the property
        switch (users.get(buyerId)) {
          case (null) {
            return "Buyer not found";
          };
          case (?buyerProfile) {
            let updatedBuyerProfile = {
              buyerProfile with properties = Array.append(buyerProfile.properties, [propertyId])
            };
            users.put(buyerId, updatedBuyerProfile);
          };
        };

        // Transfer property ownership to the buyer and mark it as not for sale
        let updatedProperty = {
          property with
          ownerId = buyerId;
          forSale = false;
        };
        properties.put(propertyId, updatedProperty);
        await addPropertyHistory(propertyId, "purchased", "Purchased by user: " # buyerId # " for " # Nat.toText(property.price));

        return "Property purchased successfully";
      };
    };
  };

  public query func getPropertyHistory(propertyId : Text) : async [PropertyHistory] {
    switch (propertyHistory.get(propertyId)) {
      case (null) { return [] }; // No history found, return an empty list
      case (?historyList) { return historyList };
    };
  };

  public query func getPropertyById(propertyId : Text) : async ?Property {
    return properties.get(propertyId);
  };

  // Pre-upgrade function to store data as arrays
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    propertyEntries := Iter.toArray(properties.entries());
    contactEntries := Iter.toArray(contacts.entries());
    propertyHistoryEntries := Iter.toArray(propertyHistory.entries());
  };

  // Post-upgrade function to restore data from arrays
  system func postupgrade() {
    users := HashMap.fromIter<Text, UserProfile>(userEntries.vals(), 1, Text.equal, Text.hash);
    properties := HashMap.fromIter<Text, Property>(propertyEntries.vals(), 1, Text.equal, Text.hash);
    contacts := HashMap.fromIter<Text, Contact>(contactEntries.vals(), 1, Text.equal, Text.hash);
    propertyHistory := HashMap.fromIter<Text, [PropertyHistory]>(propertyHistoryEntries.vals(), 1, Text.equal, Text.hash);
  };
};
