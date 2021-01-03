<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card class="pa-4">
          <v-card height="200px" class="scroll">
            <v-list id="messages" dense v-for="(msg, i) in messages" :key="i">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ msg.handle }}</v-list-item-title>
                  <v-list-item-subtitle>{{ msg.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <p v-if="feedback !== ''">
            <em>{{ feedback }} is typing a message...</em>
          </p>
          <v-form>
            <v-text-field
              v-model="handle"
              label="Handle"
              required
            ></v-text-field>
            <v-text-field
              v-model="message"
              label="Message"
              @keyup="typing"
              required
            ></v-text-field>
            <v-btn color="success" @click="send">
              Send
              <v-icon dark right> mdi-send </v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from "socket.io-client";
export default {
  data: () => ({
    messages: [],
    feedback: "",
    handle: "",
    message: "",
    socket: "",
  }),
  mounted() {
    this.socket = io.connect("http://localhost:8000");
    this.socket.on("chat", (data) => {
      this.feedback = "";
      this.messages.push(data);
    });
    this.socket.on("typing", (data) => {
      this.feedback = data;
    });
  },
  methods: {
    send() {
      this.socket.emit("chat", {
        message: this.message,
        handle: this.handle,
      });
      this.message = "";
    },
    typing() {
      this.socket.emit("typing", this.handle);
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
</style>