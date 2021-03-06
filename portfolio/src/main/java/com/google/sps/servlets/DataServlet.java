// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.data.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

/** Servlet that handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Message").addSort("name", SortDirection.ASCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);

        List<Message> messages = new ArrayList<>();
        for (Entity entity : results.asIterable()) 
        {
            String name = (String) entity.getProperty("name");
            String comment = (String) entity.getProperty("comment");
            long timestamp = (long) entity.getProperty("timestamp");

            Message message = new Message(name, comment, timestamp);
            messages.add(message);
        }
        Gson gson = new Gson();

        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(messages));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String userName = getParameter(request, "name", "Anonymous");
        String theComment = getParameter(request, "text-input", "");
        long timestamp = System.currentTimeMillis();

        //System.out.println("Name" + userName + ":" + theComment);

        Entity messageEntity = new Entity("Message");
        messageEntity.setProperty("name", userName);
        messageEntity.setProperty("comment", theComment);
        messageEntity.setProperty("timestamp", timestamp);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(messageEntity);

        // Redirect back to the HTML page.
        response.sendRedirect("/connect.html");

        //String originalText = request.getParameter("text");
        //String languageCode = request.getParameter("languageCode");

        // Do the translation.
        //Translate translate = TranslateOptions.getDefaultInstance().getService();
        //Translation translation =
        //translate.translate(originalText, Translate.TranslateOption.targetLanguage(languageCode));
        //String translatedText = translation.getTranslatedText();

         // Output the translation.
        //response.setContentType("text/html; charset=UTF-8");
        //response.setCharacterEncoding("UTF-8");
        //response.getWriter().println(translatedText);

    }

    private String getParameter(HttpServletRequest request, String name, String defaultValue) {
        String theName = request.getParameter(name);

        if (theName.isEmpty()) {
            return defaultValue;
        }
        else{
            return theName;
        }
    }

}