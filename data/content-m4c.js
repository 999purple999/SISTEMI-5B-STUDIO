// Module 4 - Capitoli aggiuntivi: Hardware switch/router (m4c12),
// Accesso a Internet (m4c13), ICMP (m4c14)
// Estratti dai PDF del prof Marcolin (docs_extracted/ultime/)
window.CHAPTERS = window.CHAPTERS || {};

// ================================================================
// m4c12 — Hardware di switch e router
// ================================================================
window.CHAPTERS.m4c12 = {
  title: "Hardware di switch e router",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p>Le porte di uno switch/router si distinguono per <strong>velocità</strong> (FE/GE/2.5GE/10GE), <strong>tipo di mezzo</strong> (rame con RJ-45, fibra con SC/LC, slot SFP/SFP+ con transceiver intercambiabile) e <strong>PoE</strong> (alimentazione su Ethernet). Le specifiche <span class="term">XBASE-Y</span> indicano velocità e mezzo trasmissivo.</p></div>

    <h2 id="porte">Tipi di porte Ethernet</h2>
    <p>Le porte cablate di switch e router moderni si classificano per velocità:</p>
    <table>
      <thead><tr><th>Sigla</th><th>Velocità</th><th>Standard</th><th>Cavo richiesto</th></tr></thead>
      <tbody>
        <tr><td>FE</td><td>100 Mbit/s</td><td>100BASE-TX</td><td>Cat 5</td></tr>
        <tr><td>GE (1G)</td><td>1 Gbit/s</td><td>1000BASE-T</td><td>Cat 5e</td></tr>
        <tr><td>2.5GE</td><td>2.5 Gbit/s</td><td>2.5GBASE-T</td><td>Cat 5e/6</td></tr>
        <tr><td>5GE</td><td>5 Gbit/s</td><td>5GBASE-T</td><td>Cat 6</td></tr>
        <tr><td>10GE</td><td>10 Gbit/s</td><td>10GBASE-T</td><td>Cat 6A</td></tr>
      </tbody>
    </table>
    <p>Le specifiche <strong>XBASE-Y</strong>:</p>
    <ul>
      <li><strong>X</strong> = velocità (in Mbit/s o Gbit/s)</li>
      <li><strong>BASE</strong> = trasmissione in <strong>banda base</strong> (un solo segnale alla volta)</li>
      <li><strong>Y</strong> = mezzo trasmissivo: <strong>T</strong> = doppino (rame), <strong>SR</strong> = fibra multimodale "short range", <strong>LR</strong> = fibra monomodale "long range", <strong>SX/LX</strong> = varianti gigabit fibra</li>
    </ul>

    <h2 id="poe">PoE — Power over Ethernet</h2>
    <div class="info-box key">
      <h4>🔑 PoE</h4>
      <p>Lo switch/router fornisce <strong>alimentazione elettrica</strong> al dispositivo terminale <strong>sullo stesso cavo Ethernet</strong>: niente alimentatore separato per AP, telefoni VoIP, telecamere IP.</p>
    </div>
    <table>
      <thead><tr><th>Standard</th><th>Sigla</th><th>Potenza alla porta</th><th>Potenza al device</th><th>Dispositivi tipici</th></tr></thead>
      <tbody>
        <tr><td>802.3af</td><td>PoE</td><td>15.4 W</td><td>12.95 W</td><td>VoIP, IP cam base, AP entry</td></tr>
        <tr><td>802.3at</td><td>PoE+</td><td>30 W</td><td>25.5 W</td><td>AP Wi-Fi 5/6, IP cam PTZ</td></tr>
        <tr><td>802.3bt</td><td>PoE++ (4PPoE)</td><td>60-100 W</td><td>51-71 W</td><td>AP Wi-Fi 6E/7, display, thin client</td></tr>
      </tbody>
    </table>

    <h2 id="rame">Cavi in rame e categorie</h2>
    <table>
      <thead><tr><th>Categoria</th><th>Banda passante</th><th>Velocità max</th><th>Distanza 10G</th></tr></thead>
      <tbody>
        <tr><td>Cat 5</td><td>100 MHz</td><td>100 Mbps</td><td>—</td></tr>
        <tr><td>Cat 5e</td><td>100 MHz</td><td>1 Gbps</td><td>—</td></tr>
        <tr><td>Cat 6</td><td>250 MHz</td><td>10 Gbps (corto)</td><td>37-55 m</td></tr>
        <tr><td>Cat 6A</td><td>500 MHz</td><td>10 Gbps</td><td>100 m</td></tr>
        <tr><td>Cat 7/8</td><td>600-2000 MHz</td><td>25-40 Gbps</td><td>30-100 m</td></tr>
      </tbody>
    </table>
    <p><strong>Schermature</strong>: <strong>UTP</strong> (Unshielded Twisted Pair, no schermo), <strong>FTP</strong> (Foiled, lamina globale), <strong>STP</strong> (Shielded, schermo per coppia). Più schermo = più resistenza alle interferenze ma costo e rigidità maggiori.</p>

    <h2 id="fibra">Fibra ottica</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🔆</div>
        <div class="callout-title">Multimodale (MMF)</div>
        <div class="callout-text">Nucleo grande (50/62.5 µm). Distanze brevi (300m-2km). Sigle <strong>OM1, OM2, OM3, OM4</strong>. Sorgente LED/VCSEL. Più economica.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🔬</div>
        <div class="callout-title">Monomodale (SMF)</div>
        <div class="callout-text">Nucleo sottile (~9-10 µm). Distanze lunghe (decine di km). Sigle <strong>OS1, OS2</strong>. Sorgente laser. Più costosa, niente dispersione modale.</div>
      </div>
    </div>
    <p><strong>Connettori</strong>:</p>
    <ul>
      <li><strong>SC</strong> (Subscriber Connector): quadrato, push-pull, robusto. Comune sulle borchie ottiche.</li>
      <li><strong>LC</strong> (Lucent Connector): piccolo, a clip. <strong>Standard de facto sui transceiver SFP/SFP+</strong>. Spesso "LC duplex" = due fibre (TX+RX) in un unico clip.</li>
    </ul>

    <h2 id="sfp">Slot SFP/SFP+ e transceiver</h2>
    <p>Per non vincolarsi a un solo tipo di mezzo, switch e router prevedono <strong>slot modulari</strong> dove inserire un <strong>transceiver</strong> (modulo che converte segnale elettrico ↔ ottico/elettrico).</p>
    <table>
      <thead><tr><th>Slot</th><th>Bitrate</th><th>Tipologia transceiver</th></tr></thead>
      <tbody>
        <tr><td>SFP</td><td>1 Gbit/s</td><td>1000BASE-SX/LX (fibra), 1000BASE-T (rame)</td></tr>
        <tr><td>SFP+</td><td>10 Gbit/s</td><td>10GBASE-SR/LR (fibra), 10GBASE-T (rame)</td></tr>
        <tr><td>SFP28</td><td>25 Gbit/s</td><td>25GBASE-SR/LR</td></tr>
        <tr><td>QSFP+</td><td>40 Gbit/s</td><td>40GBASE-SR4/LR4</td></tr>
        <tr><td>QSFP28</td><td>100 Gbit/s</td><td>100GBASE-SR4/LR4</td></tr>
      </tbody>
    </table>
    <pre class="mermaid">
flowchart LR
  S[Switch / Router]
  S --> P1[Porta GE rame<br/>Cat 5e]
  S --> P2[Porta 2.5GE PoE+<br/>Cat 6 + alim VoIP]
  S --> SLOT[Slot SFP+]
  SLOT --> T1[Transceiver<br/>10GBASE-SR]
  SLOT --> T2[Transceiver<br/>10GBASE-LR]
  SLOT --> T3[Transceiver<br/>10GBASE-T]
  T1 --> F1[Fibra OM3 / OM4<br/>LC duplex]
  T2 --> F2[Fibra OS2<br/>LC duplex]
  T3 --> F3[Cat 6A]
    </pre>

    <h2 id="wan">Porta WAN del router</h2>
    <p>La porta WAN è quella che il router usa per <strong>uscire verso Internet</strong>. A seconda del tipo di accesso:</p>
    <ul>
      <li><strong>ADSL</strong> → <strong>modem</strong> (modula/demodula segnali sul doppino telefonico) collegato alla porta WAN Ethernet via RJ-45; modem ↔ presa muro via RJ-11.</li>
      <li><strong>FTTH</strong> → fibra termina su <strong>borchia ottica</strong>, una bretella la collega all'<strong>ONT</strong> (Optical Network Terminal); ONT ↔ porta WAN router via RJ-45.</li>
    </ul>
    <p>Sulla porta WAN il router: riceve l'<strong>IP pubblico</strong> dall'ISP, applica <strong>NAT/PAT</strong>, applica <strong>firewall</strong> e <strong>routing</strong> verso Internet.</p>

    <h2 id="esempio-logipack">Esempio reale: dorsale 300 m tra due edifici</h2>
    <p>Caso aziendale (LogiPack — vedi <a href="casi-studio.html">Casi di studio</a>):</p>
    <ul>
      <li>Edificio A e B distanti <strong>300 m</strong> → rame inadatto (max 100 m): <strong>fibra obbligatoria</strong>.</li>
      <li>Soluzione: <strong>Slot SFP+</strong> sui due router con <strong>transceiver 10GBASE-SR</strong> + cavo <strong>fibra OM3 multimodale LC duplex</strong>.</li>
      <li>Risultato: dorsale a <strong>10 Gbit/s</strong> stabile su 300 m, niente colli di bottiglia con il futuro upgrade della WAN.</li>
    </ul>
  `,
  quiz: [
    {q: "Cosa significa la sigla 1000BASE-T?", a: ["1000 Mbit/s in banda base su doppino di rame","1000 byte/s su tutte le linee","100 Gbit/s su fibra","Categoria del cavo"], correct: 0, explain: "X=velocità (1000 Mbps), BASE=banda base, T=doppino in rame (twisted pair)."},
    {q: "Standard PoE+ (potenza alla porta)?", a: ["15.4 W","30 W","60 W","100 W"], correct: 1, explain: "802.3at PoE+ eroga 30 W alla porta, ~25.5 W al device."},
    {q: "Quale connettore è standard sui transceiver SFP+?", a: ["RJ-45","RJ-11","SC","LC duplex"], correct: 3, explain: "LC duplex (due fibre TX/RX in un solo clip) è lo standard de facto sui transceiver SFP/SFP+."},
    {q: "Perché su una dorsale di 300 m si usa la fibra invece del rame?", a: ["È più colorata","Le tecnologie Ethernet su rame hanno limite ~100 m per tratta","Costa di meno","Non serve PoE"], correct: 1, explain: "Le tecnologie Ethernet su doppino prevedono lunghezza max ~100 m: oltre serve fibra."},
    {q: "Cosa fa un transceiver SFP?", a: ["Converte la corrente alternata in continua","Converte il segnale elettrico interno nel segnale del mezzo (rame/ottico) e viceversa","Memorizza pacchetti","Filtra il traffico"], correct: 1, explain: "Il transceiver è un modulo conversione segnale, intercambiabile a seconda del mezzo trasmissivo richiesto."},
    {q: "Differenza tra fibra OM3 e OS2?", a: ["Nessuna","OM3 è multimodale (corto raggio), OS2 è monomodale (lungo raggio)","OS2 è più economica","OM3 è solo per voce"], correct: 1, explain: "OM3 = multimodale (300m-2km, sorgente VCSEL); OS2 = monomodale (decine di km, sorgente laser)."},
    {q: "A cosa serve l'ONT in una connessione FTTH?", a: ["A bloccare il traffico","A convertire i segnali ottici della fibra in Ethernet utilizzabili dal router","A cifrare le comunicazioni","A misurare il consumo"], correct: 1, explain: "ONT (Optical Network Terminal) è l'apparato attivo che converte luce ↔ segnali elettrici Ethernet."}
  ]
};

// ================================================================
// m4c13 — Accesso alla rete Internet
// ================================================================
window.CHAPTERS.m4c13 = {
  title: "Accesso alla rete Internet",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p>Internet è una <strong>rete di reti</strong> costituita da <strong>ISP</strong> organizzati in 3 livelli (Tier 1/2/3) interconnessi tramite <strong>peering</strong> presso gli <strong>IXP</strong>. L'accesso al cliente avviene oggi tramite <strong>ADSL</strong> (doppino, in dismissione) o <strong>FTTC/FTTB/FTTH</strong> (fibra, sempre più diffusa).</p></div>

    <h2 id="isp">ISP: i tre livelli</h2>
    <p>Un <span class="term">ISP</span> (Internet Service Provider) è un operatore che fornisce accesso a Internet. Non esiste un singolo gestore: la rete è formata da migliaia di ISP organizzati gerarchicamente.</p>
    <table>
      <thead><tr><th>Tier</th><th>Caratteristica</th><th>Esempi</th></tr></thead>
      <tbody>
        <tr><td>Tier 1</td><td>Operatori globali. Hanno dorsali transcontinentali (cavi sottomarini). Si interconnettono <strong>solo tra loro gratis</strong> (settlement-free peering).</td><td>Lumen, Tata, NTT, Telia, Deutsche Telekom</td></tr>
        <tr><td>Tier 2</td><td>Operatori nazionali/continentali. Pagano per accedere ai Tier 1. Vendono connettività ai Tier 3.</td><td>TIM Sparkle, Telecom Italia, Vodafone IT</td></tr>
        <tr><td>Tier 3</td><td>Operatori regionali/locali. Si rivolgono al cliente finale (residenziale, PMI).</td><td>Fastweb regionale, ISP locali</td></tr>
      </tbody>
    </table>
    <pre class="mermaid">
flowchart TB
  T1A[Tier 1 — globale<br/>NTT / Lumen / Tata] -->|peering gratuito| T1B[Tier 1 — globale<br/>Telia / DT]
  T1A --> T2A[Tier 2 — nazionale<br/>TIM Sparkle]
  T1B --> T2B[Tier 2 — nazionale<br/>Vodafone IT]
  T2A --> T3A[Tier 3 — regionale]
  T2B --> T3B[Tier 3 — regionale]
  T3A --> U1((Casa<br/>FTTH))
  T3A --> U2((Azienda<br/>fibra dedicata))
  T3B --> U3((Mobile<br/>4G/5G))
    </pre>

    <h3 id="ixp">IXP — Internet Exchange Point</h3>
    <p>Punto fisico (data center neutrale) dove più ISP si incontrano per <strong>scambiare traffico direttamente</strong> senza passare da un Tier superiore. Riduce latenza e costi. Esempi: <strong>MIX</strong> (Milan Internet eXchange, Milano), <strong>NaMeX</strong> (Roma), <strong>TOP-IX</strong> (Torino).</p>

    <h2 id="adsl">Accesso ADSL (doppino telefonico)</h2>
    <p>Sfrutta la rete telefonica tradizionale (rame). Il segnale dati viaggia su frequenze separate dalla voce → necessario un <strong>modem ADSL</strong>.</p>
    <table>
      <thead><tr><th>Standard</th><th>Anno</th><th>Download max</th><th>Upload max</th></tr></thead>
      <tbody>
        <tr><td>ADSL</td><td>1998</td><td>8 Mbit/s</td><td>1 Mbit/s</td></tr>
        <tr><td>ADSL2</td><td>2002</td><td>12 Mbit/s</td><td>1.4 Mbit/s</td></tr>
        <tr><td>ADSL2+</td><td>2003</td><td>24 Mbit/s</td><td>1 Mbit/s</td></tr>
      </tbody>
    </table>
    <p><strong>Asimmetria</strong>: download molto maggiore dell'upload (uso tipico residenziale). La velocità reale dipende dalla <strong>distanza dalla centrale</strong> (più lontano = più attenuazione = meno banda).</p>

    <h2 id="ftth">Accessi in fibra (FTTx)</h2>
    <p><strong>FTTx</strong> = "Fiber To The X". La fibra arriva sempre più vicino all'utente:</p>
    <table>
      <thead><tr><th>Sigla</th><th>Significato</th><th>Velocità tipica DL/UL</th><th>Note</th></tr></thead>
      <tbody>
        <tr><td><strong>FTTC</strong></td><td>Fiber To The Cabinet</td><td>100 / 20 Mbit/s</td><td>Fibra fino all'<strong>ARL</strong> (Armadio RipartiLinea); ultimi metri in rame (VDSL)</td></tr>
        <tr><td><strong>FTTB</strong></td><td>Fiber To The Building</td><td>1000 / 50 Mbit/s</td><td>Fibra al palazzo, rame solo nel condominio</td></tr>
        <tr><td><strong>FTTH</strong></td><td>Fiber To The Home</td><td>500-2500 / 100-1000 Mbit/s</td><td>Fibra dentro casa: termina sulla <strong>borchia ottica</strong> → ONT → router</td></tr>
      </tbody>
    </table>
    <pre class="mermaid">
flowchart LR
  CO[Centrale ISP] -- fibra --> ARL[ARL — Armadio RipartiLinea]
  ARL -- fibra --> EDIF[Edificio]
  EDIF -- fibra --> CASA[Casa]
  ARL -. rame VDSL .-> FTTC[FTTC<br/>100/20 Mbps]
  EDIF -. rame .-> FTTB[FTTB<br/>1G/50 Mbps]
  CASA --> FTTH[FTTH<br/>fino a 2.5G/1G Mbps]
    </pre>

    <h2 id="banda">Requisiti di banda per applicazione</h2>
    <table>
      <thead><tr><th>Servizio</th><th>Banda minima</th></tr></thead>
      <tbody>
        <tr><td>Streaming video HD</td><td>3 Mbit/s</td></tr>
        <tr><td>Streaming Full HD</td><td>4 Mbit/s</td></tr>
        <tr><td>Streaming 4K UHD</td><td>15-25 Mbit/s</td></tr>
        <tr><td>Videoconferenza HD</td><td>2-4 Mbit/s sim.</td></tr>
        <tr><td>Cloud backup (50 GB)</td><td>upload &gt; 50 Mbit/s consigliato</td></tr>
        <tr><td>Smart working / VoIP</td><td>1 Mbit/s sim.</td></tr>
        <tr><td>Gaming online</td><td>3-6 Mbit/s + bassa latenza</td></tr>
      </tbody>
    </table>

    <h2 id="nas">NAS — Network Attached Storage</h2>
    <p>Un <span class="term">NAS</span> è un dispositivo di storage condiviso in LAN. Espone i file via SMB/NFS/AFP. Usato per:</p>
    <ul>
      <li>Backup centralizzato dei PC aziendali (alternativa o complemento del cloud)</li>
      <li>Archivio di documenti/foto/video accessibile da tutta la rete</li>
      <li>Streaming media (Plex, Emby) o storage VM</li>
    </ul>

    <h2 id="contratto">Scegliere il contratto ISP per un'azienda</h2>
    <p>Per un'azienda valutare:</p>
    <ul>
      <li><strong>Velocità DL/UL</strong> in funzione del numero di dipendenti e dei servizi (videoconferenze, cloud, backup)</li>
      <li><strong>SLA</strong> (Service Level Agreement): tempo di ripristino garantito, banda minima garantita</li>
      <li><strong>IP pubblico statico</strong> (per server pubblici in DMZ, VPN site-to-site)</li>
      <li><strong>Ridondanza</strong>: doppio collegamento di operatori diversi per Business Continuity</li>
      <li><strong>Tipo di accesso</strong>: per uffici medio-grandi quasi sempre <strong>FTTH</strong> o fibra dedicata "Business" simmetrica</li>
    </ul>
  `,
  quiz: [
    {q: "Cosa significa FTTH?", a: ["Fiber To The Hub","Fiber To The Home — la fibra arriva dentro casa","Fast Total Transfer Hosted","Fast Throughput Through Hub"], correct: 1, explain: "FTTH = Fiber To The Home: la fibra termina sulla borchia ottica nell'abitazione, collegata all'ONT."},
    {q: "Quale è la differenza principale tra Tier 1 e Tier 2?", a: ["Il colore","I Tier 1 hanno dorsali globali e si interconnettono gratis tra loro","I Tier 2 sono più veloci","Sono uguali"], correct: 1, explain: "I Tier 1 sono globali e fanno settlement-free peering tra loro; i Tier 2 pagano per accedere ai Tier 1."},
    {q: "Cosa è un IXP?", a: ["Un protocollo","Un punto fisico dove gli ISP scambiano traffico direttamente","Un tipo di cavo","Un router"], correct: 1, explain: "IXP (Internet Exchange Point): data center neutrale dove più ISP si interconnettono direttamente. Es. MIX a Milano."},
    {q: "Velocità tipica DL/UL di FTTC?", a: ["1 Gbit/s simmetrici","100 / 20 Mbit/s","8 / 1 Mbit/s","2.5 Gbit/s"], correct: 1, explain: "FTTC: fibra fino all'ARL, ultimi metri in rame VDSL → ~100 Mbps DL / 20 Mbps UL."},
    {q: "ADSL2+ download max?", a: ["8 Mbit/s","12 Mbit/s","24 Mbit/s","100 Mbit/s"], correct: 2, explain: "ADSL2+ raggiunge fino a 24 Mbit/s in download (1 Mbit/s upload), ma dipende dalla distanza dalla centrale."},
    {q: "A cosa serve un NAS?", a: ["A pulire il PC","A fornire storage condiviso in rete locale","Solo a registrare la voce","A bloccare il traffico"], correct: 1, explain: "NAS = Network Attached Storage: dispositivo di archiviazione condiviso in LAN, accessibile via SMB/NFS."}
  ]
};

// ================================================================
// m4c14 — ICMP, ping e traceroute
// ================================================================
window.CHAPTERS.m4c14 = {
  title: "ICMP, ping e traceroute",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p><strong>ICMP</strong> (RFC 792, 1981) è il protocollo che, nello stack TCP/IP, segnala <strong>errori</strong> e fornisce <strong>diagnostica</strong> di rete (ping, traceroute). I messaggi ICMP sono incapsulati dentro pacchetti IP (campo Protocol = 1).</p></div>

    <h2 id="cosa">Cos'è ICMP</h2>
    <p>Il <span class="term">protocollo ICMP</span> (Internet Control Message Protocol) è implementato dal processo PIP (lo stesso del livello IP). Si usa per:</p>
    <ul>
      <li><strong>Segnalare anomalie</strong> riscontrate durante l'inoltro di un pacchetto (es. host irraggiungibile, TTL scaduto)</li>
      <li>Fornire <strong>funzionalità di diagnostica</strong> (ping per verificare connettività, tracert per ricostruire il percorso)</li>
    </ul>
    <p>Anche se è usato a livello applicativo (es. dal comando <code>ping</code>), <strong>non è</strong> un protocollo applicativo: i messaggi ICMP vengono <strong>incapsulati direttamente in IP</strong>, e il campo <code>Protocol</code> dell'header IPv4 vale <code>1</code> per ICMP.</p>

    <h2 id="formato">Formato del messaggio ICMP</h2>
    <p>L'header è sempre di <strong>8 byte (64 bit)</strong>:</p>
    <table>
      <thead><tr><th>Campo</th><th>Bit</th><th>Funzione</th></tr></thead>
      <tbody>
        <tr><td>Type</td><td>8</td><td>Categoria del messaggio</td></tr>
        <tr><td>Code</td><td>8</td><td>Sotto-categoria specifica</td></tr>
        <tr><td>Checksum</td><td>16</td><td>Internet Checksum di header+payload</td></tr>
        <tr><td>Identifier / Sequence Number / dati</td><td>32</td><td>Variabile a seconda del Type</td></tr>
      </tbody>
    </table>
    <p>Il <strong>checksum</strong>: il destinatario calcola di nuovo il checksum sui byte ricevuti — se diverso, il messaggio viene <strong>scartato silenziosamente</strong> (no notifica al mittente).</p>

    <h2 id="categorie">Due macro-categorie</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">⚠️</div>
        <div class="callout-title">Reportistica errori</div>
        <div class="callout-text">Generati quando un pacchetto viene scartato. Inviati al mittente del pacchetto scartato. Includono nel payload una <strong>copia dell'header IP</strong> + i primi <strong>8 byte del payload</strong> (così il mittente capisce a quale traffico/processo si riferisce).</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🩺</div>
        <div class="callout-title">Diagnostica</div>
        <div class="callout-text">Coppie richiesta/risposta (es. Echo Request/Reply). Generati esplicitamente da un host per ottenere informazioni di rete. Possono essere bloccati da firewall.</div>
      </div>
    </div>

    <h2 id="type">Principali Type</h2>
    <table>
      <thead><tr><th>Type</th><th>Nome</th><th>Categoria</th><th>Code (esempi)</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>Echo Reply</td><td>Diagnostica</td><td>0</td></tr>
        <tr><td>3</td><td>Destination Unreachable</td><td>Errore</td><td>0=net, 1=host, 2=protocol, 3=port, 4=frag needed+DF</td></tr>
        <tr><td>5</td><td>Redirect</td><td>Errore/Notifica</td><td>0-3</td></tr>
        <tr><td>8</td><td>Echo Request</td><td>Diagnostica</td><td>0</td></tr>
        <tr><td>11</td><td>Time Exceeded</td><td>Errore</td><td>0=TTL=0 in transit, 1=fragment reassembly</td></tr>
        <tr><td>12</td><td>Parameter Problem</td><td>Errore</td><td>0-2</td></tr>
      </tbody>
    </table>
    <pre class="mermaid">
flowchart TB
  ICMP[ICMP — RFC 792]
  ICMP --> ERR[⚠️ Errori]
  ICMP --> DIAG[🩺 Diagnostica]
  ERR --> DU[Destination<br/>Unreachable<br/>Type 3]
  ERR --> TE[Time Exceeded<br/>Type 11]
  ERR --> PP[Parameter<br/>Problem<br/>Type 12]
  ERR --> RD[Redirect<br/>Type 5]
  DIAG --> ER[Echo Request<br/>Type 8]
  DIAG --> EP[Echo Reply<br/>Type 0]
    </pre>

    <h2 id="dest-unr">Destination Unreachable (Type 3) in dettaglio</h2>
    <p>Generato quando un router o end-device <strong>non può consegnare</strong> un pacchetto:</p>
    <ul>
      <li><strong>Code 0 — Network Unreachable</strong>: il router non ha rotta verso la rete di destinazione.</li>
      <li><strong>Code 1 — Host Unreachable</strong>: il pacchetto arriva al router della rete di destinazione ma quest'ultimo non riesce a consegnarlo all'host.</li>
      <li><strong>Code 2 — Protocol Unreachable</strong>: l'end-device non implementa il protocollo specificato.</li>
      <li><strong>Code 3 — Port Unreachable</strong>: nessun processo è in ascolto sulla porta UDP destinazione.</li>
      <li><strong>Code 4 — Fragmentation needed and DF set</strong>: serve frammentare ma il bit DF = 1.</li>
    </ul>

    <h2 id="ping">Il comando <code>ping</code></h2>
    <p>Verifica la <strong>raggiungibilità</strong> di un target e calcola il <strong>RTT</strong> (Round Trip Time):</p>
    <pre class="formula">ping &lt;nome_simbolico | indirizzo_IP&gt;</pre>
    <ul>
      <li><strong>Windows</strong>: invia 4 Echo Request di default (payload <strong>32 byte</strong>).</li>
      <li><strong>Linux/macOS</strong>: invia continuativamente fino a Ctrl+C (payload <strong>56 byte</strong>).</li>
    </ul>
    <p>Tutti gli Echo Request della stessa sessione condividono lo stesso <strong>Identifier</strong>; ogni richiesta ha un <strong>Sequence Number</strong> incrementale (associa risposte ordinate).</p>
    <pre class="mermaid">
sequenceDiagram
  participant A as Host A
  participant B as Host B (target)
  Note over A,B: ping target — sessione Identifier=1234
  A->>B: ICMP Echo Request (Type 8, Seq 1)
  B-->>A: ICMP Echo Reply (Type 0, Seq 1)
  Note over A: RTT = t_reply - t_request
  A->>B: ICMP Echo Request (Seq 2)
  B-->>A: ICMP Echo Reply (Seq 2)
  Note over A: Calcola RTT min/avg/max
    </pre>
    <pre class="formula"># Output tipico (Windows)
Esecuzione di Ping 8.8.8.8 con 32 byte di dati:
Risposta da 8.8.8.8: byte=32 durata=12ms TTL=117
Risposta da 8.8.8.8: byte=32 durata=11ms TTL=117
Risposta da 8.8.8.8: byte=32 durata=13ms TTL=117
Risposta da 8.8.8.8: byte=32 durata=12ms TTL=117

Statistiche Ping per 8.8.8.8:
    Pacchetti: Trasmessi = 4, Ricevuti = 4, Persi = 0 (0% persi)
Tempo approssimativo percorsi andata/ritorno in millisecondi:
    Minimo = 11ms, Massimo = 13ms, Medio = 12ms</pre>

    <h2 id="tracert">tracert / traceroute</h2>
    <p>Ricostruisce il <strong>percorso (hop by hop)</strong> verso la destinazione sfruttando il decremento del campo <strong>TTL</strong> dei pacchetti IP e i messaggi ICMP <strong>Time Exceeded</strong>.</p>
    <p>Tecnica:</p>
    <ol>
      <li>Invia un pacchetto con <strong>TTL = 1</strong>: il primo router decrementa a 0 → scarta + invia ICMP Time Exceeded → mittente impara IP del primo hop.</li>
      <li>Invia con <strong>TTL = 2</strong>: arriva al secondo router → Time Exceeded → secondo hop.</li>
      <li>Continua finché un pacchetto raggiunge il target.</li>
    </ol>
    <p><strong>Importante</strong>: Windows e Linux usano <strong>protocolli diversi</strong>:</p>
    <ul>
      <li><strong>Windows (<code>tracert</code>)</strong>: ICMP Echo Request, e il target risponde con Echo Reply.</li>
      <li><strong>Linux/macOS (<code>traceroute</code>)</strong>: pacchetti UDP verso porta alta (33434+), e il target risponde con ICMP Port Unreachable.</li>
    </ul>
    <pre class="mermaid">
sequenceDiagram
  participant H as Host
  participant R1 as Router 1
  participant R2 as Router 2
  participant T as Target
  H->>R1: pkt TTL=1
  R1-->>H: ICMP Time Exceeded (Type 11)
  H->>R2: pkt TTL=2
  R2-->>H: ICMP Time Exceeded
  H->>T: pkt TTL=3
  T-->>H: ICMP Echo Reply (Windows)<br/>oppure Port Unreachable (Linux)
    </pre>

    <h2 id="firewall">ICMP e firewall</h2>
    <p>Spesso il traffico ICMP <strong>è bloccato</strong> da firewall (per limitare scansioni e attacchi tipo Smurf/Ping flood). Quindi un ping che fallisce <strong>non significa</strong> automaticamente che il target sia spento — potrebbe semplicemente avere ICMP filtrato.</p>
  `,
  quiz: [
    {q: "Cosa è ICMP?", a: ["Un protocollo applicativo","Un protocollo che segnala errori e fornisce diagnostica, incapsulato in IP","Un tipo di firewall","Un cifrario"], correct: 1, explain: "ICMP (RFC 792, 1981): protocollo di controllo a livello rete, incapsulato direttamente in IP (campo Protocol = 1)."},
    {q: "Type 8 e Type 0 corrispondono a:", a: ["Destination Unreachable / Time Exceeded","Echo Request / Echo Reply","Redirect / Source Quench","Errore / Diagnostica"], correct: 1, explain: "Type 8 = Echo Request (richiesta ping), Type 0 = Echo Reply (risposta)."},
    {q: "Cosa significa TTL = 0 in transit?", a: ["Il pacchetto è arrivato","Il TTL è stato decrementato a 0 da un router → ICMP Time Exceeded (Type 11)","Errore di checksum","Indirizzo errato"], correct: 1, explain: "Quando un router decrementa il TTL a 0, scarta il pacchetto e invia ICMP Time Exceeded al mittente (questo è ciò che traceroute sfrutta)."},
    {q: "Quanti byte è il payload di default di ping su Windows?", a: ["8","32","56","1500"], correct: 1, explain: "Windows: 32 byte. Linux/macOS: 56 byte."},
    {q: "Differenza tracert (Windows) vs traceroute (Linux)?", a: ["Sono identici","Windows usa ICMP Echo, Linux usa UDP verso porte alte","Windows è più veloce","Linux non funziona"], correct: 1, explain: "Windows: ICMP Echo Request. Linux/macOS: UDP verso porte 33434+, target risponde con ICMP Port Unreachable."},
    {q: "Perché un ping può fallire anche se il target è acceso?", a: ["Perché il sole","Perché i firewall spesso bloccano ICMP","Perché ICMP è obsoleto","Perché serve TCP"], correct: 1, explain: "Molti firewall bloccano ICMP per ragioni di sicurezza: il target potrebbe essere raggiungibile via TCP/UDP ma non rispondere al ping."},
    {q: "Cosa contiene il payload di un messaggio ICMP di errore?", a: ["Niente","Una copia dell'header IP del pacchetto scartato + primi 8 byte del payload","La chiave di cifratura","Il MAC address"], correct: 1, explain: "Così il mittente del pacchetto scartato può capire a quale connessione/processo si riferiva (i primi 8 byte di TCP/UDP includono le porte sorgente e destinazione)."}
  ]
};
