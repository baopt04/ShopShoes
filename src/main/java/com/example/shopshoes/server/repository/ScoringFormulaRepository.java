package com.example.shopshoes.server.repository;

import com.example.shopshoes.server.entity.ScoringFormula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScoringFormulaRepository extends JpaRepository<ScoringFormula,String> {

    List<ScoringFormula> findAllByOrderByCreatedDateDesc();
}
