package com.pms.passport_visa_service.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "booklet_types")
public class BookletType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booklet_type_id")
    private Integer bookletTypeId;

    @NotNull(message = "Pages is required")
    @Column(name = "pages", nullable = false)
    private Integer pages;

    @NotBlank(message = "ID format is required")
    @Column(name = "id_format", nullable = false)
    private String idFormat;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public BookletType() {}

    public BookletType(Integer pages, String idFormat) {
        this.pages = pages;
        this.idFormat = idFormat;
    }

    // Getters and Setters
    public Integer getBookletTypeId() {
        return bookletTypeId;
    }

    public void setId(Integer id) {
        this.bookletTypeId = id.intValue();
    }

    public void setBookletTypeId(Integer bookletTypeId) {
        this.bookletTypeId = bookletTypeId;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public String getIdFormat() {
        return idFormat;
    }

    public void setIdFormat(String idFormat) {
        this.idFormat = idFormat;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "BookletType{" +
                "bookletTypeId=" + bookletTypeId +
                ", pages=" + pages +
                ", idFormat='" + idFormat + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
