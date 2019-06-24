package com.dogboy60.NYC146.testing;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;

@NoArgsConstructor
@Data
@Document
public class AddressModel {
    private String address;
    private String city;
    private String state;
    private String zip;

    public AddressModel (String address,String city, String state, String zip){
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public AddressModel (String wholeAddy){
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
