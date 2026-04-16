package com.smartcampus;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;


@SpringBootApplication
@EnableMongoAuditing
public class SmartCampusApplication {

    public static void main(String[] args) {
        Dotenv dotenv;
        if (new java.io.File("../.env").exists()) {
            dotenv = Dotenv.configure().directory("../").load();
        } else {
            dotenv = Dotenv.configure().ignoreIfMissing().load();
        }
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(SmartCampusApplication.class, args);
    }
}