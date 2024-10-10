package com.example.shopshoes.service;

import com.example.shopshoes.entity.NhanVien;
import com.example.shopshoes.reponsitory.NhanVienReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class NhanVienImp implements UserDetailsService {
   @Autowired
   private NhanVienReponsitory nhanVienReponsitory;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      return nhanVienReponsitory.findByEmail(username).orElseThrow(
              () -> new UsernameNotFoundException("Staff not found")
      );
    }
}
