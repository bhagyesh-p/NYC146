package com.dogboy60.NYC146.data.repo;

import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.dogboy60.NYC146.data.model.EventResource;

import java.util.Collection;

public interface EventModelCustomRepo {

    static final String SUMMER = "summer";
    static final String WINTER = "winter";
    static final String SPRING = "spring";
    static final String FALL = "fall";

    static final String CHEAP = "cheap";
    static final String FAIR = "fair";
    static final String EXPENSIVE = "expensive";
    void updateEvent(EventDocument eventDocument);

    void removeEvent(EventDocument EventDocument);

    void addPost(EventDocument eventDocument);

    Collection<EventDocument> getPost(String Season, String price);

    boolean contains(String id);

    boolean contains(EventDocument eventDocument);

    EventDocument getPost(String id);
}
