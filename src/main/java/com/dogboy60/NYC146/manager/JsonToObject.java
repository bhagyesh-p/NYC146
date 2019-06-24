package com.dogboy60.NYC146.manager;

import com.couchbase.client.java.document.JsonDocument;
import com.couchbase.client.java.document.json.JsonObject;
import com.couchbase.client.java.transcoder.JsonTranscoder;
import com.dogboy60.NYC146.data.model.EventDetails;
import com.dogboy60.NYC146.data.model.EventDocument;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.couchbase.core.CouchbaseTemplate;
import org.springframework.data.couchbase.core.convert.translation.TranslationService;
import org.springframework.data.couchbase.core.mapping.CouchbaseDocument;
import org.springframework.data.couchbase.core.mapping.CouchbasePersistentEntity;
import org.springframework.data.couchbase.core.mapping.CouchbaseStorable;
import org.springframework.data.mapping.PersistentPropertyAccessor;
import org.springframework.data.mapping.model.ConvertingPropertyAccessor;
import org.springframework.stereotype.Component;

@Component
public class JsonToObject {

    @Autowired
    private CouchbaseTemplate couchbaseTemplate;

    @Autowired
    private TranslationService translationService;

    public <T> T convert(String id, JsonDocument data, Class<T> entityClass) {
        if (data == null) {
            return null;
        } else {
            CouchbaseDocument converted = new CouchbaseDocument(id);
            T readEntity = couchbaseTemplate.getConverter().read(entityClass, (CouchbaseDocument) decodeAndUnWrap(data, converted));
            ConvertingPropertyAccessor accessor = getPropertyAccessor(readEntity);
            CouchbasePersistentEntity<?> persistentEntity = couchbaseTemplate.getConverter().getMappingContext().getPersistentEntity(readEntity.getClass());
            if (persistentEntity.hasVersionProperty()) {
                accessor.setProperty(persistentEntity.getVersionProperty(), data.cas());
            }

            return readEntity;
        }
    }

    public <T> JsonDocument convertObjToJsonDocument(String id, T object) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = null;
        try {
            jsonInString = mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        JsonTranscoder trans = new JsonTranscoder();
        JsonObject data = null;
        try {
            data = trans.stringToJsonObject(jsonInString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JsonDocument jsonDocument =  JsonDocument.create(id, data);
        return jsonDocument;

    }


    private CouchbaseStorable decodeAndUnWrap(JsonDocument source, CouchbaseStorable target) {
        return translationService.decode(source.content().toString(), target);
    }

    private ConvertingPropertyAccessor getPropertyAccessor(Object source) {
        CouchbasePersistentEntity<?> entity = couchbaseTemplate.getConverter().getMappingContext().getPersistentEntity(source.getClass());
        PersistentPropertyAccessor accessor = entity.getPropertyAccessor(source);
        return new ConvertingPropertyAccessor(accessor, couchbaseTemplate.getConverter().getConversionService());
    }


}
