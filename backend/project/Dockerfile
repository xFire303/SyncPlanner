FROM azul/zulu-openjdk:21-jdk-crac-latest

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]