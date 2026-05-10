// Module 2 - chapters 6-10
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m2c6 = {
  title: "NAT, PAT, SNAT e Port Forwarding",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p><strong>NAT</strong>: pool di IP pubblici, sostituisce IP src privato → tabella NAT. Limite: cardinalità del pool. <strong>PAT</strong> (NAT Overload): UN solo IP pub, modifica anche la <strong>porta</strong> (perché 2 host potrebbero avere la stessa porta). <strong>SNAT</strong>: associazione permanente per server DMZ. <strong>Port Forwarding</strong>: una porta del router → un host privato.</p></div>

    <p>Tecniche di traduzione degli indirizzi che consentono a host con IP privati di comunicare con Internet.</p>

    <h2 id="nat">NAT (Network Address Translation)</h2>
    <p>Il router di bordo dispone di un <strong>pool di IP pubblici</strong> assegnato dall'ISP. Quando un pacchetto da un host con IP privato deve uscire su Internet:</p>
    <ol>
      <li>Il router <strong>sostituisce</strong> l'IP mittente privato con uno degli IP pubblici del pool.</li>
      <li>Memorizza l'associazione nella <strong>NAT Table</strong>.</li>
      <li>Per il traffico di ritorno consulta la NAT Table per ricavare l'IP privato del destinatario reale.</li>
    </ol>

    <div class="info-box warn">
      <h4>⚠️ Limite del NAT</h4>
      <p>Il numero di host che possono accedere a Internet <strong>contemporaneamente</strong> è limitato dalla <strong>cardinalità del pool</strong>. Se le richieste superano gli IP disponibili, le nuove non possono essere instaurate.</p>
    </div>

    <h2 id="pat">PAT (Port Address Translation)</h2>
    <p>Detto anche <strong>NAT Overload</strong>: usa <strong>un solo IP pubblico</strong> (quello dell'interfaccia esterna del router) per consentire l'accesso a Internet a tutti gli host privati.</p>

    <p>Quando un pacchetto deve uscire:</p>
    <ol>
      <li>Sostituisce l'<strong>IP privato del mittente</strong> con l'IP pubblico del router.</li>
      <li>Sostituisce il <strong>numero di porta del mittente</strong> con un nuovo numero di porta scelto dal router.</li>
      <li>Memorizza l'associazione (IP_priv:porta_orig → IP_pub:porta_nuova) nella <strong>PAT Table</strong>.</li>
    </ol>

    <h3 id="pat-flow">Diagramma PAT</h3>
    <pre class="mermaid">
sequenceDiagram
  participant H as 💻 Host A<br/>10.0.0.1:49530
  participant R as 🔀 Router PAT<br/>138.76.29.7
  participant S as 🌐 Server pubblico<br/>128.119.40.186:80
  H->>R: src=10.0.0.1:49530 dst=128.119.40.186:80
  Note over R: PAT Table:<br/>10.0.0.1:49530 → 138.76.29.7:65000
  R->>S: src=138.76.29.7:65000 dst=128.119.40.186:80
  S->>R: src=128.119.40.186:80 dst=138.76.29.7:65000
  Note over R: Cerca 65000 in PAT Table<br/>→ 10.0.0.1:49530
  R->>H: src=128.119.40.186:80 dst=10.0.0.1:49530
    </pre>

    <h3 id="esempio-pat">Esempio</h3>
    <p>Host A (10.0.0.1) con browser su porta 49530 invia richiesta HTTP al server pubblico 128.119.40.186. Il router sostituisce:</p>
    <ul>
      <li>IP mittente: <code>10.0.0.1</code> → <code>138.76.29.7</code> (IP pubblico router).</li>
      <li>Porta mittente: <code>49530</code> → <code>65000</code>.</li>
    </ul>

    <h3 id="perche-cambia-porta">Perché cambia la porta?</h3>
    <div class="info-box key">
      <h4>🔑 Necessità del cambio porta</h4>
      <p>Il numero di porta identifica un processo <strong>all'interno di un host</strong>. Processi su host diversi della LAN potrebbero avere lo stesso numero di porta. Senza cambiare la porta, il router non saprebbe a quale host inoltrare il pacchetto di ritorno.</p>
    </div>

    <h2 id="snat">Static NAT (SNAT)</h2>
    <p>L'amministratore associa <strong>permanentemente</strong> a ciascun IP privato della rete (tipicamente DMZ) un IP pubblico del pool. Le associazioni vengono memorizzate in una <strong>SNAT Table</strong>.</p>
    <p>Si usa per i <strong>server pubblici</strong> della DMZ, perché sono raggiungibili sempre dallo stesso IP pubblico, indispensabile per servizi accessibili dall'esterno.</p>

    <h2 id="port-forwarding">Port Forwarding</h2>
    <p>Si configura il router per inoltrare il traffico ricevuto su una <strong>specifica porta del suo IP pubblico</strong> a un determinato host privato. Permette di esporre un solo servizio specifico senza dedicare un intero IP pubblico.</p>

    <p>Esempio: tutto il traffico TCP su porta 80 ricevuto sul router (IP pubblico 198.51.100.1) viene inoltrato all'host interno 192.168.1.10 sulla porta 80 dove è in ascolto un web server.</p>
  `,
  quiz: [
    {q: "Cosa fa il NAT?", a: ["Cifra i pacchetti","Sostituisce l'IP privato con uno del pool di IP pubblici","Filtra il traffico","Genera certificati"], correct: 1, explain: "Il NAT sostituisce l'IP mittente privato con uno degli IP pubblici del pool del router."},
    {q: "Dove vengono memorizzate le associazioni del NAT?", a: ["Nella routing table","Nella NAT Table","Nel certificato","In ARP cache"], correct: 1, explain: "Le associazioni IP privato ↔ IP pubblico sono memorizzate nella NAT Table."},
    {q: "Qual è il limite del NAT?", a: ["È lento","Il numero di host contemporanei è limitato dalla dimensione del pool","Cripta il traffico","Non funziona con IPv4"], correct: 1, explain: "Se le richieste superano la cardinalità del pool, nuove connessioni non possono essere create finché non si libera un IP."},
    {q: "Cosa fa il PAT (NAT Overload)?", a: ["Usa più IP pubblici","Usa UN solo IP pubblico per tutti gli host, modificando anche le porte","Cripta i pacchetti","Sostituisce i MAC"], correct: 1, explain: "Il PAT usa un singolo IP pubblico e differenzia i flussi modificando i numeri di porta."},
    {q: "Perché PAT cambia il numero di porta del mittente?", a: ["Per cifrare il traffico","Perché processi su host diversi possono avere la stessa porta","Per velocità","Per ridurre il payload"], correct: 1, explain: "Senza il cambio, il router non saprebbe a quale host instradare il pacchetto di ritorno."},
    {q: "Cosa è SNAT (Static NAT)?", a: ["Un firewall","Associa permanentemente a ciascun IP privato un IP pubblico","Un protocollo di routing","Un cifrario"], correct: 1, explain: "SNAT crea associazioni statiche, utili per i server pubblici raggiungibili sempre dallo stesso IP pubblico."},
    {q: "Quale tecnica si usa per esporre un singolo servizio (es. web server) di un host privato?", a: ["NAT","Solo PAT","Port Forwarding","DHCP"], correct: 2, explain: "Il Port Forwarding inoltra il traffico ricevuto su una specifica porta del router a un host interno."},
    {q: "Cosa contiene la tabella di traduzione di PAT (NAT Overload)?", a: ["Solo l'associazione IP_priv ↔ IP_pub (basta uno)","Le associazioni (IP_priv:porta_orig) ↔ (IP_pub:porta_nuova): la PORTA è la chiave per disambiguare host diversi che condividono lo stesso IP pubblico","Solo i timeout di sessione","Le ACL applicate"], correct: 1, explain: "Diversamente da NAT (solo IP), PAT distingue host diversi DELLO STESSO IP pubblico variando la PORTA sorgente. Es. 10.0.0.1:5000 → 138.76.29.7:65000 e 10.0.0.2:5000 → 138.76.29.7:65001. Per questo basta UN solo IP pubblico per migliaia di host."}
  ]
};

window.CHAPTERS.m2c7 = {
  title: "Architettura IPSec",
  body: `
    <p><span class="term">IPSec</span> (IP Security) è un'architettura di sicurezza a livello IP (livello 3) che fornisce <strong>riservatezza, integrità e autenticazione</strong> ai pacchetti IP. È la base delle <strong>VPN site-to-site</strong>.</p>

    <h2 id="hash-chiave">Algoritmi di hash con chiave (HMAC)</h2>
    <p>IPSec usa <strong>HMAC</strong> (Hash-based Message Authentication Code): un hash calcolato sui dati <strong>combinato con una chiave segreta</strong>. Garantisce sia integrità sia autenticazione perché l'attaccante non può ricalcolare l'HMAC senza la chiave.</p>

    <h2 id="protocolli">Protocolli ESP e AH</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🔒</div>
        <div class="callout-title">ESP (Encapsulating Security Payload)</div>
        <div class="callout-text">Garantisce <strong>riservatezza</strong> (cifratura del payload) + integrità + autenticazione.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">✅</div>
        <div class="callout-title">AH (Authentication Header)</div>
        <div class="callout-text">Garantisce <strong>solo</strong> integrità + autenticazione, NON cifra il payload.</div>
      </div>
    </div>

    <h2 id="modalita">Modalità di funzionamento</h2>

    <h3 id="transport">Transport Mode</h3>
    <p>Si proteggono <strong>solo i dati di payload</strong>. L'header IP originale rimane visibile. Si usa per <strong>comunicazioni host-to-host</strong>.</p>

    <h3 id="tunnel">Tunnel Mode</h3>
    <p>Si protegge <strong>l'intero pacchetto IP</strong> (header + payload), incapsulandolo in un nuovo pacchetto IP. Usato per <strong>VPN gateway-to-gateway</strong> tra router di due reti remote.</p>

    <h2 id="sa">Security Association (SA)</h2>
    <p>Una <span class="term">SA</span> è una connessione logica <strong>unidirezionale</strong> tra due interlocutori che definisce:</p>
    <ul>
      <li>Algoritmi di cifratura e hash usati.</li>
      <li>Chiavi segrete.</li>
      <li>Modalità (Transport/Tunnel).</li>
      <li>Durata.</li>
    </ul>
    <p>Per una comunicazione <strong>bidirezionale</strong> servono <strong>due SA</strong>, una per ogni direzione.</p>

    <h2 id="database">SPD e SAD</h2>
    <ul>
      <li><span class="term">SPD (Security Policy Database)</span>: contiene le <strong>policy</strong> da applicare al traffico (drop, bypass, apply IPSec).</li>
      <li><span class="term">SAD (Security Association Database)</span>: contiene tutte le <strong>SA attive</strong>.</li>
    </ul>

    <h2 id="interfaccia">Interfaccia IPSec: gestione del traffico</h2>
    <p>Per ogni pacchetto in <strong>ingresso</strong> o <strong>uscita</strong>:</p>
    <ol>
      <li>L'interfaccia IPSec consulta l'<strong>SPD</strong> per stabilire l'azione.</li>
      <li>Se l'azione è "apply IPSec", recupera la SA dal <strong>SAD</strong> e applica i protocolli (AH/ESP).</li>
      <li>Se l'azione è "drop", scarta il pacchetto.</li>
      <li>Se "bypass", lo lascia passare senza protezione.</li>
    </ol>
  `,
  quiz: [
    {q: "A che livello dello stack opera IPSec?", a: ["Livello 2","Livello 3 (IP)","Livello 4 (TCP)","Livello 7"], correct: 1, explain: "IPSec opera a livello 3 (rete), proteggendo i pacchetti IP."},
    {q: "HMAC sta per:", a: ["Hardware MAC","Hash-based Message Authentication Code","Hyper Mac Address","High Memory Access Code"], correct: 1, explain: "HMAC è un Hash-based Message Authentication Code: un hash con chiave."},
    {q: "Quale protocollo IPSec garantisce anche la riservatezza?", a: ["AH","ESP","HMAC","SPD"], correct: 1, explain: "ESP (Encapsulating Security Payload) cifra il payload garantendo riservatezza."},
    {q: "AH garantisce:", a: ["Solo riservatezza","Integrità e autenticazione, NON riservatezza","Solo cifratura","Anonimato"], correct: 1, explain: "Authentication Header non cripta il payload: garantisce solo integrità e autenticazione."},
    {q: "Quando si usa la modalità Tunnel?", a: ["Per host singoli","Per VPN gateway-to-gateway","Per LAN senza Internet","Per connessioni Bluetooth"], correct: 1, explain: "Tunnel Mode incapsula l'intero pacchetto IP, ideale per VPN tra reti."},
    {q: "Quante Security Association servono per una comunicazione bidirezionale?", a: ["Una","Due (una per ogni direzione)","Tre","Una per ogni pacchetto"], correct: 1, explain: "Le SA sono unidirezionali: per la comunicazione bidirezionale servono 2 SA."},
    {q: "Cosa contiene l'SPD?", a: ["Le SA attive","Le policy di sicurezza","Le password","Gli IP pubblici"], correct: 1, explain: "Il Security Policy Database contiene le policy applicate al traffico."},
    {q: "Cosa contiene il SAD?", a: ["Le policy","Tutte le Security Association attive","Solo gli IP","Le ACL"], correct: 1, explain: "Il Security Association Database contiene le SA attive."}
  ]
};

window.CHAPTERS.m2c8 = {
  title: "Virtual Private Network (VPN)",
  body: `
    <p>Una <span class="term">VPN</span> è una rete privata virtuale che <strong>collega in modo sicuro</strong> due o più reti (o un host a una rete) attraverso una rete <strong>pubblica</strong> come Internet, sfruttando un <strong>tunnel cifrato</strong>.</p>

    <h2 id="scopo">Scopo</h2>
    <ul>
      <li>Garantire <strong>riservatezza, integrità e autenticazione</strong> alla comunicazione.</li>
      <li>Permettere a dipendenti remoti di accedere alla LAN aziendale come se fossero in sede.</li>
      <li>Collegare <strong>sedi distaccate</strong> in modo sicuro senza linee dedicate (più economico).</li>
    </ul>

    <h2 id="tipi">Tipi di VPN</h2>

    <h3 id="site-to-site">VPN Site-to-Site</h3>
    <p>Collega <strong>due reti</strong> (es. due sedi aziendali) tramite un tunnel tra i router di bordo. Per gli host delle due reti la VPN è trasparente. Tipicamente realizzata con <strong>IPSec in modalità Tunnel</strong>.</p>

    <h3 id="remote-access">VPN Remote Access (Client-to-Site)</h3>
    <p>Un <strong>singolo client</strong> (es. un dipendente in trasferta) si collega alla LAN aziendale attraverso un client VPN che stabilisce un tunnel con il VPN gateway aziendale. Comuni protocolli: <strong>OpenVPN</strong>, <strong>WireGuard</strong>, <strong>IPSec/IKEv2</strong>, <strong>SSL/TLS VPN</strong>.</p>

    <h2 id="tunnel">Concetto di tunnel</h2>
    <p>Il pacchetto originale viene <strong>incapsulato</strong> in un nuovo pacchetto IP, cifrato e autenticato. Per i router intermedi su Internet appare un normale pacchetto tra due endpoint pubblici; non vedono né il contenuto né gli IP interni delle due reti.</p>

    <h2 id="vantaggi">Vantaggi</h2>
    <ul>
      <li><strong>Costo</strong>: usa Internet pubblico invece di linee dedicate (MPLS).</li>
      <li><strong>Sicurezza</strong>: traffico cifrato.</li>
      <li><strong>Flessibilità</strong>: facile aggiungere nuove sedi o utenti remoti.</li>
    </ul>

    <h2 id="svantaggi">Svantaggi</h2>
    <ul>
      <li>Latenza maggiore rispetto a una linea dedicata.</li>
      <li>Banda dipende dalla connessione Internet.</li>
      <li>Configurazione e gestione delle chiavi richiede competenze.</li>
    </ul>
  `,
  quiz: [
    {q: "Cos'è una VPN?", a: ["Una rete fisica privata","Una rete virtuale che collega in modo sicuro reti tramite un tunnel cifrato su Internet","Un firewall","Un cifrario"], correct: 1, explain: "La VPN crea un tunnel cifrato per collegare in sicurezza reti tramite la rete pubblica Internet."},
    {q: "Quale tipo di VPN collega due sedi aziendali?", a: ["Remote Access","Site-to-Site","Client-to-Client","Mesh"], correct: 1, explain: "La VPN Site-to-Site collega due reti, tipicamente due sedi aziendali."},
    {q: "Quale tecnologia è tipicamente usata per VPN site-to-site?", a: ["DNS","IPSec in modalità Tunnel","SSH","SMTP"], correct: 1, explain: "IPSec in Tunnel Mode è lo standard più comune per VPN site-to-site."},
    {q: "Una VPN Remote Access:", a: ["Collega due LAN","Permette a un singolo client di collegarsi alla LAN aziendale","Cifra solo email","Funziona solo su LAN"], correct: 1, explain: "La VPN Remote Access (client-to-site) collega un singolo dispositivo alla rete aziendale."},
    {q: "Quale è un protocollo VPN moderno?", a: ["FTP","WireGuard","DHCP","HTTP"], correct: 1, explain: "WireGuard è un protocollo VPN moderno e veloce, oltre a OpenVPN e IPSec."},
    {q: "Qual è un vantaggio della VPN?", a: ["Maggiore latenza","Costo ridotto rispetto a linee dedicate","Banda illimitata","Niente cifratura"], correct: 1, explain: "Le VPN su Internet sono molto più economiche di linee MPLS dedicate."}
  ]
};

window.CHAPTERS.m2c9 = {
  title: "Demilitarized Zone (DMZ)",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p><strong>DMZ</strong> = sottorete intermedia tra LAN interna e Internet che ospita i <strong>server pubblici</strong> (web, mail, FTP). Se un server è violato, l'attaccante <strong>non</strong> raggiunge la LAN interna. Tre modi di assegnare IP: <strong>pubblico diretto</strong>, <strong>privato + SNAT</strong>, <strong>privato + Port Forwarding</strong>. Topologia migliore: <strong>dual firewall</strong>.</p></div>

    <p>La <span class="term">DMZ</span> è una <strong>sottorete intermedia</strong> tra LAN interna e Internet, dove vengono ospitati i <strong>server pubblici</strong> dell'azienda accessibili dall'esterno.</p>

    <h2 id="motivazione">Motivazione</h2>
    <p>I server pubblici (web, mail, DNS, FTP) devono essere raggiungibili da Internet → sono <strong>esposti ad attacchi</strong>. Mettendoli direttamente nella LAN interna, in caso di compromissione l'attaccante avrebbe accesso a tutti i dati aziendali.</p>

    <p>La DMZ è una zona <strong>intermedia</strong>: se un server viene violato, l'attaccante non può raggiungere direttamente la LAN interna grazie ai firewall.</p>

    <h2 id="lan-interna">LAN interna (Intranet)</h2>
    <p>Ha sempre un indirizzo di rete <strong>privato</strong>. Contiene:</p>
    <ul>
      <li><strong>Server privati</strong>: DB, DHCP, DNS interno, NAS (Samba/SMB). Accessibili <strong>solo</strong> dai dispositivi della rete aziendale.</li>
      <li><strong>Host</strong> degli utenti, alcuni dei quali possono accedere a Internet tramite NAT/PAT.</li>
    </ul>

    <h2 id="lan-pubblica">LAN pubblica</h2>
    <p>Contiene i <strong>server pubblici</strong> raggiungibili da Internet:</p>
    <ul>
      <li><strong>Web server</strong> (Apache2, Nginx).</li>
      <li><strong>Mail server</strong> (Postfix).</li>
      <li><strong>FTP server</strong> (FileZilla).</li>
      <li><strong>DB server</strong> (se reso pubblico).</li>
    </ul>

    <h2 id="alternative">Modi di assegnare gli IP alla DMZ</h2>
    <ol>
      <li><strong>Indirizzo di rete pubblico</strong> alla DMZ. Soluzione semplice ma costosa per la scarsità di IP pubblici.</li>
      <li><strong>Indirizzo privato + SNAT</strong>: ogni server DMZ ha IP privato, mappato staticamente a un IP pubblico del pool.</li>
      <li><strong>Indirizzo privato + Port Forwarding</strong>: il router inoltra le porte richieste ai server interni.</li>
    </ol>

    <h2 id="trust">Sottoreti trust e DMZ</h2>
    <p>Una sottorete che <strong>non contiene server pubblici</strong> è <strong>trust</strong>. Le sottoreti della LAN interna sono per definizione trust.</p>

    <h2 id="sottoreti">Suddivisione della LAN interna</h2>
    <p>Vantaggi del suddividere in sottoreti:</p>
    <ul>
      <li><strong>Sicurezza</strong>: regole di accesso specifiche per dipartimento.</li>
      <li><strong>Prestazioni</strong>: il router separa i domini di broadcast.</li>
      <li><strong>Gestione</strong>: troubleshooting più facile, problemi confinati.</li>
    </ul>

    <h2 id="topologia">Topologia con DMZ</h2>
    <pre class="mermaid">
flowchart LR
  I((🌐 Internet)) --> R1[🔥 Firewall esterno]
  R1 --> DMZ[🏢 DMZ<br/>Web/Mail/FTP server]
  R1 --> R2[🔥 Firewall interno]
  R2 --> LAN[🏠 LAN interna<br/>DB, NAS, host]
    </pre>

    <h2 id="topologie">Topologie DMZ</h2>

    <h3 id="single-firewall">Single firewall (3-leg)</h3>
    <p>Un solo firewall con tre interfacce: Internet, DMZ, LAN interna.</p>

    <h3 id="dual-firewall">Dual firewall (back-to-back)</h3>
    <p>Due firewall in serie: il primo (front-end) tra Internet e DMZ; il secondo (back-end) tra DMZ e LAN interna. Più sicuro: per arrivare alla LAN interna, l'attaccante deve violare entrambi.</p>
  `,
  quiz: [
    {q: "Cos'è una DMZ?", a: ["Una rete privata interna","Una sottorete intermedia tra LAN interna e Internet che ospita server pubblici","Un cifrario","Un protocollo di routing"], correct: 1, explain: "La DMZ è una sottorete dove vengono collocati i server pubblici accessibili da Internet."},
    {q: "Perché si usa una DMZ?", a: ["Per velocizzare la rete","Per isolare i server esposti a Internet dalla LAN interna in caso di compromissione","Per cifrare il traffico","Per ridurre i costi"], correct: 1, explain: "La DMZ isola i server pubblici dalla LAN interna: una violazione di un server non compromette la rete interna."},
    {q: "Quale di questi server NON è tipicamente in DMZ?", a: ["Web server","Mail server","DB server interno con dati riservati","FTP server"], correct: 2, explain: "I server con dati riservati restano nella LAN interna; in DMZ ci vanno i server pubblici."},
    {q: "Quale tecnica si usa quando la DMZ ha IP privati e si vogliono esporre i suoi servizi?", a: ["Solo NAT dinamico","Static NAT (SNAT) o Port Forwarding","DHCP","RIP"], correct: 1, explain: "SNAT mappa permanentemente IP privati a pubblici; il Port Forwarding inoltra specifiche porte."},
    {q: "Una sottorete senza server pubblici è detta:", a: ["DMZ","Trust","Backbone","WAN"], correct: 1, explain: "Le sottoreti senza server pubblici sono per definizione 'trust'."},
    {q: "Quale topologia DMZ è più sicura?", a: ["Single firewall (3-leg)","Dual firewall (back-to-back)","Senza firewall","Con un solo router"], correct: 1, explain: "La dual firewall richiede di violare due firewall per raggiungere la LAN interna: più sicura."},
    {q: "Vantaggi della suddivisione della LAN interna in sottoreti:", a: ["Solo riduzione dei costi","Sicurezza, prestazioni e gestione semplificata","Solo cifratura","Solo velocità"], correct: 1, explain: "Sicurezza (regole specifiche), prestazioni (separazione broadcast), gestione (troubleshooting facile)."},
    {q: "Quali server ospita tipicamente la LAN interna privata?", a: ["Web server pubblico","DB privato, DHCP, DNS interno, NAS","Mail server pubblico","FTP pubblico"], correct: 1, explain: "La LAN interna ospita servizi accessibili solo internamente: DB privato, DHCP, DNS interno, NAS."}
  ]
};

window.CHAPTERS.m2c10 = {
  title: "Protocollo TLS",
  body: `
    <p><span class="term">TLS</span> (Transport Layer Security), evoluzione di SSL, è un protocollo di sicurezza a livello di <strong>trasporto</strong> che fornisce <strong>riservatezza, integrità e autenticazione</strong> alle comunicazioni client-server. È la base di <strong>HTTPS</strong>.</p>

    <h2 id="ssl-tls">SSL → TLS</h2>
    <ul>
      <li><strong>SSL 1.0/2.0/3.0</strong>: versioni Netscape (1995-1996), oggi tutte deprecate.</li>
      <li><strong>TLS 1.0</strong> (1999), <strong>1.1</strong> (2006): deprecate.</li>
      <li><strong>TLS 1.2</strong> (2008): ancora largamente usato.</li>
      <li><strong>TLS 1.3</strong> (2018): standard moderno, più veloce e sicuro.</li>
    </ul>

    <h2 id="caratteristiche">Cosa garantisce TLS</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🔒</div>
        <div class="callout-title">Riservatezza</div>
        <div class="callout-text">Cifratura simmetrica del payload (es. AES-256-GCM, ChaCha20-Poly1305).</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🛡️</div>
        <div class="callout-title">Integrità</div>
        <div class="callout-text">HMAC o cifratura autenticata (AEAD).</div>
      </div>
      <div class="callout">
        <div class="callout-icon">👤</div>
        <div class="callout-title">Autenticazione</div>
        <div class="callout-text">Server (e opzionalmente client) tramite certificati X.509.</div>
      </div>
    </div>

    <h2 id="handshake">TLS Handshake (semplificato)</h2>
    <pre class="mermaid">
sequenceDiagram
  participant C as 💻 Client (browser)
  participant S as 🌐 Server
  C->>S: ClientHello (versioni TLS, suite, random)
  S->>C: ServerHello (versione, suite scelta, random)
  S->>C: Certificate (X.509 con chiave pubblica)
  S->>C: ServerKeyExchange (parametri)
  S->>C: ServerHelloDone
  C->>S: ClientKeyExchange (premaster cifrato)
  Note over C,S: Entrambi calcolano la chiave simmetrica
  C->>S: Finished (cifrato)
  S->>C: Finished (cifrato)
  Note over C,S: 🔐 Comunicazione cifrata simmetricamente
    </pre>

    <ol>
      <li><strong>ClientHello</strong>: il client invia versioni TLS supportate, suite di cifratura, random.</li>
      <li><strong>ServerHello</strong>: il server sceglie la versione TLS e la suite, invia il random.</li>
      <li><strong>Certificate</strong>: il server invia il proprio certificato X.509 con la chiave pubblica.</li>
      <li><strong>Key Exchange</strong>: client e server concordano (es. con Diffie-Hellman) una <strong>chiave segreta condivisa</strong>.</li>
      <li><strong>Finished</strong>: si verifica che entrambi abbiano ricavato la stessa chiave; la comunicazione successiva avviene cifrata simmetricamente.</li>
    </ol>

    <div class="info-box key">
      <h4>🔑 Idea chiave</h4>
      <p>TLS combina <strong>asimmetrico</strong> (per autenticare il server e scambiare la chiave) e <strong>simmetrico</strong> (per cifrare il traffico vero e proprio): si ottiene così sicurezza + efficienza.</p>
    </div>

    <h2 id="utilizzi">Dove si usa TLS</h2>
    <ul>
      <li><strong>HTTPS</strong> (HTTP su TLS) — porta 443.</li>
      <li><strong>SMTPS, IMAPS, POP3S</strong> — email cifrate.</li>
      <li><strong>FTPS</strong>, <strong>VPN SSL/TLS</strong> (es. OpenVPN).</li>
      <li><strong>WebSocket Secure (wss://)</strong>.</li>
    </ul>
  `,
  quiz: [
    {q: "TLS è l'evoluzione di:", a: ["IPSec","SSL","SSH","FTP"], correct: 1, explain: "TLS è l'evoluzione di SSL (Secure Sockets Layer)."},
    {q: "A che livello dello stack opera TLS?", a: ["Fisico","Trasporto","Rete","Applicativo"], correct: 1, explain: "TLS opera a livello di trasporto, sopra TCP."},
    {q: "Cosa garantisce TLS?", a: ["Solo riservatezza","Riservatezza, integrità e autenticazione","Solo autenticazione","Solo velocità"], correct: 1, explain: "TLS fornisce tutti e tre i pilastri: riservatezza, integrità e autenticazione."},
    {q: "TLS combina cifratura:", a: ["Solo simmetrica","Solo asimmetrica","Asimmetrica per autenticazione/scambio chiave + simmetrica per il traffico","Nessuna"], correct: 2, explain: "TLS usa l'asimmetrico per il setup e il simmetrico per cifrare i dati: efficiente e sicuro."},
    {q: "Su quale porta gira HTTPS?", a: ["80","443","8080","21"], correct: 1, explain: "HTTPS (HTTP over TLS) usa la porta 443."},
    {q: "Qual è la versione moderna e raccomandata di TLS?", a: ["TLS 1.0","TLS 1.1","TLS 1.2","TLS 1.3"], correct: 3, explain: "TLS 1.3 (2018) è la versione più recente e sicura."},
    {q: "Cosa contiene il messaggio Certificate del server durante l'handshake?", a: ["La chiave privata del server","Il certificato X.509 con la chiave pubblica","Il numero di porta","Le cookie del client"], correct: 1, explain: "Il server invia il proprio certificato X.509, contenente la chiave pubblica firmata da una CA."}
  ]
};
