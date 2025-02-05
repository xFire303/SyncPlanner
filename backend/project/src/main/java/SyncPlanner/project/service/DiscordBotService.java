/*package SyncPlanner.project.service;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel;
import net.dv8tion.jda.api.entities.channel.concrete.ThreadChannel;
import net.dv8tion.jda.api.entities.emoji.Emoji;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DiscordBotService {

    private JDA jda;

    @Value("${discord.channelId}")
    private String channelId;

    @Value("${discord.threadId}")
    private String threadId;

    @Autowired
    public void DiscordService(JDA jda) {
        this.jda = jda;
    }

    public void sendMessageToThread(String message) {
        TextChannel channel = jda.getTextChannelById(channelId);
        if (channel != null) {
            ThreadChannel thread = channel.getThreadChannels().stream()
                    .filter(t -> t.getId().equals(threadId))
                    .findFirst()
                    .orElse(null);

            if (thread != null) {
                thread.sendMessage(message).queue(messageQueue ->{
                    messageQueue.addReaction(Emoji.fromUnicode("👍")).queue();
                });
            } else {
                System.err.println("Thread non trovato!");
            }
        } else {
            System.err.println("Canale non trovato!");
        }
    }
}*/
