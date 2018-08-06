package com.veamospues.edge.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouterConfiguration {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(
                        r -> r.path("/sse")
                                .uri("http://node:3000")
                )
                .route(
                        r -> r.path("/*")
                                .uri("http://client:80")
                )
                .build();
    }
}
