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
import Modal from "bootstrap/js/dist/modal";
import { RouterLink, useRoute } from "vue-router";

const db = ref<any>(null);
const auth = ref<any>(null);
const userId = ref("");
const isAuthReady = ref(false);

const modalTitle = ref("");
const modalBody = ref("");
const modalType = ref("");

const message = ref("");
const messageType = ref("");

const email = ref("");
const loading = ref(false);

const currentYear = new Date().getFullYear();

const route = useRoute();
let subscriptionModal: Modal | null = null;

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

        onAuthStateChanged(firebaseAuth, async (user) => {
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

    const modalElement = document.getElementById("subscriptionModal");
    if(modalElement)
        subscriptionModal = new Modal(modalElement);
});

const validateForm = ()=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value.trim())) {
        showMessageAndModal(
            "Please enter a valid email address.",
            "error"
        );
        return false;
    }

    return true;
}

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
        const mailCollectionRef = collection(
            db.value,
            "artifacts/nthnn/public/data/mails"
        );

        await addDoc(
            mailCollectionRef,
            {
                email: email.value.trim(),
                path: route.path,
                timestamp: new Date().toISOString()
            }
        );

        showMessageAndModal(
            "Your email has been successfully added to mailing list!",
            "success"
        );

        email.value = "";
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

const showMessageAndModal = (msg: string, type: string) => {
    message.value = msg;
    modalBody.value = msg;
    modalType.value = type;
    messageType.value = type;

    modalTitle.value = type === "success" ?
        "Success!" : "Error!";

    if(subscriptionModal)
        subscriptionModal.show();
};
</script>
<template>
    <br/>
    <div class="modal fade" id="subscriptionModal" tabindex="-1" aria-labelledby="subscriptionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-primary border border-gray">
                <div class="modal-header" :class='{ "border-info": modalType === "success", "border-danger": modalType === "error" }'>
                    <h5 class="modal-title text-white" id="subscriptionModalLabel">{{ modalTitle }}</h5>
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

    <div class="border-top border-gray">
        <div class="container pt-4">
            <div class="row pt-4 pb-0">
                <div class="col-12 col-lg-4">
                    <div class="desktop-only">
                        <img src="/images/nthnn_logo.png" class="w-50 mb-2" />
                        <h2 class="shimmer">Nathanne Isip</h2>
                        <p class="mt-4">&copy; {{ currentYear }} &mdash; All rights reserved.</p>
                        <hr class="mobile-only my-4" />
                    </div>
                    <div class="mobile-only" align="center">
                        <img src="/images/nthnn_logo.png" class="w-50 mb-2" />
                        <h2 class="shimmer">Nathanne Isip</h2>
                        <p class="mt-4">&copy; {{ currentYear }} &mdash; All rights reserved.</p>
                        <hr class="mobile-only my-4" />
                    </div>
                </div>

                <div class="col-12 mobile-only">
                    <h3 class="shimmer">Subscribe to Newletter</h3>
                    <div class="input-group">
                        <input
                            type="email"
                            class="form-control border border-gray bg-primary text-white"
                            id="subscription-email"
                            v-model="email"
                            autocomplete="off"
                            placeholder="name@example.com"
                        />
                        <button
                            type="submit"
                            class="btn btn-info"
                            :disabled="loading || !isAuthReady"
                            v-on:click="handleSubmit"
                        >
                            {{ loading ? "Submitting..." : "Subscribe" }}
                        </button>
                    </div>
                    <small class="d-block mt-2">Rest assured your email will not be shared to anyone.</small>

                    <hr class="my-4"/>
                </div>

                <div class="col-12 col-lg-3">
                    <h4 class="shimmer mb-3">Quick Links</h4>
                    <div class="row">
                        <div class="col-6">
                            <RouterLink to="/" class="text-decoration-none blue-hover d-block">Home</RouterLink>
                            <RouterLink to="/projects" class="text-decoration-none blue-hover d-block pt-2">Projects</RouterLink>
                            <RouterLink to="/gallery" class="text-decoration-none blue-hover d-block pt-2">Gallery</RouterLink>
                        </div>

                        <div class="col-6">
                            <RouterLink to="/quote" class="text-decoration-none blue-hover d-block">Quote</RouterLink>
                            <RouterLink to="/contacts" class="text-decoration-none blue-hover d-block pt-2">Contacts</RouterLink>
                            <a href="https://github.com/nthnn" class="text-decoration-none blue-hover d-block pt-2" target="_blank">GitHub</a>
                        </div>
                    </div>
                    <br/>
                </div>

                <div class="col-lg-5 desktop-only">
                    <h4 class="shimmer">Subscribe to Newletter</h4>
                    <div class="input-group">
                        <input
                            type="email"
                            class="form-control border border-gray bg-primary text-white"
                            id="subscription-email"
                            v-model="email"
                            autocomplete="off"
                            placeholder="name@example.com"
                        />
                        <button
                            type="submit"
                            class="btn btn-info"
                            :disabled="loading || !isAuthReady"
                            v-on:click="handleSubmit"
                        >
                            {{ loading ? "Submitting..." : "Subscribe" }}
                        </button>
                    </div>
                    <small class="d-block mt-2">Rest assured your email will not be shared to anyone.</small>
                </div>
            </div>
        </div>
    </div>
</template>
