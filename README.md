import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class LLMClient {

    public static String getAIResponse(String input) throws Exception {

        String apiKey = "YOUR_API_KEY"; // from your screenshot
        String url = "https://api.llm.cib.echonet/v1/openai/chat/completions";

        String requestBody = "{\n" +
                "  \"model\": \"mistral-small-2506-ITG\",\n" +
                "  \"messages\": [\n" +
                "    {\"role\": \"user\", \"content\": \"" + input + "\"}\n" +
                "  ]\n" +
                "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}
