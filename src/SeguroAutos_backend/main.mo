import Float "mo:base/Float";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {

  public query func amountBrand(base : Float, mult: Float) : async Float{
    var total : Float = base * mult;
    return total;
  };

  public query func amountType(amount: Float, difference: Float, typeOf: Text) : async Float {
      var final: Float = amount - (difference * 3 * amount / 100);

      if(typeOf == "basico"){
        final := final *1.3;
        return final;
      };
      final := final*1.5;
      return final;
  };
    
  public query func textBrand(typeBrand: Text): async Text {
    var final : Text = "Nan"; 

    if(typeBrand == "1"){
      final:="Americano";
    };

    if(typeBrand == "2"){
      final:="Asiatico";
    };

    if(typeBrand == "3"){
      final:="Europeo";
    };

    return final;
  };
};
