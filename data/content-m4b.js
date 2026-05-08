// Module 4 - Esame di Stato (7-11)
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m4c7 = {
  title: "Reti wireless IEEE 802.11",
  body: `
    <p><span class="term">IEEE 802.11</span> è la famiglia di standard per le reti <strong>wireless</strong> (Wi-Fi). Definisce livello fisico e data-link (MAC) per la trasmissione via radio.</p>

    <h2 id="standard">Versioni dello standard</h2>
    <table>
      <thead><tr><th>Versione</th><th>Anno</th><th>Banda</th><th>Velocità max</th></tr></thead>
      <tbody>
        <tr><td>802.11b</td><td>1999</td><td>2.4 GHz</td><td>11 Mbps</td></tr>
        <tr><td>802.11a</td><td>1999</td><td>5 GHz</td><td>54 Mbps</td></tr>
        <tr><td>802.11g</td><td>2003</td><td>2.4 GHz</td><td>54 Mbps</td></tr>
        <tr><td>802.11n (Wi-Fi 4)</td><td>2009</td><td>2.4/5 GHz</td><td>600 Mbps</td></tr>
        <tr><td>802.11ac (Wi-Fi 5)</td><td>2013</td><td>5 GHz</td><td>~6.9 Gbps</td></tr>
        <tr><td>802.11ax (Wi-Fi 6/6E)</td><td>2019</td><td>2.4/5/6 GHz</td><td>~9.6 Gbps</td></tr>
        <tr><td>802.11be (Wi-Fi 7)</td><td>2024</td><td>2.4/5/6 GHz</td><td>~46 Gbps</td></tr>
      </tbody>
    </table>

    <h2 id="bss">Infrastruttura: BSS, ESS, DS</h2>

    <h3 id="bss-def">BSS (Basic Service Set)</h3>
    <p>Insieme di stazioni wireless che comunicano tra loro. Esistono due modalità:</p>
    <ul>
      <li><strong>IBSS</strong> (Independent BSS) o <strong>ad-hoc</strong>: le stazioni comunicano direttamente tra loro senza access point.</li>
      <li><strong>Infrastructure BSS</strong>: le stazioni comunicano tramite un <strong>Access Point (AP)</strong>.</li>
    </ul>

    <h3 id="ess-def">ESS (Extended Service Set)</h3>
    <p>Insieme di più BSS interconnessi tra loro tramite un <strong>Distribution System</strong>. Permette il <strong>roaming</strong>: una stazione si sposta tra AP diversi senza interrompere la comunicazione.</p>

    <h3 id="ds-def">DS (Distribution System)</h3>
    <p>Sistema di distribuzione (tipicamente cablato Ethernet) che collega gli access point tra loro e li fa apparire come una <strong>singola rete logica</strong>.</p>

    <h2 id="ssid">SSID</h2>
    <p>Il <strong>Service Set Identifier</strong> è il "nome della rete Wi-Fi" (es. "CasaWiFi"). Tutti gli AP dello stesso ESS hanno lo stesso SSID.</p>

    <h2 id="csma-ca">CSMA/CA</h2>
    <p>Il protocollo di accesso al canale è <strong>CSMA/CA</strong> (Collision Avoidance), diverso da CSMA/CD di Ethernet. Per ridurre le collisioni:</p>
    <ol>
      <li>La stazione ascolta il canale (CCA - Clear Channel Assessment).</li>
      <li>Se libero attende un tempo casuale (backoff) prima di trasmettere.</li>
      <li>Se occupato, ritarda la trasmissione.</li>
      <li>Riceve un <strong>ACK</strong> dal destinatario per confermare la consegna.</li>
    </ol>

    <h2 id="sicurezza">Meccanismi di sicurezza</h2>

    <h3 id="wep">WEP (Wired Equivalent Privacy)</h3>
    <p>Standard originale del 1997. Usa <strong>RC4</strong> con chiavi a 40 o 104 bit. <strong>Rotto</strong> già nel 2001: <strong>obsoleto e insicuro</strong>.</p>

    <h3 id="wpa">WPA (Wi-Fi Protected Access)</h3>
    <p>Sostituto di WEP (2003). Usa <strong>TKIP</strong> con chiave dinamica. Più sicuro ma anch'esso vulnerabile.</p>

    <h3 id="wpa2">WPA2</h3>
    <p>Lo standard più diffuso (2004). Usa <strong>AES</strong> in modalità <strong>CCMP</strong>. Modalità:</p>
    <ul>
      <li><strong>WPA2-Personal (PSK)</strong>: passphrase condivisa.</li>
      <li><strong>WPA2-Enterprise</strong>: autenticazione 802.1X tramite server RADIUS.</li>
    </ul>

    <h3 id="wpa3">WPA3</h3>
    <p>Ultimo standard (2018), introduce <strong>SAE</strong> (Simultaneous Authentication of Equals): più sicuro contro attacchi a forza bruta sulla passphrase, supporta forward secrecy.</p>

    <h2 id="vulnerabilita">Attacchi noti</h2>
    <ul>
      <li><strong>Krack attack</strong> (2017): vulnerabilità nel 4-way handshake di WPA2.</li>
      <li><strong>Evil twin</strong>: AP fasullo che imita un AP legittimo.</li>
      <li><strong>Deauth attack</strong>: invio di pacchetti di deautenticazione.</li>
    </ul>
  `,
  quiz: [
    {q: "IEEE 802.11 è lo standard per:", a: ["Reti cablate","Reti wireless (Wi-Fi)","Bluetooth","Cellulare 4G"], correct: 1, explain: "802.11 è la famiglia di standard Wi-Fi (livello fisico e MAC)."},
    {q: "Cos'è un BSS?", a: ["Un cifrario","Insieme di stazioni wireless che comunicano tra loro","Un protocollo di routing","Un certificato"], correct: 1, explain: "BSS = Basic Service Set, l'unità base di una rete 802.11."},
    {q: "Cosa è un ESS?", a: ["Un Access Point","Insieme di più BSS interconnessi tramite un Distribution System","Un protocollo di sicurezza","Una VPN"], correct: 1, explain: "ESS = Extended Service Set, più BSS uniti tramite DS, permette il roaming."},
    {q: "Cosa è il Distribution System?", a: ["La passphrase","Il sistema (tipicamente cablato) che collega più AP nello stesso ESS","Un cifrario","Un protocollo wireless"], correct: 1, explain: "DS connette gli AP rendendo la rete logicamente unica."},
    {q: "Cos'è un SSID?", a: ["Una password","Il nome della rete Wi-Fi","Un IP","Un MAC"], correct: 1, explain: "SSID = Service Set Identifier, il nome che identifica la rete Wi-Fi."},
    {q: "Quale protocollo di accesso usa Wi-Fi?", a: ["CSMA/CD","CSMA/CA","Token Ring","TDMA"], correct: 1, explain: "CSMA/CA (Collision Avoidance), perché il wireless non può rilevare collisioni come Ethernet."},
    {q: "Quale di questi è il meccanismo più obsoleto?", a: ["WEP","WPA","WPA2","WPA3"], correct: 0, explain: "WEP è del 1997 e fu rotto nel 2001: insicuro."},
    {q: "WPA2 usa quale algoritmo di cifratura?", a: ["DES","AES (CCMP)","Blowfish","Twofish"], correct: 1, explain: "WPA2 usa AES in modalità CCMP."},
    {q: "Qual è la modalità WPA2 con passphrase condivisa?", a: ["Enterprise","Personal (PSK)","SAE","Open"], correct: 1, explain: "WPA2-Personal usa una pre-shared key (PSK)."},
    {q: "Cosa introduce WPA3?", a: ["WEP","SAE per autenticazione più sicura","TKIP","Niente di nuovo"], correct: 1, explain: "WPA3 (2018) introduce SAE: Simultaneous Authentication of Equals, più resistente al brute force."}
  ]
};

window.CHAPTERS.m4c8 = {
  title: "Virtual LAN (VLAN)",
  body: `
    <p>Una <span class="term">VLAN</span> è una <strong>LAN logica</strong> creata su uno switch fisico: gli host della stessa VLAN comunicano come se fossero sulla stessa rete fisica, anche se sono collegati a porte diverse o switch diversi.</p>

    <h2 id="motivazione">Motivazione</h2>
    <p>Senza VLAN, ogni LAN richiede uno switch separato. Le VLAN permettono di:</p>
    <ul>
      <li><strong>Segmentare</strong> logicamente la rete (per dipartimento, funzione).</li>
      <li><strong>Sicurezza</strong>: traffico isolato per VLAN.</li>
      <li><strong>Riduzione domini di broadcast</strong>.</li>
      <li><strong>Flessibilità</strong>: cambiare l'appartenenza di un host senza modificare il cablaggio.</li>
    </ul>

    <h2 id="tipi">Tipi di VLAN</h2>
    <ul>
      <li><strong>VLAN per porta</strong>: l'appartenenza è basata sulla porta dello switch.</li>
      <li><strong>VLAN per MAC</strong>: in base al MAC address dell'host.</li>
      <li><strong>VLAN per protocollo</strong>: in base al protocollo di livello 3.</li>
    </ul>

    <h2 id="trunk">Collegamento trunk: standard 802.1Q</h2>
    <p>Quando una VLAN è distribuita su <strong>più switch</strong>, le porte che li collegano si chiamano <strong>trunk</strong>. Un trunk trasporta il traffico di <strong>più VLAN contemporaneamente</strong>.</p>

    <p>Lo standard <span class="term">IEEE 802.1Q</span> definisce il <strong>tagging</strong>: a ogni frame Ethernet che attraversa un trunk si aggiunge un <strong>tag VLAN</strong> (4 byte) che identifica la VLAN di appartenenza.</p>

    <h3 id="formato-tag">Formato del tag 802.1Q</h3>
    <ul>
      <li><strong>TPID</strong> (Tag Protocol ID, 16 bit): identifica un frame taggato (0x8100).</li>
      <li><strong>Priority (PCP)</strong> (3 bit): priorità per QoS.</li>
      <li><strong>DEI</strong> (1 bit): drop eligible.</li>
      <li><strong>VID</strong> (12 bit): VLAN ID (1-4094).</li>
    </ul>

    <h2 id="port-type">Tipi di porta</h2>
    <ul>
      <li><strong>Access port</strong>: appartiene a una sola VLAN; i frame escono <strong>senza tag</strong>.</li>
      <li><strong>Trunk port</strong>: trasporta più VLAN; i frame sono <strong>taggati</strong> (eccetto la VLAN nativa).</li>
    </ul>

    <h2 id="vlan-trunk">Trunk 802.1Q tra switch — diagramma</h2>
    <pre class="mermaid">
flowchart LR
  subgraph S1[Switch 1]
    A1[💻 PC A<br/>VLAN 10]
    A2[💻 PC B<br/>VLAN 20]
  end
  subgraph S2[Switch 2]
    B1[💻 PC C<br/>VLAN 10]
    B2[💻 PC D<br/>VLAN 20]
  end
  S1 -- "Trunk 802.1Q<br/>VLAN 10 + 20 con tag" --- S2
  A1 -. stessa VLAN .- B1
  A2 -. stessa VLAN .- B2
    </pre>

    <h2 id="vlan-routing">VLAN routing: Router on a Stick</h2>
    <pre class="mermaid">
flowchart LR
  R[🌐 Router]
  R -- sub-iface .10<br/>192.168.10.1 --> SW
  R -- sub-iface .20<br/>192.168.20.1 --> SW
  SW[Switch L2 — trunk]
  SW --> V10[VLAN 10<br/>192.168.10.0/24]
  SW --> V20[VLAN 20<br/>192.168.20.0/24]
    </pre>

    <p>Per far comunicare host di VLAN diverse serve un <strong>router</strong>. La tecnica <strong>Router on a Stick</strong>:</p>
    <ol>
      <li>L'interfaccia fisica del router è collegata via trunk allo switch.</li>
      <li>Si configurano <strong>sub-interfacce</strong> logiche, una per ogni VLAN.</li>
      <li>Ogni sub-interfaccia ha un IP nella propria VLAN: funge da default gateway.</li>
      <li>Il router instrada il traffico tra le VLAN.</li>
    </ol>

    <h3 id="esempio-cisco">Esempio configurazione Cisco</h3>
    <code class="formula">interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0</code>

    <h2 id="alternative">Alternative al Router on a Stick</h2>
    <p>Switch <strong>multilayer (Layer 3)</strong>: gli switch L3 fanno il routing tra VLAN internamente, con prestazioni migliori.</p>
  `,
  quiz: [
    {q: "Cos'è una VLAN?", a: ["Una VPN","Una LAN logica creata su uno switch","Un cifrario","Un protocollo di routing"], correct: 1, explain: "Le VLAN segmentano logicamente uno switch in più LAN virtuali."},
    {q: "Vantaggio principale delle VLAN?", a: ["Più veloce di Ethernet","Segmentazione logica, sicurezza, riduzione domini broadcast","Niente cavi","Cifrare il traffico"], correct: 1, explain: "Le VLAN permettono segmentazione logica, isolamento del traffico e flessibilità."},
    {q: "Cosa è un trunk?", a: ["Un cavo singolo","Una porta che trasporta più VLAN contemporaneamente tra switch","Una VPN","Un firewall"], correct: 1, explain: "I trunk collegano switch portando il traffico di più VLAN."},
    {q: "Quale standard definisce il tagging VLAN sui trunk?", a: ["802.11","802.1X","802.1Q","802.3"], correct: 2, explain: "IEEE 802.1Q definisce il tag VLAN nei frame Ethernet."},
    {q: "Quanti bit ha il VLAN ID nel tag 802.1Q?", a: ["8","12","16","32"], correct: 1, explain: "VID = 12 bit: VLAN da 1 a 4094 (0 e 4095 sono riservati)."},
    {q: "Una porta access:", a: ["Trasporta più VLAN","Appartiene a una sola VLAN, i frame escono non taggati","Non funziona","È sempre un trunk"], correct: 1, explain: "L'access port è dedicata a una singola VLAN: i frame in uscita non sono taggati."},
    {q: "Cosa è il 'Router on a Stick'?", a: ["Un firewall","Un router con un'interfaccia fisica trunk e sub-interfacce per ogni VLAN, che instrada tra VLAN","Una VPN","Uno switch"], correct: 1, explain: "Tecnica per far comunicare VLAN diverse usando un router con sub-interfacce."},
    {q: "Cosa è una sub-interfaccia?", a: ["Un'interfaccia fisica","Un'interfaccia logica configurata su un'interfaccia fisica per una specifica VLAN","Un router","Uno switch"], correct: 1, explain: "Le sub-interfacce sono logiche: si configurano sull'interfaccia fisica una per VLAN."},
    {q: "Alternativa più performante al Router on a Stick:", a: ["Switch L2","Switch multilayer L3","Hub","Bridge"], correct: 1, explain: "Gli switch L3 (multilayer) fanno il routing internamente, più veloce."}
  ]
};

window.CHAPTERS.m4c9 = {
  title: "DHCP - Dynamic Host Configuration Protocol",
  body: `
    <p><span class="term">DHCP</span> è il protocollo che assegna <strong>automaticamente</strong> agli host di una rete i parametri di configurazione IP: indirizzo IP, subnet mask, default gateway, server DNS.</p>

    <h2 id="motivazione">Statico vs dinamico</h2>
    <p>Senza DHCP, l'amministratore configura manualmente ogni host (statico): impraticabile in reti grandi.</p>

    <p>DHCP automatizza l'assegnazione: l'host appena collegato richiede e riceve i parametri.</p>

    <h2 id="modalita">Modalità di assegnazione</h2>
    <ul>
      <li><strong>Statica con associazione manuale</strong>: ogni host ha sempre lo stesso IP, ma assegnato dal server DHCP in base al MAC.</li>
      <li><strong>Dinamica</strong>: il server pesca un IP libero da un <strong>pool</strong> e lo concede all'host per un tempo limitato (<strong>lease</strong>).</li>
    </ul>

    <h2 id="architettura">Architettura Client/Server</h2>
    <ul>
      <li><strong>DHCP server</strong>: gestisce il pool di IP, risponde alle richieste.</li>
      <li><strong>DHCP client</strong>: l'host che richiede la configurazione.</li>
      <li><strong>DHCP relay</strong>: nei casi in cui server e client sono in reti diverse, inoltra le richieste.</li>
    </ul>

    <h2 id="dora-flow">Diagramma DORA</h2>
    <pre class="mermaid">
sequenceDiagram
  participant C as 💻 Client (0.0.0.0)
  participant S as 🖥️ DHCP Server
  C->>S: 1️⃣ DISCOVER (broadcast 255.255.255.255)
  S->>C: 2️⃣ OFFER (proposta IP, mask, gateway, lease)
  C->>S: 3️⃣ REQUEST (broadcast: scelgo questa offerta)
  S->>C: 4️⃣ ACK (configurazione attiva)
  Note over C,S: A metà del lease → RENEW
    </pre>

    <h2 id="dora">Le 4 fasi DORA</h2>

    <ol>
      <li><strong>D — Discover</strong>: il client (con IP <code>0.0.0.0</code>) invia un broadcast (<code>255.255.255.255</code>, porta 67) chiedendo "C'è un server DHCP?".</li>
      <li><strong>O — Offer</strong>: i server DHCP rispondono con una proposta di configurazione (IP, mask, gateway, durata lease).</li>
      <li><strong>R — Request</strong>: il client sceglie una offerta e invia un broadcast con il <code>request</code> per confermare.</li>
      <li><strong>A — Acknowledge (ACK)</strong>: il server prescelto conferma. La configurazione diventa effettiva. Gli altri server liberano la propria offerta.</li>
    </ol>

    <h2 id="stati">Stati del client DHCP</h2>
    <ul>
      <li><strong>INIT</strong>: stato iniziale, niente IP.</li>
      <li><strong>SELECTING</strong>: ha inviato Discover e attende Offer.</li>
      <li><strong>REQUESTING</strong>: ha inviato Request e attende ACK.</li>
      <li><strong>BOUND</strong>: ha ricevuto ACK, IP attivo.</li>
      <li><strong>RENEWING</strong>: a metà del lease, prova a rinnovare contattando il server originale.</li>
      <li><strong>REBINDING</strong>: se il server originale non risponde, prova in broadcast.</li>
    </ul>

    <h2 id="vantaggi">Vantaggi del DHCP</h2>
    <ul>
      <li>Riduzione errori di configurazione.</li>
      <li>Gestione centralizzata.</li>
      <li>Riuso degli IP: scaduto il lease, l'IP torna nel pool.</li>
      <li>Mobilità: l'host che si sposta riceve nuovi parametri automaticamente.</li>
    </ul>

    <h2 id="config-cisco">Esempio configurazione su router Cisco</h2>
    <code class="formula">ip dhcp pool LAN1
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
ip dhcp excluded-address 192.168.1.1 192.168.1.10</code>
  `,
  quiz: [
    {q: "DHCP serve per:", a: ["Cifrare i pacchetti","Assegnare automaticamente IP, mask, gateway, DNS agli host","Routing dinamico","Filtraggio firewall"], correct: 1, explain: "DHCP automatizza la configurazione di rete degli host."},
    {q: "Le 4 fasi DHCP sono:", a: ["Connect, Send, Receive, Close","Discover, Offer, Request, Acknowledge (DORA)","SYN, SYN-ACK, ACK, FIN","Login, Auth, Use, Logout"], correct: 1, explain: "DORA: Discover, Offer, Request, Acknowledge."},
    {q: "Cosa significa 'lease' nel DHCP?", a: ["Il nome del server","Tempo per cui un IP è concesso al client","Una cifratura","Un protocollo"], correct: 1, explain: "Il lease è la durata di validità dell'IP assegnato al client."},
    {q: "Nel messaggio DHCP DISCOVER l'IP mittente del client è:", a: ["0.0.0.0","127.0.0.1","255.255.255.255","Nessuno"], correct: 0, explain: "Il client non ha ancora un IP, quindi usa 0.0.0.0 come mittente."},
    {q: "Nel DHCP DISCOVER l'IP destinazione è:", a: ["0.0.0.0","127.0.0.1","255.255.255.255 (broadcast)","Quello del server"], correct: 2, explain: "Il client non conosce il server: invia in broadcast 255.255.255.255."},
    {q: "Quale porta UDP usa il server DHCP?", a: ["67","68","53","80"], correct: 0, explain: "Server DHCP: porta 67. Client: porta 68."},
    {q: "Cosa è un DHCP relay?", a: ["Un attacco","Un dispositivo che inoltra richieste DHCP tra reti diverse (perché il broadcast non attraversa router)","Un cifrario","Un certificato"], correct: 1, explain: "Il DHCP relay inoltra DHCP tra reti diverse, perché i router non propagano il broadcast."},
    {q: "Vantaggio del DHCP rispetto alla configurazione statica:", a: ["Maggiore sicurezza","Configurazione automatica e centralizzata","Velocità di rete maggiore","Niente"], correct: 1, explain: "DHCP automatizza, riduce errori e centralizza la gestione."},
    {q: "In quale stato il client ha ricevuto un IP valido?", a: ["INIT","SELECTING","BOUND","RENEWING"], correct: 2, explain: "BOUND = il client ha ricevuto ACK e l'IP è attivo."}
  ]
};

window.CHAPTERS.m4c10 = {
  title: "DNS - Domain Name System",
  body: `
    <p><span class="term">DNS</span> è il protocollo che <strong>traduce nomi simbolici</strong> (es. <code>www.google.com</code>) in <strong>indirizzi IP</strong> (es. <code>142.250.184.196</code>).</p>

    <h2 id="motivazione">Perché esiste</h2>
    <p>Gli host comunicano usando IP, ma per gli umani ricordare numeri è scomodo. Il DNS è la "rubrica telefonica" di Internet.</p>

    <h2 id="struttura">Struttura dei nomi</h2>
    <p>I nomi sono <strong>gerarchici</strong> e si leggono da destra a sinistra:</p>
    <code class="formula">www.istitutotecnico.edu.it
└─┬─┘└──────┬──────┘└┬┘└┬┘
 host    second-level  TLD  root</code>

    <h3 id="livelli">Livelli</h3>
    <ul>
      <li><strong>Root</strong>: il punto finale (sottinteso). Es. <code>.</code>.</li>
      <li><strong>TLD</strong> (Top-Level Domain): <code>.it</code>, <code>.com</code>, <code>.org</code>, <code>.edu</code>, ecc.</li>
      <li><strong>Second-level domain</strong>: dominio registrato (es. <code>google</code>, <code>istitutotecnico</code>).</li>
      <li><strong>Sub-domain / Host</strong>: <code>www</code>, <code>mail</code>, <code>shop</code>.</li>
    </ul>

    <h2 id="server">Tipologie di server DNS</h2>

    <h3 id="root-server">Root server</h3>
    <p>13 cluster nel mondo (con copie via anycast). Conoscono i TLD server.</p>

    <h3 id="tld-server">TLD server</h3>
    <p>Ogni TLD (.it, .com, ...) ha i propri server, che indirizzano ai server autoritativi.</p>

    <h3 id="autoritativo">Server autoritativo</h3>
    <p>Conosce ufficialmente i record DNS di un dominio (es. il server autoritativo di google.com).</p>

    <h3 id="resolver">Resolver / Caching server</h3>
    <p>Server che il client interroga (es. quello dell'ISP, 8.8.8.8 di Google, 1.1.1.1 di Cloudflare). Memorizza in cache le risposte.</p>

    <h2 id="risoluzione">Modalità di risoluzione</h2>

    <h3 id="ricorsiva">Risoluzione ricorsiva</h3>
    <p>Il client chiede al resolver di trovare l'IP. Il resolver fa <strong>tutto il lavoro</strong>: contatta root, TLD, autoritativo e restituisce la risposta finale al client.</p>

    <h3 id="iterativa">Risoluzione iterativa</h3>
    <p>Il client (o resolver) fa <strong>una richiesta alla volta</strong> a ogni server e riceve un riferimento al server successivo.</p>

    <h2 id="dns-flow">Risoluzione ricorsiva — diagramma</h2>
    <pre class="mermaid">
sequenceDiagram
  participant C as 💻 Client
  participant R as 🧠 Resolver
  participant Root as 🌐 Root server
  participant TLD as 🏷️ TLD .com
  participant Auth as 📚 Autoritativo google.com
  C->>R: www.google.com ?
  R->>Root: chi gestisce .com ?
  Root->>R: TLD server di .com
  R->>TLD: chi gestisce google.com ?
  TLD->>R: server autoritativo google.com
  R->>Auth: IP di www.google.com ?
  Auth->>R: 142.250.184.196
  R->>C: 142.250.184.196
  Note over R: Cache della risposta
    </pre>

    <h2 id="esempio">Esempio risoluzione di www.google.com</h2>
    <ol>
      <li>Client → resolver: "qual è l'IP di www.google.com?"</li>
      <li>Resolver → root: "chi è autoritativo per .com?"</li>
      <li>Root → resolver: "ecco i TLD server di .com".</li>
      <li>Resolver → TLD .com: "chi è autoritativo per google.com?"</li>
      <li>TLD → resolver: "ecco i server di google.com".</li>
      <li>Resolver → autoritativo google.com: "qual è l'IP di www?"</li>
      <li>Autoritativo → resolver: "142.250.184.196".</li>
      <li>Resolver → client: "142.250.184.196" (e mette in cache).</li>
    </ol>

    <h2 id="record">Tipi di record DNS</h2>
    <ul>
      <li><strong>A</strong>: nome → IPv4.</li>
      <li><strong>AAAA</strong>: nome → IPv6.</li>
      <li><strong>CNAME</strong>: alias verso un altro nome.</li>
      <li><strong>MX</strong>: server mail del dominio.</li>
      <li><strong>NS</strong>: server autoritativo.</li>
      <li><strong>TXT</strong>: testo libero (SPF, DKIM, verifica).</li>
      <li><strong>PTR</strong>: IP → nome (reverse DNS).</li>
    </ul>

    <h2 id="porte">Porta</h2>
    <p>DNS gira su porta <strong>53</strong>, tipicamente UDP per query brevi e TCP per zone transfer o risposte grandi (es. DNSSEC).</p>
  `,
  quiz: [
    {q: "DNS serve per:", a: ["Cifrare il traffico","Tradurre nomi simbolici in indirizzi IP","Routing","Filtraggio firewall"], correct: 1, explain: "Il DNS è la 'rubrica' che traduce nomi in IP."},
    {q: "Su quale porta gira DNS?", a: ["25","53","80","443"], correct: 1, explain: "DNS usa la porta 53 (UDP/TCP)."},
    {q: "Come si leggono i nomi DNS?", a: ["Da sinistra a destra","Da destra a sinistra (gerarchia)","In ordine alfabetico","In ordine casuale"], correct: 1, explain: "I nomi DNS sono gerarchici: TLD a destra, host a sinistra."},
    {q: "Cos'è un TLD?", a: ["Top-Level Domain (es. .com, .it)","The Long Distance","Tunnel Layer Device","Total Length Datagram"], correct: 0, explain: "Top-Level Domain è il livello più alto della gerarchia DNS."},
    {q: "Quanti root server cluster esistono?", a: ["1","13","100","1000"], correct: 1, explain: "13 cluster di root server (replicati via anycast in tutto il mondo)."},
    {q: "Cos'è un server autoritativo?", a: ["Un firewall","Il server che conosce ufficialmente i record DNS di un dominio","Un router","Un proxy"], correct: 1, explain: "Il server autoritativo detiene la 'verità' sui record di un dominio."},
    {q: "Risoluzione ricorsiva:", a: ["Il client fa una richiesta alla volta","Il resolver fa tutto il lavoro e restituisce la risposta finale al client","Non si usa","Solo per IPv6"], correct: 1, explain: "Nella risoluzione ricorsiva il resolver naviga tutta la gerarchia e dà la risposta finale."},
    {q: "Quale record DNS associa un nome a un IPv4?", a: ["A","AAAA","CNAME","MX"], correct: 0, explain: "Il record A mappa nome → IPv4. AAAA mappa nome → IPv6."},
    {q: "Il record MX serve per:", a: ["IPv6","Indicare il mail server del dominio","Reverse DNS","Alias"], correct: 1, explain: "MX (Mail eXchange) indica i server email del dominio."},
    {q: "1.1.1.1 è il DNS di:", a: ["Google","Cloudflare","Facebook","Microsoft"], correct: 1, explain: "1.1.1.1 è il resolver pubblico di Cloudflare. 8.8.8.8 è quello di Google."}
  ]
};

window.CHAPTERS.m4c11 = {
  title: "HTTP - Hyper Text Transfer Protocol",
  body: `
    <p><span class="term">HTTP</span> è il protocollo di livello applicativo che permette il <strong>web browsing</strong>: lo scambio di risorse (HTML, CSS, JS, immagini, video) tra client (browser) e server web.</p>

    <h2 id="caratteristiche">Caratteristiche</h2>
    <ul>
      <li>Modello <strong>client-server</strong>: il client invia una <strong>richiesta</strong>, il server una <strong>risposta</strong>.</li>
      <li>Protocollo <strong>stateless</strong>: ogni richiesta è indipendente. Per mantenere lo stato si usano <strong>cookie</strong> e sessioni.</li>
      <li>Usa <strong>TCP</strong> a livello di trasporto.</li>
      <li>Porta <strong>80</strong> per HTTP, <strong>443</strong> per HTTPS (HTTP su TLS).</li>
    </ul>

    <h2 id="url">URL — Uniform Resource Locator</h2>
    <p>L'URL identifica una risorsa sul web:</p>
    <code class="formula">https://www.example.com:443/path/to/resource?query=value#section
└─┬─┘   └──────┬──────┘└┬┘└──────┬──────────┘└────┬───────┘└──┬──┘
 schema     host        porta    path           query      fragment</code>

    <h3 id="parti-url">Parti dell'URL</h3>
    <ul>
      <li><strong>Schema</strong>: http, https, ftp, ...</li>
      <li><strong>Host</strong>: nome o IP del server.</li>
      <li><strong>Porta</strong>: opzionale (default 80 per HTTP, 443 per HTTPS).</li>
      <li><strong>Path</strong>: percorso della risorsa.</li>
      <li><strong>Query string</strong>: parametri (key=value).</li>
      <li><strong>Fragment</strong>: ancora a una sezione (gestito dal browser).</li>
    </ul>

    <h2 id="connessioni">Modalità di connessione</h2>

    <h3 id="non-persistente">Non persistente (HTTP/1.0)</h3>
    <p>Per ogni risorsa si <strong>apre e chiude</strong> una connessione TCP. Inefficiente: una pagina con 50 immagini → 51 connessioni TCP.</p>

    <h3 id="persistente">Persistente (HTTP/1.1+)</h3>
    <p>Una sola connessione TCP serve <strong>più richieste/risposte</strong>. Più efficiente. Possibile <strong>pipelining</strong>: inviare più richieste senza attendere le risposte.</p>

    <h2 id="messaggi">Formato dei messaggi</h2>

    <h3 id="richiesta">Messaggio di richiesta</h3>
    <code class="formula">GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 ...
Accept: text/html
Connection: keep-alive

(corpo opzionale)</code>

    <p>Componenti:</p>
    <ul>
      <li><strong>Riga di richiesta</strong>: metodo, URL, versione (es. <code>GET /index.html HTTP/1.1</code>).</li>
      <li><strong>Header</strong>: coppie chiave-valore.</li>
      <li><strong>Riga vuota</strong>.</li>
      <li><strong>Corpo</strong> (opzionale, presente per POST/PUT).</li>
    </ul>

    <h3 id="risposta">Messaggio di risposta</h3>
    <code class="formula">HTTP/1.1 200 OK
Date: Wed, 08 May 2026 10:00:00 GMT
Server: Apache/2.4
Content-Type: text/html
Content-Length: 1234

&lt;html&gt;...&lt;/html&gt;</code>

    <ul>
      <li><strong>Riga di stato</strong>: versione, codice, frase (es. <code>HTTP/1.1 200 OK</code>).</li>
      <li><strong>Header</strong>.</li>
      <li><strong>Riga vuota</strong>.</li>
      <li><strong>Corpo</strong>: la risorsa richiesta.</li>
    </ul>

    <h2 id="metodi">Metodi HTTP</h2>
    <table>
      <thead><tr><th>Metodo</th><th>Uso</th></tr></thead>
      <tbody>
        <tr><td>GET</td><td>Recupera una risorsa (no body).</td></tr>
        <tr><td>POST</td><td>Invia dati al server (form, upload).</td></tr>
        <tr><td>PUT</td><td>Crea o sostituisce una risorsa.</td></tr>
        <tr><td>DELETE</td><td>Elimina una risorsa.</td></tr>
        <tr><td>HEAD</td><td>Come GET ma senza body.</td></tr>
        <tr><td>OPTIONS</td><td>Metodi supportati dal server.</td></tr>
        <tr><td>PATCH</td><td>Modifica parziale di una risorsa.</td></tr>
      </tbody>
    </table>

    <h2 id="codici">Codici di stato</h2>
    <table>
      <thead><tr><th>Classe</th><th>Significato</th><th>Esempi</th></tr></thead>
      <tbody>
        <tr><td>1xx</td><td>Informational</td><td>100 Continue</td></tr>
        <tr><td>2xx</td><td>Success</td><td>200 OK, 201 Created, 204 No Content</td></tr>
        <tr><td>3xx</td><td>Redirection</td><td>301 Moved Permanently, 302 Found, 304 Not Modified</td></tr>
        <tr><td>4xx</td><td>Client Error</td><td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found</td></tr>
        <tr><td>5xx</td><td>Server Error</td><td>500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</td></tr>
      </tbody>
    </table>

    <h2 id="versioni">Versioni di HTTP</h2>
    <ul>
      <li><strong>HTTP/1.0</strong> (1996): connessioni non persistenti.</li>
      <li><strong>HTTP/1.1</strong> (1997): persistenti, pipelining, host header.</li>
      <li><strong>HTTP/2</strong> (2015): multiplexing, header compression, server push.</li>
      <li><strong>HTTP/3</strong> (2022): basato su QUIC (UDP), più veloce su mobile.</li>
    </ul>
  `,
  quiz: [
    {q: "HTTP serve per:", a: ["Email","Web browsing (scambio di risorse tra browser e web server)","DNS","File transfer"], correct: 1, explain: "HTTP è il protocollo del web."},
    {q: "Su quale porta gira HTTP?", a: ["21","53","80","443"], correct: 2, explain: "HTTP gira su porta 80; HTTPS su 443."},
    {q: "HTTP è stateless: cosa significa?", a: ["È sempre cifrato","Ogni richiesta è indipendente, il server non ricorda le precedenti","Funziona solo se loggati","Solo TCP"], correct: 1, explain: "HTTP è stateless: per mantenere stato si usano cookie/sessioni."},
    {q: "Quale protocollo di trasporto usa HTTP?", a: ["UDP","TCP","ICMP","ARP"], correct: 1, explain: "HTTP gira tipicamente sopra TCP. HTTP/3 usa QUIC su UDP."},
    {q: "Connessione persistente significa:", a: ["Una connessione TCP per ogni richiesta","Una connessione TCP serve più richieste/risposte","Niente connessioni","Connessione cifrata"], correct: 1, explain: "HTTP/1.1 introduce connessioni persistenti: una TCP per più richieste consecutive."},
    {q: "Quale metodo HTTP serve per recuperare una risorsa?", a: ["POST","GET","PUT","DELETE"], correct: 1, explain: "GET recupera una risorsa, tipicamente senza body nella richiesta."},
    {q: "Codice 404:", a: ["Successo","Reindirizzamento","Risorsa non trovata (Client Error)","Errore server"], correct: 2, explain: "404 Not Found: la risorsa non esiste sul server."},
    {q: "Codice 500:", a: ["OK","Spostamento permanente","Non trovato","Internal Server Error"], correct: 3, explain: "500 = errore interno del server."},
    {q: "Quale parte di un URL identifica il path?", a: ["L'host","La porta","Il pezzo dopo l'host: /path/to/resource","Lo schema"], correct: 2, explain: "Il path è la parte che identifica la risorsa sul server."},
    {q: "Cosa contiene la query string?", a: ["L'host","Parametri key=value separati da '&' dopo '?'","Il path","La porta"], correct: 1, explain: "La query string passa parametri al server: ?key1=val1&key2=val2."},
    {q: "Quale versione HTTP è basata su QUIC?", a: ["1.0","1.1","2","3"], correct: 3, explain: "HTTP/3 (2022) si basa su QUIC, che gira sopra UDP."}
  ]
};
