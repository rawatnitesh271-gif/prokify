import Types "types/products";
import ProductsMixin "mixins/products-api";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  let products = List.empty<Types.Product>();
  let carts = Map.empty<Principal, List.List<Types.CartItem>>();

  include ProductsMixin(products, carts);
};
