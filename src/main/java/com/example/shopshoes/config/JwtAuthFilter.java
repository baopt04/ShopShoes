package com.example.shopshoes.config;

import com.example.shopshoes.service.KhachHangImp;
import com.example.shopshoes.service.NhanVienImp;
import com.example.shopshoes.utils.TokenUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private KhachHangImp khachHangImp;
    @Autowired
    private NhanVienImp nhanVienImp;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("No Authorization header");
            filterChain.doFilter(request, response);
            return;
        }

         jwtToken = authHeader.substring(7);
         userEmail = tokenUtils.extractUsername(jwtToken);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = loadUser(userEmail);
            if ( tokenUtils.isValidToken(jwtToken, userDetails)) {
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);
                System.out.println("Authentication Success");
            } else {
                System.out.println("Invalid JWT Token or User not found");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
    private UserDetails loadUser(String username) {
        try {
            return nhanVienImp.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            return khachHangImp.loadUserByUsername(username);
        }
    }
}
