package com.example.shopshoes.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
   public class ResponDTO {
      private String token;
      private String error;
      private String message;
      private Integer status;
      private String role;
   }
