package com.pms.passport_visa_service.Controller;

import com.pms.passport_visa_service.Entity.BookletType;
import com.pms.passport_visa_service.Service.BookletTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/booklet-types")
public class BookletTypeController {

    @Autowired
    private BookletTypeService bookletTypeService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<BookletType>> getAllBookletTypes() {
        List<BookletType> bookletTypes = bookletTypeService.getAllBookletTypes();
        return ResponseEntity.ok(bookletTypes);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<BookletType> getBookletTypeById(@PathVariable Integer id) {
        Optional<BookletType> bookletType = bookletTypeService.getBookletTypeById(id);
        return bookletType.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<BookletType> createBookletType(@RequestBody BookletType bookletType) {
        BookletType createdBookletType = bookletTypeService.createBookletType(bookletType);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBookletType);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<BookletType> updateBookletType(@PathVariable Integer id,
                                                         @RequestBody BookletType bookletType) {
        try {
            BookletType updatedBookletType = bookletTypeService.updateBookletType(id, bookletType);
            return ResponseEntity.ok(updatedBookletType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteBookletType(@PathVariable Integer id) {
        try {
            bookletTypeService.deleteBookletType(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
