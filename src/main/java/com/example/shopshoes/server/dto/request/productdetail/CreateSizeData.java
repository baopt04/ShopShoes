package com.example.shopshoes.server.dto.request.productdetail;

import com.example.shopshoes.server.infrastructure.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateSizeData {

    private int nameSize;

    private int quantity;

    private Status status;
}
