package com.example.shopshoes.server.service;

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
