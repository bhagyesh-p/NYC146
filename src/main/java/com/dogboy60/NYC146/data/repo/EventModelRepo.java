package com.dogboy60.NYC146.data.repo;

import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.dogboy60.NYC146.data.model.EventResource;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;

import java.util.Collection;


public interface EventModelRepo extends CouchbasePagingAndSortingRepository<EventDocument,String>, EventModelCustomRepo {

    Collection<EventDocument> findByName(String name);

    Collection<EventDocument> findBySeasonAndAndPrice(String Season, String Price);

}
