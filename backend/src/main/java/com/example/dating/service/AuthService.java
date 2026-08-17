package com.example.dating.service;

import com.example.dating.dto.AuthDtos;
import com.example.dating.entity.User;
import com.example.dating.repository.UserRepository;
import com.example.dating.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    @Transactional
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest dto) {
        String email = dto.email().trim().toLowerCase();
        if (users.existsByEmailIgnoreCase(email)) throw new IllegalArgumentException("Email already registered");
        User u = new User(); u.setName(dto.name().trim()); u.setEmail(email); u.setPasswordHash(encoder.encode(dto.password()));
        users.save(u);
        return new AuthDtos.AuthResponse(jwt.generate(u.getId(), u.getEmail()), u.getName(), u.getEmail());
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest dto) {
        User u = users.findByEmailIgnoreCase(dto.email().trim()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!encoder.matches(dto.password(), u.getPasswordHash())) throw new IllegalArgumentException("Invalid email or password");
        return new AuthDtos.AuthResponse(jwt.generate(u.getId(), u.getEmail()), u.getName(), u.getEmail());
    }
}
