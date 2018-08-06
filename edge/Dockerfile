FROM maven:3.5-jdk-8-alpine as builder

ADD . /src/
WORKDIR /src
RUN mvn clean install spring-boot:repackage -DskipTests

FROM gcr.io/distroless/java
COPY --from=builder /src/target/edge-0.0.1-SNAPSHOT.jar /app/edge.jar
EXPOSE 8080

CMD ["/app/edge.jar"]