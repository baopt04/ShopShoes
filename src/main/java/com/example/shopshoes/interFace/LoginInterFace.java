package com.example.shopshoes.interFace;

import com.example.shopshoes.dto.LoginRequest;
import com.example.shopshoes.dto.RegisterKhachHangDTO;
import com.example.shopshoes.dto.ResponDTO;

public interface LoginInterFace {
        ResponDTO login(LoginRequest loginRequest);
        ResponDTO registerKhachHang(RegisterKhachHangDTO request);
        ResponDTO sendPasswordResetEmail(String email);
        void updatePassword(String token, String matKhauMoi);

}
