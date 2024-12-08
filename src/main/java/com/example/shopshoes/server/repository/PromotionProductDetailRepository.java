package com.example.shopshoes.server.repository;

import com.example.shopshoes.server.entity.PromotionProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PromotionProductDetailRepository extends JpaRepository<PromotionProductDetail,String> {
    @Query(value = "select ppd from PromotionProductDetail ppd where ppd.productDetail.id =:idProductDetail and ppd.promotion.id =:idPromotion")
    PromotionProductDetail getByProductDetailAndPromotion(@Param("idProductDetail")String idProductDetail,@Param("idPromotion") String idPromotion );

    @Query("SELECT pdd FROM PromotionProductDetail  pdd WHERE pdd.promotion.id = :idPromotion")
    List<PromotionProductDetail> findAllByIdPromotion(@Param("idPromotion") String idPromotion);
}
