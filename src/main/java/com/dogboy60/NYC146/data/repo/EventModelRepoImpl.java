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

    /**
     * Events is updated, the ID is automatically calculated.
     * @param eventDocument the document that you want to update (this is the new Version)
     */
    @Override
    public void updateEvent(EventDocument eventDocument) {
        eventModelRepo.save(eventDocument);
    }

    /**
     * Events is updated, the ID is passes in via the POJO.
     * @param eventDocument
     */
    @Override
    public void removeEvent(EventDocument eventDocument) {
        eventModelRepo.deleteById(eventDocument.getId());
    }

    /**
     * ID Generated and set to POJO
     * If it exists then Error occurs
     * @param eventDocument the document that is to be added
     */
    @Override
    public void addPost(EventDocument eventDocument) {
        String id = IDgenerator(eventDocument.getName(),eventDocument.getAddress());
        eventDocument.setId(id);
        if(!this.contains(id)){
            eventModelRepo.save(eventDocument);
        }else{
            throw  new IllegalArgumentException("ID error");
        }
    }

    /**
     *
     * @param Season which season is wanted
     * @param Price what price point is wanted
     * @return returns a post that matches the price and season (collection) though can be empty
     */
    @Override
    public Collection<EventDocument> getPost(String Season, String Price) {
        Collection<EventDocument> test = eventModelRepo.findBySeasonAndAndPrice(Season,Price);
        return test;
    }

    /**
     *
     * @param id ID of the document we are looking for
     * @return true or false based on if the Doc with given ID exists
     */
    @Override
    public boolean contains(String id) {
            JsonDocument doc = JsonDocument.create(id, JsonObject.create().put("temp", "temp"));
            return bucket.exists(doc);

    }
    /**
     *
     * @param eventDocument eventDocument has its ID taken and then looks for it
     * @return true or false based on if the Doc with given eventDocument exists
     */
    @Override
    public boolean contains(EventDocument eventDocument) {
        return contains(eventDocument.getId());

    }

    /**
     * If Doc exist it will return ot else it will throw an error
     * @param ID The ID of the Doc we are looking for
     * @return the document that we just requested
     */
    @Override
    public EventDocument getPost(String ID) {
        EventDocument eventDocument = null;
        if(eventModelRepo.contains(ID)) {
            JsonDocument json = bucket.get(ID);
            eventDocument = JTO.convert(ID,json,EventDocument.class);
        }else{
            throw  new IllegalArgumentException("Item does not exist?");
        }
        return eventDocument;
    }

    @Deprecated
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

    /**
     * format: Name_( Address.noSpace() )
     * @param name Name of event
     * @param address Address of the Event
     * @return THe ID generated with given Info
     */
    public String IDgenerator(String name,String address){
        String id = name +"_"+ address.replace(",","").replaceAll("\\s+","");
        return id;
    }

}
