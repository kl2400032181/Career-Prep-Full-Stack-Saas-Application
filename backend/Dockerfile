FROM eclipse-temurin:18-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests=true

EXPOSE 8080

CMD ["java", "-jar", "target/career-prep-ai-0.0.1-SNAPSHOT.jar"]