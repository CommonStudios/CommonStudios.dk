export interface LegalSection {
  heading: string;
  text: string;
}

export interface LegalDocument {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
}

export type Language = 'en' | 'da';

export const legalContent: Record<Language, LegalContent> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last Updated: December 21, 2025',
      sections: [
        {
          heading: 'Introduction',
          text: 'Tyndfed ("we", "us", or "our") is a Copenhagen software studio. This policy explains how we collect, use, and protect personal data when you visit tyndfed.dk or contact us about a project.',
        },
        {
          heading: 'Information We Collect',
          text: 'We collect information you choose to send, such as your name, email address, project type, budget range, and message. Basic technical information may be processed by our hosting provider to deliver and secure the website.',
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use your information to reply to enquiries, discuss potential work, prepare proposals, maintain business records, and comply with legal obligations.',
        },
        {
          heading: 'Data Sharing',
          text: 'We do not sell personal data. We may share data with service providers that help operate the website, email, and hosting, or with authorities when required by law.',
        },
        {
          heading: 'Data Retention',
          text: 'We keep enquiry and client correspondence only as long as needed for the business relationship, bookkeeping, legal requirements, or legitimate follow-up.',
        },
        {
          heading: 'Security',
          text: 'We use reasonable technical and organizational measures to protect personal data. No internet transmission or storage system can be guaranteed to be completely secure.',
        },
        {
          heading: 'Your Rights (GDPR)',
          text: 'Under EU/EEA law, you have the right to: access your personal data; correct inaccurate data; request deletion; restrict processing; data portability; and withdraw consent. Contact us to exercise these rights.',
        },
        {
          heading: 'Cookies & Analytics',
          text: 'The website does not use advertising trackers. If privacy-friendly analytics are added later, this policy will be updated with the provider and purpose.',
        },
        {
          heading: "Children's Privacy",
          text: 'Our services are not directed at children under 13. We do not knowingly collect data from children. If you believe we have collected such data, please contact us immediately.',
        },
        {
          heading: 'Changes to This Policy',
          text: 'We may update this policy when the website, providers, or legal requirements change. The latest version is published on this page.',
        },
        {
          heading: 'Contact',
          text: 'Questions about this policy? Contact us at kontakt@tyndfed.dk or write to: Tyndfed, Denmark (CVR: 39125307).',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      updated: 'Last Updated: December 21, 2025',
      sections: [
        {
          heading: 'Acceptance',
          text: 'By using tyndfed.dk, you agree to these terms. Separate written agreements govern paid client work.',
        },
        {
          heading: 'Website Content',
          text: 'Text, design, code, images, logos, and other materials on this website belong to Tyndfed or their respective owners unless otherwise stated. You may not copy or reuse them without permission.',
        },
        {
          heading: 'Enquiries',
          text: 'Submitting an enquiry does not create a client relationship or guarantee availability. Project scope, pricing, timeline, rights, and delivery terms are agreed separately in writing.',
        },
        {
          heading: 'External Links',
          text: 'This website links to external project and social media sites. Tyndfed is not responsible for the content, availability, or privacy practices of those third-party sites.',
        },
        {
          heading: 'Disclaimer of Warranties',
          text: 'This website is provided "AS IS" and "AS AVAILABLE". We aim to keep information accurate, but we do not guarantee that the website will be uninterrupted, error-free, or complete.',
        },
        {
          heading: 'Limitation of Liability',
          text: 'To the maximum extent permitted by law, Tyndfed is not liable for losses arising from use of this website or reliance on its content.',
        },
        {
          heading: 'Governing Law',
          text: 'These terms are governed by Danish law. Disputes shall be resolved in the courts of Denmark. If you are an EU consumer, you may also use the EU Online Dispute Resolution platform.',
        },
        {
          heading: 'Contact',
          text: 'For questions about these terms, contact kontakt@tyndfed.dk.',
        },
      ],
    },
  },
  da: {
    privacy: {
      title: 'Privatlivspolitik',
      updated: 'Senest opdateret: 21. december 2025',
      sections: [
        {
          heading: 'Introduktion',
          text: 'Tyndfed ("vi", "os" eller "vores") er et softwarestudio i København. Denne politik forklarer, hvordan vi indsamler, bruger og beskytter personoplysninger, når du besøger tyndfed.dk eller kontakter os om et projekt.',
        },
        {
          heading: 'Oplysninger vi indsamler',
          text: 'Vi indsamler oplysninger, du selv sender, såsom navn, emailadresse, projekttype, budgetramme og besked. Basale tekniske oplysninger kan behandles af vores hostingudbyder for at levere og beskytte hjemmesiden.',
        },
        {
          heading: 'Hvordan vi bruger dine oplysninger',
          text: 'Vi bruger dine oplysninger til at besvare henvendelser, drøfte muligt samarbejde, udarbejde tilbud, føre forretningsarkiv og overholde juridiske forpligtelser.',
        },
        {
          heading: 'Datadeling',
          text: 'Vi sælger ikke personoplysninger. Vi kan dele data med leverandører, der hjælper med hjemmeside, email og hosting, eller med myndigheder når loven kræver det.',
        },
        {
          heading: 'Dataopbevaring',
          text: 'Vi gemmer henvendelser og kundekorrespondance så længe det er nødvendigt for samarbejdet, bogføring, juridiske krav eller legitim opfølgning.',
        },
        {
          heading: 'Sikkerhed',
          text: 'Vi bruger rimelige tekniske og organisatoriske foranstaltninger til at beskytte personoplysninger. Ingen internettransmission eller lagring kan garanteres fuldstændig sikker.',
        },
        {
          heading: 'Dine rettigheder (GDPR)',
          text: 'Under EU/EØS-lovgivning har du ret til: indsigt i dine personoplysninger; berigtigelse af urigtige data; anmodning om sletning; begrænsning af behandling; dataportabilitet; og tilbagetrækning af samtykke. Kontakt os for at udøve disse rettigheder.',
        },
        {
          heading: 'Cookies & Analyse',
          text: 'Hjemmesiden bruger ikke reklamesporing. Hvis der senere tilføjes privatlivsvenlig analyse, opdateres denne politik med leverandør og formål.',
        },
        {
          heading: 'Børns privatliv',
          text: 'Vores tjenester er ikke rettet mod børn under 13 år. Vi indsamler ikke bevidst data fra børn. Hvis du mener, vi har indsamlet sådanne data, kontakt os straks.',
        },
        {
          heading: 'Ændringer til denne politik',
          text: 'Vi kan opdatere denne politik, når hjemmesiden, leverandører eller lovkrav ændrer sig. Den seneste version findes på denne side.',
        },
        {
          heading: 'Kontakt',
          text: 'Spørgsmål om denne politik? Kontakt os på kontakt@tyndfed.dk eller skriv til: Tyndfed, Danmark (CVR: 39125307).',
        },
      ],
    },
    terms: {
      title: 'Servicevilkår',
      updated: 'Senest opdateret: 21. december 2025',
      sections: [
        {
          heading: 'Accept',
          text: 'Ved at bruge tyndfed.dk accepterer du disse vilkår. Betalt kundearbejde reguleres af separate skriftlige aftaler.',
        },
        {
          heading: 'Hjemmesidens indhold',
          text: 'Tekst, design, kode, billeder, logoer og andet materiale på hjemmesiden tilhører Tyndfed eller de respektive ejere, medmindre andet er angivet. Du må ikke kopiere eller genbruge materialet uden tilladelse.',
        },
        {
          heading: 'Henvendelser',
          text: 'En henvendelse opretter ikke et kundeforhold og garanterer ikke ledig kapacitet. Projektomfang, pris, tidsplan, rettigheder og leveringsvilkår aftales særskilt skriftligt.',
        },
        {
          heading: 'Eksterne links',
          text: 'Hjemmesiden linker til eksterne projekt- og sociale medier-sider. Tyndfed er ikke ansvarlig for indhold, tilgængelighed eller privatlivspraksis på disse tredjepartssider.',
        },
        {
          heading: 'Ansvarsfraskrivelse',
          text: 'Hjemmesiden leveres "som den er" og "som tilgængelig". Vi forsøger at holde oplysninger korrekte, men garanterer ikke, at hjemmesiden er uafbrudt, fejlfri eller komplet.',
        },
        {
          heading: 'Ansvarsbegrænsning',
          text: 'I det omfang loven tillader, er Tyndfed ikke ansvarlig for tab, der opstår ved brug af hjemmesiden eller tillid til dens indhold.',
        },
        {
          heading: 'Gældende lov',
          text: "Disse vilkår er underlagt dansk lovgivning. Tvister skal afgøres ved danske domstole. Hvis du er EU-forbruger, kan du også bruge EU's online tvistløsningsplatform.",
        },
        {
          heading: 'Kontakt',
          text: 'Spørgsmål om disse vilkår? Kontakt kontakt@tyndfed.dk.',
        },
      ],
    },
  },
};
