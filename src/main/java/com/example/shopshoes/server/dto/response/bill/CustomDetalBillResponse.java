package com.example.shopshoes.server.dto.response.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomDetalBillResponse {

   private FatherBillResponse father;

   private List<ChildrenBillResponse> children;

   public CustomDetalBillResponse(BillResponse billResponse, List<ChildrenBillResponse> children) {
      FatherBillResponse father = new FatherBillResponse(billResponse);
      this.father = father;
      this.children = children;
   }
}
