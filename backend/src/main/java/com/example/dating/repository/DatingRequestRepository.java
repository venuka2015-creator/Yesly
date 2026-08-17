package com.example.dating.repository;
import com.example.dating.entity.DatingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface DatingRequestRepository extends JpaRepository<DatingRequest, Long> {
    Optional<DatingRequest> findByPublicToken(String publicToken);
    List<DatingRequest> findAllBySenderIdOrderByCreatedAtDesc(Long senderId);
    boolean existsByPublicToken(String publicToken);
}
