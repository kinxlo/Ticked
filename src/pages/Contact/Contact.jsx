import React from "react"

//import ContactForm from "../../components/contact/contactForm/ContactForm";

// import People from "../../assets/people.png";
import Layout from "../../layout/Layout"
import ContactHero from "../../components/contact/contact-hero/ContactHero"
import Download from "../../components/landing-page/download/Download"

const Contact = () => {
    return (
        <Layout>
            <ContactHero/>
            <Download/>
        </Layout>
    )
}

export default Contact
