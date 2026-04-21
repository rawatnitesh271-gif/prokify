import Types "../types/products";
import List "mo:core/List";
import Map "mo:core/Map";

module {
  public type Product = Types.Product;
  public type CartItem = Types.CartItem;
  public type Stats = Types.Stats;

  public func getAllProducts(products : List.List<Product>) : [Product] {
    Runtime.trap("not implemented");
  };

  public func getFeatured(products : List.List<Product>) : [Product] {
    Runtime.trap("not implemented");
  };

  public func getById(products : List.List<Product>, id : Text) : ?Product {
    Runtime.trap("not implemented");
  };

  public func addToCart(carts : Map.Map<Principal, List.List<CartItem>>, caller : Principal, productId : Text) {
    Runtime.trap("not implemented");
  };

  public func getCart(carts : Map.Map<Principal, List.List<CartItem>>, caller : Principal) : [CartItem] {
    Runtime.trap("not implemented");
  };

  public func removeFromCart(carts : Map.Map<Principal, List.List<CartItem>>, caller : Principal, productId : Text) {
    Runtime.trap("not implemented");
  };

  public func clearCart(carts : Map.Map<Principal, List.List<CartItem>>, caller : Principal) {
    Runtime.trap("not implemented");
  };

  public func getStats(products : List.List<Product>, carts : Map.Map<Principal, List.List<CartItem>>) : Stats {
    Runtime.trap("not implemented");
  };
};
