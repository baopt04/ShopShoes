package com.example.shopshoes.server.service;
import com.example.shopshoes.server.dto.request.address.CreateAddressRequest;
import com.example.shopshoes.server.dto.request.address.UpdateAddressRequest;
import com.example.shopshoes.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shopshoes.server.dto.request.employee.FindEmployeeRequest;
import com.example.shopshoes.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shopshoes.server.dto.response.EmployeeResponse;
import com.example.shopshoes.server.dto.response.user.SimpleUserResponse;
import com.example.shopshoes.server.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
public interface EmployeeService {

    List<EmployeeResponse> findAll( FindEmployeeRequest req);

    List<EmployeeResponse> searchDate(final FindEmployeeRequest req);

    User create(CreateEmployeeRequest req , CreateAddressRequest addressRequest,
                MultipartFile file);

    User update(final UpdateEmployeeRequest req,  UpdateAddressRequest addressRequest,
                MultipartFile file);

    Boolean delete(String id);

    EmployeeResponse  getOneById(String id);
}
