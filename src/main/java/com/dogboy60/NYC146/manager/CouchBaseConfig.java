package com.dogboy60.NYC146.manager;

import com.couchbase.client.java.env.CouchbaseEnvironment;
import com.couchbase.client.java.env.DefaultCouchbaseEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.couchbase.config.AbstractCouchbaseConfiguration;

import java.util.List;

@Configuration
@EnableConfigurationProperties({CouchbaseProperties.class})
public class CouchBaseConfig extends AbstractCouchbaseConfiguration {

    @Autowired
    private CouchbaseProperties couchbaseProperties;

    @Override
    protected List<String> getBootstrapHosts() {
        return couchbaseProperties.getBootstrapHosts();
    }

    @Override
    protected String getBucketName() {
        return couchbaseProperties.getBucket().getName();
    }

    @Override
    protected String getBucketPassword() {
        return couchbaseProperties.getBucket().getPassword();
    }

    @Override
    protected CouchbaseEnvironment getEnvironment(){
        return DefaultCouchbaseEnvironment.create();
    }
}
