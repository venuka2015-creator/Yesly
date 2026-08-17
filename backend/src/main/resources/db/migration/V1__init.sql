CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE dating_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    public_token VARCHAR(64) NOT NULL UNIQUE,
    sender_id BIGINT NOT NULL,
    recipient_name VARCHAR(100) NULL,
    question VARCHAR(300) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    no_click_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    responded_at TIMESTAMP(6) NULL,
    CONSTRAINT fk_request_sender FOREIGN KEY (sender_id) REFERENCES users(id),
    INDEX idx_request_sender (sender_id),
    INDEX idx_request_token (public_token)
);
