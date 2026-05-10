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
      updated: 'Last updated: May 10, 2026',
      sections: [
        {
          heading: 'Who We Are',
          text: 'Tyndfed is a Copenhagen software studio operated by Tobias Dosdal-Feddersen. This policy explains how personal data is handled when you visit tyndfed.dk or contact us about potential work.',
        },
        {
          heading: 'Data You Send',
          text: 'When you use the contact form or send an email, we may receive your name, email address, project type, budget range, message, and any other details you choose to include.',
        },
        {
          heading: 'Technical Data',
          text: 'The website is hosted by third-party infrastructure providers that may process basic technical data such as IP address, browser information, requested pages, timestamps, and security logs. This is used to deliver, monitor, and protect the website.',
        },
        {
          heading: 'How We Use Data',
          text: 'We use personal data to reply to enquiries, discuss possible projects, prepare proposals, manage client communication, maintain business records, secure the website, and meet legal or accounting obligations.',
        },
        {
          heading: 'Cookies and Analytics',
          text: 'Tyndfed.dk does not use advertising trackers. If privacy-friendly analytics are added later, this page will be updated with the provider, purpose, and any cookie details before or when that tracking is introduced.',
        },
        {
          heading: 'Sharing',
          text: 'We do not sell personal data. Data may be processed by service providers used for hosting, email, security, bookkeeping, or project delivery. Data may also be disclosed if required by law.',
        },
        {
          heading: 'Retention',
          text: 'Enquiries that do not become projects are kept only as long as needed for follow-up. Client and business records may be kept longer where required for contracts, bookkeeping, tax, legal claims, or legitimate business documentation.',
        },
        {
          heading: 'Security',
          text: 'Reasonable technical and organizational measures are used to protect personal data. No website, email system, or internet transmission can be guaranteed to be completely secure.',
        },
        {
          heading: 'Your Rights',
          text: 'If EU or Danish data protection law applies, you may have the right to access, correct, delete, restrict, or object to processing of your personal data, and to request data portability. You may also complain to the Danish Data Protection Agency.',
        },
        {
          heading: 'Updates',
          text: 'This policy may be updated when the website, providers, services, or legal requirements change. The latest version is always published on this page.',
        },
        {
          heading: 'Contact',
          text: 'Questions about privacy can be sent to kontakt@tyndfed.dk. Business details: Tyndfed, Denmark, CVR 39125307.',
        },
      ],
    },
    terms: {
      title: 'Terms',
      updated: 'Last updated: May 10, 2026',
      sections: [
        {
          heading: 'Website Use',
          text: 'These terms apply to use of tyndfed.dk. The website presents Tyndfed, selected work, and ways to get in touch. It is provided for general information only.',
        },
        {
          heading: 'Website Content',
          text: 'Text, design, code, images, logos, and other materials on this website belong to Tyndfed or their respective owners unless stated otherwise. You may not copy, reproduce, or reuse them without permission, except where allowed by law.',
        },
        {
          heading: 'Enquiries',
          text: 'Sending a message or project enquiry does not create a client relationship, guarantee availability, or reserve time. Any project starts only when scope, timeline, price, responsibilities, and terms are agreed in writing.',
        },
        {
          heading: 'Client Work',
          text: 'Paid work is governed by a separate written agreement, proposal, statement of work, or contract. If there is a conflict between these website terms and a signed client agreement, the client agreement controls for that project.',
        },
        {
          heading: 'External Links',
          text: 'This website may link to client projects, social profiles, or other third-party websites. Tyndfed is not responsible for external content, availability, security, or privacy practices.',
        },
        {
          heading: 'No Warranty',
          text: 'The website is provided as is and as available. We try to keep information accurate and useful, but we do not guarantee that the website will always be available, complete, current, or error-free.',
        },
        {
          heading: 'Liability',
          text: 'To the extent permitted by law, Tyndfed is not liable for losses caused by use of this website, inability to access it, or reliance on information published here.',
        },
        {
          heading: 'Governing Law',
          text: 'These terms are governed by Danish law. Disputes related to the website are handled by the Danish courts unless mandatory law requires another venue.',
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
      updated: 'Senest opdateret: 10. maj 2026',
      sections: [
        {
          heading: 'Hvem vi er',
          text: 'Tyndfed er et softwarestudio i København drevet af Tobias Dosdal-Feddersen. Denne politik forklarer, hvordan personoplysninger behandles, når du besøger tyndfed.dk eller kontakter os om muligt samarbejde.',
        },
        {
          heading: 'Data du sender',
          text: 'Når du bruger kontaktformularen eller sender en email, kan vi modtage dit navn, din emailadresse, projekttype, budgetramme, besked og andre oplysninger, du selv vælger at sende.',
        },
        {
          heading: 'Tekniske data',
          text: 'Hjemmesiden hostes hos eksterne infrastrukturleverandører, som kan behandle basale tekniske data såsom IP-adresse, browseroplysninger, viste sider, tidspunkter og sikkerhedslogs. Det bruges til at levere, overvåge og beskytte hjemmesiden.',
        },
        {
          heading: 'Hvordan vi bruger data',
          text: 'Vi bruger personoplysninger til at besvare henvendelser, drøfte mulige projekter, udarbejde tilbud, håndtere kundekommunikation, føre forretningsarkiv, beskytte hjemmesiden og opfylde juridiske eller regnskabsmæssige forpligtelser.',
        },
        {
          heading: 'Cookies og analyse',
          text: 'Tyndfed.dk bruger ikke reklamesporing. Hvis der senere tilføjes privatlivsvenlig analyse, opdateres denne side med leverandør, formål og eventuelle cookieoplysninger før eller samtidig med, at sporingen indføres.',
        },
        {
          heading: 'Deling',
          text: 'Vi sælger ikke personoplysninger. Data kan behandles af leverandører, der bruges til hosting, email, sikkerhed, bogføring eller projektlevering. Data kan også videregives, hvis loven kræver det.',
        },
        {
          heading: 'Opbevaring',
          text: 'Henvendelser, der ikke bliver til projekter, gemmes kun så længe det er nødvendigt for opfølgning. Kunde- og forretningsmateriale kan gemmes længere, hvor det er nødvendigt for kontrakter, bogføring, skat, retskrav eller legitim forretningsdokumentation.',
        },
        {
          heading: 'Sikkerhed',
          text: 'Der bruges rimelige tekniske og organisatoriske foranstaltninger til at beskytte personoplysninger. Ingen hjemmeside, emailsystem eller internettransmission kan garanteres fuldstændig sikker.',
        },
        {
          heading: 'Dine rettigheder',
          text: 'Hvis EU- eller dansk databeskyttelsesret gælder, kan du have ret til indsigt, rettelse, sletning, begrænsning, indsigelse mod behandling og dataportabilitet. Du kan også klage til Datatilsynet.',
        },
        {
          heading: 'Opdateringer',
          text: 'Denne politik kan opdateres, når hjemmesiden, leverandører, ydelser eller lovkrav ændrer sig. Den nyeste version offentliggøres altid på denne side.',
        },
        {
          heading: 'Kontakt',
          text: 'Spørgsmål om privatliv kan sendes til kontakt@tyndfed.dk. Virksomhedsoplysninger: Tyndfed, Danmark, CVR 39125307.',
        },
      ],
    },
    terms: {
      title: 'Vilkår',
      updated: 'Senest opdateret: 10. maj 2026',
      sections: [
        {
          heading: 'Brug af hjemmesiden',
          text: 'Disse vilkår gælder for brug af tyndfed.dk. Hjemmesiden præsenterer Tyndfed, udvalgt arbejde og kontaktmuligheder. Den stilles til rådighed som generel information.',
        },
        {
          heading: 'Hjemmesidens indhold',
          text: 'Tekst, design, kode, billeder, logoer og andet materiale på hjemmesiden tilhører Tyndfed eller de respektive ejere, medmindre andet er angivet. Du må ikke kopiere, reproducere eller genbruge materialet uden tilladelse, bortset fra hvor loven tillader det.',
        },
        {
          heading: 'Henvendelser',
          text: 'En besked eller projektforespørgsel opretter ikke et kundeforhold, garanterer ikke ledig kapacitet og reserverer ikke tid. Et projekt starter først, når omfang, tidsplan, pris, ansvar og vilkår er aftalt skriftligt.',
        },
        {
          heading: 'Kundearbejde',
          text: 'Betalt arbejde reguleres af en separat skriftlig aftale, tilbud, opgavebeskrivelse eller kontrakt. Hvis der er konflikt mellem disse hjemmesidevilkår og en underskrevet kundeaftale, gælder kundeaftalen for det pågældende projekt.',
        },
        {
          heading: 'Eksterne links',
          text: 'Hjemmesiden kan linke til kundeprojekter, sociale profiler eller andre tredjepartshjemmesider. Tyndfed er ikke ansvarlig for eksternt indhold, tilgængelighed, sikkerhed eller privatlivspraksis.',
        },
        {
          heading: 'Ingen garanti',
          text: 'Hjemmesiden stilles til rådighed som den er og som tilgængelig. Vi forsøger at holde oplysninger korrekte og brugbare, men garanterer ikke, at hjemmesiden altid er tilgængelig, komplet, aktuel eller fejlfri.',
        },
        {
          heading: 'Ansvar',
          text: 'I det omfang loven tillader det, er Tyndfed ikke ansvarlig for tab, der skyldes brug af hjemmesiden, manglende adgang til hjemmesiden eller tillid til oplysninger offentliggjort her.',
        },
        {
          heading: 'Gældende lov',
          text: 'Disse vilkår er underlagt dansk ret. Tvister om hjemmesiden behandles ved danske domstole, medmindre ufravigelig lovgivning kræver et andet værneting.',
        },
        {
          heading: 'Kontakt',
          text: 'Spørgsmål om disse vilkår? Kontakt kontakt@tyndfed.dk.',
        },
      ],
    },
  },
};
