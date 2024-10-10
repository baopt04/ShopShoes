package com.example.shopshoes.service;

import com.example.shopshoes.dto.LoginRequest;
import com.example.shopshoes.dto.RegisterKhachHangDTO;
import com.example.shopshoes.dto.ResponDTO;
import com.example.shopshoes.entity.ChucVu;
import com.example.shopshoes.entity.KhachHang;
import com.example.shopshoes.entity.NhanVien;
import com.example.shopshoes.interFace.LoginInterFace;
import com.example.shopshoes.reponsitory.KhachHangResponsitory;
import com.example.shopshoes.reponsitory.NhanVienReponsitory;
import com.example.shopshoes.utils.TokenUtils;
import io.jsonwebtoken.security.Password;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class LoginService implements LoginInterFace {
    @Autowired
    private KhachHangResponsitory khachHangResponsitory;
    @Autowired
    private NhanVienReponsitory nhanVienReponsitory;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private ModelMapper modelMapper;

    public LoginService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public KhachHang convertEntity(RegisterKhachHangDTO registerKhachHangDTO){
        KhachHang khachHang = modelMapper.map(registerKhachHangDTO , KhachHang.class);
        return khachHang;
    }

    public void saveLoginGoogle(String name, String email) {
        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(name);
        khachHang.setEmail(email);
        khachHangResponsitory.save(khachHang);
    }

    public ResponDTO login(LoginRequest loginRequest) {
        ResponDTO responDTO = new ResponDTO();

        try {
            // Kiểm tra trong bảng Admin
            Optional<NhanVien> adminOptional = nhanVienReponsitory.findByEmail(loginRequest.getEmail());
            if (adminOptional.isPresent()) {
                NhanVien nhanVien = adminOptional.get();
                // Xác thực
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getMatKhau()
                ));
                var jwt = tokenUtils.generateToken(nhanVien);
                System.out.println(adminOptional);
                responDTO.setStatus(200);
                responDTO.setToken(jwt);
                responDTO.setMessage("Đăng nhập thành công");
                ChucVu chucVu = nhanVien.getChucVu();
                responDTO.setRole(chucVu != null ? chucVu.getTenChucVu() : "Chức vụ không xác định");
                return responDTO;
            }

            // Kiểm tra trong bảng KhachHang
            Optional<KhachHang> khachHangOptional = khachHangResponsitory.findByEmail(loginRequest.getEmail());
            if (khachHangOptional.isPresent()) {
                KhachHang khachHang = khachHangOptional.get();
                // Xác thực
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getMatKhau()
                ));
                var jwt = tokenUtils.generateToken(khachHang);
                System.out.println(khachHangOptional);
                responDTO.setStatus(200);
                responDTO.setToken(jwt);
                responDTO.setMessage("Đăng nhập thành công");
                responDTO.setRole("CUSTOMER");
                return responDTO;
            }else {
                responDTO.setStatus(401);
                responDTO.setError("Đăng nhập thất bại: Tên đăng nhập hoặc mật khẩu không chính xác");
            }
        } catch (BadCredentialsException e) {
            responDTO.setStatus(401);
            responDTO.setError("Đăng nhập thất bại: Tên đăng nhập hoặc mật khẩu không chính xác");
        } catch (Exception e) {
            responDTO.setStatus(500);
            responDTO.setError("Đăng nhập thất bại: " + e.getMessage());
            e.printStackTrace();
        }

        return responDTO;
    }



    public ResponDTO registerKhachHang(RegisterKhachHangDTO request) {
        ResponDTO responDTO = new ResponDTO();
        try {
            if (khachHangResponsitory.existsByEmail(request.getEmail())) {
                responDTO.setStatus(400);
                responDTO.setMessage("Email đã tồn tại !");
                return responDTO;
            }
            KhachHang khachHang = convertEntity(request);
            khachHang.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
            khachHangResponsitory.save(khachHang);
            responDTO.setStatus(201);
            responDTO.setMessage("Đăng ký thành công");
        }catch (Exception e) {
            throw new RuntimeException("Đăng ký thất bại " + e.getMessage());
        }
        return responDTO;
    }


        public ResponDTO sendPasswordResetEmail(String email) {
            ResponDTO responDTO = new ResponDTO();
            try {
                Optional<KhachHang> khachHangOpt = khachHangResponsitory.findByEmail(email);
                if (!khachHangOpt.isPresent()) {
                    // Nếu email không tồn tại, cập nhật responDTO và trả về
                    responDTO.setStatus(404);
                    responDTO.setMessage("Email không tồn tại!");
                    return responDTO;
                }

                KhachHang khachHang = khachHangOpt.get();
                String token = tokenUtils.generateTokenForGetPassword(khachHang.getEmail());
                String resetLink = "http://localhost:3000/changePassword?token=" + token;

                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("Lấy lại mật khẩu");
                message.setText("Truy cập vào đường link sau để thay đổi mật khẩu của bạn: " + resetLink +
                        "\nNếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này.");

                javaMailSender.send(message);

                // Cập nhật trạng thái thành công
                responDTO.setStatus(200);
                responDTO.setMessage("Email đã được gửi thành công!");
            } catch (Exception e) {
                System.out.println("Error sending email: " + e.getMessage());
                responDTO.setStatus(500);
                responDTO.setMessage("Có lỗi xảy ra khi gửi: " + e.getMessage());
            }
            return responDTO;
        }

    public void updatePassword(String token, String matKhauMoi) {
        KhachHang khachHang = tokenUtils.validateForGetPassword(token);
        if (khachHang == null) {
            throw new RuntimeException("Invalid token.");
        }
        khachHang.setMatKhau(passwordEncoder.encode(matKhauMoi));
        khachHangResponsitory.save(khachHang);
        tokenUtils.revokeToken(token);
    }

}
