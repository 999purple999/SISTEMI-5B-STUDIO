// Module 2 - chapters 1-5
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m2c1 = {
  title: "Firewall: Network e Personal",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p><strong>Network firewall</strong>: dispositivo (hardware o router con software) tra LAN e Internet, filtra inbound + outbound. <strong>Personal firewall</strong>: programma sul singolo host. Regole nella <strong>ACL</strong>: traffico non conforme → scartato. Più firewall = più sicurezza ma più lentezza.</p></div>

    <p>Un <span class="term">firewall</span> è un dispositivo che <strong>filtra il traffico</strong> che transita tra due o più reti, in base a regole prestabilite (<em>policy</em>) memorizzate in una <span class="term">Access Control List (ACL)</span>.</p>

    <p>Il traffico che <strong>non rispetta</strong> le regole viene <strong>scartato</strong>. Esistono due grandi categorie:</p>

    <h2 id="network-firewall">Network Firewall</h2>
    <p>Apparato dotato di <strong>due o più interfacce di rete</strong> che filtra il traffico tra le reti collegate. Tipicamente è frapposto tra una <strong>LAN aziendale</strong> e <strong>Internet</strong>.</p>

    <p>Il filtraggio coinvolge sia il traffico:</p>
    <ul>
      <li><strong>Entrante (inbound)</strong> nella LAN.</li>
      <li><strong>Uscente (outbound)</strong> dalla LAN.</li>
    </ul>

    <p>Il firewall può essere un <strong>apparato hardware dedicato</strong> oppure un <strong>router</strong> con software adeguato.</p>

    <h2 id="personal-firewall">Personal Firewall</h2>
    <p>È un <strong>programma installato direttamente su un host</strong> (PC, server) che controlla il traffico in ingresso e in uscita di quella sola macchina.</p>

    <h2 id="confronto">Differenze principali</h2>
    <table>
      <thead><tr><th>Caratteristica</th><th>Network</th><th>Personal</th></tr></thead>
      <tbody>
        <tr><td>Cosa protegge</td><td>Intera rete LAN</td><td>Solo l'host su cui gira</td></tr>
        <tr><td>Tipologia</td><td>Hardware o router con software</td><td>Software installato sul singolo host</td></tr>
        <tr><td>Quando si usa</td><td>Reti aziendali con molti host</td><td>Reti casalinghe, piccole reti</td></tr>
        <tr><td>Gestione</td><td>Centralizzata</td><td>Per ogni macchina</td></tr>
      </tbody>
    </table>

    <div class="info-box warn">
      <h4>⚠️ Attenzione alle prestazioni</h4>
      <p>Aggiungere più firewall a una rete aumenta la sicurezza ma <strong>rallenta</strong> il traffico, perché ogni pacchetto deve essere analizzato.</p>
    </div>
  `,
  quiz: [
    {q: "Cos'è un firewall?", a: ["Un dispositivo che filtra il traffico tra reti secondo regole prestabilite","Un cifrario","Un sistema di backup","Un protocollo di routing"], correct: 0, explain: "Il firewall filtra il traffico in base a regole memorizzate nell'ACL."},
    {q: "Le regole del firewall sono memorizzate in:", a: ["NAT Table","Access Control List (ACL)","Routing table","DNS"], correct: 1, explain: "Le regole del firewall sono inserite in una tabella chiamata Access Control List (ACL)."},
    {q: "Un Network Firewall protegge:", a: ["Solo un host","Un'intera rete LAN","Solo i server","Solo il traffico DNS"], correct: 1, explain: "Il network firewall filtra il traffico tra reti, proteggendo l'intera LAN."},
    {q: "Un Personal Firewall:", a: ["È un dispositivo hardware","È un programma installato sul singolo host","Sostituisce il router","Funziona solo in azienda"], correct: 1, explain: "Il personal firewall è software installato direttamente sull'host che vuole proteggere."},
    {q: "Quale tipo di traffico filtra un firewall?", a: ["Solo entrante","Solo uscente","Sia entrante (inbound) che uscente (outbound)","Solo TCP"], correct: 2, explain: "Il firewall filtra il traffico inbound e outbound."},
    {q: "Quale è uno svantaggio dei firewall?", a: ["Sono inutili","Rallentano la rete perché ogni pacchetto va analizzato","Non si possono configurare","Non funzionano su Internet"], correct: 1, explain: "L'analisi di ogni pacchetto introduce un costo computazionale che rallenta la rete."}
  ]
};

window.CHAPTERS.m2c2 = {
  title: "ACL standard ed estese (Cisco)",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p><strong>ACL standard</strong> (1-99): solo IP mittente, applicate <strong>vicino alla destinazione</strong>. <strong>ACL estese</strong> (100-199): IP src/dst, porte, protocollo, applicate <strong>vicino alla sorgente</strong>. Logica: <strong>first-match wins</strong>. Default: <strong>deny</strong>. Wildcard: <code>0.0.0.0</code> = singolo host, <code>0.0.0.255</code> = /24, <code>any</code> = tutti.</p></div>

    <p>Le <span class="term">Access Control List (ACL)</span> sono un elenco di regole che stabiliscono quale traffico può essere entrante o uscente da una determinata interfaccia di un router con funzionalità di firewall.</p>

    <h2 id="struttura">Struttura di una regola</h2>
    <p>Ogni regola si compone di <strong>pattern</strong> (caratteristiche del pacchetto) e <strong>azione</strong>:</p>
    <ul>
      <li><span class="term">permit</span>: il router fa passare il pacchetto se rispetta il pattern.</li>
      <li><span class="term">deny</span>: il router scarta il pacchetto.</li>
    </ul>

    <h2 id="acl-flow">Flow di valutazione ACL</h2>
    <pre class="mermaid">
flowchart TD
  P[📦 Pacchetto in arrivo] --> R1{Match con regola 1?}
  R1 -->|Sì| A1{Azione regola 1}
  R1 -->|No| R2{Match con regola 2?}
  R2 -->|Sì| A2{Azione regola 2}
  R2 -->|No| RN{...}
  RN -->|No match| DEF[🚫 Default: deny]
  A1 -->|permit| OK[✅ Inoltra]
  A1 -->|deny| KO[❌ Scarta]
  A2 -->|permit| OK
  A2 -->|deny| KO
  DEF --> KO
    </pre>

    <h2 id="match">Logica di match</h2>
    <div class="info-box key">
      <h4>🔑 Regole importanti (Cisco)</h4>
      <ul>
        <li><strong>First-match wins</strong>: si applica l'azione della <strong>prima</strong> regola che produce un match. Le successive non vengono valutate.</li>
        <li><strong>Default deny</strong>: se nessuna regola produce match, il pacchetto viene <strong>scartato</strong>. Per far passare un pacchetto è quindi necessario che abbia almeno un match con una regola <code>permit</code>.</li>
      </ul>
    </div>

    <h2 id="acl-standard">ACL Standard</h2>
    <p>Permettono di filtrare <strong>solo in base all'indirizzo IP del mittente</strong>. Numero ACL: <strong>1-99</strong>.</p>
    <p>Si configurano sull'interfaccia <strong>più vicina alla destinazione finale</strong>, perché bloccano solo l'IP del mittente e devono evitare di scartare anche traffico legittimo originato dallo stesso host verso altre destinazioni.</p>

    <p>Sintassi:</p>
    <code class="formula">access-list 1 deny 192.168.2.2 0.0.0.0
access-list 1 permit any
interface Gig0/0
ip access-group 1 out</code>

    <h2 id="wildcard">Wildcard</h2>
    <p>La <strong>wildcard</strong> è una stringa di 32 bit usata per filtrare gruppi di indirizzi:</p>
    <ol>
      <li>Si confronta bit a bit l'IP del pacchetto con la wildcard: <code>IP_elab</code> = IP del pacchetto solo dove la wildcard ha bit a 0; 0 dove la wildcard ha 1.</li>
      <li>Si confronta <code>IP_elab</code> con l'IP nella regola: se uguali → match.</li>
    </ol>
    <p>Esempi:</p>
    <ul>
      <li><code>0.0.0.0</code> → confronta tutti i 32 bit (un solo host).</li>
      <li><code>0.0.0.255</code> → confronta solo i primi 24 bit (tutta la sottorete /24).</li>
      <li><code>any</code> → equivale a wildcard <code>255.255.255.255</code>, match con qualsiasi IP.</li>
    </ul>

    <h2 id="acl-estese">ACL Estese</h2>
    <p>Permettono di specificare nel pattern:</p>
    <ul>
      <li><strong>IP del mittente</strong> (con wildcard).</li>
      <li><strong>IP del destinatario</strong> (con wildcard).</li>
      <li><strong>Protocollo</strong> di trasporto (tcp, udp, ip).</li>
      <li><strong>Numero di porta</strong> del processo destinatario o mittente.</li>
    </ul>
    <p>Numero ACL: <strong>100-199</strong>. Si configurano sull'interfaccia <strong>più vicina alla sorgente</strong>: il traffico viene bloccato subito senza viaggiare inutilmente in rete.</p>

    <p>Esempio: bloccare tutto il traffico dalla rete 192.168.2.0/24 verso 192.168.1.0/24:</p>
    <code class="formula">access-list 100 deny ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255
access-list 100 permit ip any any
interface Gig0/0
ip access-group 100 in</code>

    <p>Esempio: permettere solo HTTP (porta 80) dalla rete 192.168.2.0/24 verso il server 192.168.1.4:</p>
    <code class="formula">access-list 100 permit tcp 192.168.2.0 0.0.0.255 192.168.1.4 0.0.0.0 eq 80</code>

    <div class="info-box tip">
      <h4>💡 Limiti per interfaccia</h4>
      <p>Ad ogni interfaccia si possono applicare al massimo <strong>4 ACL</strong>: 2 in ingresso (una IPv4 e una IPv6) e 2 in uscita.</p>
    </div>
  `,
  quiz: [
    {q: "Quali sono le possibili azioni in una regola ACL?", a: ["allow / block","permit / deny","accept / drop","yes / no"], correct: 1, explain: "Le azioni Cisco sono permit (lascia passare) e deny (scarta)."},
    {q: "Cosa succede se nessuna regola produce un match?", a: ["Il pacchetto passa","Il pacchetto viene scartato (default deny)","Si applica la prima regola","Si applica l'ultima regola"], correct: 1, explain: "La policy di default è scartare il pacchetto se non c'è match con alcuna regola."},
    {q: "Cosa significa 'first-match wins'?", a: ["Si applicano tutte le regole","Si applica l'azione della prima regola che produce un match","Si applica l'ultima regola","Si combinano le regole"], correct: 1, explain: "La logica Cisco si ferma alla prima regola che produce match, ignorando le successive."},
    {q: "Le ACL standard filtrano in base a:", a: ["Solo l'IP mittente","IP mittente e destinatario","IP, porta e protocollo","Solo MAC address"], correct: 0, explain: "Le ACL standard usano solo l'indirizzo IP del mittente nel pattern."},
    {q: "Le ACL standard si configurano sull'interfaccia:", a: ["Più vicina alla sorgente","Più vicina alla destinazione finale","Esterna","Solo loopback"], correct: 1, explain: "Le ACL standard vanno applicate vicino alla destinazione per non bloccare traffico legittimo verso altre reti."},
    {q: "Le ACL estese si configurano sull'interfaccia:", a: ["Più vicina alla sorgente","Più vicina alla destinazione","Esterna","In tutte le interfacce"], correct: 0, explain: "Le ACL estese vanno applicate vicino alla sorgente per bloccare il traffico già in partenza."},
    {q: "Il numero di un'ACL standard è nell'intervallo:", a: ["1-99","100-199","200-299","1-1000"], correct: 0, explain: "Le ACL standard usano numeri da 1 a 99."},
    {q: "La wildcard 0.0.0.0 significa:", a: ["Qualunque host","Match esatto su tutti i 32 bit (un solo host)","Tutta la rete","Nessuna corrispondenza"], correct: 1, explain: "0.0.0.0 confronta tutti i 32 bit dell'IP, quindi corrisponde a un singolo host."},
    {q: "La wildcard 0.0.0.255 corrisponde a:", a: ["Un singolo host","Una rete /24 (i primi 24 bit)","Tutto Internet","Una rete /16"], correct: 1, explain: "I primi 24 bit a 0 sono confrontati, gli ultimi 8 sono ignorati: equivale a una /24."},
    {q: "Quale comando associa l'ACL 100 in ingresso a Gig0/0?", a: ["ip access-group 100 out","ip access-group 100 in","access-list 100 permit any","interface Gig0/0 deny"], correct: 1, explain: "Il comando 'ip access-group 100 in' applica l'ACL 100 al traffico entrante."}
  ]
};

window.CHAPTERS.m2c3 = {
  title: "Categorie di firewall",
  body: `
    <p>Esistono tre principali categorie di firewall che operano a livelli diversi dello stack TCP/IP.</p>

    <h2 id="packet-filter">Packet Filter Firewall</h2>
    <p>Lavora a <strong>livello 3 (Rete)</strong> e <strong>4 (Trasporto)</strong> dello stack TCP/IP. Esamina:</p>
    <ul>
      <li>IP mittente / destinatario</li>
      <li>Protocollo di trasporto (TCP/UDP)</li>
      <li>Numero di porta mittente / destinatario</li>
      <li>Flag TCP (SYN, ACK, ...)</li>
    </ul>
    <p>Le ACL standard ed estese realizzano questo tipo di firewall. <strong>Veloce</strong> ma non vede il contenuto applicativo.</p>

    <h2 id="stateful">Stateful Packet Inspection Firewall</h2>
    <p>Versione evoluta del packet filter: oltre a filtrare i singoli pacchetti, mantiene una <strong>tabella delle connessioni attive</strong> (sessioni TCP).</p>
    <p>Ricorda quale lato ha aperto la connessione, e blocca pacchetti "non richiesti" che non appartengono a una sessione esistente. Difende meglio da attacchi <strong>IP spoofing</strong> e <strong>SYN flood</strong>.</p>

    <h2 id="application-level">Application Level Firewall</h2>
    <p>Lavora fino al <strong>livello applicativo</strong>: ispeziona il <strong>contenuto</strong> dei messaggi di richiesta e risposta (es. HTTP, FTP).</p>
    <p>Tipicamente realizzato come <strong>proxy</strong>: filtra in base a URL, dominio destinatario, contenuto del payload. Permette regole come "blocca il download di file con estensione <code>.exe</code>".</p>

    <div class="info-box warn">
      <h4>⚠️ Costi computazionali</h4>
      <p>Più si sale nello stack TCP/IP, più aumenta la <strong>granularità</strong> del filtraggio ma anche il <strong>carico computazionale</strong>.</p>
    </div>

    <h2 id="confronto">Confronto</h2>
    <table>
      <thead><tr><th>Tipo</th><th>Livello</th><th>Cosa esamina</th><th>Performance</th></tr></thead>
      <tbody>
        <tr><td>Packet Filter</td><td>3-4</td><td>IP, porte, protocollo</td><td>Alta</td></tr>
        <tr><td>Stateful</td><td>3-4 + sessioni</td><td>Stato delle connessioni</td><td>Media</td></tr>
        <tr><td>Application Level</td><td>3-7</td><td>Contenuto applicativo</td><td>Bassa</td></tr>
      </tbody>
    </table>
  `,
  quiz: [
    {q: "Quante categorie principali di firewall esistono?", a: ["Una","Due","Tre","Quattro"], correct: 2, explain: "Tre categorie: Packet Filter, Stateful Packet Inspection, Application Level."},
    {q: "A che livelli dello stack TCP/IP opera un Packet Filter Firewall?", a: ["Solo livello 1","Livello 3 e 4","Solo livello 7","Tutti i livelli"], correct: 1, explain: "Il Packet Filter analizza intestazioni IP (livello 3) e TCP/UDP (livello 4)."},
    {q: "Cosa caratterizza uno Stateful Packet Inspection Firewall?", a: ["Mantiene una tabella delle connessioni attive","Lavora a livello fisico","Cifra i pacchetti","Usa solo ACL standard"], correct: 0, explain: "Lo SPI tiene traccia delle sessioni TCP aperte e blocca pacchetti che non appartengono a nessuna."},
    {q: "Un Application Level Firewall:", a: ["Filtra solo per IP","Ispeziona il contenuto applicativo (es. URL, payload)","Lavora a livello fisico","Non analizza i messaggi"], correct: 1, explain: "Opera fino al livello applicativo, esaminando il contenuto dei messaggi (es. HTTP)."},
    {q: "Le ACL standard ed estese realizzano quale tipo di firewall?", a: ["Application Level","Packet Filter","Antivirus","DNS Filter"], correct: 1, explain: "Le ACL standard ed estese filtrano in base a IP, porte e protocollo: sono Packet Filter Firewall."},
    {q: "Quale firewall ha il costo computazionale maggiore?", a: ["Packet Filter","Stateful Inspection","Application Level","Sono tutti uguali"], correct: 2, explain: "L'Application Level ispeziona ogni messaggio fino al livello 7: è il più oneroso."}
  ]
};

window.CHAPTERS.m2c4 = {
  title: "Proxy server",
  body: `
    <p>Un <span class="term">proxy</span>, per un certo protocollo applicativo, è un processo che si <strong>interpone</strong> tra un client e un server nello scambio dei messaggi di richiesta e risposta.</p>

    <p>Il proxy funge da <strong>server per i client</strong> e da <strong>client per i server</strong>. I più diffusi: HTTP, HTTPS, FTP. Una stessa macchina può ospitare più proxy.</p>

    <h2 id="anonimato">Anonimato</h2>
    <p>Il proxy <strong>nasconde l'IP del client</strong> al server di destinazione: il messaggio inoltrato avrà come IP mittente quello del proxy, non quello del vero client. Attenzione: il proxy <strong>non cifra</strong> il traffico.</p>

    <h2 id="vantaggi">Vantaggi di un proxy privato</h2>
    <p>Un <strong>proxy privato</strong> è in esecuzione su un apparato interno alla LAN (router, PC o server dedicato).</p>

    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">📊</div>
        <div class="callout-title">Monitoraggio attività</div>
        <div class="callout-text">Registro di log con data, ora, IP mittente e server contattato.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">⚡</div>
        <div class="callout-title">Caching locale</div>
        <div class="callout-text">Memorizza copie delle risorse: se richieste di nuovo, le serve direttamente.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🛡️</div>
        <div class="callout-title">Filtraggio livello applicazione</div>
        <div class="callout-text">Regole su domini, URL, estensioni dei file (Application Level Firewall).</div>
      </div>
    </div>

    <h2 id="caching">Caching dettagliato</h2>
    <p>Il proxy memorizza per un certo tempo una copia della risorsa. Se un altro client richiede la stessa risorsa, il proxy la serve direttamente <strong>senza ricontattare il server di origine</strong>.</p>
    <p>Vantaggi:</p>
    <ul>
      <li>Riduzione del <strong>tempo di risposta</strong>.</li>
      <li>Riduzione del <strong>traffico</strong> sul collegamento esterno.</li>
    </ul>
    <p>Il proxy deve periodicamente verificare che la copia in cache sia <strong>aggiornata</strong>.</p>

    <h2 id="topologie">Topologie di organizzazione</h2>

    <h3 id="single">Single Proxy Topology</h3>
    <p><strong>Un solo</strong> proxy nella rete LAN. Adatto a reti con pochi client.</p>

    <h3 id="horizontally">Multiple Proxy Horizontally Topology</h3>
    <p>Più proxy nella stessa LAN, organizzati in <strong>parallelo</strong>. Un dispositivo chiamato <strong>load balancer</strong> distribuisce equamente le richieste tra i proxy. I proxy devono essere sincronizzati per avere le stesse regole e cache.</p>

    <h3 id="vertically">Multiple Proxy Vertically Topology</h3>
    <p>Più proxy disposti in <strong>cascata</strong>: il client contatta il primo proxy, che inoltra al secondo, e così via. Aumenta sicurezza e privacy ma diminuisce le prestazioni.</p>

    <h2 id="proxy-pubblici">Proxy pubblici vs privati</h2>
    <ul>
      <li><strong>Privato</strong>: gestito dall'azienda, dentro la LAN. Pieno controllo su log e regole.</li>
      <li><strong>Pubblico</strong>: gestito da terzi, su Internet. Spesso usato per anonimato individuale, ma il gestore vede tutto il traffico.</li>
    </ul>
  `,
  quiz: [
    {q: "Cos'è un proxy?", a: ["Un cifrario","Un processo che si interpone tra client e server nei messaggi","Un router","Un firewall hardware"], correct: 1, explain: "Il proxy si interpone tra client e server, fungendo da server per i client e da client per i server."},
    {q: "Quali sono i tre vantaggi principali di un proxy privato?", a: ["Velocità, costo, semplicità","Monitoraggio attività, caching locale, filtraggio livello applicazione","Cifratura, autenticazione, integrità","Routing, switching, NAT"], correct: 1, explain: "I tre vantaggi sono monitoraggio (log), caching e filtraggio applicativo."},
    {q: "Un proxy cripta il traffico?", a: ["Sì, sempre","No, di norma non lo cifra","Solo HTTPS","Solo per certi client"], correct: 1, explain: "Il proxy normalmente non cifra il traffico — garantisce solo anonimato."},
    {q: "A che livello dello stack opera un proxy?", a: ["Fisico","Trasporto","Applicativo","Datalink"], correct: 2, explain: "Il proxy opera fino al livello applicativo perché deve accedere ai messaggi di richiesta e risposta."},
    {q: "Cosa fa il caching del proxy?", a: ["Cifra i dati","Memorizza copie delle risorse per servirle senza ricontattare il server di origine","Genera certificati","Crea VLAN"], correct: 1, explain: "La cache locale riduce tempo di risposta e traffico verso il server originale."},
    {q: "Cosa è un load balancer in una topologia Multiple Horizontally?", a: ["Un firewall","Un dispositivo che distribuisce le richieste fra più proxy","Una CA","Un server FTP"], correct: 1, explain: "Il load balancer distribuisce equamente il carico tra i proxy paralleli."},
    {q: "In quale topologia i proxy sono in cascata?", a: ["Single Proxy","Multiple Horizontally","Multiple Vertically","Mesh"], correct: 2, explain: "Nella topologia Vertically i proxy sono in cascata: la richiesta passa da un proxy all'altro."},
    {q: "Quale topologia conviene per piccole reti?", a: ["Single Proxy","Multiple Horizontally","Multiple Vertically","Mesh"], correct: 0, explain: "La Single Proxy Topology è consigliata per reti con pochi client."}
  ]
};

window.CHAPTERS.m2c5 = {
  title: "Indirizzi IP pubblici e privati (RFC 1918)",
  body: `
    <p>L'indirizzo IPv4 è una sequenza di <strong>32 bit</strong>: il totale di indirizzi disponibili è <code>2<sup>32</sup> ≈ 4 miliardi</code>. La crescita esponenziale di Internet ha reso impossibile assegnare un IP univoco a ogni interfaccia mondiale.</p>

    <p>Per mitigare il problema, nel <strong>1996</strong> con l'<strong>RFC 1918</strong> gli indirizzi IPv4 sono stati divisi in <strong>privati</strong> e <strong>pubblici</strong>.</p>

    <h2 id="storia">Linea temporale RFC</h2>
    <ul>
      <li><strong>RFC 791 (1981)</strong>: classful addressing.</li>
      <li><strong>RFC 950 (1985)</strong>: subnetting.</li>
      <li><strong>RFC 1519 (1993)</strong>: CIDR.</li>
      <li><strong>RFC 1918 (1996)</strong>: indirizzi pubblici e privati.</li>
    </ul>

    <h2 id="blocchi-privati">Tre blocchi di indirizzi privati</h2>
    <table>
      <thead><tr><th>Blocco</th><th>Range</th><th>Classe</th></tr></thead>
      <tbody>
        <tr><td>I</td><td>10.0.0.0 - 10.255.255.255</td><td>1 rete classe A</td></tr>
        <tr><td>II</td><td>172.16.0.0 - 172.31.255.255</td><td>16 reti classe B</td></tr>
        <tr><td>III</td><td>192.168.0.0 - 192.168.255.255</td><td>256 reti classe C</td></tr>
      </tbody>
    </table>

    <h2 id="rete-privata">Indirizzo di rete privato</h2>
    <p>Un indirizzo di rete privato è <strong>liberamente assegnabile</strong> dall'amministratore. Una rete con tale indirizzo è una <strong>rete privata</strong>. Tutti gli IP assegnabili in una rete privata sono al loro volta privati.</p>

    <p>Più reti private nel mondo possono usare lo <strong>stesso indirizzo di rete</strong> → un IP privato <strong>non identifica univocamente</strong> un'interfaccia a livello mondiale.</p>

    <h2 id="instradamento">Instradamento</h2>
    <div class="info-box warn">
      <h4>⚠️ Limite fondamentale</h4>
      <p>Su Internet <strong>non possono</strong> circolare pacchetti con IP mittente o destinazione privato. I router pubblici scarterebbero questi pacchetti perché non potrebbero identificare in modo univoco l'interfaccia destinataria. Per uscire su Internet, un host privato richiede il servizio di <strong>NAT/PAT</strong>.</p>
    </div>

    <h2 id="ip-pubblici">Indirizzi pubblici</h2>
    <p>Identificano in maniera univoca un'interfaccia o una rete su Internet. La <strong>IANA</strong> ha suddiviso lo spazio IP pubblico tra <strong>5 RIR</strong> (Regional Internet Registries):</p>
    <ul>
      <li><strong>ARIN</strong> — American Registry for Internet Numbers</li>
      <li><strong>RIPE NCC</strong> — Réseaux IP Européens (Europa)</li>
      <li><strong>APNIC</strong> — Asia-Pacific</li>
      <li><strong>LACNIC</strong> — Latin America and Caribbean</li>
      <li><strong>AFRINIC</strong> — African Network Information Centre</li>
    </ul>
    <p>I RIR distribuiscono i blocchi agli ISP e alle grandi organizzazioni. Si può risalire al RIR di un IP pubblico tramite il servizio <strong>Whois</strong>.</p>
  `,
  quiz: [
    {q: "Quanti indirizzi IPv4 esistono in totale?", a: ["1 miliardo","2³² ≈ 4 miliardi","2¹² ≈ 4 mila","2⁶⁴"], correct: 1, explain: "IPv4 usa 32 bit → 2³² ≈ 4 miliardi di indirizzi."},
    {q: "Quale RFC ha introdotto la distinzione pubblici/privati?", a: ["RFC 791","RFC 1918","RFC 1519","RFC 6960"], correct: 1, explain: "RFC 1918 (1996) ha definito gli indirizzi pubblici e privati."},
    {q: "Quanti blocchi di indirizzi privati esistono?", a: ["1","2","3","5"], correct: 2, explain: "Tre blocchi: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."},
    {q: "Quale di questi è un IP privato?", a: ["8.8.8.8","192.168.1.1","216.58.214.46","104.21.0.1"], correct: 1, explain: "192.168.1.1 appartiene al III blocco privato."},
    {q: "Quale di questi NON è un range privato?", a: ["10.0.0.0 - 10.255.255.255","172.16.0.0 - 172.31.255.255","192.168.0.0 - 192.168.255.255","100.64.0.0 - 100.127.255.255"], correct: 3, explain: "100.64.0.0/10 è il range CGNAT, non rientra nei blocchi privati definiti dalla RFC 1918."},
    {q: "Un IP privato identifica univocamente un'interfaccia nel mondo?", a: ["Sì","No: più reti possono usare lo stesso indirizzo","Solo se /8","Solo se /24"], correct: 1, explain: "Più reti private possono condividere lo stesso indirizzo: l'IP privato non è univoco a livello globale."},
    {q: "Su Internet possono circolare pacchetti con IP mittente privato?", a: ["Sì sempre","No, perché i router pubblici non saprebbero come instradarli","Solo TCP","Solo UDP"], correct: 1, explain: "I pacchetti con IP privati non possono circolare su Internet: serve NAT/PAT."},
    {q: "Quanti RIR esistono nel mondo?", a: ["3","4","5","7"], correct: 2, explain: "I 5 RIR sono ARIN, RIPE NCC, APNIC, LACNIC, AFRINIC."},
    {q: "Quale RIR gestisce l'Europa?", a: ["ARIN","RIPE NCC","APNIC","AFRINIC"], correct: 1, explain: "RIPE NCC (Réseaux IP Européens) gestisce l'Europa."}
  ]
};
