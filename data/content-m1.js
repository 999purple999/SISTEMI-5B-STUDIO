// Module 1 chapter content + quizzes
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m1c1 = {
  title: "Introduzione alla sicurezza in una trasmissione",
  body: `
    <p>La <strong>crittografia</strong> è la scienza che studia tecniche efficienti per rendere sicure l'archiviazione e la trasmissione dei dati attraverso un <em>canale insicuro</em>.</p>

    <h2 id="attori">Gli attori della comunicazione</h2>
    <p>Nella letteratura crittografica si usano nomi convenzionali:</p>
    <div class="callout-grid">
      <div class="callout"><div class="callout-icon">👩</div><div class="callout-title">Alice</div><div class="callout-text">Il <strong>mittente</strong> del messaggio.</div></div>
      <div class="callout"><div class="callout-icon">👨</div><div class="callout-title">Bob</div><div class="callout-text">Il <strong>destinatario</strong> del messaggio.</div></div>
      <div class="callout"><div class="callout-icon">🦹</div><div class="callout-title">Trudy</div><div class="callout-text">L'<strong>attaccante</strong> che intercetta il canale.</div></div>
    </div>

    <h2 id="aspetti">I tre aspetti della sicurezza</h2>
    <div class="info-box key">
      <h4>🔑 Trinità della sicurezza (CIA)</h4>
      <p>Una trasmissione è davvero sicura solo se garantisce <strong>tutti e tre</strong> questi aspetti:</p>
    </div>
    <ul>
      <li><span class="term">Riservatezza</span> — l'attaccante, anche intercettando il messaggio, <strong>non comprende</strong> il contenuto informativo.</li>
      <li><span class="term">Integrità</span> — il destinatario può verificare se il messaggio ricevuto è <strong>uguale</strong> a quello trasmesso.</li>
      <li><span class="term">Autenticazione</span> — il destinatario può verificare l'<strong>identità</strong> dell'autore del messaggio.</li>
    </ul>

    <h2 id="riservatezza">Riservatezza</h2>
    <p>Il mittente <strong>non</strong> trasmette il messaggio in chiaro: invia il risultato di una trasformazione, chiamato <span class="term">messaggio cifrato</span>, che è <strong>inintelligibile</strong> e <strong>reversibile</strong>.</p>

    <h2 id="sistema">Sistema crittografico</h2>
    <p>L'<strong>algoritmo di cifratura</strong> e il corrispondente <strong>algoritmo di decifratura</strong> formano il <span class="term">sistema crittografico</span> (o <em>cifrario</em>).</p>
    <ul>
      <li>Il mittente fornisce all'algoritmo di cifratura il messaggio in chiaro → ottiene il messaggio cifrato.</li>
      <li>Il destinatario fornisce all'algoritmo di decifratura il messaggio cifrato → riottiene quello in chiaro.</li>
    </ul>

    <h2 id="algoritmi">Algoritmi crittografici</h2>
    <p>Tutti gli algoritmi di cifratura prevedono <strong>operazioni reversibili</strong>:</p>
    <ul>
      <li><strong>Sostituzione</strong> di simboli con altri simboli.</li>
      <li><strong>Trasposizione</strong> — collocare porzioni del messaggio in posizione diversa.</li>
    </ul>

    <h2 id="integrita">Integrità</h2>
    <p>Senza tecniche di integrità, il destinatario <strong>non può accorgersi</strong> di errori di trasmissione o manomissioni: i bit di un messaggio possono codificare qualunque informazione (esempio: una sequenza di DNS in cui le 4 basi sono codificate con 2 bit). Per garantire l'integrità si usano <strong>algoritmi di hash</strong>.</p>

    <h2 id="autenticazione">Autenticazione</h2>
    <p>Il caso classico: Alice invia a Bob un contratto contenente il proprio IBAN. Trudy può intercettare e creare un messaggio identico ma con il <strong>proprio IBAN</strong>. Senza autenticazione Bob non sa che l'autore è cambiato — la firma digitale risolve questo problema.</p>
  `,
  quiz: [
    {q: "Cos'è la crittografia?", a: ["Una scienza che studia tecniche per rendere sicura archiviazione e trasmissione dei dati","Un linguaggio di programmazione","Un protocollo di rete","Un tipo di hardware"], correct: 0, explain: "La crittografia è la scienza dello sviluppo di tecniche efficienti per rendere sicura l'archiviazione e la trasmissione dei dati."},
    {q: "Quali sono i tre aspetti della sicurezza in una trasmissione?", a: ["Velocità, costo, latenza","Riservatezza, integrità, autenticazione","Cifratura, decifratura, hashing","Mittente, destinatario, attaccante"], correct: 1, explain: "I tre aspetti fondamentali sono riservatezza (confidentiality), integrità e autenticazione."},
    {q: "Cosa significa 'riservatezza' in una trasmissione?", a: ["Il messaggio arriva integro al destinatario","L'attaccante non comprende il contenuto del messaggio anche se lo intercetta","Il destinatario verifica l'identità del mittente","Il mittente firma il messaggio"], correct: 1, explain: "La riservatezza garantisce che l'attaccante non comprenda il contenuto informativo del messaggio intercettato."},
    {q: "Cosa è un messaggio cifrato?", a: ["Un messaggio inintelligibile e reversibile risultato di una trasformazione del messaggio in chiaro","Un messaggio firmato digitalmente","Un messaggio compresso","Un messaggio inviato in HTTPS"], correct: 0, explain: "Il messaggio cifrato è il risultato di una trasformazione del messaggio in chiaro: è inintelligibile (privo di senso) ma reversibile."},
    {q: "Quali operazioni eseguono tipicamente gli algoritmi di cifratura?", a: ["Compressione e decompressione","Sostituzione di simboli e trasposizione","Hashing e firma","Routing e switching"], correct: 1, explain: "Gli algoritmi di cifratura prevedono operazioni reversibili come la sostituzione di simboli e la trasposizione."},
    {q: "Cosa garantisce l'integrità di un messaggio?", a: ["Che il mittente sia autentico","Che il messaggio ricevuto sia uguale a quello trasmesso","Che il messaggio sia segreto","Che il messaggio arrivi velocemente"], correct: 1, explain: "L'integrità permette al destinatario di verificare che il messaggio ricevuto sia identico a quello trasmesso dall'autore."},
    {q: "Nel modello classico, chi è 'Trudy'?", a: ["Il mittente","Il destinatario","L'attaccante","L'autorità di certificazione"], correct: 2, explain: "Per convenzione, Alice è il mittente, Bob il destinatario e Trudy l'attaccante."}
  ]
};

window.CHAPTERS.m1c2 = {
  title: "Principio di Kerckhoffs",
  body: `
    <p>Il <strong>principio di Kerckhoffs</strong>, enunciato nel <strong>1883</strong> da Auguste Kerckhoffs nell'articolo "<em>La cryptographie militaire</em>", segna il passaggio dalla crittografia <span class="term">storica</span> alla crittografia <span class="term">moderna</span>.</p>

    <div class="info-box key">
      <h4>🔑 Principio</h4>
      <p>La <strong>riservatezza</strong> di una comunicazione <strong>non</strong> deve dipendere dalla segretezza degli algoritmi di cifratura/decifratura, ma dalla <strong>segretezza di un parametro</strong> chiamato <span class="term">chiave</span>.</p>
    </div>

    <h2 id="implicazioni">Implicazioni</h2>
    <ul>
      <li>Anche se l'attaccante <strong>conosce</strong> il cifrario, non riesce a decifrare il messaggio senza la chiave.</li>
      <li>Gli algoritmi pubblici possono essere studiati e perfezionati da ricercatori di tutto il mondo: vulnerabilità individuate vengono corrette e l'efficienza migliora.</li>
    </ul>

    <h2 id="categorie">Due categorie di sistemi crittografici con chiave</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🔁</div>
        <div class="callout-title">Chiave simmetrica</div>
        <div class="callout-text">Ogni coppia di interlocutori condivide una <strong>chiave segreta</strong> nota esclusivamente a loro due.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🗝️</div>
        <div class="callout-title">Chiavi asimmetriche</div>
        <div class="callout-text">Ogni utente possiede una chiave <strong>pubblica</strong> (distribuibile) e una <strong>privata</strong>.</div>
      </div>
    </div>
  `,
  quiz: [
    {q: "In che anno fu enunciato il principio di Kerckhoffs?", a: ["1776","1883","1917","1976"], correct: 1, explain: "Il principio fu enunciato nel 1883 da Auguste Kerckhoffs nell'articolo 'La cryptographie militaire'."},
    {q: "Cosa afferma il principio di Kerckhoffs?", a: ["L'algoritmo di cifratura deve essere segreto","La sicurezza dipende dalla segretezza della chiave, non dell'algoritmo","Le chiavi devono cambiare ogni giorno","Tutti i messaggi devono essere firmati"], correct: 1, explain: "Il principio sancisce che la riservatezza non deve dipendere dalla segretezza dell'algoritmo, ma da un parametro chiamato chiave."},
    {q: "Perché è vantaggioso che gli algoritmi siano pubblici?", a: ["Per ridurre i costi","Permette ai ricercatori di studiarli, individuare vulnerabilità e migliorarli","Per renderli più veloci","Per facilitare il lavoro degli attaccanti"], correct: 1, explain: "Algoritmi pubblici possono essere analizzati e perfezionati dalla comunità scientifica."},
    {q: "Quante categorie di sistemi crittografici con chiave esistono?", a: ["Una","Due: simmetrica e asimmetrica","Tre","Quattro"], correct: 1, explain: "Esistono due categorie: a chiave simmetrica e a chiavi asimmetriche."},
    {q: "Nel sistema a chiave simmetrica, chi conosce la chiave?", a: ["Solo il mittente","Solo il destinatario","Esclusivamente i due interlocutori","Tutti gli utenti del sistema"], correct: 2, explain: "La chiave segreta è nota esclusivamente alla coppia di interlocutori."}
  ]
};

window.CHAPTERS.m1c3 = {
  title: "Crittografia a chiave simmetrica",
  body: `
    <p>Un cifrario a <span class="term">chiave simmetrica</span> richiede che i due interlocutori possiedano una <strong>chiave segreta comune</strong>, nota esclusivamente a loro due.</p>

    <h2 id="funzionamento">Come funziona</h2>
    <ol>
      <li>Il mittente fornisce all'algoritmo di cifratura il <strong>messaggio in chiaro</strong> + la <strong>chiave segreta</strong> → ottiene il messaggio cifrato.</li>
      <li>Il destinatario fornisce all'algoritmo di decifratura il <strong>messaggio cifrato</strong> + la <strong>stessa chiave segreta</strong> → riottiene il messaggio in chiaro.</li>
    </ol>

    <p>L'output dipende sia dal messaggio sia dalla chiave: usando due chiavi diverse sullo stesso messaggio si ottengono <strong>messaggi cifrati diversi</strong>. Più la chiave è lunga, più è difficile violare il messaggio.</p>

    <h2 id="vantaggi">Vantaggi</h2>
    <ul>
      <li>Algoritmi <strong>efficienti</strong> dal punto di vista computazionale (operazioni semplici come XOR, sostituzioni, trasposizioni).</li>
    </ul>

    <h2 id="svantaggi">Svantaggi</h2>
    <div class="info-box warn">
      <h4>⚠️ Tre problemi principali</h4>
      <ul>
        <li><strong>Canale sicuro necessario</strong>: la chiave deve essere trasmessa tra mittente e destinatario, ma raramente esiste un canale sicuro nella pratica.</li>
        <li><strong>Proliferazione delle chiavi</strong>: con N interlocutori che vogliono comunicare tutti tra loro servono <code>N(N-1)/2</code> chiavi distinte; ogni utente ne deve gestire <code>N-1</code>.</li>
        <li><strong>Gestione difficoltosa</strong>: ogni soggetto deve impedire l'accesso in lettura/scrittura alle chiavi nel proprio database privato.</li>
      </ul>
    </div>

    <h2 id="esempio">Esempio: 4 utenti</h2>
    <p>Con N = 4 utenti (Ada, Alice, Brian, Bob) che vogliono comunicare riservatamente tra loro: il numero di chiavi è <code>4·3/2 = 6</code>, ognuno ne gestisce <code>3</code>.</p>

    <div class="info-box tip">
      <h4>💡 Soluzione al problema del canale sicuro</h4>
      <p>L'<strong>algoritmo di Diffie-Hellman</strong>, in combinazione con la firma digitale, permette lo scambio di una chiave segreta attraverso un <strong>canale insicuro</strong>.</p>
    </div>
  `,
  quiz: [
    {q: "In un sistema a chiave simmetrica, mittente e destinatario usano:", a: ["Chiavi diverse","La stessa chiave segreta","Solo chiavi pubbliche","Nessuna chiave"], correct: 1, explain: "Entrambi gli interlocutori condividono la stessa chiave segreta."},
    {q: "Con N interlocutori che vogliono comunicare tutti tra loro, quante chiavi simmetriche servono?", a: ["N","N-1","N(N-1)/2","2N"], correct: 2, explain: "Per ogni coppia di interlocutori serve una chiave: N(N-1)/2 chiavi totali."},
    {q: "Quanti chiavi deve gestire ogni singolo utente nel caso peggiore?", a: ["1","N-1","N","N²"], correct: 1, explain: "Ogni utente deve gestire una chiave per ogni altro interlocutore, quindi N-1 chiavi."},
    {q: "Qual è il principale svantaggio della crittografia simmetrica?", a: ["È lenta","Richiede un canale sicuro per scambiare la chiave","Non garantisce riservatezza","Non funziona su Internet"], correct: 1, explain: "Il problema principale è la necessità di un canale sicuro per la trasmissione iniziale della chiave segreta."},
    {q: "Quale algoritmo risolve il problema dello scambio di chiave su canale insicuro?", a: ["RSA","Diffie-Hellman","SHA-256","AES"], correct: 1, explain: "Diffie-Hellman, in combinazione con la firma digitale, permette di scambiare una chiave segreta su canale insicuro."},
    {q: "Perché chiavi più lunghe sono più sicure?", a: ["Aumentano il numero di varianti dell'algoritmo da provare","Sono più costose","Sono più veloci","Non lo sono"], correct: 0, explain: "Più la chiave è lunga, più aumenta il numero di varianti possibili e la difficoltà di un attacco a forza bruta."}
  ]
};
