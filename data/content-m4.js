// Module 4 - Esame di Stato (1-6)
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m4c1 = {
  title: "Cablaggio strutturato",
  body: `
    <p>Il <span class="term">cablaggio strutturato</span> è un sistema standardizzato di cablaggio di un edificio o un campus, progettato per supportare i servizi di rete (dati, voce, video) in modo organizzato e flessibile.</p>

    <h2 id="standard">Standard</h2>
    <ul>
      <li><strong>EIA/TIA 568</strong> (USA)</li>
      <li><strong>ISO/IEC 11801</strong> (internazionale)</li>
      <li><strong>EN 50173</strong> (Europa)</li>
    </ul>

    <h2 id="sottosistemi">Sottosistemi del cablaggio</h2>

    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🏢</div>
        <div class="callout-title">Cablaggio di campus</div>
        <div class="callout-text">Collega edifici diversi nello stesso campus. Tipicamente fibra ottica.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🏬</div>
        <div class="callout-title">Cablaggio di edificio (dorsale verticale)</div>
        <div class="callout-text">Collega l'armadio di edificio (BD) ai vari armadi di piano (FD).</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🚪</div>
        <div class="callout-title">Cablaggio di piano (orizzontale)</div>
        <div class="callout-text">Dall'armadio di piano (FD) alle prese utente (TO).</div>
      </div>
      <div class="callout">
        <div class="callout-icon">💻</div>
        <div class="callout-title">Cablaggio di postazione</div>
        <div class="callout-text">Cavo patch dalla presa al PC dell'utente.</div>
      </div>
    </div>

    <h2 id="armadi">Armadi (Distributors)</h2>
    <ul>
      <li><strong>CD (Campus Distributor)</strong>: armadio centrale del campus.</li>
      <li><strong>BD (Building Distributor)</strong>: armadio di edificio.</li>
      <li><strong>FD (Floor Distributor)</strong>: armadio di piano.</li>
      <li><strong>TO (Telecommunication Outlet)</strong>: presa di lavoro/utente.</li>
    </ul>

    <h2 id="cavi">Tipologie di cavi</h2>
    <table>
      <thead><tr><th>Categoria</th><th>Velocità max</th><th>Frequenza</th></tr></thead>
      <tbody>
        <tr><td>Cat 5e</td><td>1 Gbps</td><td>100 MHz</td></tr>
        <tr><td>Cat 6</td><td>1 Gbps (10 Gbps a 55m)</td><td>250 MHz</td></tr>
        <tr><td>Cat 6a</td><td>10 Gbps</td><td>500 MHz</td></tr>
        <tr><td>Cat 7</td><td>10 Gbps</td><td>600 MHz</td></tr>
        <tr><td>Cat 8</td><td>40 Gbps (30m)</td><td>2000 MHz</td></tr>
      </tbody>
    </table>

    <h2 id="schermatura">Schermatura</h2>
    <ul>
      <li><strong>UTP</strong> (Unshielded Twisted Pair): non schermato.</li>
      <li><strong>FTP/F-UTP</strong>: schermo globale in foglio di alluminio.</li>
      <li><strong>STP/S-FTP</strong>: schermatura su singole coppie + globale.</li>
    </ul>

    <h2 id="fibra">Fibra ottica</h2>
    <ul>
      <li><strong>Multimodale (MMF)</strong>: distanze brevi (≤ 550m), LED economici.</li>
      <li><strong>Monomodale (SMF)</strong>: distanze lunghe (km), laser, costo maggiore.</li>
    </ul>

    <h2 id="vantaggi">Vantaggi del cablaggio strutturato</h2>
    <ul>
      <li><strong>Modularità</strong>: si modifica e amplia facilmente.</li>
      <li><strong>Indipendenza dall'applicazione</strong>: stesso cablaggio per LAN, telefonia, videosorveglianza.</li>
      <li><strong>Documentabilità</strong>: ogni cavo è tracciato e identificato.</li>
      <li><strong>Manutenzione</strong>: troubleshooting più rapido.</li>
    </ul>
  `,
  quiz: [
    {q: "Cos'è il cablaggio strutturato?", a: ["Un protocollo di rete","Un sistema standardizzato di cablaggio di un edificio per supportare servizi di rete","Un firewall","Un cifrario"], correct: 1, explain: "È un sistema organizzato e standard di cablaggio."},
    {q: "Quale è uno standard del cablaggio strutturato?", a: ["RFC 791","EIA/TIA 568","HTTP","TCP/IP"], correct: 1, explain: "EIA/TIA 568 è il principale standard americano."},
    {q: "Cosa è il FD?", a: ["Floppy Disk","Floor Distributor (armadio di piano)","File Driver","Firewall Device"], correct: 1, explain: "FD = Floor Distributor, l'armadio di piano."},
    {q: "Una categoria Cat 6a supporta:", a: ["100 Mbps","1 Gbps","10 Gbps","100 Gbps"], correct: 2, explain: "Cat 6a supporta 10 Gbps fino a 100 metri."},
    {q: "Differenza tra fibra monomodale e multimodale:", a: ["Sono identiche","Multimodale per distanze brevi, monomodale per distanze lunghe","Monomodale è solo per voce","Multimodale supporta solo USB"], correct: 1, explain: "MMF: distanze brevi con LED economici; SMF: distanze lunghe con laser."},
    {q: "Cosa significa UTP?", a: ["Unshielded Twisted Pair","Universal Terminal Protocol","Ultra Fast Pair","Unified Twisted Path"], correct: 0, explain: "UTP = Unshielded Twisted Pair, doppino non schermato."}
  ]
};

window.CHAPTERS.m4c2 = {
  title: "Struttura e classificazione degli indirizzi IP",
  body: `
    <p>Un indirizzo IPv4 è una sequenza di <strong>32 bit</strong>, scritta in <strong>notazione decimale puntata</strong> (4 ottetti separati da punto).</p>
    <code class="formula">192.168.1.10
binario: 11000000.10101000.00000001.00001010</code>

    <h2 id="parti">Parti dell'indirizzo</h2>
    <p>Ogni IP è diviso in due parti:</p>
    <ul>
      <li><strong>NET-ID</strong> (parte di rete): identifica la rete.</li>
      <li><strong>INTERFACE-ID</strong> (parte host): identifica l'interfaccia all'interno della rete.</li>
    </ul>
    <p>La separazione è data dalla <strong>subnet mask</strong> (in CIDR <code>/n</code> = primi <em>n</em> bit a 1).</p>

    <h2 id="classful">Indirizzamento classful (storico, RFC 791)</h2>
    <table>
      <thead><tr><th>Classe</th><th>Range</th><th>Default mask</th><th>Reti</th><th>Host/rete</th></tr></thead>
      <tbody>
        <tr><td>A</td><td>0.0.0.0 - 127.255.255.255</td><td>/8</td><td>128</td><td>16,7M</td></tr>
        <tr><td>B</td><td>128.0.0.0 - 191.255.255.255</td><td>/16</td><td>16,4K</td><td>65K</td></tr>
        <tr><td>C</td><td>192.0.0.0 - 223.255.255.255</td><td>/24</td><td>2M</td><td>254</td></tr>
        <tr><td>D (multicast)</td><td>224.0.0.0 - 239.255.255.255</td><td>—</td><td>—</td><td>—</td></tr>
        <tr><td>E (riservata)</td><td>240.0.0.0 - 255.255.255.255</td><td>—</td><td>—</td><td>—</td></tr>
      </tbody>
    </table>

    <h2 id="cidr">Indirizzamento classless (CIDR, RFC 1519)</h2>
    <p>Il <strong>CIDR</strong> (Classless Inter-Domain Routing) abbandona le classi: la maschera può avere qualunque lunghezza. Notazione <code>192.168.1.0/24</code>. Permette uso più efficiente degli IP.</p>

    <h2 id="indirizzi-rete">Indirizzo di rete e di broadcast</h2>
    <ul>
      <li><strong>Indirizzo di rete</strong>: tutti i bit host a <code>0</code> → identifica la rete (es. <code>192.168.1.0/24</code>).</li>
      <li><strong>Indirizzo di broadcast</strong>: tutti i bit host a <code>1</code> → invia a tutti gli host della rete (es. <code>192.168.1.255/24</code>).</li>
      <li><strong>Indirizzi assegnabili</strong>: tutti gli altri (in /24, da .1 a .254 → 254 host).</li>
    </ul>

    <h2 id="subnet">Subnet mask</h2>
    <p>Maschera che separa NET-ID e INTERFACE-ID. Esempi:</p>
    <ul>
      <li><code>/24</code> = <code>255.255.255.0</code> → 256 indirizzi, 254 host utili.</li>
      <li><code>/25</code> = <code>255.255.255.128</code> → 128 indirizzi, 126 host utili.</li>
      <li><code>/30</code> = <code>255.255.255.252</code> → 4 indirizzi, 2 host utili (link point-to-point).</li>
    </ul>
  `,
  quiz: [
    {q: "Quanti bit ha un indirizzo IPv4?", a: ["16","32","64","128"], correct: 1, explain: "IPv4 = 32 bit, organizzati in 4 ottetti."},
    {q: "Le due parti di un IP sono:", a: ["Rete (NET-ID) e host (INTERFACE-ID)","Mittente e destinatario","TCP e UDP","Header e payload"], correct: 0, explain: "Ogni IP ha NET-ID (parte di rete) e INTERFACE-ID (parte host)."},
    {q: "L'IP 192.168.1.0/24 con tutti i bit host a 0 è:", a: ["Un host","L'indirizzo di rete","L'indirizzo di broadcast","Un IP pubblico"], correct: 1, explain: "Bit host tutti a 0 = indirizzo di rete."},
    {q: "Una rete /24 ha quanti indirizzi assegnabili?", a: ["256","254","255","253"], correct: 1, explain: "256 totali - 1 rete - 1 broadcast = 254 host."},
    {q: "L'indirizzo di broadcast di 192.168.1.0/24 è:", a: ["192.168.1.0","192.168.1.1","192.168.1.255","192.168.1.254"], correct: 2, explain: "Broadcast = bit host tutti a 1 = 192.168.1.255."},
    {q: "Cosa significa CIDR?", a: ["Classless Inter-Domain Routing","Classful IP Database Routing","Cipher Internet Data Resolver","Common IP Data Resource"], correct: 0, explain: "CIDR = Classless Inter-Domain Routing (RFC 1519)."},
    {q: "Una rete /30 ha quanti host utili?", a: ["1","2","4","6"], correct: 1, explain: "/30 = 4 indirizzi totali - rete - broadcast = 2 host (perfetto per link point-to-point)."},
    {q: "Quale di questi è una rete di classe C?", a: ["10.0.0.0","172.16.0.0","192.168.5.0","224.0.0.1"], correct: 2, explain: "192.168.5.0 inizia con 192-223 → classe C."}
  ]
};

window.CHAPTERS.m4c3 = {
  title: "Indirizzi IP speciali",
  body: `
    <p>Alcuni intervalli di indirizzi IPv4 hanno significati speciali e <strong>non sono assegnabili</strong> a interfacce ordinarie.</p>

    <h2 id="loopback">Loopback (127.0.0.0/8)</h2>
    <p>Riservata al <strong>traffico interno della macchina stessa</strong>. <code>127.0.0.1</code> (localhost) viene usato per testare lo stack TCP/IP locale.</p>

    <h2 id="privati">Indirizzi privati (RFC 1918)</h2>
    <ul>
      <li><code>10.0.0.0/8</code></li>
      <li><code>172.16.0.0/12</code></li>
      <li><code>192.168.0.0/16</code></li>
    </ul>

    <h2 id="zero">Indirizzi 'all zeros'</h2>
    <ul>
      <li><code>0.0.0.0</code> — "questo host", usato dall'host quando non conosce ancora il proprio IP (es. richiesta DHCP DISCOVER).</li>
      <li><code>0.0.0.0/0</code> — rotta di default in routing.</li>
    </ul>

    <h2 id="broadcast">Broadcast limitato</h2>
    <p><code>255.255.255.255</code>: viene inviato a <strong>tutti gli host della stessa rete fisica locale</strong>; non viene inoltrato dai router.</p>

    <h2 id="apipa">APIPA / Link-local (169.254.0.0/16)</h2>
    <p>L'host si autoassegna un indirizzo in questo range se non riesce a contattare un server DHCP. Comunicazione solo locale, niente routing.</p>

    <h2 id="multicast">Multicast (224.0.0.0/4)</h2>
    <p>Indirizzi di gruppo che permettono a un mittente di inviare un pacchetto a <strong>più destinatari</strong> contemporaneamente. Esempi:</p>
    <ul>
      <li><code>224.0.0.1</code> → tutti gli host della LAN</li>
      <li><code>224.0.0.2</code> → tutti i router</li>
      <li><code>224.0.0.5</code> → router OSPF</li>
    </ul>

    <h2 id="riservati">Riservati / Class E (240.0.0.0/4)</h2>
    <p>Riservati per usi futuri o sperimentali, non assegnabili a host.</p>

    <h2 id="documentation">Documentation (RFC 5737)</h2>
    <p>Per esempi e documentazione: <code>192.0.2.0/24</code>, <code>198.51.100.0/24</code>, <code>203.0.113.0/24</code>.</p>
  `,
  quiz: [
    {q: "127.0.0.1 è:", a: ["Un IP pubblico","L'indirizzo loopback (localhost)","Un broadcast","Un multicast"], correct: 1, explain: "127.0.0.1 è il loopback per testare lo stack TCP/IP locale."},
    {q: "Quale indirizzo viene usato come 'rotta di default'?", a: ["127.0.0.1","255.255.255.255","0.0.0.0/0","224.0.0.1"], correct: 2, explain: "0.0.0.0/0 è la rotta di default che cattura tutto il traffico non corrispondente ad altre rotte."},
    {q: "255.255.255.255 è:", a: ["Loopback","Broadcast limitato (a tutti gli host della rete locale)","Multicast","Network address"], correct: 1, explain: "255.255.255.255 è il broadcast limitato; non viene routato."},
    {q: "Gli indirizzi 169.254.0.0/16 sono:", a: ["Pubblici","APIPA / Link-local: autoassegnati se DHCP fallisce","Loopback","Multicast"], correct: 1, explain: "Range APIPA: l'host si auto-assegna un indirizzo in caso di fallimento DHCP."},
    {q: "Indirizzi multicast iniziano con:", a: ["10.x.x.x","127.x.x.x","224-239 (224.0.0.0/4)","255.x.x.x"], correct: 2, explain: "Il multicast è 224.0.0.0/4 (224-239)."},
    {q: "Quale IP viene usato dall'host nel DHCP DISCOVER?", a: ["192.168.0.1","127.0.0.1","0.0.0.0","255.255.255.255"], correct: 2, explain: "L'host non ha ancora un IP, quindi usa 0.0.0.0 come mittente."}
  ]
};

window.CHAPTERS.m4c4 = {
  title: "FLSM e VLSM",
  body: `
    <p>Tecniche di <strong>subnetting</strong> che dividono una rete in più sottoreti.</p>

    <h2 id="flsm">FLSM (Fixed-Length Subnet Mask)</h2>
    <p>Tutte le sottoreti hanno la <strong>stessa subnet mask</strong>. Semplice ma può sprecare IP se le sottoreti hanno esigenze diverse.</p>

    <h3 id="esempio-flsm">Esempio</h3>
    <p>Rete <code>192.168.10.0/24</code> divisa in 4 sottoreti uguali → si "prendono" 2 bit dall'host part:</p>
    <ul>
      <li><code>192.168.10.0/26</code> → 64 indirizzi (62 host)</li>
      <li><code>192.168.10.64/26</code> → 64 indirizzi (62 host)</li>
      <li><code>192.168.10.128/26</code> → 64 indirizzi (62 host)</li>
      <li><code>192.168.10.192/26</code> → 64 indirizzi (62 host)</li>
    </ul>
    <p>Numero di sottoreti = <code>2<sup>n</sup></code> (con n bit "presi"); host per sottorete = <code>2<sup>m</sup> - 2</code> (con m bit residui).</p>

    <h2 id="vlsm">VLSM (Variable-Length Subnet Mask)</h2>
    <p>Le sottoreti possono avere <strong>maschere di lunghezza diversa</strong>: si dimensiona ogni sottorete in base alle reali esigenze. <strong>Sfrutta meglio</strong> gli indirizzi.</p>

    <h3 id="procedura">Procedura</h3>
    <ol>
      <li>Si ordinano le sottoreti per <strong>numero di host</strong> richiesto (decrescente).</li>
      <li>Si calcola la subnet mask minima per ognuna: <code>m = ⌈log<sub>2</sub>(host + 2)⌉</code> bit di host.</li>
      <li>Si assegnano partendo dalla più grande, poi le successive.</li>
    </ol>

    <h3 id="esempio-vlsm">Esempio VLSM</h3>
    <p>Da <code>192.168.10.0/24</code> servono: 100 host, 50 host, 25 host, 2 host (link).</p>
    <ul>
      <li>100 host → /25 (126 utili) → <code>192.168.10.0/25</code></li>
      <li>50 host → /26 (62 utili) → <code>192.168.10.128/26</code></li>
      <li>25 host → /27 (30 utili) → <code>192.168.10.192/27</code></li>
      <li>2 host → /30 (2 utili) → <code>192.168.10.224/30</code></li>
    </ul>
    <p>VLSM minimizza lo spreco di indirizzi.</p>

    <h2 id="confronto">Confronto FLSM vs VLSM</h2>
    <table>
      <thead><tr><th>Caratteristica</th><th>FLSM</th><th>VLSM</th></tr></thead>
      <tbody>
        <tr><td>Subnet mask</td><td>Tutte uguali</td><td>Variabili per sottorete</td></tr>
        <tr><td>Sfruttamento IP</td><td>Subottimale</td><td>Ottimale</td></tr>
        <tr><td>Complessità</td><td>Bassa</td><td>Media</td></tr>
        <tr><td>Routing</td><td>Funziona con classful</td><td>Richiede classless (CIDR)</td></tr>
      </tbody>
    </table>
  `,
  quiz: [
    {q: "FLSM significa:", a: ["Free-Length Subnet Mask","Fixed-Length Subnet Mask","Full-Length Static Method","Filter-Level Subnet Manager"], correct: 1, explain: "FLSM = Fixed-Length Subnet Mask: tutte le sottoreti con la stessa maschera."},
    {q: "VLSM significa:", a: ["Virtual Local Subnet Method","Variable-Length Subnet Mask","Very Large Subnet Memory","Virtual LAN Subnet Manager"], correct: 1, explain: "VLSM = Variable-Length Subnet Mask: maschere diverse per sottorete."},
    {q: "Per dividere /24 in 4 sottoreti uguali con FLSM, quale maschera si usa?", a: ["/24","/25","/26","/27"], correct: 2, explain: "Servono 2 bit aggiuntivi: 24+2 = /26."},
    {q: "Quanti host ha una /26?", a: ["32","62","64","126"], correct: 1, explain: "/26 = 64 indirizzi - 2 (rete + broadcast) = 62 host utili."},
    {q: "VLSM è preferibile a FLSM perché:", a: ["È più veloce","Sfrutta meglio gli indirizzi adattando la maschera alle esigenze","È più semplice","Non richiede router"], correct: 1, explain: "VLSM minimizza lo spreco assegnando maschere diverse in base ai bisogni reali."},
    {q: "Per 100 host quale maschera è minima?", a: ["/24","/25","/26","/27"], correct: 1, explain: "/25 = 126 host utili: minima sufficiente per 100."},
    {q: "Per un link point-to-point tra due router quale maschera è ottimale?", a: ["/24","/27","/28","/30"], correct: 3, explain: "/30 dà 2 host utili: esattamente quelli necessari per i due router."}
  ]
};

window.CHAPTERS.m4c5 = {
  title: "Routing statico e dinamico",
  body: `
    <p>Il <span class="term">routing</span> è il processo con cui i router decidono il percorso che un pacchetto deve seguire per raggiungere la sua destinazione, consultando una <strong>tabella di routing</strong>.</p>

    <h2 id="tabella">Tabella di routing</h2>
    <p>Per ogni rete di destinazione contiene:</p>
    <ul>
      <li>Indirizzo di rete + maschera.</li>
      <li><strong>Next-hop</strong>: IP del prossimo router.</li>
      <li><strong>Interfaccia</strong> di uscita.</li>
      <li><strong>Metrica</strong> (costo) della rotta.</li>
    </ul>

    <h2 id="statico">Routing statico</h2>
    <p>Le rotte sono <strong>configurate manualmente</strong> dall'amministratore.</p>
    <p>Comando Cisco:</p>
    <code class="formula">ip route 192.168.2.0 255.255.255.0 10.0.0.2</code>

    <h3 id="vantaggi-statico">Vantaggi</h3>
    <ul>
      <li>Nessun overhead (zero traffico di controllo).</li>
      <li>Sicurezza: nessun aggiornamento via rete.</li>
      <li>Predittibile.</li>
    </ul>

    <h3 id="svantaggi-statico">Svantaggi</h3>
    <ul>
      <li>Non scalabile: in reti grandi è impraticabile.</li>
      <li>Non si adatta automaticamente a guasti o cambi di topologia.</li>
    </ul>

    <h2 id="dinamico">Routing dinamico</h2>
    <p>I router si scambiano informazioni tramite un <strong>protocollo di routing</strong> e aggiornano automaticamente le tabelle.</p>

    <h3 id="categorie">Categorie di protocolli</h3>

    <h4 id="distance-vector">Distance Vector</h4>
    <p>Ogni router invia ai vicini la propria tabella. Decisioni basate sulla distanza (numero di hop). Esempi: <strong>RIP</strong>, <strong>RIPv2</strong>, <strong>EIGRP</strong>.</p>

    <h4 id="link-state">Link State</h4>
    <p>Ogni router conosce l'intera topologia della rete e calcola il percorso ottimo (algoritmo di Dijkstra). Esempi: <strong>OSPF</strong>, <strong>IS-IS</strong>.</p>

    <h4 id="path-vector">Path Vector</h4>
    <p>Usato tra Autonomous System (AS) di Internet. Esempio: <strong>BGP</strong>.</p>

    <h2 id="igp-egp">IGP vs EGP</h2>
    <ul>
      <li><strong>IGP</strong> (Interior Gateway Protocol): all'interno di un AS. Es. RIP, OSPF, EIGRP.</li>
      <li><strong>EGP</strong> (Exterior Gateway Protocol): tra AS diversi. Es. BGP.</li>
    </ul>

    <h2 id="confronto">Confronto statico vs dinamico</h2>
    <table>
      <thead><tr><th></th><th>Statico</th><th>Dinamico</th></tr></thead>
      <tbody>
        <tr><td>Configurazione</td><td>Manuale</td><td>Automatica</td></tr>
        <tr><td>Adattamento ai guasti</td><td>No</td><td>Sì</td></tr>
        <tr><td>Overhead</td><td>Nessuno</td><td>Traffico di controllo</td></tr>
        <tr><td>Scalabilità</td><td>Bassa</td><td>Alta</td></tr>
        <tr><td>Quando usarlo</td><td>Reti piccole, link stabili</td><td>Reti medio-grandi</td></tr>
      </tbody>
    </table>
  `,
  quiz: [
    {q: "Cos'è il routing?", a: ["Cifrare i pacchetti","Determinare il percorso che un pacchetto deve seguire per raggiungere la destinazione","Filtrare il traffico","Risolvere nomi"], correct: 1, explain: "Il routing è il processo di scelta del percorso per i pacchetti."},
    {q: "Cosa contiene una tabella di routing?", a: ["Solo IP","Rete destinazione, next-hop, interfaccia, metrica","Password","Certificati"], correct: 1, explain: "Per ogni destinazione: indirizzo di rete + maschera, next-hop, interfaccia, metrica."},
    {q: "Routing statico:", a: ["Si aggiorna automaticamente","Le rotte sono configurate manualmente","Usa OSPF","Richiede sempre Internet"], correct: 1, explain: "Le rotte statiche sono inserite manualmente dall'amministratore."},
    {q: "Quale di questi è un protocollo Distance Vector?", a: ["OSPF","IS-IS","RIP","BGP"], correct: 2, explain: "RIP è un classico protocollo Distance Vector."},
    {q: "Quale di questi è un protocollo Link State?", a: ["RIP","OSPF","EIGRP","BGP"], correct: 1, explain: "OSPF è il principale protocollo Link State."},
    {q: "Cosa significa IGP?", a: ["Internal Gateway Path","Interior Gateway Protocol","Internet Group Protocol","International Gateway Protocol"], correct: 1, explain: "IGP = Interior Gateway Protocol, usato all'interno di un AS."},
    {q: "BGP è:", a: ["Un IGP","Un protocollo Path Vector usato tra AS","Un cifrario","Un proxy"], correct: 1, explain: "BGP è un Path Vector usato come EGP tra AS di Internet."},
    {q: "Vantaggio del routing statico:", a: ["Si adatta automaticamente","Niente overhead, predittibile","Funziona solo in reti grandi","Sostituisce DHCP"], correct: 1, explain: "Niente traffico di controllo, comportamento prevedibile."},
    {q: "Quando preferire routing dinamico?", a: ["Reti molto piccole","Reti medio-grandi che cambiano spesso","Quando la sicurezza è critica","Mai"], correct: 1, explain: "Il dinamico si adatta automaticamente ai cambiamenti, ideale per reti grandi."}
  ]
};

window.CHAPTERS.m4c6 = {
  title: "Protocollo IPv6",
  body: `
    <p><span class="term">IPv6</span> è il successore di IPv4, progettato per superare i limiti di indirizzamento di quest'ultimo.</p>

    <h2 id="motivazione">Perché IPv6?</h2>
    <ul>
      <li>IPv4 ha solo 2³² ≈ 4 miliardi di indirizzi → <strong>esauriti</strong>.</li>
      <li>IPv6 usa <strong>128 bit</strong> → 2¹²⁸ ≈ 3.4·10³⁸ indirizzi (≈ 7·10²⁸ per persona).</li>
      <li>Header semplificato → routing più efficiente.</li>
      <li>Sicurezza nativa (IPSec integrato).</li>
      <li>Niente bisogno di NAT.</li>
    </ul>

    <h2 id="formato">Formato dell'indirizzo</h2>
    <p>128 bit, divisi in 8 gruppi da 16 bit (4 cifre esadecimali) separati da <code>:</code>:</p>
    <code class="formula">2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>

    <h3 id="abbreviazioni">Regole di abbreviazione</h3>
    <ul>
      <li>Gli zeri iniziali in ciascun gruppo si possono omettere: <code>0db8 → db8</code>.</li>
      <li>Una sequenza di gruppi tutti zero si comprime con <code>::</code>, ma <strong>una sola volta</strong> per indirizzo.</li>
    </ul>
    <p><code>2001:0db8:0000:0000:0000:0000:0000:0001</code> → <code>2001:db8::1</code></p>

    <h2 id="prefisso">Prefisso e Interface ID</h2>
    <p>Notazione <code>indirizzo/lunghezza_prefisso</code>. Tipicamente i primi <strong>64 bit</strong> sono prefisso di rete, gli ultimi <strong>64 bit</strong> sono Interface ID.</p>

    <h2 id="tipi-indirizzi">Tipologie di indirizzi</h2>
    <ul>
      <li><strong>Unicast</strong>: una sola interfaccia.
        <ul>
          <li><strong>Global Unicast</strong> (<code>2000::/3</code>): equivalente IPv6 degli IP pubblici.</li>
          <li><strong>Link-local</strong> (<code>fe80::/10</code>): valido solo sulla rete locale.</li>
          <li><strong>Unique Local</strong> (<code>fc00::/7</code>): equivalente degli IP privati IPv4.</li>
        </ul>
      </li>
      <li><strong>Multicast</strong> (<code>ff00::/8</code>): più destinatari.</li>
      <li><strong>Anycast</strong>: stesso indirizzo su più interfacce; il pacchetto va alla "più vicina".</li>
    </ul>
    <p><strong>Niente broadcast in IPv6</strong>: si usa il multicast <code>ff02::1</code> (tutti i nodi della rete locale).</p>

    <h2 id="indirizzi-speciali">Indirizzi speciali</h2>
    <ul>
      <li><code>::/128</code> — non specificato.</li>
      <li><code>::1/128</code> — loopback (equivalente a 127.0.0.1).</li>
      <li><code>ff02::1</code> — tutti i nodi link-local.</li>
      <li><code>ff02::2</code> — tutti i router link-local.</li>
    </ul>

    <h2 id="header">Header IPv6</h2>
    <p>Header <strong>fissato a 40 byte</strong>, semplificato rispetto a IPv4 (niente checksum, fragment offset, ...). Eventuali opzioni nei <strong>extension headers</strong>.</p>

    <h2 id="autoconfigurazione">Autoconfigurazione e calcolo Link-Local da MAC</h2>
    <p>IPv6 supporta <strong>SLAAC</strong> (Stateless Address Autoconfiguration): l'host si configura un IP a partire dal prefisso annunciato dal router (Router Advertisement).</p>

    <div class="info-box key">
      <h4>🔑 Calcolo dell'indirizzo Link-Local dal MAC (EUI-64)</h4>
      <p>Ogni interfaccia ha automaticamente un IP <code>fe80::/64</code> generato così:</p>
      <ol>
        <li>Prendi il MAC a 48 bit, dividilo in due metà da 24 bit</li>
        <li>Inserisci <code>FFFE</code> in mezzo (16 bit) → ottieni un Interface ID a 64 bit (EUI-64)</li>
        <li><strong>Inverti il 7° bit</strong> della prima metà (Universal/Local bit)</li>
        <li>Anteponi il prefisso <code>fe80::</code></li>
      </ol>
    </div>

    <p><strong>Esempio</strong>: MAC <code>00:0D:BD:44:6E:2B</code></p>
    <pre class="formula">
MAC:                 00:0D:BD : 44:6E:2B
Splitting:           00:0D:BD     44:6E:2B
Inserting FFFE:      00:0D:BD:FF:FE:44:6E:2B
Invert 7th bit:      00 = 0000 0000  →  0000 0010 = 02
Result EUI-64:       02:0D:BD:FF:FE:44:6E:2B
Link-Local:          fe80::020d:bdff:fe44:6e2b</pre>

    <pre class="mermaid">
flowchart LR
  M[MAC 48 bit<br/>00:0D:BD:44:6E:2B] --> S[Split 24+24]
  S --> F[Inserisci FFFE<br/>00:0D:BD:FF:FE:44:6E:2B]
  F --> B[Inverti 7° bit<br/>02:0D:BD:FF:FE:44:6E:2B]
  B --> L[Aggiungi prefix fe80::<br/>fe80::020d:bdff:fe44:6e2b]
    </pre>

    <h2 id="anycast">Anycast in dettaglio</h2>
    <p>L'<span class="term">anycast</span> assegna lo <strong>stesso indirizzo</strong> a più nodi. Il routing inoltra il pacchetto al nodo "<strong>più vicino</strong>" (in termini di metrica BGP/OSPF). Uso tipico:</p>
    <ul>
      <li><strong>DNS root server</strong>: i 13 root server logici sono in realtà centinaia di server fisici sparsi nel mondo, tutti rispondono allo stesso IP</li>
      <li><strong>CDN</strong> (Cloudflare, Google): l'utente raggiunge il nodo geograficamente più vicino senza saperlo</li>
      <li><strong>Bilanciamento del carico geografico</strong></li>
    </ul>

    <h2 id="struttura-llu-ulu-gu">Struttura LLU / ULU / GU</h2>
    <table>
      <thead><tr><th>Tipo</th><th>Prefix</th><th>Network prefix (bit)</th><th>Interface ID (bit)</th></tr></thead>
      <tbody>
        <tr><td>Link-Local Unicast (LLU)</td><td>fe80::/10</td><td>64 (10 fissi + 54 zero)</td><td>64 (EUI-64)</td></tr>
        <tr><td>Unique Local Unicast (ULU)</td><td>fc00::/7</td><td>64 (7 fissi + 1 L flag + 40 Global ID + 16 Subnet)</td><td>64</td></tr>
        <tr><td>Global Unicast (GU)</td><td>2000::/3</td><td>48-64 (assegnato dall'ISP)</td><td>64</td></tr>
      </tbody>
    </table>
    <p>Il <strong>Global ID</strong> della ULU è statisticamente unico → niente collisioni anche se due reti private si fondono per merge aziendale.</p>

    <h2 id="transizione">Transizione IPv4 → IPv6</h2>
    <ul>
      <li><strong>Dual stack</strong>: i nodi supportano entrambi.</li>
      <li><strong>Tunneling</strong>: pacchetti IPv6 incapsulati in IPv4.</li>
      <li><strong>Translation (NAT64)</strong>: tradurre tra i due protocolli.</li>
    </ul>
  `,
  quiz: [
    {q: "Quanti bit ha un indirizzo IPv6?", a: ["32","64","128","256"], correct: 2, explain: "IPv6 = 128 bit (vs 32 di IPv4)."},
    {q: "In che notazione si scrive un IPv6?", a: ["Decimale puntata","8 gruppi da 16 bit in esadecimale, separati da ':'","Binario","Solo lettere"], correct: 1, explain: "8 gruppi di 4 cifre esadecimali separati da ':'. Es. 2001:db8::1."},
    {q: "La compressione '::' si può usare:", a: ["Quante volte si vuole","Una sola volta per indirizzo","Mai","Solo all'inizio"], correct: 1, explain: "'::' comprime una sequenza consecutiva di gruppi zero, una sola volta per indirizzo."},
    {q: "L'indirizzo loopback IPv6 è:", a: ["::1","::","ff02::1","fe80::1"], correct: 0, explain: "::1/128 è il loopback IPv6 (equivalente a 127.0.0.1)."},
    {q: "IPv6 ha il broadcast?", a: ["Sì come IPv4","No, è sostituito dal multicast","Sì ma è limitato","Solo in link-local"], correct: 1, explain: "IPv6 NON ha broadcast: si usa il multicast ff02::1 per tutti i nodi link-local."},
    {q: "Gli indirizzi link-local IPv6 iniziano con:", a: ["2000::","fe80::","ff00::","fc00::"], correct: 1, explain: "Link-local: fe80::/10."},
    {q: "Cos'è SLAAC?", a: ["Un cifrario","Stateless Address Autoconfiguration: l'host si configura l'IP autonomamente","Un protocollo di routing","Un firewall"], correct: 1, explain: "SLAAC permette agli host di autoconfigurarsi un IP partendo dal prefisso annunciato."},
    {q: "Quale tecnica permette ai nodi di supportare entrambi IPv4 e IPv6?", a: ["NAT","Dual stack","Encryption","DHCP"], correct: 1, explain: "Il dual stack permette ai dispositivi di gestire contemporaneamente entrambi i protocolli."},
    {q: "Header IPv6 ha dimensione:", a: ["20 byte","40 byte fissi","Variabile","60 byte"], correct: 1, explain: "L'header IPv6 base è di 40 byte fissi (semplificato rispetto a IPv4)."}
  ]
};
