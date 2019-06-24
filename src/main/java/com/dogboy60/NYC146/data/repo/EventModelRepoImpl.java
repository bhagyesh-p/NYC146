package com.dogboy60.NYC146.data.repo;

import com.couchbase.client.java.Bucket;
import com.couchbase.client.java.document.JsonDocument;
import com.couchbase.client.java.document.json.JsonObject;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.dogboy60.NYC146.manager.JsonToObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collection;

public class EventModelRepoImpl implements EventModelCustomRepo {
    @Autowired
    private JsonToObject JTO;
    @Autowired
    private EventModelRepo eventModelRepo;
    @Autowired
    private Bucket bucket;

    @Override
    public void updateEvent(EventDocument eventDocument) {
        eventModelRepo.save(eventDocument);
    }

    @Override
    public void removeEvent(EventDocument eventDocument) {
        eventModelRepo.deleteById(eventDocument.getId());
    }

    @Override
    public void addPost(EventDocument eventDocument) {
        String id = IDgenerator(eventDocument.getName(),eventDocument.getAddress());
        if(!this.contains(id)){
            eventModelRepo.save(eventDocument);
        }else{
            throw  new IllegalArgumentException("ID error");
        }
    }

    @Override
    public Collection<EventDocument> getPost(String Season, String Price) {
        Collection<EventDocument> test = eventModelRepo.findBySeasonAndAndPrice(Season,Price);
        return test;
    }

    @Override
    public boolean contains(String id) {
            JsonDocument doc = JsonDocument.create(id, JsonObject.create().put("temp", "temp"));
            return bucket.exists(doc);

    }

    @Override
    public boolean contains(EventDocument eventDocument) {
        return contains(eventDocument.getId());

    }

    @Override
    public EventDocument getPost(String ID) {
        EventDocument eventDocument = null;
        if(eventModelRepo.contains(ID)) {
            JsonDocument json = bucket.get(String.valueOf(ID));
            eventDocument = JTO.convert(ID,json,EventDocument.class);
        }
        return eventDocument;
    }

    public EventDocument addPostViaEventDetail(EventDocument eventDocument) {
        if(eventDocument.getId() == null || eventDocument.getId().isEmpty()) {
            if(!eventDocument.getName().isEmpty()) {
                Collection<EventDocument> documentCollection = eventModelRepo.findByName(eventDocument.getName());
                if(documentCollection.size() == 1){
                    ArrayList<EventDocument> eventDocumentArrayList = new ArrayList<EventDocument>();
                    documentCollection.forEach((document) -> {
                        eventDocumentArrayList.add(document);
                    });
                    eventDocument.setId(eventDocumentArrayList.get(0).getId());
                    return eventDocument;
                }else if(documentCollection.size() == 0){
                    eventDocument.setId(IDgenerator(eventDocument.getName(),eventDocument.getAddress()));
                    return eventDocument;
                }else{
                    throw new IllegalArgumentException("item is duplicated");
                }
            }else {
                throw new IllegalArgumentException("no name for item is set");
            }
        }
        return eventDocument;
    }

    public String IDgenerator(String name,String address){
        String id = name +"_"+ address.replace(",","").trim();
        return id;
    }

}
