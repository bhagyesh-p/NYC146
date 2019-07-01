package com.dogboy60.NYC146.data.model;

import com.couchbase.client.deps.com.fasterxml.jackson.annotation.JsonProperty;
import com.couchbase.client.java.repository.annotation.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;

@NoArgsConstructor
@Data
@Document
public class AddressModel {
    /**
     * This model is used as a sub model as all/most POJO models use it
     * as a address, this just helps structure and flow
     */
    @Field
    @JsonProperty("address")
    private String address;

    @Field
    @JsonProperty("city")
    private String city;

    @Field
    @JsonProperty("state")
    private String state;

    @Field
    @JsonProperty("zip")
    private String zip;

    public AddressModel(String address, String city, String state, String zip){
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public AddressModel(String wholeAddy){
        parse(wholeAddy);
    }

    public void parse(String wholeAddy){
        String add = wholeAddy;
        String temp = add.substring(0,add.indexOf(","));
        address = temp;

        add = add.replaceFirst(",","");
        temp = add.substring(temp.length()+1,add.indexOf(","));
        city = temp;

        add = add.substring(add.indexOf(","));
        temp = add.substring(0,add.indexOf(","));
        temp = add.substring(temp.length()+2,4);
        state = temp;

        temp = add.substring(5);
        zip = temp;
    }

}
