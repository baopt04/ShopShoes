package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.TypePoin;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "history_poin")
@AllArgsConstructor
@NoArgsConstructor
public class HistoryPoin extends PrimaryEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_scoring_formula",referencedColumnName = "id")
    private ScoringFormula scoringFormula;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_bill",referencedColumnName = "id")
    private Bill bill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user",referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private TypePoin typePoin;

    private int value;

}
