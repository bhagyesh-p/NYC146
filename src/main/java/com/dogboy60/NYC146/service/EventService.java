package com.dogboy60.NYC146.service;

import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.dogboy60.NYC146.data.model.EventResource;

public interface EventService {
    int createAPost(EventDetails EventDetails);

    // id is created in next part
    void updateEvent(EventDetails EventDetails);

    int createAPost(String name, String info, String imageLocation, String webLink, String linkCaption, String imageCaption, String season, String price, String address);

    void removeEvent(EventDetails eventDetails);

    EventDetails getAEvent(String Season, String Price);

    EventDetails getEvent(String ID);

    int validatePostData(EventDetails eventDetails);
}
