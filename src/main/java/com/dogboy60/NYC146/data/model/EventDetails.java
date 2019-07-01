package com.dogboy60.NYC146.data.model;

import com.couchbase.client.deps.com.fasterxml.jackson.annotation.JsonProperty;
import com.couchbase.client.java.repository.annotation.Field;
import com.couchbase.client.java.repository.annotation.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;

@NoArgsConstructor
@Data
@Document
public class EventDetails {
    /**
     * This object model is specific to the Service layer
     */

    @Field
    @JsonProperty("name")
    String name;

    @Field
    @JsonProperty("info")
    String info;

    @Field
    @JsonProperty("imageLocation")
    String imageLocation;

    @Field
    @JsonProperty("webLink")
    String webLink;

    @Field
    @JsonProperty("linkCaption")
    String linkCaption;

    @Field
    @JsonProperty("imageCaption")
    String imageCaption;

    @Field
    @JsonProperty("season")
    String season;

    @Field
    @JsonProperty("price")
    String price;

    @Field
    @JsonProperty("address")
    String address;


    public EventDetails(String name, String info, String imageLocation, String webLink, String linkCaption, String imageCaption, String season, String price,String address) {
        this.name = name;
        this.info = info;
        this.imageLocation = imageLocation;
        this.webLink = webLink;
        this.linkCaption = linkCaption;
        this.imageCaption = imageCaption;
        this.season = season;
        this.price = price;
        this.address = address;
    }
}
