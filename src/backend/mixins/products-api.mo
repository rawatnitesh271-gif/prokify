import Types "../types/products";
import ProductLib "../lib/products";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  products : List.List<Types.Product>,
  carts : Map.Map<Principal, List.List<Types.CartItem>>
) {
  public query func getProducts() : async [Types.Product] {
    Runtime.trap("not implemented");
  };

  public query func getFeaturedProducts() : async [Types.Product] {
    Runtime.trap("not implemented");
  };

  public query func getProductById(id : Text) : async ?Types.Product {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func addToCart(productId : Text) : async () {
    Runtime.trap("not implemented");
  };

  public query ({ caller }) func getCart() : async [Types.CartItem] {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func clearCart() : async () {
    Runtime.trap("not implemented");
  };

  public query func getStats() : async Types.Stats {
    Runtime.trap("not implemented");
  };
};
