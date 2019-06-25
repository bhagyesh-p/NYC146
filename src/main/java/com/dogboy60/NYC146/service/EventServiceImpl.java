package com.dogboy60.NYC146.service;

import com.dogboy60.NYC146.controller.ErrorHandlingController;
import com.dogboy60.NYC146.data.model.AddressModel;
import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.dogboy60.NYC146.data.repo.EventModelCustomRepo;
import com.dogboy60.NYC146.data.repo.EventModelRepo;
import com.dogboy60.NYC146.data.repo.EventModelRepoImpl;
import com.smartystreets.api.ClientBuilder;
import com.smartystreets.api.StaticCredentials;
import com.smartystreets.api.exceptions.SmartyException;
import com.smartystreets.api.us_street.Candidate;
import com.smartystreets.api.us_street.Client;
import com.smartystreets.api.us_street.Lookup;
import com.smartystreets.api.us_street.MatchType;
import com.ups.ops.cipe.logging.LoggingUtility;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.Proxy;
import java.net.UnknownHostException;
import java.util.*;



@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private final LoggingUtility log = new LoggingUtility(ErrorHandlingController.class);

    private EventModelRepoImpl eventModelRepoImpl;

    private EventModelRepo eventModelRepo;
    @Override
    public int createAPost(EventDetails eventDetails) {

        //Validate / Business Rules on Domain model (may be none)

        //Convert to Data Model

        //Call repository method that saves the data model (this method hides the creation of key AND calls .save)
        if(validatePostData(eventDetails)!=0){

            return validatePostData(eventDetails);
        }else {
            if (exists(eventDetails)) {
                return 9;
            }
            if (!addVerf(eventDetails)) {
                System.out.println("error adddy");
                return 1;
            }
            eventModelRepoImpl.addPost( toEventDocument(eventDetails));
            return 0;
        }
    }

    @Override
    public void updateEvent(EventDetails eventDetails) {
        if(validatePostData(eventDetails) == 0) {
            eventModelRepoImpl.updateEvent(toEventDocument(eventDetails));
        }else {
            throw  new IllegalArgumentException("issue with validation: " +validatePostData(eventDetails));
        }
    }

    @Override
    public int createAPost(String name, String info, String imageLocation, String webLink, String linkCaption, String imageCaption,String season, String price,String address) {

        if(!isValidChar(name)){
            return 1;
        }
        if(!isValidChar(info)){
            return 2;
        }
        if(!imageLocation.contains(".")){
            return 3;
        }
        if(!webLink.contains(".com") ){
            return 4;
        }
        if(!isValidChar(linkCaption)){
            return 5;
        }
        if(!isValidChar(imageCaption)){
            return 6;
        }
        if (!season.equalsIgnoreCase(EventModelCustomRepo.SUMMER) && !season.equalsIgnoreCase(EventModelCustomRepo.SPRING)
                && !season.equalsIgnoreCase(EventModelCustomRepo.WINTER) && !season.equalsIgnoreCase(EventModelCustomRepo.FALL)) {
            return 7;
        }
        if (!price.equalsIgnoreCase(EventModelCustomRepo.CHEAP) && !price.equalsIgnoreCase(EventModelCustomRepo.FAIR)
                && !price.equalsIgnoreCase(EventModelCustomRepo.EXPENSIVE)) {
            return 8;
        }
        EventDetails eventDetails  = new EventDetails( name, info, imageLocation, webLink, linkCaption, imageCaption, season, price,address);
        if (exists(eventDetails)) {
            return 9;
        }
        eventModelRepoImpl.addPost(toEventDocument(eventDetails));
        return 0;
    }

    @Override
    public EventDetails getAEvent(String Season, String Price) {
        Collection<EventDetails> posts = toEventDetailsCollection(eventModelRepo.getPost(Season,Price));
        int size = posts.size();
        EventDetails[] postList = posts.toArray(new EventDetails[size]);
        if(size !=0){
            Random random= new Random();
            int ran = random.nextInt((((size-1)-0)+1)+0);
            EventDetails eventDetails = postList[ran];
            if(validatePostData(eventDetails) ==0) {
                return eventDetails;
            }else{
                throw new IllegalArgumentException("Error data is corrupted: " + eventDetails);
            }
        }else{
            log.warn("none of type: " + Season + " and " + Price);
            EventDetails eventDetails = new EventDetails();
            eventDetails.setInfo("Null-_-Repo");
            return eventDetails;
        }
    }

    @Override
    public EventDetails getEvent(String ID) {
        System.out.println("doc: " + eventModelRepoImpl.getPost(ID));
        return toEventDetails(eventModelRepoImpl.getPost(ID));
    }

    @Override
    public int validatePostData(EventDetails eventDetails) {
        if(!isValidChar(eventDetails.getName())){
            return 1;
        }
        if(!isValidChar(eventDetails.getInfo())){
            return 2;
        }
        if(!eventDetails.getImageLocation().contains(".")){
            return 3;
        }
        if(!eventDetails.getWebLink().contains(".com") ){
            return 4;
        }
        if(!isValidChar(eventDetails.getLinkCaption())){
            return 5;
        }
        if(!isValidChar(eventDetails.getImageCaption())){
            return 6;
        }
        String season = eventDetails.getSeason();
        if(!season.equalsIgnoreCase(EventModelCustomRepo.SUMMER) && !season.equalsIgnoreCase(EventModelCustomRepo.SPRING)
                &&!season.equalsIgnoreCase(EventModelCustomRepo.WINTER) && !season.equalsIgnoreCase(EventModelCustomRepo.FALL)){
            return 7;
        }
        String price = eventDetails.getPrice();
        if(!price.equalsIgnoreCase(EventModelCustomRepo.CHEAP) && !price.equalsIgnoreCase(EventModelCustomRepo.FAIR)
                &&!price.equalsIgnoreCase(EventModelCustomRepo.EXPENSIVE)){
            return 8;
        }
        return 0;
    }

    public EventDetails[] get3Posts(String Season, String Price){
        EventDetails[] postList = new EventDetails[3];
        postList[0] = getAEvent(Season,Price);
        for(int i = 1;i<3;i++){
            List<EventDetails> list = Arrays.asList(postList);
            EventDetails temp = getAEvent(Season,Price);
            if(temp.getInfo().equals("Null-_-Repo")){
                log.warn("DB is Null, sending rest as null values");
                for(int j = 0;j<3;j++){
                    postList[j] = null;
                }
                return postList;
            }
            int count = 0;
            while(list.contains(temp)){
                if(count >20){
                    log.warn("DB too small to post 3 events?");
                    postList[i] = null;
                }
                if(count >50){
                    log.warn("DB def. too small to post 3 events, sending rest as null values");
                    for(int j = i;j<3;j++){
                        postList[j] = null;
                    }
                    return postList;
                }
                temp = getAEvent(Season,Price);
                count++;
            }
            count=0;
            postList[i] = temp;
            //temp remove later
            System.out.println(temp);

        }
        return postList;
    }

    @Override
    public void removeEvent(EventDetails eventDetails) {
        if(eventDetails == null){
            throw new IllegalArgumentException("item does not exist");
        }
        if(exists(eventDetails)) {
            EventDocument eventDocument = toEventDocument(eventDetails);
            eventModelRepoImpl.removeEvent(eventDocument);
        }else{
            throw new IllegalArgumentException("does not exist");
        }
    }

    private boolean isValidChar(CharSequence seq) {
        int len = seq.length();
        for(int i=0;i<len;i++) {
            char c = seq.charAt(i);

            // Test for all positive cases
            if('0'<=c && c<='9') continue;
            if('a'<=c && c<='z') continue;
            if('A'<=c && c<='Z') continue;
            if(c==' ') continue;
            if(c=='&') continue;
            if(c==',') continue;
            if(c=='-') continue;
            if(c=='.') continue;

            // ... insert more positive character tests here
            // If we get here, we had an invalid char, fail right away
            return false;
        }
        // All seen chars were valid, succeed
        return true;
    }

    private boolean exists(EventDetails eventDetails){
        Collection<EventDetails> posts = toEventDetailsCollection(eventModelRepo.findByName(eventDetails.getName()));
        System.out.println(posts);
        if(posts.size() == 0){
            return false;
        }
        return true;
    }

    public static EventDetails toEventDetails(EventDocument eventDocument){
        EventDetails eventDetails = new EventDetails();

        eventDetails.setName(eventDocument.getName());
        eventDetails.setImageCaption(eventDocument.getImageCaption());
        eventDetails.setImageLocation(eventDocument.getImageLocation());
        eventDetails.setInfo(eventDocument.getInfo());
        eventDetails.setPrice(eventDocument.getPrice());
        eventDetails.setSeason(eventDocument.getSeason());
        eventDetails.setWebLink(eventDocument.getWebLink());
        eventDetails.setLinkCaption(eventDocument.getLinkCaption());
        eventDetails.setAddress(eventDocument.getAddress());
        return eventDetails;
    }

    public EventDocument toEventDocument(EventDetails eventDetails){
        EventDocument eventDocument = new EventDocument();

        eventDocument.setName(eventDetails.getName());
        eventDocument.setImageCaption(eventDetails.getImageCaption());
        eventDocument.setImageLocation(eventDetails.getImageLocation());
        eventDocument.setInfo(eventDetails.getInfo());
        eventDocument.setPrice(eventDetails.getPrice());
        eventDocument.setSeason(eventDetails.getSeason());
        eventDocument.setWebLink(eventDetails.getWebLink());
        eventDocument.setLinkCaption(eventDetails.getLinkCaption());
        eventDocument.setAddress(eventDetails.getAddress());
        return eventDocument;
    }

    public static Collection<EventDetails> toEventDetailsCollection(Collection<EventDocument>documentCollection  ){
        Collection<EventDetails> detailsCollection = new ArrayList<>();

        documentCollection.forEach((document) -> {
            detailsCollection.add(toEventDetails(document));
        });

        return detailsCollection;
    }

    private boolean addVerf(EventDetails eventDetails){

        /*
        136 W 55th St,New York, NY 10019
         */
        String authId = "f8b0cd62-94b0-95c9-7a19-1ecb379bbbb2";
        String authToken = "IJeSFLbJeD4qLdJDZqvc";
        StaticCredentials credentials = new StaticCredentials(authId, authToken);
        Client client = new ClientBuilder(credentials)
                //.withProxy(Proxy.Type.HTTP, "localhost", 8081) // Uncomment this line to try it with a proxy
                .buildUsStreetApiClient();
        AddressModel addressModel = new AddressModel(eventDetails.getAddress());
//        Lookup lookup = new Lookup();
//        lookup.setInputId(eventDetails.getName()); // Optional ID from your system
//        lookup.setAddressee("person");
//        lookup.setStreet(addressModel.getAddress());
//        lookup.setCity(addressModel.getCity());
//        lookup.setState(addressModel.getState());
//        lookup.setZipCode(addressModel.getZip());
//        lookup.setMaxCandidates(3);
//        lookup.setMatch(MatchType.INVALID); // "invalid" is the most permissive match
        Lookup lookup = new Lookup();
        lookup.setStreet("49 south oak ave");
        lookup.setCity("fords");
        lookup.setState("NJ");
        lookup.setZipCode("08863");
        lookup.setMaxCandidates(3);
        try {
            client.send(lookup);
        }
        catch (SmartyException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch(UnknownHostException UH){
            System.out.println("cant connect returning add. as verified(though that is not conformable)");
            return true;
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        ArrayList<Candidate> results = lookup.getResult();

        if (results.isEmpty()) {
            System.out.println("No candidates. This means the address is not valid.");
            return false;
        }

        Candidate firstCandidate = results.get(0);

        System.out.println("Address is valid. (There is at least one candidate)\n");
        System.out.println("ZIP Code: " + firstCandidate.getComponents().getZipCode());
        System.out.println("County: " + firstCandidate.getMetadata().getCountyName());
        System.out.println("Latitude: " + firstCandidate.getMetadata().getLatitude());
        System.out.println("Longitude: " + firstCandidate.getMetadata().getLongitude());
            return true;
    }


}
