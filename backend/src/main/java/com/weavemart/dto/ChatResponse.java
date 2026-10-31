package com.weavemart.dto;

public class ChatResponse {
    private String reply;
    private String suggestedAction;

    public ChatResponse() {}

    public ChatResponse(String reply, String suggestedAction) {
        this.reply = reply;
        this.suggestedAction = suggestedAction;
    }

    public static ChatResponseBuilder builder() {
        return new ChatResponseBuilder();
    }

    public static class ChatResponseBuilder {
        private String reply;
        private String suggestedAction;

        public ChatResponseBuilder reply(String reply) { this.reply = reply; return this; }
        public ChatResponseBuilder suggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; return this; }

        public ChatResponse build() {
            return new ChatResponse(reply, suggestedAction);
        }
    }

    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public String getSuggestedAction() { return suggestedAction; }
    public void setSuggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; }
}
