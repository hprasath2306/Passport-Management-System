package com.pms.user_service.DTO;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDto {

    @NotBlank(message = "Customer ID or Phone Number is required")
    private String customerIdOrPhone;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequestDto() {}

    public LoginRequestDto(String customerIdOrPhone, String password) {
        this.customerIdOrPhone = customerIdOrPhone;
        this.password = password;
    }

    public String getCustomerIdOrPhone() {
        return customerIdOrPhone;
    }

    public void setCustomerIdOrPhone(String customerIdOrPhone) {
        this.customerIdOrPhone = customerIdOrPhone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}