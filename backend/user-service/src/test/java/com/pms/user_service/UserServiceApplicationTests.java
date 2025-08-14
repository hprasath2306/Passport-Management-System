package com.pms.user_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pms.user_service.Controller.UserController;
import com.pms.user_service.Entity.User;
import com.pms.user_service.Entity.User.CitizenType;
import com.pms.user_service.Entity.User.Occupation;
import com.pms.user_service.Entity.User.RegistrationType;
import com.pms.user_service.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.MediaType;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class,
        excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = createSampleUser();
    }

    private User createSampleUser() {
        User user = new User();
        user.setUserId("PASS-1234");
        user.setCustomerId("123456");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setDateOfBirth(LocalDate.of(1990, 1, 1));
        user.setAge(34);
        user.setCitizenType(CitizenType.ADULT);
        user.setPhoneNumber("9876543210");
        user.setEmail("john@example.com");
        user.setPassword("encodedPassword");
        user.setAddress("123 Street");
        user.setCity("New York");
        user.setState("NY");
        user.setPincode("12345");
        user.setOccupation(Occupation.PRIVATE_EMPLOYEE);
        user.setRegistrationType(RegistrationType.PASSPORT);
        user.setRole(User.Role.USER);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return user;
    }

    @Test
    @DisplayName("Should return user by ID successfully")
    void testGetUserById_Success() throws Exception {
        Mockito.when(userService.getUserById("PASS-1234")).thenReturn(sampleUser);

        mockMvc.perform(get("/api/users/PASS-1234"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(String.valueOf(MediaType.APPLICATION_JSON)))
                .andExpect(jsonPath("$.userId").value("PASS-1234"))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.phoneNumber").value("9876543210"))
                .andExpect(jsonPath("$.customerId").value("123456"))
                .andExpect(jsonPath("$.age").value(34))
                .andExpect(jsonPath("$.citizenType").value("ADULT"))
                .andExpect(jsonPath("$.occupation").value("PRIVATE_EMPLOYEE"))
                .andExpect(jsonPath("$.registrationType").value("PASSPORT"));
    }
}