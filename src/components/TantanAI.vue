<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RiveScript from 'rivescript/dist/rivescript.min.js';

const isOpen = ref(false),
    messages = ref([]),
    inputText = ref(''),
    initialGreetingShown = ref(false);
let bot, typingTimeout;

onMounted(() => {
    bot = new RiveScript();
    bot.setSubroutine('jsAlert', (rs, args) => {
        alert(args.join(' '));
        return '';
    });

    bot.loadFile(
        ['/brain.rive'],
        ()=> bot.sortReplies(),
        (err, filename, lineno) => {
            console.error(`Error loading ${filename} at line ${lineno}: ${err}`);
        }
    );

    const onKeyDown = (e) => {
        if(e.key === "Escape" && isOpen.value)
            isOpen.value = false;
    };

    window.addEventListener("keydown", onKeyDown);
    onUnmounted(() =>
        window.removeEventListener("keydown", onKeyDown)
    );
});

function toggleChat() {
    isOpen.value = !isOpen.value;

    if(isOpen.value && !initialGreetingShown.value) {
        initialGreetingShown.value = true;

        showTypingIndicator();
        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            removeTypingIndicator();
            appendBotMessage("Hello there! I'm Tantan, Nathanne's personal website AI assistant. How can I help?");
        }, 1500);
    }
}

function sendMessage() {
    const text = inputText.value.trim();
    if(!text)
        return;

    appendUserMessage(text);
    inputText.value = '';

    showTypingIndicator();
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        bot.replyAsync('local-user', text, null, (err, reply) => {
            removeTypingIndicator();
            if(!err) {
                if(reply.trim())
                    appendBotMessage(reply);
            }
        });
    }, 1500 + Math.random() * 1000);
}

function appendUserMessage(text) {
    messages.value.push({ type: 'user', text });
    scrollToBottom();
}

function appendBotMessage(text) {
    messages.value.push({ type: 'bot', text });
    scrollToBottom();
}

function showTypingIndicator() {
    messages.value.push({ type: 'typing' });
    scrollToBottom();
}

function removeTypingIndicator() {
    const idx = messages.value.findIndex(m => m.type === 'typing');
    if(idx !== -1)
        messages.value.splice(idx, 1);
}

function scrollToBottom() {
    setTimeout(() => {
        const bodyEl = document.getElementById('chat-body');
        if(bodyEl)
            bodyEl.scrollTop = bodyEl.scrollHeight;
    }, 0);
}
</script>

<template>
    <div id="chatbot" data-bs-theme="dark">
        <div id="chat-window" class="card col-lg-4 col-12 bg-primary border-1" :class="{ open: isOpen }">
            <div class="card-header d-flex justify-content-between align-items-center border-bottom border-1">
                <span>Tantan AI</span>
                <button @click="toggleChat" class="btn-close" aria-label="Close"></button>
            </div>

            <div id="chat-body" class="d-flex flex-column">
                <div v-for="(msg, idx) in messages" :key="idx" :class="[
                    msg.type === 'user' ? 'user-msg ms-auto' : '',
                    msg.type === 'bot' ? 'bot-wrapper' : '',
                    msg.type === 'typing' ? 'typing-wrapper' : ''
                ]">
                    <template v-if="msg.type === 'bot' || msg.type === 'typing'">
                        <img src="@/assets/images/tantan.png" class="bot-profile" alt="Bot" />
                    </template>

                    <div v-if="msg.type === 'user'" class="user-msg text-dark">{{ msg.text }}</div>
                    <div v-else-if="msg.type === 'bot'" class="bot-msg text-dark">{{ msg.text }}</div>
                    <div v-else-if="msg.type === 'typing'" id="typing-indicator">
                        <div class="typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer d-flex border-top border-1">
                <input v-model="inputText"
                    @keypress.enter="sendMessage"
                    id="chat-input"
                    type="text"
                    class="form-control me-2 text-white bg-primary border-1"
                    placeholder="Type a message…"
                    autocomplete="off"
                />
                <button @click="sendMessage" id="send-button" class="btn btn-info"><i class="bi bi-send"></i></button>
            </div>
        </div>

        <button v-show="!isOpen"
            @click="toggleChat"
            id="chat-button"
            class="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center"
        ></button>
    </div>
</template>

<style scoped>
#chatbot {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1050;
}

#chat-button {
    order: 2;
    margin-top: 0.5rem;
    background-image: url('@/assets/images/tantan.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    padding: 32px !important;
}

#chat-window {
    -webkit-backdrop-filter: blur(6px) !important;
    backdrop-filter: blur(6px) !important;
    background: rgba(26, 26, 26, 0.7) !important;
    width: 400px;
    max-height: 550px;
    visibility: hidden;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0s linear 0.25s;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    order: 1;
}

#chat-window.open {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    transition-delay: 0s;
    margin-bottom: 1rem;
}

#chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
}

.user-msg {
    align-self: flex-end;
    background-color: #daf0fe;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    margin: 0.25rem 0;
    max-width: 100%;
}

.bot-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 0.25rem 0;
}

.bot-msg {
    background-color: #f5f5f5;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    max-width: 80%;
}

.bot-profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 0.5rem;
}

.typing-wrapper {
    display: flex;
    align-items: center;
    margin: 0.25rem 0;
}

.typing-dots {
    display: inline-flex;
    margin-left: 0.5rem;
}

.typing-dots span {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 0 2px;
    background-color: #999;
    border-radius: 50%;
    opacity: 0.3;
    animation: blink 1s infinite;
}

.typing-dots span:nth-child(1) { animation-delay: 0s; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
    0%, 80%, 100% {
        opacity: 0.3;
    }

    40% {
        opacity: 1;
    }
}

#chat-input {
    flex: 1;
}

@media screen and (max-width: 576px) {
    #chatbot {
        bottom: 1rem;
        right: 1rem;
        margin: 0px 0px 0px 1rem;
    }

    #chat-window {
        width: 100%;
        max-height: 80vh;
        bottom: 3.8em;
        right: 0;
        margin: 0;
        transform: none;
    }

    #chat-button {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 2.2rem;
        height: 2.2rem;
        font-size: 1.25rem;
        line-height: 3rem;
    }

    #chat-input {
        font-size: 1rem;
        padding: 0.5rem;
    }

    .user-msg, .bot-msg {
        font-size: 0.9rem;
        margin: 0.25rem 0;
    }
}
</style>
