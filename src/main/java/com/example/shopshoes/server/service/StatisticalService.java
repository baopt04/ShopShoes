package com.example.shopshoes.server.service;


import com.example.shopshoes.server.dto.request.statistical.FindBillDateRequest;
import com.example.shopshoes.server.dto.response.statistical.*;

import java.util.List;


public interface StatisticalService {
    List<StatisticalDayResponse> getAllStatisticalDay();
    List<StatisticalMonthlyResponse> getAllStatisticalMonth();
    List<StatisticalMonthlyResponse> getAllStatisticalYear();
    List<StatisticalDayResponse> getAllStatisticalDayPrevious();
    List<StatisticalMonthlyResponse> getAllStatisticalMonthPrevious();
    List<StatisticalMonthlyResponse> getAllStatisticalYearPrevious();
    List<StatisticalStatusBillResponse> getAllStatisticalStatusBill(final FindBillDateRequest findBillDateRequest);
    List<StatisticalBestSellingProductResponse> getAllStatisticalBestSellingProduct(final FindBillDateRequest findBillDateRequest);
    List<StatisticalBillDateResponse> getAllStatisticalBillDate(final FindBillDateRequest findBillDateRequest);
    List<StatisticalProductDateResponse> getAllStatisticalProductDate(final FindBillDateRequest findBillDateRequest);
    List<StatisticalBestSellingProductResponse> getAllStatisticalProductStock();

}
