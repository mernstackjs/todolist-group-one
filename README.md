## ToDo App - Grupp 1
Detta är en dynamisk att-göra-lista byggd med JavaScript (Vanilla), HTML och CSS. Applikationen tillåter användare att skapa konton, logga in och hantera sina personliga uppgifter i realtid.

Live Demo: GitHub Profile

---

🎯 Syfte
Syftet med projektet har varit att utveckla en användarvänlig och säker applikation för uppgiftshantering. Genom att implementera autentisering säkerställer vi att varje användare får en personlig upplevelse där deras data sparas säkert i en molndatabas.

🛠 Teknikstack
Frontend: JavaScript (ES6+), HTML5, CSS3.
Byggverktyg: Vite.
Backend/Databas: Supabase (PostgreSQL & Auth).
Testning: Vitest (TDD).
Hosting: Netlify.

---

🚀 Funktioner
Autentisering: Registrering och inloggning via e-post (utan krav på bekräftelsemejl för smidig demo).
CRUD-funktionalitet: Användare kan skapa (Create), läsa (Read), uppdatera (Update) och radera (Delete) sina uppgifter.
Dynamiskt UI: Allt innehåll genereras via JavaScript-funktioner. Inga statiska list-element finns i HTML-filen.
Responsiv design: Applikationen fungerar lika bra på mobilen som på datorn.

---

💡 Genomförande & Lösning
Vi har arbetat med en modulär arkitektur för att hålla koden ren och skalbar:

CreateDOM.js: En hjälpklass som används för att skapa alla HTML-element, attribut och värden dynamiskt via JavaScript.
HttpClient.js: Sköter all kommunikation med Supabase API (Login, hämta data, spara data).
Task.js: En modell som definierar hur ett uppgift-objekt ska se ut.
TDD (Test Driven Development): Vi har implementerat en testfil (httpClient.test.js) med Vitest för att säkerställa att anslutningen till databasen fungerar och att inloggningslogiken returnerar förväntade värden.

---

## Medlemmar

- Ahmed – [GitHub Profile](https://github.com/mernstackjs)
- Phoenix – [GitHub Profile](https://github.com/phx-codes)
