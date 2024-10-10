package com.example.shopshoes.service;

import com.example.shopshoes.reponsitory.KhachHangResponsitory;
import com.example.shopshoes.reponsitory.NhanVienReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class KhachHangImp implements UserDetailsService {
  @Autowired
  private KhachHangResponsitory khachHangResponsitory;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return khachHangResponsitory.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Customer not found")
        );
    }
}
