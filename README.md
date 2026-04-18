import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;

public class AIClient {

    public static void main(String[] args) {
        try {
            // Arguments from ITX
            String inputFile = args[0];
            String outputFile = args[1];

            // Read input prompt
            String prompt = new String(Files.readAllBytes(Paths.get(inputFile)));

            // 🔑 Replace with your API Key
            String apiKey = "YOUR_API_KEY";

            String requestBody = "{\n" +
                    "  \"model\": \"mistral-medium-2508-ITG\",\n" +
                    "  \"messages\": [\n" +
                    "    {\"role\": \"user\", \"content\": \"" + prompt.replace("\"","\\\"") + "\"}\n" +
                    "  ]\n" +
                    "}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.llm.cib.echonet/v1/openai/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Extract only AI content (basic parsing)
            String body = response.body();

            // Save output
            Files.write(Paths.get(outputFile), body.getBytes());

            System.out.println("AI Response saved to: " + outputFile);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
