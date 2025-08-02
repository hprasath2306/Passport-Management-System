package com.pms.passport_visa_service.ServiceImpl;

import com.pms.passport_visa_service.Entity.BookletType;
import com.pms.passport_visa_service.Repository.BookletTypeRepository;
import com.pms.passport_visa_service.Service.BookletTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookletTypeServiceImpl implements BookletTypeService {

    @Autowired
    private BookletTypeRepository bookletTypeRepository;

    @Override
    public List<BookletType> getAllBookletTypes() {
        return bookletTypeRepository.findAll();
    }

    @Override
    public Optional<BookletType> getBookletTypeById(Integer id) {
        return bookletTypeRepository.findById(id);
    }

    @Override
    public BookletType createBookletType(BookletType bookletType) {
        return bookletTypeRepository.save(bookletType);
    }

    @Override
    public BookletType updateBookletType(Integer id, BookletType bookletType) {
        if (bookletTypeRepository.existsById(id)) {
            bookletType.setId(id);
            return bookletTypeRepository.save(bookletType);
        }
        throw new RuntimeException("BookletType not found with id: " + id);
    }

    @Override
    public void deleteBookletType(Integer id) {
        if (bookletTypeRepository.existsById(id)) {
            bookletTypeRepository.deleteById(id);
        } else {
            throw new RuntimeException("BookletType not found with id: " + id);
        }
    }
}