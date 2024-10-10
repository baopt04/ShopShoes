package com.example.shopshoes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterKhachHangDTO {
    @NotNull(message = "Vui lòng nhập email ")
    @Email(message = "Email không hợp lệ")
    private String email;
    @NotNull(message = "Vui lòng nhập mật khẩu")
private String matKhau;
    @NotNull(message = "Vui lòng nhập hoTen")
private String hoTen;
}
