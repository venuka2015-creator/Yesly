package com.example.dating.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "dating_requests")
public class DatingRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "public_token", nullable = false, unique = true, length = 64)
    private String publicToken;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    @Column(name = "recipient_name", length = 100) private String recipientName;
    @Column(nullable = false, length = 300) private String question;
    @Column(nullable = false, length = 30) private String theme = "cherry";
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private RequestStatus status = RequestStatus.PENDING;
    @Column(name = "no_click_count", nullable = false) private int noClickCount;
    @Column(name = "created_at", nullable = false) private Instant createdAt;
    @Column(name = "responded_at") private Instant respondedAt;

    @PrePersist void prePersist() { if (createdAt == null) createdAt = Instant.now(); }
    public Long getId() { return id; }
    public String getPublicToken() { return publicToken; }
    public void setPublicToken(String publicToken) { this.publicToken = publicToken; }
    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }
    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
    public int getNoClickCount() { return noClickCount; }
    public void setNoClickCount(int noClickCount) { this.noClickCount = noClickCount; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getRespondedAt() { return respondedAt; }
    public void setRespondedAt(Instant respondedAt) { this.respondedAt = respondedAt; }
}
