package com.example.shopshoes.controller;

import com.example.shopshoes.dto.LoginRequest;
import com.example.shopshoes.dto.RegisterKhachHangDTO;
import com.example.shopshoes.dto.ResponDTO;
import com.example.shopshoes.service.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            ResponDTO responDTO = loginService.login(loginRequest);
            if (responDTO.getStatus() == 200) {
                return ResponseEntity.status(HttpStatus.OK).body(responDTO);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responDTO);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    "Đăng nhập thất bại " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterKhachHangDTO registerKhachHangDTO) {
        try {
            ResponDTO responDTO = loginService.registerKhachHang(registerKhachHangDTO);
            if (responDTO.getStatus() == 201) {
                return ResponseEntity.status(HttpStatus.CREATED).body(responDTO);
            } else {
                return ResponseEntity.badRequest().body(responDTO);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    "Đăng ký thất bại" + e.getMessage());
        }
    }

    @PostMapping("/reset-request")
    public ResponseEntity<ResponDTO> sendMail(@RequestParam String email) {
        ResponDTO responDTO = loginService.sendPasswordResetEmail(email);

        return ResponseEntity.status(responDTO.getStatus()).body(responDTO);
    }


    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam String token, @RequestParam String matKhauMoi) {
        try {
            loginService.updatePassword(token, matKhauMoi);
            return ResponseEntity.ok("Mật khẩu đã được cập nhật thành công.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra: " + e.getMessage());
        }
    }
}
