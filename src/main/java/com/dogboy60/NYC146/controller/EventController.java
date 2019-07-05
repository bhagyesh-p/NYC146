package com.dogboy60.NYC146.controller;


import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventResource;
import com.dogboy60.NYC146.data.model.ResponseModel;
import com.dogboy60.NYC146.service.EventService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
@Api(value = "EventControllerAPI",produces = MediaType.APPLICATION_JSON_VALUE)

public class EventController {
    @Autowired
    private EventService eventService;

    /**
     * @param name is the name of place/ event
     * @param info the description of said event
     * @param imageLocation where in the web is the image located
     * @param webLink the link to the event/place
     * @param linkCaption caption for link
     * @param imageCaption caption for image
     * @param price what price point is this event/place at
     * @param season when can we attend this event/place
     * @param address where is this place/ event located at
     * @return a response in which it tells a specific error or if it was valid
     *
     * this will take all params and make it a Resource model and convert to a Detail model
     *  and then add it
     */
    @ApiOperation(value = "allows the addition of Event model data via all params")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ResponseModel.class )})
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
        ResponseModel responseModel = new ResponseModel();
        if (name == null || name.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"name is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (info == null || info.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"info is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (imageLocation == null || imageLocation.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"imageLocation is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (webLink == null || webLink.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"webLink is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (linkCaption == null || linkCaption.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"linkCaption is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (imageCaption == null || imageCaption.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"imageCaption is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (price == null || price.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"price is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (season == null || season.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"season is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if(address == null || address.isEmpty()){
            responseModel = new ResponseModel(false,-1,"address is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);

        }

        EventResource eventResource = new EventResource(name,info,imageLocation,webLink,linkCaption,imageCaption,season,price,address);

        int responseNumber = eventService.createAPost(toEventDetail(eventResource));
        if(responseNumber == 0){
            responseModel = new ResponseModel(true,0,Response(responseNumber));
            return new ResponseEntity<>(responseModel, HttpStatus.ACCEPTED);
        }else{
            responseModel = new ResponseModel(false,responseNumber,Response(responseNumber));
            return new ResponseEntity<>(responseModel, HttpStatus.CONFLICT);
        }


    }

    /**
     * @param price price we want the data from
     * @param season what season we want the data from
     * @return returns a set of 3 items if successful and a success message, other wise it return a error code with no data
     */
    @ApiOperation(value = "get an array of items up to 3 events per turn")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ResponseModel.class )})
    @RequestMapping(value = "/getItems", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItems(
                                     @RequestParam(value = "price", required = true) String price,
                                     @RequestParam(value = "season", required = true) String season) {
        ResponseModel responseModel = new ResponseModel();


        if (price == null || price.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"price is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }
        if (season == null || season.isEmpty()) {
            responseModel = new ResponseModel(false,-1,"season is invalid");
            return new ResponseEntity<>(responseModel, HttpStatus.BAD_REQUEST);
        }

        EventResource []events = toEventResources(eventService.get3Posts(season,price));
        for(int i =0;i<3;i++){
            if(events[i] == null){
                responseModel = new ResponseModel(false,-1,"DB is very small on the said criteria, this is what we have");
                responseModel.setData(events);
                return new ResponseEntity<>(responseModel, HttpStatus.ACCEPTED);
            }
        }
        responseModel = new ResponseModel(true,0,"DB well populated");
        responseModel.setData(events);
        return new ResponseEntity<>(responseModel, HttpStatus.ACCEPTED);

    }

    /**
     *
     * @param ID of the event that we upload, it will be override and replaced so doesnt matter what is sent here
     * @param eventResource the json data of the Event Resource
     * @return a response if add was successful
     */
    @ApiOperation(value = "add an event data via the body ")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ModelAndView.class )})
    @PostMapping(value = "/{id}")
    public ResponseEntity<?> post(@PathVariable("id") String ID, @RequestBody EventResource eventResource ){
        ResponseModel responseModel = new ResponseModel();

        int responseNumber = eventService.createAPost(toEventDetail(eventResource));
        String res = Response(responseNumber);
        if (responseNumber != 0) {
            responseModel = new ResponseModel(false,responseNumber,res);

        }else{
            responseModel = new ResponseModel(true,responseNumber,res);
        }
        return new ResponseEntity<>(new ModelAndView("showMessage", (Map<String, ?>) responseModel), HttpStatus.OK);
    }

    /**
     *
     * @param ID of the event that we uploaded
     * @return the data object(POJO) in the form of a JSON
     */
    @ApiOperation(value = "get an event data via the body ")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ModelAndView.class )})
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> get(@PathVariable (value = "id") String ID ){
        ResponseModel responseModel = new ResponseModel(true,0,"Valid");
        /// TODO: FIX THIS
        responseModel.setData( eventService.getEvent(ID));
        return new ResponseEntity<>(new ModelAndView("showMessage", (Map<String, ?>) responseModel), HttpStatus.OK);
    }

    /**
     *
     * @param eventResources the array of json data of the Event Resource
     * @return a response if the array of data (Json) add was successful
     */
    @ApiOperation(value = "get an event data via the body ")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ModelAndView.class )})
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> post(@RequestBody EventResource eventResources[] ){
        ResponseModel responseModel = new ResponseModel();
        for(EventResource eventResource: eventResources){
            int responseNumber = eventService.createAPost(toEventDetail(eventResource));
            String res = Response(responseNumber);
            if (responseNumber != 0) {
                responseModel = new ResponseModel(false,responseNumber,res);
            }else{
                responseModel = new ResponseModel(true,responseNumber,res);
            }
        }
        return new ResponseEntity<>(new ModelAndView("showMessage", (Map<String, ?>) responseModel), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "delete an event data via the body ")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ModelAndView.class )})
    public ResponseEntity<?> delete(@PathVariable("id") String ID ){
        eventService.removeEvent(eventService.getEvent(ID));
        ResponseModel responseModel = new ResponseModel(true,0,"valid");
        responseModel.setData("event:" + ID  + " removed");
        return new ResponseEntity<>(new ModelAndView("showMessage", (Map<String, ?>) responseModel), HttpStatus.OK);
    }

    /**
     *
     * @param ID the ID of said event/place
     * @param eventResource the json data of the Event Resource that we want to be updated to
     * @return a response if the update was successful
     */
    @PatchMapping(value = "/{id}")
    @ApiOperation(value = "update an event data via the body ")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK" , response = ModelAndView.class )})
    public ResponseEntity<?> patch(@PathVariable("id") String ID, @RequestBody EventResource eventResource ){

        ///TODO: remove ID???
        eventService.updateEvent(toEventDetail(eventResource));
        ResponseModel responseModel = new ResponseModel(true,0,"valid");
        responseModel.setData("Event: " + ID  + " updated");
        return new ResponseEntity<>(new ModelAndView("showMessage", (Map<String, ?>) responseModel), HttpStatus.OK);
    }

    /**
     * convert a EventResource to a EventDetail
     * @param eventResource the json data of the Event Resource to be converted
     * @return EventDetail POJO
     */
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

    /**
     * convert EventDetail to EventResource
     * @param eventDetails the json data of the Event Detail that will be converted
     * @return EventResource POJO
     */
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

    /**
     * convert array of EventDetail to array of EventResource
     * @param eventDetails the array of Event Details that will be converted
     * @return array of EventResources
     */
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


    /**
     * based on the response code "x" you get a error message
     * @param x this is the error code sent in by the service layer
     * @return String Error message
     */
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
