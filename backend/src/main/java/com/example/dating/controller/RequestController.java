package com.example.dating.controller;

import com.example.dating.dto.RequestDtos;
import com.example.dating.service.RequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService service;
    public RequestController(RequestService service) { this.service = service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RequestDtos.CreateResponse create(Authentication auth, @Valid @RequestBody RequestDtos.CreateRequest dto) {
        return service.create(auth.getName(), dto);
    }

    @GetMapping("/public/{token}")
    public RequestDtos.PublicResponse publicRequest(@PathVariable String token) { return service.publicRequest(token); }

    @PostMapping("/public/{token}/response")
    public RequestDtos.PublicResponse respond(@PathVariable String token, @Valid @RequestBody RequestDtos.SubmitResponse dto) {
        return service.respond(token, dto);
    }

    @GetMapping("/mine")
    public List<RequestDtos.DashboardItem> mine(Authentication auth) { return service.dashboard(auth.getName()); }
}
