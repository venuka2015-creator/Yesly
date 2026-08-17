package com.example.dating.service;

import com.example.dating.dto.RequestDtos;
import com.example.dating.entity.DatingRequest;
import com.example.dating.entity.RequestStatus;
import com.example.dating.entity.User;
import com.example.dating.repository.DatingRequestRepository;
import com.example.dating.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Set;

@Service
public class RequestService {
    private final DatingRequestRepository requests;
    private final UserRepository users;
    private final SecureRandom random = new SecureRandom();
    private final String frontendUrl;
    private static final Set<String> THEMES = Set.of("cherry", "rose", "lavender", "sage", "peach", "midnight");

    public RequestService(DatingRequestRepository requests, UserRepository users,
                          @Value("${app.frontend-url}") String frontendUrl) {
        this.requests = requests; this.users = users; this.frontendUrl = frontendUrl;
    }

    @Transactional
    public RequestDtos.CreateResponse create(String email, RequestDtos.CreateRequest dto) {
        User sender = users.findByEmailIgnoreCase(email).orElseThrow();
        DatingRequest r = new DatingRequest();
        r.setSender(sender);
        r.setQuestion(dto.question().trim());
        r.setTheme(normalizeTheme(dto.theme()));
        r.setRecipientName(dto.recipientName() == null || dto.recipientName().isBlank() ? null : dto.recipientName().trim());
        r.setPublicToken(uniqueToken());
        requests.save(r);
        return new RequestDtos.CreateResponse(r.getPublicToken(), shareUrl(r.getPublicToken()), r.getQuestion(), r.getRecipientName(), r.getTheme());
    }

    @Transactional(readOnly = true)
    public RequestDtos.PublicResponse publicRequest(String token) {
        DatingRequest r = get(token);
        return new RequestDtos.PublicResponse(r.getPublicToken(), r.getQuestion(), r.getRecipientName(), r.getStatus(), r.getNoClickCount(), r.getTheme());
    }

    @Transactional
    public RequestDtos.PublicResponse respond(String token, RequestDtos.SubmitResponse dto) {
        DatingRequest r = get(token);
        String answer = dto.answer().trim().toUpperCase();
        if (!answer.equals("YES") && !answer.equals("NO")) throw new IllegalArgumentException("Answer must be YES or NO");
        if (r.getStatus() != RequestStatus.PENDING) {
            return new RequestDtos.PublicResponse(r.getPublicToken(), r.getQuestion(), r.getRecipientName(), r.getStatus(), r.getNoClickCount(), r.getTheme());
        }
        if (answer.equals("NO")) {
            r.setNoClickCount(r.getNoClickCount() + 1);
        } else {
            r.setStatus(RequestStatus.ACCEPTED);
            r.setRespondedAt(Instant.now());
        }
        requests.save(r);
        return new RequestDtos.PublicResponse(r.getPublicToken(), r.getQuestion(), r.getRecipientName(), r.getStatus(), r.getNoClickCount(), r.getTheme());
    }

    @Transactional(readOnly = true)
    public List<RequestDtos.DashboardItem> dashboard(String email) {
        User sender = users.findByEmailIgnoreCase(email).orElseThrow();
        return requests.findAllBySenderIdOrderByCreatedAtDesc(sender.getId()).stream()
                .map(r -> new RequestDtos.DashboardItem(r.getId(), r.getPublicToken(), r.getQuestion(), r.getRecipientName(), r.getStatus(), r.getNoClickCount(), r.getTheme(), r.getCreatedAt(), r.getRespondedAt(), shareUrl(r.getPublicToken())))
                .toList();
    }

    private DatingRequest get(String token) {
        if (token == null || token.length() < 20 || token.length() > 64) throw new IllegalArgumentException("Invalid request link");
        return requests.findByPublicToken(token).orElseThrow(() -> new IllegalArgumentException("Request not found"));
    }

    private String uniqueToken() {
        for (int i = 0; i < 5; i++) {
            byte[] bytes = new byte[24]; random.nextBytes(bytes);
            String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
            if (!requests.existsByPublicToken(token)) return token;
        }
        throw new IllegalStateException("Could not create request token");
    }

    private String normalizeTheme(String theme) {
        if (theme == null || theme.isBlank()) return "cherry";
        String normalized = theme.trim().toLowerCase();
        if (!THEMES.contains(normalized)) throw new IllegalArgumentException("Invalid theme");
        return normalized;
    }

    private String shareUrl(String token) { return frontendUrl.replaceAll("/$", "") + "/request/" + token; }
}
