<script setup lang="ts">
import CurriculumVitaeButton from './CurriculumVitaeButton.vue';
</script>

<template>
    <div class="my-card p-4 bg-primary" id="experiences">
        <div class="row mt-2 mb-4 text-white">
            <div class="col-lg-6">
                <h3 class="fw-bold mb-0 shimmer">Experiences</h3>
            </div>

            <div class="col-lg-6">
                <div class="desktop-only" align="right">
                    <CurriculumVitaeButton />
                </div>

                <div class="mobile-only">
                    <CurriculumVitaeButton />
                </div>
            </div>
        </div>

        <ul class="timeline mt-4">
            <!--<li class="pb-4">
                <a href="https://www.tdcx.com/" target="_blank"><img src="/images/companies/tdcx.png" width="100" class="mb-2 pb-4" /></a>
                <h4><b class="fw-bold">TDCX Philippines</b><span class="fw-light">&nbsp;<sub><br class="mobile-only" /><sup>(Shaw Boulevard, Mandaluyong)</sup></sub></span></h4>
                <h4><span class="fw-light">E-Commerce Sales Representative</span></h4>
                <small class="fw-light">September 2025 - Present</small>
                <ul class="mt-2">
                    <li>Guide customers through the platform, helping them with product searches, account setup, and checkout processes.</li>
                    <li>Identify sales opportunities and apply upselling and cross-selling techniques to increase revenue and meet sales targets.</li>
                    <li>Monitor and analyze chat performance metrics, first-contact resolution and chat handle time, to improve personal performance.</li>
                </ul>
            </li>-->
            <li class="pb-4">
                <!--<a href="https://concentrix.com/" target="_blank"><img src="/images/companies/concentrix.png" width="240" class="mb-2 pb-4" /></a>-->
                <h4><b class="fw-bold">Concentrix</b><span class="fw-light">&nbsp;<sub><br class="mobile-only" /><sup>(Cubao, Quezon City)</sup></sub></span></h4>
                <h4><span class="fw-light">Wireless Support Specialist</span></h4>
                <small class="fw-light">August 2024 - September 2025</small>

                <ul class="mt-2">
                    <li>Provided excellent customer service to telecommunication company clients, resolving inquiries and issues efficiently.</li>
                    <li>Assisted customers with technical support, billing, and account management, ensuring high satisfaction levels.</li>
                    <li>Adhered to client-specific protocols, policy, and quality standards to maintain compliance and service excellence.</li>
                </ul>

                <h4 class="pt-4"><span class="fw-light">Software Quality Analyst (Internship)</span></h4>
                <small class="fw-light">March 2025 - May 2025</small>

                <ul class="mt-2">
                    <li>Internship entry-level role focused on maintaining software application quality that enhances the internal team experience.</li>
                    <li>Participate in code reviews, agile meetings, and ongoing training to improve technical skills and application performance.</li>
                    <li>Work closely with senior developers, UX/UI designers, and stakeholders to gather requirements and refine features.</li>
                </ul>
            </li>
            <li class="pb-4">
                <!--<a href="https://www.upwork.com/" target="_blank"><img src="/images/companies/upwork.png" width="160" class="mb-2 pb-4" /></a>-->
                <h4><b class="fw-bold">Virtual Assistance</b><span class="fw-light">&nbsp;<sub><br class="mobile-only" /><sup>(Remote Job)</sup></sub></span></h4>
                <h4><span class="fw-light">Healthcare Administrative Assistant</span></h4>
                <small class="fw-light">January 2024 - June 2024</small>

                <ul class="mt-2">
                    <li>Managed patient scheduling for in-office and telehealth appointments using electronic health record systems.</li>
                    <li>Triaged incoming calls and secure patient messages, directing clinical inquiries with HIPAA guidelines compliance.</li>
                    <li>Maintained and updated patient records, including demographics, appointment histories, and treatment notes.</li>
                </ul>
            </li>
            <!--<li>
                <img src="/images/companies/lawson.png" width="180" class="mb-2 pb-4" />
                <h4><b class="fw-bold">Lawson Philippines</b><span class="fw-light">&nbsp;<sub><br class="mobile-only" /><sup>(EDSA, Pasay City)</sup></sub></span></h4>
                <h4><span class="fw-light">Store Operations Team Leader</span></h4>
                <small class="fw-light">September 2023 - December 2023</small>

                <ul class="mt-2">
                    <li>Supervised daily store operations, ensuring smooth workflows and adherence to company standards.</li>
                    <li>Trained and guided team members, fostering a collaborative and efficient work environment.</li>
                    <li>Monitored inventory levels and coordinated restocking to maintain product availability and sales.</li>
                </ul>
            </li>-->
        </ul>
    </div>
    <br/>
</template>
