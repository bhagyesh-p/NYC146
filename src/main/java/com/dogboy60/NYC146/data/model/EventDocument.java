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
public class EventDocument {
    /**
     * This object model is specific to the Repository layer
     */
    @Id
    @JsonProperty("id")
    String id;

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


    public EventDocument(String id, String name, String info, String imageLocation, String webLink, String linkCaption, String imageCaption, String season, String price,String address) {
        this.id = id;
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
