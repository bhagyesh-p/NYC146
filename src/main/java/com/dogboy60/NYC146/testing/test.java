package com.dogboy60.NYC146.testing;

import java.util.ArrayList;
import java.util.List;

public class test {
    public static void main(String[] args) {
        String add = "136 W 55th St, New York, NY 10019";
        System.out.println(add);

        String temp = add.substring(0,add.indexOf(","));
        String addy = temp;

        add = add.replaceFirst(",","");
        temp = add.substring(temp.length()+1,add.indexOf(","));
        String city = temp;

        add = add.substring(add.indexOf(","));

        temp = add.substring(0,add.indexOf(","));
        temp = add.substring(temp.length()+2,4);
        String state = temp;


        temp = add.substring(5);
        String zip = temp;

        AddressModel addressModel = new AddressModel (addy,city,state,zip);
        System.out.println(addressModel);
        List<String> test_address = new ArrayList<String>();
        test_address.add("6 Caputo Dr., Manorville, NY  11949");
        test_address.add("100 White Plains Road, White Plains, NY 10604");


        for (String addr : test_address) {
            AddressModel addressUtility = new AddressModel(addr);
            System.out.println(addressUtility);
        }

    }

}
