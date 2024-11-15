package com.example.shopshoes.controller;

import com.example.shopshoes.reponsitory.KhuyenMaiRepository;
import com.example.shopshoes.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/KhuyenMai")
public class KhuyenMaiController {

    @Autowired
    KhuyenMaiService khuyenMaiService;

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

//    @GetMapping("/DanhSachKM")
//    public ResponseEntity<?> danhSachKM(){
//        List<KhuyenMai> list =khuyenMaiService.findAll();
//        return ResponseEntity.ok(list);
//
//    }
//
//    @GetMapping("/DanhSachKM/Search/LMK")
//    public ResponseEntity<?> searchByLoaiKhuyenMai(
//            @RequestParam String loaiKM,
//            @RequestParam(defaultValue = "0") Integer page,
//            @RequestParam(defaultValue = "10") Integer size) {
//
//        if (loaiKM == null || loaiKM.isEmpty()) {
//            return ResponseEntity.badRequest().body("loaiKM không được để trống.");
//        }
//
//        try {
//            Pageable pageable = PageRequest.of(page,size);
//            Page<KhuyenMai> list = khuyenMaiRepository.PageByLoaiKhuyenMai(loaiKM, pageable);
//
//            if (list.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lỗi /DanhSachKM/Search/LMK 1");
//            }
//
//            return ResponseEntity.ok(list);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi /DanhSachKM/Search/LMK 2");
//        }
//    }


}
