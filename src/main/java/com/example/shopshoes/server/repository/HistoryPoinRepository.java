package com.example.shopshoes.server.repository;

import com.example.shopshoes.server.dto.response.historypoin.HistoryPoinResponse;
import com.example.shopshoes.server.entity.HistoryPoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface HistoryPoinRepository extends JpaRepository<HistoryPoin, String> {

    @Query(value = """
               SELECT b.code, h.created_date, h.value, h.type_poin, b.total_money, s.exchange_rate_money, s.exchange_rate_poin 
               FROM history_poin h
                       LEFT JOIN scoring_formula s ON s.id = h.id_scoring_formula
                       LEFT JOIN bill b ON b.id = h.id_bill
                       LEFT JOIN user u ON u.id = h.id_user
                       WHERE u.id = :id
                       ORDER BY h.created_date DESC
            """, nativeQuery = true)
    List<HistoryPoinResponse> getAllHisToryPoinByIdUser(@Param("id") String id);
}
