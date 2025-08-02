package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.BookletType;
import java.util.List;
import java.util.Optional;

public interface BookletTypeService {
    List<BookletType> getAllBookletTypes();
    Optional<BookletType> getBookletTypeById(Integer id);
    BookletType createBookletType(BookletType bookletType);
    BookletType updateBookletType(Integer id, BookletType bookletType);
    void deleteBookletType(Integer id);
}