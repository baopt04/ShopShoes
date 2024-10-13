package com.example.shopshoes.controller;

import com.example.shopshoes.entity.KhuyenMai;
import com.example.shopshoes.reponsitory.KhuyenMaiRepository;
import com.example.shopshoes.reponsitory.NhanVienRepository;
import com.example.shopshoes.service.KhuyenMaiService;
import com.example.shopshoes.service.SanPhamChiTietService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Admin/KhuyenMai")
public class KhuyenMaiAdminController {

    @Autowired
    KhuyenMaiService khuyenMaiService;

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    @Autowired
    NhanVienRepository nhanVienRepository;

    @Autowired
    SanPhamChiTietService sanPhamChiTietService;

//    @GetMapping("/DanhSachKM")
//    public ResponseEntity<?> danhSachKM() {
//        List<KhuyenMai> list = khuyenMaiService.findAll();
//        return ResponseEntity.ok(list);
//    }

//    @GetMapping("/DanhSachKM/Search/LoaiKhuyenMai")
//    public ResponseEntity<?> searchKMByLoaiKhuyenMai(@RequestParam("LoaiKhuyenMai") String loaiKM) {
//        List<KhuyenMai> list = khuyenMaiRepository.findAllByLoaiKhuyenMai(loaiKM);
//        return ResponseEntity.ok(list);
//    }


    @PostMapping("/add")
    public String addKM(Model model, KhuyenMai khuyenMai) {
        Map<String, String> errors = new HashMap<>();

        if (khuyenMaiRepository.existsByTenKhuyenMai(khuyenMai.getTenKhuyenMai())) {
            errors.put("tenKhuyenMai", "Tên khuyến mãi đã tồn tại");
        }

        if (khuyenMai.getTenKhuyenMai() == null || khuyenMai.getTenKhuyenMai().isEmpty()) {
            errors.put("tenKhuyenMai", "Tên khuyến mãi không được để trống");
        }

        if (!errors.isEmpty()) {
            model.addAttribute("errors", errors);
            model.addAttribute("data", khuyenMai);
            return "/";
        }

        khuyenMaiRepository.save(khuyenMai);
        return "redirect:/";
    }



    @GetMapping("/delete/{id}")
    public String deleteKM(@PathVariable("id") int id) {
        khuyenMaiService.deleteKM(id);
        return "redirect:/";
    }

    @GetMapping("/create")
    public String createkm(@ModelAttribute("data") KhuyenMai khuyenMai) {
        return "/";
    }

    @GetMapping("/update/{id}")
    public String updatekm(@Valid @ModelAttribute("data") KhuyenMai khuyenMai, Model model) {
        return "/";
    }


    @Scheduled(fixedRate = 1000)
    public void kiemTraNgayHienTaiVSkhoangTimeGiamGia() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<KhuyenMai> khuyenMaiList = khuyenMaiRepository.findAll();

        for (KhuyenMai km : khuyenMaiList) {
            LocalDateTime batdauDateTime = km.getThoiGianBatDau();
            LocalDateTime ketthucDateTime = km.getThoiGianKetThuc();
            boolean trangThaiMoi;

            if (currentDateTime.isAfter(batdauDateTime) && currentDateTime.isBefore(ketthucDateTime)) {
                trangThaiMoi = true;
            } else {
                trangThaiMoi = false;
            }

            if (km.isTrangThai() != trangThaiMoi) {
                km.setTrangThai(trangThaiMoi);
                khuyenMaiRepository.save(km);
            }
        }
    }

    public boolean isNgayKetThucAfterNgayBatDauupdate(String ngayBatDau, String ngayKetThuc) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        LocalDateTime batDauDateTime = LocalDateTime.parse(ngayBatDau, formatter);
        LocalDateTime ketThucDateTime = LocalDateTime.parse(ngayKetThuc, formatter);

        return ketThucDateTime.isAfter(batDauDateTime);
    }

    public boolean isNgayKetThucAfterNgayHienTai(String ngayKetThuc) {

        LocalDateTime ngayKT = LocalDateTime.parse(ngayKetThuc, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String ngayHT1 = currentDateTime.format(formatter);
        String ngayKT1 = ngayKT.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));


        LocalDateTime hienTaiDateTime = LocalDateTime.parse(ngayHT1, formatter);
        LocalDateTime ketThucDateTime = LocalDateTime.parse(ngayKT1, formatter);

        return ketThucDateTime.isAfter(hienTaiDateTime);
    }

    public boolean isNgayKetThucAfterNgayHienTaiupdate(String ngayKetThuc) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String ngayHT1 = currentDateTime.format(formatter);

        LocalDateTime hienTaiDateTime = LocalDateTime.parse(ngayHT1, formatter);
        LocalDateTime ketThucDateTime = LocalDateTime.parse(ngayKetThuc, formatter);

        return ketThucDateTime.isAfter(hienTaiDateTime);
    }


//    @GetMapping("/hienthi")
//    public ResponseEntity hienThi(
//            Model model,
//            @ModelAttribute("km") KhuyenMai khuyenMai,
//            @ModelAttribute("kmupdate") KhuyenMai khuyenMaiupdate
//
//    ) {
//        model.addAttribute("khuyenMaiRepository", khuyenMaiRepository);
//
//        model.addAttribute("dulieu", khuyenMaiRepository.findAll());
//
//        model.addAttribute("contentPage", "");
//
//        Long max = sanPhamChiTietService.findAll().stream()
//                .map(SanPhamChiTiet::getGiaBan)
//                .filter(giaBan -> giaBan != null)
//                .max(BigDecimal::compareTo)
//                .map(BigDecimal::longValue)
//                .orElse(0L);
//
//        model.addAttribute("max", max.toString());
//
//        return ResponseEntity.ok(khuyenMai);
//    }

    @GetMapping("/hienthi")
    public String hienthiKM(Model model) {
        List<KhuyenMai> danhSachKhuyenMai = khuyenMaiRepository.findAll();

        model.addAttribute("danhSachKhuyenMai", danhSachKhuyenMai);

        return "";
    }





    @PostMapping("/tim-kiem-khuyen-mai")
    public String timKiemKhuyenMai(
            Model model,
            @RequestParam("timkiem") String timkiem) {

        if (timkiem == null || timkiem.isEmpty()) {
            model.addAttribute("dulieu", new ArrayList<KhuyenMai>());
            model.addAttribute("mes", "Vui lòng nhập từ khóa tìm kiếm.");
            return "";
        }

        List<KhuyenMai> dulieu = khuyenMaiRepository.timkiemKM(timkiem);
        model.addAttribute("dulieu", dulieu);
        model.addAttribute("khuyenMaiRepository", khuyenMaiRepository);

        if (dulieu.isEmpty()) {
            model.addAttribute("mes", "Không tìm thấy khuyến mãi nào phù hợp.");
        } else {
            model.addAttribute("mes", "Tìm kiếm thành công.");
        }
        model.addAttribute("contentPage", "");

        return "";
    }



}
