package com.example.shopshoes.server.service.impl;
import com.example.shopshoes.server.dto.request.address.CreateAddressRequest;
import com.example.shopshoes.server.dto.request.address.UpdateAddressRequest;
import com.example.shopshoes.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shopshoes.server.dto.request.employee.FindEmployeeRequest;
import com.example.shopshoes.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shopshoes.server.dto.response.EmployeeResponse;
import com.example.shopshoes.server.dto.response.user.SimpleUserResponse;
import com.example.shopshoes.server.entity.Account;
import com.example.shopshoes.server.entity.Address;
import com.example.shopshoes.server.entity.User;
import com.example.shopshoes.server.infrastructure.cloudinary.UploadImageToCloudinary;
import com.example.shopshoes.server.infrastructure.constant.Message;
import com.example.shopshoes.server.infrastructure.constant.Roles;
import com.example.shopshoes.server.infrastructure.constant.Status;
import com.example.shopshoes.server.infrastructure.email.SendEmailService;
import com.example.shopshoes.server.infrastructure.exception.rest.RestApiException;
import com.example.shopshoes.server.repository.AccountRepository;
import com.example.shopshoes.server.repository.AddressRepository;
import com.example.shopshoes.server.repository.UserReposiory;
import com.example.shopshoes.server.service.EmployeeService;
import com.example.shopshoes.server.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements  EmployeeService{
    @Autowired
    private UserReposiory userReposiory;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UploadImageToCloudinary imageToCloudinary;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<EmployeeResponse> findAll(FindEmployeeRequest req) {
        return userReposiory.getAll(req);
    }

    @Override
    public List<EmployeeResponse> searchDate(FindEmployeeRequest req) {
        return userReposiory.findByDate(req);
    }

    @Override
    public User create(CreateEmployeeRequest req, CreateAddressRequest addressRequest,
                       MultipartFile file) {
        User checkUser = userReposiory.getOneUserByPhoneNumber(req.getPhoneNumber());
        if (checkUser != null) {
            throw new RestApiException(Message.PHONENUMBER_USER_EXIST);
        }
        User checkEmail = userReposiory.getOneUserByEmail1(req.getEmail());
        if (checkEmail != null) {
            throw new RestApiException(Message.EMAIL_USER_EXIST);
        }
        User checkCitizenIdentity = userReposiory.getOneByCitizenIdentity(req.getCitizenIdentity());
        if (checkCitizenIdentity != null) {
            throw new RestApiException(Message.CITIZENIDENTITY_USER_EXIST);
        }
        // xử lý ảnh
        String urlImage = imageToCloudinary.uploadImage(file);

        //  thông tin user
        User user = User.builder()
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .status(req.getStatus())
                .dateOfBirth(req.getDateOfBirth())
                .gender(req.getGender())
                .citizenIdentity(req.getCitizenIdentity())
                .avata(urlImage) // đường dẫn ảnh từ url
                .build();
        userReposiory.save(user); // add user vào database
        User addressUser = userReposiory.getById(user.getId());

        String password = String.valueOf(new RandomNumberGenerator().generateRandom6DigitNumber());
        Account employeeAccount = new Account();
        employeeAccount.setUser(user);
        employeeAccount.setEmail(user.getEmail());
        employeeAccount.setRoles(Roles.ROLE_EMLOYEE);
        employeeAccount.setPassword(passwordEncoder.encode(password));
        employeeAccount.setStatus(Status.DANG_SU_DUNG);
        accountRepository.save(employeeAccount); // add tài khoản vào database

        //  địa chỉ user
        Address address = new Address();
        address.setStatus(Status.DANG_SU_DUNG);
        address.setWard(addressRequest.getWard());
        address.setToDistrictId(addressRequest.getToDistrictId());
        address.setProvinceId(addressRequest.getProvinceId());
        address.setLine(addressRequest.getLine());
        address.setProvince(addressRequest.getProvince());
        address.setDistrict(addressRequest.getDistrict());
        address.setWardCode(addressRequest.getWardCode());
        address.setUser(addressUser); // add địa chỉ vào database
        addressRepository.save(address);

        // gửi email
        String subject = "Xin chào, bạn đã đăng ký thành công tài khoản nhân viên BEE SHOES ";
        sendEmailService.sendEmailPasword(employeeAccount.getEmail(),subject,password);
        return user;
    }
    @Override
    @Transactional
    public User update(UpdateEmployeeRequest req,  UpdateAddressRequest addressRequest,
                       MultipartFile file) {
        String urlImage = imageToCloudinary.uploadImage(file);
        Optional<User> optional = userReposiory.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        User user = optional.get();
        if (!user.getPhoneNumber().equals(req.getPhoneNumber())) {
            User checkUser = userReposiory.getOneUserByPhoneNumber(req.getPhoneNumber());
            if (checkUser != null) {
                throw new RestApiException(Message.PHONENUMBER_USER_EXIST);
            }
        }

        if (!user.getEmail().equals(req.getEmail())) {
            User checkEmail = userReposiory.getOneUserByEmail1(req.getEmail());
            if (checkEmail != null) {
                throw new RestApiException(Message.EMAIL_USER_EXIST);
            }
        }

        if (!user.getCitizenIdentity().equals(req.getCitizenIdentity())) {
            User checkCitizenIdentity = userReposiory.getOneByCitizenIdentity(req.getCitizenIdentity());
            if (checkCitizenIdentity != null) {
                throw new RestApiException(Message.CITIZENIDENTITY_USER_EXIST);
            }
        }
        user.setFullName(req.getFullName());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setEmail(req.getEmail());
        user.setGender(req.getGender());
        user.setStatus(req.getStatus());
        user.setCitizenIdentity(req.getCitizenIdentity());
        user.setAvata(urlImage);
//         if (req.getPassword() != null) {
//            accountRepository.updatePasswordByUserId(user.getId(), req.getPassword());
//        }
//        if (req.getEmail() != null) {
//            accountRepository.updateEmailByUserId(user.getId(), req.getEmail());
//        }
        userReposiory.save(user); // update user vào database

        //  địa chỉ user
        Address addressUser=  addressRepository.getAddressByUserIdAndStatus(user.getId(), Status.DANG_SU_DUNG);
        Address address = new Address();
        address.setId(addressUser.getId());
        address.setWard(addressRequest.getWard());
        address.setToDistrictId(addressRequest.getToDistrictId());
        address.setProvinceId(addressRequest.getProvinceId());
        address.setLine(addressRequest.getLine());
        address.setProvince(addressRequest.getProvince());
        address.setStatus(Status.DANG_SU_DUNG);
        address.setDistrict(addressRequest.getDistrict());
        address.setWardCode(addressRequest.getWardCode());
        address.setUser(user);
        addressRepository.save(address);

        return user;
    }


    @Override
    public Boolean delete(String id) {
        Optional<User> optional = userReposiory.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        userReposiory.delete(optional.get());
        return null;
    }

    @Override
    public EmployeeResponse getOneById(String id) {
        Optional<EmployeeResponse> optional = userReposiory.getOneWithPassword(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }

}
