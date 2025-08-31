<script setup lang="ts">
import { ref, onMounted } from "vue";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";
import { hideLoadingBar } from "@/scripts/loading";
import { onBeforeRouteLeave } from "vue-router";
import { animateTitle } from "@/scripts/title";
import Modal from "bootstrap/js/dist/modal";

const name = ref(""),
    email = ref(""),
    description = ref("");

const loading = ref(false);
const message = ref("");
const messageType = ref("");
const db = ref<any>(null);
const auth = ref<any>(null);
const userId = ref("");
const isAuthReady = ref(false);

const modalTitle = ref("");
const modalBody = ref("");
const modalType = ref("");

let submissionModal: Modal | null = null;
onMounted(() => {
    try {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_APP_API_KEY,
            authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_APP_PROJECT_ID,
            storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_APP_ID,
            measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
        };

        if(!firebaseConfig.apiKey) {
            showMessageAndModal(
                "Database internal error.",
                "error"
            );
            return;
        }

        const app = initializeApp(firebaseConfig),
            firestoreDb = getFirestore(app),
            firebaseAuth = getAuth(app);

        db.value = firestoreDb;
        auth.value = firebaseAuth;

        onAuthStateChanged(firebaseAuth, async (user: any) => {
            if(user) {
                userId.value = user.uid;
                isAuthReady.value = true;
            }
            else try {
                await signInAnonymously(firebaseAuth);
            }
            catch(_) {
                showMessageAndModal(
                    "Internal error. Please try again.",
                    "error"
                );

                userId.value = crypto.randomUUID();
                isAuthReady.value = true;
            }
        });
    }
    catch(_) {
        showMessageAndModal(
            "Initialization internal error.",
            "error"
        );
    }

    const modalElement = document.getElementById("submissionModal");
    if(modalElement)
        submissionModal = new Modal(modalElement);
});

const showMessageAndModal = (msg: string, type: string) => {
    message.value = msg;
    modalBody.value = msg;
    modalType.value = type;
    messageType.value = type;

    modalTitle.value = type === "success" ?
        "Success!" : "Error!";

    if(submissionModal)
        submissionModal.show();
};

const validateForm = (): boolean => {
    message.value = "";
    messageType.value = "";

    if(!name.value ||
        !email.value ||
        !description.value
    ) {
        showMessageAndModal(
            "Please fill in all required fields.",
            "error"
        );
        return false;
    }

    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if(!nameRegex.test(name.value.trim())) {
        showMessageAndModal("Please enter a valid name.", "error");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value.trim())) {
        showMessageAndModal(
            "Please enter a valid email address.",
            "error"
        );
        return false;
    }

    if(description.value.trim().length < 10 ||
        description.value.trim().length > 16384
    ) {
        showMessageAndModal(
            "Description must be between 10 and 16,384 characters.",
            "error"
        );
        return false;
    }

    return true;
};

const handleSubmit = async() => {
    if(!validateForm())
        return;

    if(!db.value ||
        !auth.value ||
        !isAuthReady.value
    ) {
        showMessageAndModal(
            "Firebase is not fully initialized or " +
            "authenticated. Please wait.",
            "error"
        );
        return;
    }

    loading.value = true;
    try {
        const quotesCollectionRef = collection(
            db.value,
            "artifacts/nthnn/public/data/quotes"
        );

        const quoteData = {
            name: name.value.trim(),
            email: email.value.trim(),
            description: description.value.trim(),
            submittedAt: new Date().toISOString(),
            userId: userId.value
        };

        await addDoc(
            quotesCollectionRef,
            quoteData
        );

        showMessageAndModal(
            "Quote request submitted successfully! " +
            "I will get back to you as soon as possible!",
            "success"
        );

        name.value = "";
        email.value = "";
        description.value = "";
    }
    catch(_) {
        showMessageAndModal(
            "Internal error occurred while submitting.",
            "error"
        );
    }
    finally {
        loading.value = false;
    }
};

let animateInterval: number = 0;
onMounted(()=> {
    animateInterval = animateTitle("Quote | Nathanne Isip");
    hideLoadingBar(()=> {});
});

onBeforeRouteLeave(()=> clearInterval(animateInterval));
</script>

<template>
    <div class="card bg-primary border border-gray w-100 p-4">
        <h1>Contact Details</h1>
    </div>
    <br/>

    <div class="card quote-card bg-primary border border-gray w-100">
        <div class="row g-0 quote-card-row m-0 p-0">
            <div class="col-12 mobile-only">
                <img src="/images/quote-wallpaper.webp" class="w-100 border-gray border-bottom" />
            </div>

            <div class="col-12 col-lg-4 desktop-only image-col">
                <div class="image-container">
                    <img src="/images/quote-wallpaper.webp" class="quote-wallpaper-img" alt="Quote Wallpaper" />
                </div>
            </div>

            <div class="col-12 col-lg-8 form-col">
                <div class="border-gray border-start p-4 p-md-5">
                    <h1 class="text-center shimmer">Request a Quote</h1>
                    <hr class="mobile-only"/>

                    <div class="desktop-only my-4"></div>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="name" class="form-label text-white">Name</label>
                            <input
                                type="text"
                                class="form-control border border-gray bg-primary text-white"
                                id="name"
                                v-model="name"
                                autocomplete="off"
                                placeholder="Your Full Name" />
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label text-white">Email address</label>
                            <input
                                type="email"
                                class="form-control border border-gray bg-primary text-white"
                                id="email"
                                v-model="email"
                                autocomplete="off"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label text-white">Quote Description</label>
                            <textarea
                                class="form-control border border-gray bg-primary text-white"
                                id="description"
                                rows="4"
                                v-model="description"
                                placeholder="Please describe what you need a quote for (e.g., website design, custom software, event planning)."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-info w-100 fw-bold"
                            :disabled="loading || !isAuthReady"
                        >
                            {{ loading ? "Submitting..." : "Submit Quote Request" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="submissionModal" tabindex="-1" aria-labelledby="submissionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-primary border border-gray">
                <div class="modal-header" :class='{ "border-info": modalType === "success", "border-danger": modalType === "error" }'>
                    <h5 class="modal-title text-white" id="submissionModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-white">
                    {{ modalBody }}
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-info" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <br/>
</template>

<style scoped>
.main-wrapper {
    min-height: 1vh;
}

.quote-card {
    display: flex;
    flex-direction: column;
}

.quote-card-row {
    min-height: auto;
    align-items: stretch;
}

.image-col {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
}

.image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.quote-wallpaper-img {
    height: 100%;
    width: auto;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 130%;
    animation: slideAnimation 20s linear infinite alternate;
}

@keyframes slideAnimation {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-30%);
    }
}
</style>