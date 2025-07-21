<script setup lang="ts">
async function subscribeToMailing(email: string) {
    const channelId = import.meta.env.VITE_APP_MAILING_CHANNEL_ID;
    const botToken = import.meta.env.VITE_APP_MAILING_BOT_TOKEN;

    const url = `https://discord.com/api/v10/channels/${channelId}/messages/`;
    const payload = {
	    embeds: [{
            color: 0x1c1d1f,
            title: "Mailing List",
            description: "Yehey! We've a got a new mailing list subscriber!",
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "Email",
                    value: email
                },
                {
                    name: "Timestamp",
                    value: new Date().toString()
                }
            ]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${botToken}`
            },
            body: JSON.stringify(payload)
        });

        if(response.ok) {
            const data = await response.json();
            return data;
        }
        else throw new Error(`API error`);
    }
    catch(error) {
        throw error;
    }
}

function subscribeEvent() {
    subscribeToMailing("nathanneisip@gmail.com")
        .then(() => console.log('Message sending process completed.'))
        .catch(error => console.error('Overall message sending failed:', error.message));
}

</script>

<template>
    <hr/>

    <div class="row mt-4">
        <div class="col-12 col-lg-7"></div>

        <div class="col-12 col-lg-5">
            <h3 class="shimmer mb-2">Subscribe to Mailing List</h3>
            <div class="input-group mb-2">
                <input
                    id="mailing-list-input"
                    type="email"
                    class="form-control border border-gray bg-primary"
                    placeholder="Your email..."
                    autocomplete="off" />
                <button @click="subscribeEvent" class="btn btn-info col-12 col-lg-4 mt-2 mt-lg-0">Subscribe</button>
            </div>
            <small>Your email will not be shared to anyone.</small>
        </div>
    </div>
</template>
