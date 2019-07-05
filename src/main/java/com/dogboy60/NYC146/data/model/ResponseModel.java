package com.dogboy60.NYC146.data.model;

import com.couchbase.client.deps.com.fasterxml.jackson.annotation.JsonProperty;
import com.couchbase.client.java.repository.annotation.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;

@NoArgsConstructor
@Data
@Document
public class ResponseModel<T> {


    @Field
    @JsonProperty("successful")
    boolean successful;

    @Field
    @JsonProperty("responseCode")
    int responseCode;

    @Field
    @JsonProperty("response")
    String response;

    @Field
    @JsonProperty("Data")
    T Data;


    public ResponseModel( boolean successful, int responseCode,String response) {
        this.successful = successful;
        this.responseCode = responseCode;
        this.response = response;
        this.Data = null;
    }

    public String toString(){
        return "Successful: " + successful + "\n"+
                "Response Code: "+ responseCode + "\n"+
                "Response: " + response + "\n"+
                "Data: " + Data;
    }
}
