# ---------- Build ----------
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests \
    && find target -maxdepth 1 -type f -name "*.jar" ! -name "*.original" -exec cp {} target/app.jar \;


# ---------- Run ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/app.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]