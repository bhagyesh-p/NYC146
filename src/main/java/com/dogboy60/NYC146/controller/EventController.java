package com.dogboy60.NYC146.controller;


import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventResource;
import com.dogboy60.NYC146.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/post", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventController {
    @Autowired
    private EventService eventService;

    @RequestMapping(value = "/addPost", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addPost(@RequestParam(value = "name", required = true) String name,
                                        @RequestParam(value = "info", required = true) String info,
                                        @RequestParam(value = "imageLocation", required = true) String imageLocation,
                                        @RequestParam(value = "webLink", required = true) String webLink,
                                        @RequestParam(value = "linkCaption", required = true) String linkCaption,
                                        @RequestParam(value = "imageCaption", required = true) String imageCaption,
                                        @RequestParam(value = "price", required = true) String price,
                                        @RequestParam(value = "season", required = true) String season,
                                        @RequestParam(value = "address", required = true) String address) {
        HashMap<String, Object> params = new HashMap<String, Object>();

        if (name == null || name.isEmpty()) {
            params.put("Error", "name is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (info == null || info.isEmpty()) {
            params.put("Error", "info is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (imageLocation == null || imageLocation.isEmpty()) {
            params.put("Error", "imageLocation is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (webLink == null || webLink.isEmpty()) {
            params.put("Error", "webLink is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (linkCaption == null || linkCaption.isEmpty()) {
            params.put("Error", "linkCaption is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (imageCaption == null || imageCaption.isEmpty()) {
            params.put("Error", "imageCaption is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (price == null || price.isEmpty()) {
            params.put("Error", "price is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (season == null || season.isEmpty()) {
            params.put("Error", "season is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if(address == null || address.isEmpty()){
            params.put("Error", "address is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }

        EventResource eventResource = new EventResource(name,info,imageLocation,webLink,linkCaption,imageCaption,season,price,address);

        int responseNumber = eventService.createAPost(toEventDetail(eventResource));
        if(responseNumber == 0){
            params.put("Successful", Response(responseNumber));
            return new ResponseEntity<>(params, HttpStatus.ACCEPTED);
        }else{
            params.put("Error", Response(responseNumber));
            return new ResponseEntity<>(params, HttpStatus.CONFLICT);
        }


    }

    @RequestMapping(value = "/getItems", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItems(
                                     @RequestParam(value = "price", required = true) String price,
                                     @RequestParam(value = "season", required = true) String season) {
        HashMap<String, Object> params = new HashMap<String, Object>();


        if (price == null || price.isEmpty()) {
            params.put("Error", "price is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }
        if (season == null || season.isEmpty()) {
            params.put("Error", "season is invalid");
            return new ResponseEntity<>(params, HttpStatus.BAD_REQUEST);
        }

        EventResource []events = toEventResources(eventService.get3Posts(season,price));
        for(int i =0;i<3;i++){
            if(events[i] == null){
                System.out.println("here");
                params.put("Error", "DB is very small on the said criteria, this is what we have");
                params.put("data", events);
                return new ResponseEntity<>(params, HttpStatus.ACCEPTED);
            }
        }
        params.put("Successful", "DB well populated");
        params.put("data", events);
        return new ResponseEntity<>(params, HttpStatus.ACCEPTED);

    }

    @PostMapping(value = "/{id}")
    public ResponseEntity<?> post(@PathVariable("id") String ID, @RequestBody EventResource eventResource ){
        int responseNumber = eventService.createAPost(toEventDetail(eventResource));
        String res = Response(responseNumber);
        HashMap<String, Object> params = new HashMap<String, Object>();
        if (responseNumber != 0) {
            params.put("Error", res);
        }else{
            params.put("Successful",res);
        }
        return new ResponseEntity<>(new ModelAndView("showMessage", params), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> get(@PathVariable (value = "id") String ID ){
        HashMap<String, Object> params = new HashMap<String, Object>();
        /// TODO: FIX THIS
        params.put("event" , eventService.getEvent(ID));
        return new ResponseEntity<>(new ModelAndView("showMessage", params), HttpStatus.OK);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> post(@RequestBody EventResource eventResources[] ){
        HashMap<String, Object> params = new HashMap<String, Object>();
        for(EventResource eventResource: eventResources){
            int responseNumber = eventService.createAPost(toEventDetail(eventResource));
            String res = Response(responseNumber);
            if (responseNumber != 0) {
                params.put("Error", res + " " + eventResource.getName());
            }else{
                params.put("Successful",res + " " + eventResource.getName());
            }
        }
        return new ResponseEntity<>(new ModelAndView("showMessage", params), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String ID ){
        eventService.removeEvent(eventService.getEvent(ID));
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("event" , "event:" + ID  + " removed");
        return new ResponseEntity<>(new ModelAndView("showMessage", params), HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<?> patch(@PathVariable("id") String ID, @RequestBody EventResource eventResource ){

        ///TODO: remove ID???
        eventService.updateEvent(toEventDetail(eventResource));
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("Event" , "Event: " + ID  + " updated");
        return new ResponseEntity<>(new ModelAndView("showMessage", params), HttpStatus.OK);
    }

    public static EventDetails toEventDetail(EventResource eventResource){
        EventDetails eventDetails = new EventDetails();

        eventDetails.setName(eventResource.getName());
        eventDetails.setImageCaption(eventResource.getImageCaption());
        eventDetails.setImageLocation(eventResource.getImageLocation());
        eventDetails.setInfo(eventResource.getInfo());
        eventDetails.setPrice(eventResource.getPrice());
        eventDetails.setSeason(eventResource.getSeason());
        eventDetails.setWebLink(eventResource.getWebLink());
        eventDetails.setLinkCaption(eventResource.getLinkCaption());
        eventDetails.setAddress(eventResource.getAddress());

        return eventDetails;
    }

    public static EventResource toEventResource (EventDetails eventDetails){
        EventResource eventResource= new EventResource();

        eventResource.setName(eventDetails.getName());
        eventResource.setImageCaption(eventDetails.getImageCaption());
        eventResource.setImageLocation(eventDetails.getImageLocation());
        eventResource.setInfo(eventDetails.getInfo());
        eventResource.setPrice(eventDetails.getPrice());
        eventResource.setSeason(eventDetails.getSeason());
        eventResource.setWebLink(eventDetails.getWebLink());
        eventResource.setLinkCaption(eventDetails.getLinkCaption());
        eventResource.setAddress(eventDetails.getAddress());
        return eventResource;
    }

    public static EventResource[] toEventResources (EventDetails []eventDetails){
        EventResource eventResources[] = new EventResource[eventDetails.length];
        for(int i = 0 ; i < eventDetails.length;i++){
            EventResource eventResource= new EventResource();
            EventDetails eventDetail = eventDetails[i];

            if(eventDetail == null){
                eventResources[i] = null;

            }else {
                eventResource.setName(eventDetail.getName());
                eventResource.setImageCaption(eventDetail.getImageCaption());
                eventResource.setImageLocation(eventDetail.getImageLocation());
                eventResource.setInfo(eventDetail.getInfo());
                eventResource.setPrice(eventDetail.getPrice());
                eventResource.setSeason(eventDetail.getSeason());
                eventResource.setWebLink(eventDetail.getWebLink());
                eventResource.setLinkCaption(eventDetail.getLinkCaption());
                eventResource.setAddress(eventDetail.getAddress());
                eventResources[i] = eventResource;
            }
        }
        return eventResources;
    }

    private String Response(int x) {
        switch (x) {
            case 0:
                return "Valid entry";
            case 1:
                return "Issue with name field";
            case 2:
                return "Issue with info";
            case 3:
                return "Issue with image loc. field, missing \".\" ";
            case 4:
                return "Issue with weblink field, missing \".com\"";
            case 5:
                return "Issue with link caption field";
            case 6:
                return "Issue with image caption field";
            case 7:
                return "Issue with season field";
            case 8:
                return "Issue with price field";
            case 9:
                return "Post already exists";
        }
        return "null";
    }

}
