package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.bill.billcustomer.BillDetailOnline;
import com.example.shopshoes.server.dto.request.payMentMethod.CreatePayMentMethodTransferRequest;
import com.example.shopshoes.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shopshoes.server.dto.request.paymentsmethod.QuantityProductPaymentRequest;
import com.example.shopshoes.server.dto.response.payment.PayMentVnpayResponse;
import com.example.shopshoes.server.entity.PaymentsMethod;
import com.example.shopshoes.server.entity.ProductDetail;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;


public interface PaymentsMethodService {

    List<PaymentsMethod> findByAllIdBill(String idBill);

    PaymentsMethod create(String idBill, String idEmployees, CreatePaymentsMethodRequest request);

    BigDecimal sumTotalMoneyByIdBill(String idBill);

    String payWithVNPAY(CreatePayMentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException;

    boolean refundVnpay(String idUser,  boolean status, String codeBill, HttpServletRequest request) ;

    boolean refundPayment(String idUser, String codeBill, CreatePaymentsMethodRequest request);

    boolean paymentSuccess( String idEmployees,PayMentVnpayResponse response);

    boolean changeQuantityProduct(QuantityProductPaymentRequest request);

    boolean updatepayMent(String idBill,String idEmployees,List<String> ids);
    String payWithVNPAYOnline(CreatePayMentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException;

    boolean minusQuantityProductDetail(List<BillDetailOnline> listProductDetail);
    boolean refundQuantityProductDetail(List<BillDetailOnline> listProductDetail);
    PaymentsMethod findByBill(String idBill);
}