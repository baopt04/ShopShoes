package com.example.shopshoes.controller;

import com.example.shopshoes.entity.KhachHang;
import com.example.shopshoes.reponsitory.KhachHangRepository;
import com.example.shopshoes.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/TaiKhoan")
public class TaiKhoanController {

    @Autowired
    KhachHangService khachHangService;

    @Autowired
    KhachHangRepository khachHangRepository;


//    @GetMapping("/khach-hang")
//    public String hienThiKhachHang(@PathVariable("id") int id, Model model) {
//
//        KhachHang khachHang = khachHangRepository.findByid(id);
//
//
//        model.addAttribute("khachHang", khachHang);
//
//        return "";
//    }


    @GetMapping("/hien-thi")
    public String hienThi(
            Model model,
            @ModelAttribute("kh") KhachHang khachHang,
            @RequestParam("num") Optional<Integer> num,
            @RequestParam(name = "size", defaultValue = "5", required = false) Integer size

    ) {
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(num.orElse(0), size, sort);
        List<KhachHang> list = khachHangService.findAllByTrangThaiTrue();

        model.addAttribute("dulieu", list);
        model.addAttribute("tong", khachHangService.findAllByTrangThaiTrue().size());
        model.addAttribute("contentPage","");
        return "";

    }



    @GetMapping("/tim-kiem")
    public String taiKhoanTimKiem(
            @RequestParam(value = "timkiem", required = false) String timkiem,
            @RequestParam(value = "sortBy", defaultValue = "hoTen") String sortBy,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Model model) {

        String searchKeyword = Optional.ofNullable(timkiem).orElse("");

        Page<KhachHang> listkh = khachHangRepository.Pagetimkiemtrue(searchKeyword, PageRequest.of(page, size, Sort.by(sortBy)));

        model.addAttribute("listkh", listkh.getContent());
        model.addAttribute("timkiem", searchKeyword);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", listkh.getTotalPages());
        model.addAttribute("sortBy", sortBy);

        if (listkh.isEmpty()) {
            model.addAttribute("notFoundMessage", "Không tìm thấy khách hàng nào phù hợp.");
        } else {
            model.addAttribute("resultMessage", "Tìm thấy " + listkh.getTotalElements() + " khách hàng.");
        }

        return "";
    }

    @PostMapping("/khach-hang/cap-nhat-mat-khau")
    public String capNhatMatKhau(
            @RequestParam("id") int id,
            @RequestParam("matKhauCu") String matKhauCu,
            @RequestParam("matKhauMoi") String matKhauMoi,
            Model model) {

        // Tìm khách hàng theo ID
        KhachHang khachHang = khachHangService.findByID(id);
        if (khachHang == null) {
            model.addAttribute("errorMessage", "Khách hàng không tồn tại.");
            return "redirect:/TaiKhoan/hien-thi";
        }

        // Kiểm tra mật khẩu cũ
        if (!khachHang.getMatKhau().equals(matKhauCu)) {
            model.addAttribute("errorMessage", "Mật khẩu cũ không chính xác.");
            return "redirect:/TaiKhoan/hien-thi";
        }

        // Cập nhật mật khẩu mới
        khachHang.setMatKhau(matKhauMoi);
        khachHangService.save(khachHang);

        model.addAttribute("successMessage", "Cập nhật mật khẩu thành công.");
        return "redirect:/TaiKhoan/hien-thi";
    }

    @PostMapping("/TaiKhoan/xoa/{id}")
    public String xoaKhachHang(@PathVariable("id") int id, RedirectAttributes redirectAttributes) {
        // Kiểm tra xem khách hàng có tồn tại không
        if (khachHangService.findByID(id) == null) {
            redirectAttributes.addFlashAttribute("errorMessage", "Khách hàng không tồn tại.");
            return "redirect:/TaiKhoan/hien-thi"; // Quay lại danh sách khách hàng
        }

        // Xóa khách hàng
        khachHangService.deleteById(id);
        redirectAttributes.addFlashAttribute("successMessage", "Xóa khách hàng thành công.");
        return "redirect:/TaiKhoan/hien-thi"; // Quay lại danh sách khách hàng
    }

















    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            password.append(characters.charAt(randomIndex));
        }

        return password.toString();
    }


}
