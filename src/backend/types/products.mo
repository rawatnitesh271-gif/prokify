module {
  public type ProductId = Text;

  public type Category = {
    #audio;
    #wearables;
    #mobile;
    #computing;
    #hometech;
    #accessories;
  };

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    imageEmoji : Text;
    category : Category;
    featured : Bool;
  };

  public type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  public type Stats = {
    totalProducts : Nat;
    customers : Nat;
    yearsInnovation : Nat;
    satisfaction : Nat;
  };
};
