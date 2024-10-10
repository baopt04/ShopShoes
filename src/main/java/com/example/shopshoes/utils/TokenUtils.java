package com.example.shopshoes.utils;

import com.example.shopshoes.entity.KhachHang;
import com.example.shopshoes.reponsitory.KhachHangResponsitory;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;

@Component
public class TokenUtils {
    @Autowired
    private KhachHangResponsitory khachHangResponsitory;
    private SecretKey Key;
    private  static  final long EXPIRATION_TIME = 86400000;
    private Set<String> revokedTokens = new HashSet<>();
    private static final long TIME_FORGET_PASSWORD = 900000;

    public TokenUtils() {
        String keyword = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] bytes = Base64.getDecoder().decode(keyword.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(bytes, "HmacSHA256");
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts
                .builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String refreshToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String generateTokenForGetPassword(String email) {
        return Jwts
                .builder()
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + TIME_FORGET_PASSWORD))
                .signWith(Key)
                .compact();
    }

    public KhachHang validateForGetPassword(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(Key)
                    .build()
                    .parseClaimsJws(token);
            String email = claims.getBody().getSubject();
            if (isTokenRevoked(token)) {
                throw new RuntimeException("Token is revoked");
            }
            return khachHangResponsitory.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("Customer not found")
            );
        }catch (JwtException e){
            return null;
        }
    }
// revokeToken token
    public void revokeToken(String token) {
        revokedTokens.add(token);
    }
// check token
    public boolean isTokenRevoked(String token) {
        return revokedTokens.contains(token);
    }
    public String extractUsername(String token) {
        return  extractClaims(token , Claims::getSubject);
    }
    public <T> T  extractClaims(String token , Function<Claims , T> function){
        return  function
                .apply(Jwts
                        .parser()
                        .verifyWith(Key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload());
    }
    public boolean isValidToken(String token, UserDetails userDetails) {
       final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isValidTime( token));
    }

    public boolean isValidTime(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
