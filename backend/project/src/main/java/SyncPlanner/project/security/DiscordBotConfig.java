package SyncPlanner.project.security;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DiscordBotConfig {

    @Value("${discord.bot.token}")
    private String botToken;

    @Bean
    public JDA jda() {
        try {
            return JDABuilder.createDefault(botToken)
                    .build()
                    .awaitReady();
        } catch (Exception e) {
            throw new IllegalStateException("Errore durante l'inizializzazione del bot Discord", e);
        }
    }
}

