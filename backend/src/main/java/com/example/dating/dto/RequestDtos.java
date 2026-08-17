package com.example.dating.dto;

import com.example.dating.entity.RequestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class RequestDtos {
    public record CreateRequest(
            @Size(max = 100) String recipientName,
            @NotBlank @Size(max = 300) String question,
            @Size(max = 30) String theme) {}

    public record CreateResponse(String token, String shareUrl, String question, String recipientName, String theme) {}

    public record PublicResponse(String token, String question, String recipientName,
                                 RequestStatus status, int noClickCount, String theme) {}

    public record SubmitResponse(@NotBlank String answer) {}

    public record DashboardItem(Long id, String token, String question, String recipientName,
                                RequestStatus status, int noClickCount, String theme, Instant createdAt, Instant respondedAt,
                                String shareUrl) {}
}
