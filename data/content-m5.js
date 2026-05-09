// Module 5 — Casi di studio (esercizi tipo Esame di Stato)
window.CHAPTERS = window.CHAPTERS || {};

// ================================================================
// m5c1 — Caso LogiPack
// ================================================================
window.CHAPTERS.m5c1 = {
  title: "Caso LogiPack — Soluzione completa",
  body: `
    <div class="info-box tip"><h4>📌 Traccia</h4><p><strong>LogiPack S.r.l.</strong> — azienda di confezionamento industriale e logistica articolata in 4 reparti su 2 edifici distanti 300 m. Progettare l'infrastruttura di rete LAN, l'indirizzamento IP, il routing e i servizi.</p></div>

    <h2 id="dispositivi">Distribuzione dispositivi</h2>
    <p><strong>Edificio principale</strong> (router connesso direttamente a Internet):</p>
    <ul>
      <li><strong>Amministrazione</strong>: 8 PC + 8 telefoni VoIP + 2 stampanti di rete = 18 host cablati</li>
      <li><strong>Dirigenza</strong>: 4 PC + 4 telefoni VoIP + 1 stampante = 9 host cablati</li>
    </ul>
    <p><strong>Edificio secondario</strong> (a 300 m, router collegato al principale):</p>
    <ul>
      <li><strong>Produzione</strong>: 12 PC + 6 telefoni VoIP + 2 stampanti = 20 host cablati</li>
      <li><strong>Magazzino</strong>: 2 PC + 1 telefono VoIP + WLAN per dispositivi mobili (palmari/tablet)</li>
    </ul>

    <h2 id="topologia">Topologia logica</h2>
    <pre class="mermaid">
flowchart TB
  subgraph EDIF1[🏢 Edificio Principale]
    R1[Router 1<br/>FTTH 1G/300M]
    SW_A[Switch Amministrazione<br/>PoE+ 8GE]
    SW_D[Switch Dirigenza<br/>PoE+ 6GE]
    SW_A -.uplink Cat 6A 10GE.- R1
    SW_D -.uplink Cat 6A 10GE.- R1
  end
  subgraph EDIF2[🏗️ Edificio Secondario - 300 m]
    R2[Router 2]
    SW_P[Switch Produzione<br/>PoE+ 16GE]
    SW_M[Switch Magazzino<br/>PoE+ + 2.5GE]
    AP[Access Point<br/>Wi-Fi 5 80MHz]
    SW_P -.uplink Cat 6A.- R2
    SW_M -.uplink Cat 6A.- R2
    SW_M --2.5GBASE-T PoE+--- AP
  end
  R1 ==SFP+ 10GBASE-SR<br/>fibra OM3 LC duplex==> R2
  R1 -- ONT FTTH --> NET((🌐 Internet))
    </pre>

    <h2 id="mezzi">Mezzi trasmissivi e scelta cavi</h2>
    <h3 id="dorsale">Dorsale tra i due edifici (300 m)</h3>
    <p>Il rame ha limite ~100 m → <strong>fibra ottica obbligatoria</strong>:</p>
    <ul>
      <li>Slot <strong>SFP+</strong> sui due router</li>
      <li>Transceiver <strong>10GBASE-SR</strong></li>
      <li>Cavo <strong>fibra multimodale OM3</strong> con connettori <strong>LC duplex</strong></li>
      <li>Capacità: <strong>10 Gbit/s</strong> (sovradimensionata vs WAN 1G/300M ma lascia margine futuro)</li>
    </ul>

    <h3 id="reparti">Cablaggio interno reparti</h3>
    <p>Tratte interne &lt; 100 m → <strong>rame</strong>:</p>
    <ul>
      <li><strong>PC e stampanti</strong> (interfaccia GE): cavo <strong>Cat 5e</strong> su porte GE</li>
      <li><strong>Telefoni VoIP</strong> (interfaccia FE 100BASE-TX): cavo <strong>Cat 5e</strong> su porte GE <strong>PoE</strong> (alimentazione 802.3af)</li>
      <li><strong>Access Point Wi-Fi 5</strong> (può superare 1 Gbps): cavo <strong>Cat 6</strong> su porta <strong>2.5GBASE-T PoE+</strong> (alimentazione 802.3at)</li>
      <li><strong>Uplink switch → router</strong>: cavo <strong>Cat 6A</strong> su porta <strong>10GBASE-T</strong></li>
    </ul>

    <h3 id="wlan">Rete WLAN del Magazzino</h3>
    <p>Caratteristiche scelte:</p>
    <ul>
      <li>Standard: <strong>IEEE 802.11ac (Wi-Fi 5)</strong> in banda <strong>5 GHz</strong></li>
      <li>Larghezza canale: <strong>80 MHz</strong> (bilanciamento velocità/copertura)</li>
      <li>MIMO: <strong>2x2</strong> (compatibile con tablet/palmari)</li>
      <li>SSID: <strong>"Rete Magazzino"</strong>, sicurezza <strong>WPA2-Enterprise</strong></li>
      <li>Autenticazione: <strong>RADIUS</strong> aziendale, credenziali personali per ogni dipendente (tracciabilità + revoca facile)</li>
    </ul>

    <h2 id="indirizzamento">Indirizzamento IP — VLSM da 192.168.1.0/24</h2>
    <p>Subnetting con tecnica <strong>VLSM</strong> (sottoreti di dimensioni diverse) per efficienza:</p>
    <table>
      <thead><tr><th>Reparto</th><th>Host stimati</th><th>Sottorete</th><th>Maschera</th><th>Range</th><th>Gateway</th></tr></thead>
      <tbody>
        <tr><td>Amministrazione</td><td>~18 + crescita</td><td>192.168.1.0/27</td><td>255.255.255.224</td><td>.1 — .30</td><td>.30</td></tr>
        <tr><td>Dirigenza</td><td>~9 + crescita</td><td>192.168.1.32/28</td><td>255.255.255.240</td><td>.33 — .46</td><td>.46</td></tr>
        <tr><td>Produzione</td><td>~20 + crescita</td><td>192.168.1.64/27</td><td>255.255.255.224</td><td>.65 — .94</td><td>.94</td></tr>
        <tr><td>Magazzino (cablata + WLAN)</td><td>~30</td><td>192.168.1.96/27</td><td>255.255.255.224</td><td>.97 — .126</td><td>.126</td></tr>
        <tr><td>Link R1—R2</td><td>2</td><td>192.168.1.128/30</td><td>255.255.255.252</td><td>.129 — .130</td><td>—</td></tr>
      </tbody>
    </table>

    <h2 id="routing">Configurazione del routing</h2>
    <p><strong>Scelta: routing statico</strong>. Motivazione:</p>
    <ul>
      <li>Solo 2 router → topologia banale, niente convergenza necessaria</li>
      <li>Niente overhead di protocolli (RIP/OSPF) sulla dorsale</li>
      <li>Configurazione più semplice e prevedibile</li>
    </ul>
    <pre class="formula"># Su Router 1 (edificio principale)
ip route 192.168.1.64 255.255.255.224 192.168.1.130   # Produzione → R2
ip route 192.168.1.96 255.255.255.224 192.168.1.130   # Magazzino → R2

# Su Router 2 (edificio secondario)
ip route 0.0.0.0 0.0.0.0 192.168.1.129                # default verso R1 (Internet)</pre>

    <h2 id="servizi">Servizi di rete</h2>
    <ul>
      <li><strong>DHCP</strong> sui router (pool per ogni VLAN/sottorete) — esclude IP statici di stampanti, AP, server</li>
      <li><strong>NAT/PAT</strong> sul Router 1 (interfaccia WAN verso ISP)</li>
      <li><strong>Firewall</strong> sul Router 1: chiude tutti gli inbound non richiesti, permette solo traffico stabilito (stateful)</li>
      <li><strong>RADIUS server</strong> nella LAN principale per autenticazione WPA2-Enterprise</li>
      <li><strong>DNS</strong>: forwarder ISP (es. 8.8.8.8 / 1.1.1.1) o DNS interno se servono nomi locali</li>
    </ul>

    <pre class="formula"># Esempio DHCP pool Magazzino su R2
Router(config)# ip dhcp pool MAGAZZINO
Router(dhcp-config)# network 192.168.1.96 255.255.255.224
Router(dhcp-config)# default-router 192.168.1.126
Router(dhcp-config)# dns-server 8.8.8.8
Router(dhcp-config)# lease 7
Router(dhcp-config)# exit
Router(config)# ip dhcp excluded-address 192.168.1.97 192.168.1.110
Router(config)# end</pre>
  `,
  quiz: [
    {q: "Perché tra i due edifici di LogiPack si usa fibra OM3 invece di Cat 6A?", a: ["È più colorata","La distanza è 300 m, oltre il limite ~100 m del rame Ethernet","Costa di meno","Richiesto dalla legge"], correct: 1, explain: "Le tecnologie Ethernet su rame hanno limite circa 100 m per tratta. A 300 m serve fibra."},
    {q: "Standard PoE per i telefoni VoIP?", a: ["802.3af (PoE) ~15.4 W","802.3at (PoE+) 30 W","802.3bt (PoE++) 60 W","Nessuno"], correct: 0, explain: "I VoIP consumano poco: 802.3af (PoE) basta. PoE+ serve per AP Wi-Fi 5/6 più affamati."},
    {q: "Sicurezza WLAN scelta nel Magazzino?", a: ["WPA2-Personal con password unica","WPA2-Enterprise + RADIUS","WEP","Aperta"], correct: 1, explain: "WPA2-Enterprise + RADIUS: ogni dipendente ha credenziali personali, accesso revocabile, tracciabilità."},
    {q: "Routing statico vs dinamico per LogiPack?", a: ["Dinamico (OSPF) per scalabilità","Statico — topologia banale a 2 router, niente convergenza","Nessuno","BGP"], correct: 1, explain: "Con solo 2 router il routing statico è più semplice, prevedibile e senza overhead."}
  ]
};

// ================================================================
// m5c2 — Caso DataForge
// ================================================================
window.CHAPTERS.m5c2 = {
  title: "Caso DataForge — Subnetting e ACL",
  body: `
    <div class="info-box tip"><h4>📌 Traccia</h4><p><strong>DataForge S.r.l.</strong> (Roma, sviluppo software gestionali) — sede unica, 3 reparti distinti. Progettare LAN, indirizzamento da <code>192.168.50.0/24</code>, DHCP, contratto ISP, ACL.</p></div>

    <h2 id="reparti">Distribuzione dispositivi</h2>
    <ul>
      <li><strong>Sviluppo Software</strong>: 18 PC + 2 stampanti = 20 host</li>
      <li><strong>Assistenza Clienti</strong> (videocall frequenti): 12 PC + 1 stampante = 13 host</li>
      <li><strong>Amministrazione e Direzione</strong>: 8 PC + 2 stampanti = 10 host</li>
    </ul>

    <h2 id="topologia">Topologia logica</h2>
    <pre class="mermaid">
flowchart TB
  ISP((🌐 ISP — FTTH 1G simmetrica)) --> RTR[Router/Firewall]
  RTR --> SW[Switch Core 24-port GE PoE+]
  SW --> SUB1[VLAN 10 — Sviluppo<br/>192.168.50.0/27]
  SW --> SUB2[VLAN 20 — Assistenza<br/>192.168.50.32/28]
  SW --> SUB3[VLAN 30 — Amministrazione<br/>192.168.50.64/28]
  SUB1 -.- PC1[18 PC + 2 stamp]
  SUB2 -.- PC2[12 PC + 1 stamp]
  SUB3 -.- PC3[8 PC + 2 stamp]
    </pre>

    <h2 id="subnetting">Subnetting VLSM su 192.168.50.0/24</h2>
    <table>
      <thead><tr><th>Reparto</th><th>Host (con margine)</th><th>Sottorete</th><th>Maschera</th><th>Range usabile</th><th>Gateway</th></tr></thead>
      <tbody>
        <tr><td>Sviluppo</td><td>~30</td><td>192.168.50.0/27</td><td>255.255.255.224</td><td>.1 — .30</td><td>.30</td></tr>
        <tr><td>Assistenza</td><td>~14</td><td>192.168.50.32/28</td><td>255.255.255.240</td><td>.33 — .46</td><td>.46</td></tr>
        <tr><td>Amministrazione</td><td>~14</td><td>192.168.50.64/28</td><td>255.255.255.240</td><td>.65 — .78</td><td>.78</td></tr>
        <tr><td>Riserva (server, futuro)</td><td>—</td><td>192.168.50.80/28</td><td>255.255.255.240</td><td>.81 — .94</td><td>—</td></tr>
      </tbody>
    </table>

    <h2 id="dhcp">Configurazione DHCP sul router</h2>
    <pre class="formula">Router> enable
Router# configure terminal

Router(config)# ip dhcp pool SVILUPPO
Router(dhcp-config)# network 192.168.50.0 255.255.255.224
Router(dhcp-config)# default-router 192.168.50.30
Router(dhcp-config)# dns-server 8.8.8.8 1.1.1.1
Router(dhcp-config)# lease 7
Router(dhcp-config)# exit
Router(config)# ip dhcp excluded-address 192.168.50.20 192.168.50.30   # stampanti + AP

Router(config)# ip dhcp pool ASSISTENZA
Router(dhcp-config)# network 192.168.50.32 255.255.255.240
Router(dhcp-config)# default-router 192.168.50.46
Router(dhcp-config)# dns-server 8.8.8.8
Router(dhcp-config)# lease 7
Router(dhcp-config)# exit

Router(config)# ip dhcp pool AMMINISTRAZIONE
Router(dhcp-config)# network 192.168.50.64 255.255.255.240
Router(dhcp-config)# default-router 192.168.50.78
Router(dhcp-config)# dns-server 8.8.8.8
Router(dhcp-config)# lease 7
Router(dhcp-config)# end</pre>

    <h2 id="isp">Contratto ISP suggerito</h2>
    <ul>
      <li>Fibra <strong>FTTH</strong> a velocità <strong>simmetrica 1 Gbit/s</strong> (Assistenza fa videocall e VoIP, l'upload conta)</li>
      <li><strong>IP pubblico statico</strong> (per VPN site-to-site e accesso remoto sviluppatori)</li>
      <li><strong>SLA Business</strong>: tempo ripristino &lt; 4h, banda minima garantita</li>
      <li>Eventuale <strong>secondaria 4G/5G</strong> per failover critico</li>
    </ul>

    <h2 id="acl">Politiche di sicurezza con ACL</h2>
    <p>Obiettivi:</p>
    <ul>
      <li>Amministrazione e Direzione: <strong>isolata</strong> dagli altri reparti (dati sensibili)</li>
      <li>Sviluppo e Assistenza: <strong>possono comunicare</strong> (deploy, debug, test condivisi)</li>
      <li>Tutti accedono a Internet</li>
    </ul>
    <pre class="formula"># Blocca traffico verso Amministrazione tranne risposte stabilite
Router(config)# access-list 110 permit tcp any 192.168.50.64 0.0.0.15 established
Router(config)# access-list 110 deny ip any 192.168.50.64 0.0.0.15
Router(config)# access-list 110 permit ip any any

Router(config)# interface gigabitethernet 0/0.30   # subinterfaccia VLAN 30 Amm
Router(config-subif)# ip access-group 110 out
Router(config-subif)# end</pre>

    <h2 id="quiz-pratico">🎯 Esercizio per te</h2>
    <p>Prova a rispondere prima di leggere la soluzione completa:</p>
    <ol>
      <li>Quante /27 stanno in una /24? (risposta: 8)</li>
      <li>Maschera in notazione decimale di /27? (255.255.255.224)</li>
      <li>Quanti host usabili in una /27? (32 - 2 = 30)</li>
      <li>Perché serve simmetrica per Assistenza? (videocall di upload pesante)</li>
    </ol>
  `,
  quiz: [
    {q: "Quanti host usabili in una sottorete /27?", a: ["32","30","16","14"], correct: 1, explain: "Una /27 ha 5 bit host = 2^5 = 32 indirizzi totali, meno rete e broadcast = 30 host usabili."},
    {q: "Perché DataForge ha bisogno di banda simmetrica?", a: ["Per scaricare film","Il reparto Assistenza fa videoconferenze e supporto remoto, l'upload è critico","Per giocare","Per nessun motivo"], correct: 1, explain: "Videocall e assistenza remota richiedono upload elevato e stabile."},
    {q: "Cosa significa la wildcard 0.0.0.15 in una ACL?", a: ["Singolo host","Match sui primi 28 bit (corrisponde a una /28)","Tutti gli host","Nulla"], correct: 1, explain: "0.0.0.15 = 0000.0000.0000.1111: confronta i primi 28 bit, quindi corrisponde a una rete /28 (16 indirizzi)."},
    {q: "Cosa fa permit tcp ... established?", a: ["Permette tutto","Permette solo pacchetti TCP che hanno il flag ACK=1 (risposte a connessioni iniziate dall'interno)","Blocca tutto","Crea una connessione"], correct: 1, explain: "Established controlla se SYN=0 e ACK=1: il pacchetto è di una sessione già stabilita, quindi sicuro."}
  ]
};

// ================================================================
// m5c3 — Esercizi DMZ con ACL
// ================================================================
window.CHAPTERS.m5c3 = {
  title: "Esercizi DMZ con ACL Cisco",
  body: `
    <div class="info-box tip"><h4>📌 Tracce e soluzioni</h4><p>4 esercizi pratici con DMZ, NAT statico e ACL Cisco. Tutti tratti dal materiale del prof.</p></div>

    <h2 id="es1">Esercizio 1 — Web server in DMZ</h2>
    <p><strong>Scenario</strong>: azienda con LAN interna (192.168.1.0/24) e DMZ (192.168.2.0/24). In DMZ c'è un web server (192.168.2.100) che deve essere accessibile dal mondo via HTTP/HTTPS. Dalla LAN interna è invece accessibile solo via HTTP/HTTPS — niente altro traffico verso la DMZ. Internet non deve raggiungere la LAN interna.</p>

    <pre class="mermaid">
flowchart LR
  INET((🌐 Internet)) --> FW[Firewall/Router]
  FW --> DMZ[DMZ — 192.168.2.0/24<br/>Web 192.168.2.100]
  FW --> LAN[LAN interna — 192.168.1.0/24]
  DMZ -.HTTP/HTTPS only.-> LAN
    </pre>

    <p><strong>Configurazione SNAT (Static NAT)</strong>:</p>
    <pre class="formula">Router(config)# ip nat inside source static 192.168.2.100 198.51.100.50
Router(config)# interface gig0/1   # interna (LAN+DMZ)
Router(config-if)# ip nat inside
Router(config)# interface gig0/0   # esterna (ISP)
Router(config-if)# ip nat outside</pre>

    <p><strong>ACL su interfaccia ESTERNA (in entrata da Internet)</strong>:</p>
    <pre class="formula">access-list 100 permit tcp any host 198.51.100.50 eq 80
access-list 100 permit tcp any host 198.51.100.50 eq 443
access-list 100 permit tcp any 192.168.1.0 0.0.0.255 established
access-list 100 deny ip any any
interface gig0/0
 ip access-group 100 in</pre>

    <p><strong>ACL dalla LAN interna verso la DMZ</strong>:</p>
    <pre class="formula">access-list 110 permit tcp 192.168.1.0 0.0.0.255 host 192.168.2.100 eq 80
access-list 110 permit tcp 192.168.1.0 0.0.0.255 host 192.168.2.100 eq 443
access-list 110 deny ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255
access-list 110 permit ip any any
interface gig0/1
 ip access-group 110 in</pre>

    <h2 id="es2">Esercizio 2 — Azienda elettronica con DB privato</h2>
    <p><strong>Scenario</strong>: azienda con (a) workstation interne, (b) DB server privato accessibile solo dalle workstation, (c) server Samba per file sharing interno (TCP 445), (d) web server in DMZ con backend DB.</p>
    <p>Regole:</p>
    <ul>
      <li>Internet → solo HTTP/HTTPS verso web server in DMZ</li>
      <li>Web server (DMZ) → solo TCP 5432 (Postgres) verso DB server interno</li>
      <li>Workstation → tutto verso Samba (445), DB (5432), web (80/443)</li>
      <li>DB e Samba server <strong>mai</strong> raggiungibili da Internet</li>
    </ul>
    <pre class="formula"># ACL applicata IN ingresso sulla porta DMZ del firewall
access-list 120 permit tcp host 192.168.2.100 host 192.168.10.20 eq 5432   # Web → DB
access-list 120 deny ip host 192.168.2.100 192.168.10.0 0.0.0.255          # tutto il resto bloccato
access-list 120 permit ip any any
interface gig0/2   # DMZ -> resto
 ip access-group 120 in</pre>

    <h2 id="es3">Esercizio 3 — Due LAN distinte</h2>
    <p><strong>Scenario</strong>:</p>
    <ul>
      <li><strong>LAN A</strong> (192.168.3.0/25): no Internet, no DMZ — totalmente isolata (ricerca interna)</li>
      <li><strong>LAN B</strong> (192.168.3.128/25): accede a Internet e alla DMZ con web e mail server</li>
      <li>Le due LAN non comunicano tra loro</li>
    </ul>
    <pre class="formula">access-list 130 deny ip 192.168.3.0 0.0.0.127 any           # LAN A: blocca tutto in uscita
access-list 130 permit ip 192.168.3.128 0.0.0.127 any       # LAN B: tutto consentito
interface gig0/3
 ip access-group 130 in</pre>

    <h2 id="es4">Esercizio 4 — Port Forwarding multipli</h2>
    <p><strong>Scenario</strong>: stesso IP pubblico (203.0.113.10), 3 server interni in DMZ:</p>
    <ul>
      <li>HTTP/HTTPS (porte 80, 443) → 192.168.2.10</li>
      <li>SMTP/IMAP (porte 25, 143) → 192.168.2.20</li>
      <li>DNS (porta 53) → 192.168.2.30</li>
    </ul>
    <pre class="formula">ip nat inside source static tcp 192.168.2.10 80  203.0.113.10 80
ip nat inside source static tcp 192.168.2.10 443 203.0.113.10 443
ip nat inside source static tcp 192.168.2.20 25  203.0.113.10 25
ip nat inside source static tcp 192.168.2.20 143 203.0.113.10 143
ip nat inside source static udp 192.168.2.30 53  203.0.113.10 53</pre>

    <h2 id="established">Approfondimento: <code>established</code></h2>
    <div class="info-box key">
      <h4>🔑 ACL <code>established</code></h4>
      <p>L'opzione <code>established</code> permette pacchetti TCP che hanno il flag <strong>ACK=1</strong> (cioè non sono nuovi tentativi di connessione ma risposte a connessioni iniziate dall'interno).</p>
      <p>Limite: <strong>non protegge da TCP ACK scan</strong> (l'attaccante invia pacchetti con ACK=1 per scoprire host attivi). Per questo serve uno <strong>Stateful Packet Inspection firewall</strong> che mantiene lo stato delle connessioni reali.</p>
    </div>
  `,
  quiz: [
    {q: "Cosa fa ip nat inside source static 192.168.2.100 198.51.100.50?", a: ["NAT dinamico","SNAT (Static NAT) tra IP privato e IP pubblico, usato per server in DMZ","DHCP","Routing"], correct: 1, explain: "SNAT: associazione permanente IP_priv ↔ IP_pub, indispensabile per server pubblici raggiungibili da Internet."},
    {q: "Cosa significa permit tcp ... established?", a: ["Permette tutto","Permette solo TCP con flag ACK=1, cioè risposte a connessioni iniziate dall'interno","Blocca tutto","Apre tutte le porte"], correct: 1, explain: "established controlla SYN=0/ACK=1. Limite: non protegge da TCP ACK scan."},
    {q: "Perché ACL standard si applicano vicino alla destinazione e estese vicino alla sorgente?", a: ["Tradizione","Standard filtrano solo IP sorgente: vicino alla sorgente bloccherebbero tutto, vicino alla destinazione bloccano solo verso quella destinazione","Nessuna ragione","Sono uguali"], correct: 1, explain: "Standard ACL filtrano solo l'IP sorgente: applicate vicino alla sorgente bloccherebbero qualunque destinazione. Estese filtrano protocollo+porta+dst, quindi possono essere precise vicino alla sorgente."}
  ]
};

// ================================================================
// m5c4 — Esercizi numerici RSA e DH
// ================================================================
window.CHAPTERS.m5c4 = {
  title: "Esercizi numerici RSA e Diffie-Hellman",
  body: `
    <div class="info-box tip"><h4>📌 Esercizi numerici</h4><p>RSA e DH si studiano meglio facendo i conti su numeri piccoli. Qui due esercizi guidati passo-passo.</p></div>

    <h2 id="rsa-num">Esercizio RSA — generazione chiavi e cifratura</h2>
    <h3>1. Scelta dei primi</h3>
    <p>Scegli due primi piccoli (in pratica si usano numeri da 1024-4096 bit, qui solo per capire):</p>
    <pre class="formula">p = 5
q = 11</pre>

    <h3>2. Calcolo N e φ(N)</h3>
    <pre class="formula">N = p · q = 5 · 11 = 55
φ(N) = (p-1)(q-1) = 4 · 10 = 40</pre>

    <h3>3. Scelta di e (esponente pubblico)</h3>
    <p>Serve <code>e</code> coprimo con <code>φ(N) = 40</code>. Scegliamo:</p>
    <pre class="formula">e = 13   (gcd(13, 40) = 1 ✓)</pre>

    <h3>4. Calcolo di d (esponente privato)</h3>
    <p>Serve <code>d</code> tale che <code>(e · d) mod φ(N) = 1</code> → algoritmo esteso di Euclide:</p>
    <pre class="formula">13 · d ≡ 1 (mod 40)
13 · 37 = 481 = 12·40 + 1 ✓
→ d = 37</pre>

    <h3>5. Chiavi finali</h3>
    <pre class="formula">K_pub  = [N=55, e=13]   (pubblica)
K_priv = [N=55, d=37]   (privata, segreta)</pre>

    <h3>6. Cifratura di un blocco</h3>
    <p>Cifriamo il messaggio <code>m = 7</code>:</p>
    <pre class="formula">m' = m^e mod N = 7^13 mod 55
   = 96889010407 mod 55
   = 2</pre>

    <h3>7. Decifratura</h3>
    <pre class="formula">m = m'^d mod N = 2^37 mod 55
  = 137438953472 mod 55
  = 7  ✓</pre>

    <div class="info-box key">
      <h4>🔑 Sicurezza in pratica</h4>
      <p>Con <code>p=5, q=11</code> qualsiasi attaccante fattorizza <code>N=55</code> in 1 secondo. In produzione serve <strong>N ≥ 2048 bit</strong>: i migliori algoritmi di fattorizzazione richiedono millenni di calcolo per romperli (oggi).</p>
    </div>

    <h2 id="dh-num">Esercizio Diffie-Hellman — scambio chiave</h2>
    <p>Alice e Bob concordano pubblicamente:</p>
    <pre class="formula">N = 23   (primo)
g = 5    (generatore)</pre>

    <h3>1. Chiavi private (segrete)</h3>
    <pre class="formula">Alice sceglie  x = 6   (segreto)
Bob   sceglie  y = 15  (segreto)</pre>

    <h3>2. Chiavi pubbliche</h3>
    <pre class="formula">Alice → A = g^x mod N = 5^6 mod 23 = 15625 mod 23 = 8
Bob   → B = g^y mod N = 5^15 mod 23 = ... mod 23 = 19</pre>

    <h3>3. Scambio</h3>
    <p>Alice manda <code>A=8</code> a Bob; Bob manda <code>B=19</code> ad Alice (canale insicuro!).</p>

    <h3>4. Calcolo della chiave condivisa K</h3>
    <pre class="formula">Alice: K = B^x mod N = 19^6 mod 23 = 47045881 mod 23 = 2
Bob:   K = A^y mod N = 8^15 mod 23 = ... mod 23 = 2

K = 2  (uguale per entrambi!)</pre>

    <h3>5. Cosa vede Trudy?</h3>
    <p>Trudy intercetta <code>N=23, g=5, A=8, B=19</code>. Per ricavare K dovrebbe risolvere uno dei due:</p>
    <pre class="formula">8 = 5^x mod 23   →   trovare x = 6
19 = 5^y mod 23  →   trovare y = 15</pre>
    <p>Con N piccolo basta provare tutti i valori (forza bruta). In pratica con <code>N ≥ 2048 bit</code> il <strong>logaritmo discreto</strong> è computazionalmente intrattabile.</p>

    <div class="info-box warn">
      <h4>⚠️ Attenzione MitM</h4>
      <p>DH non autentica: Trudy può intercettare e fingere di essere Bob con Alice e Alice con Bob (Man-in-the-Middle). Per evitarlo: <strong>firma digitale</strong> dei valori scambiati con certificati X.509 verificati.</p>
    </div>
  `,
  quiz: [
    {q: "Con p=5, q=11, e=13: quanto vale d?", a: ["7","13","37","40"], correct: 2, explain: "φ(N)=40. d tale che 13·d ≡ 1 (mod 40). 13·37=481=12·40+1 → d=37."},
    {q: "Cifratura RSA: m'=?", a: ["m+e mod N","m^e mod N","e^m mod d","N/e"], correct: 1, explain: "m' = m^e mod N (e = esponente pubblico, N = modulo)."},
    {q: "DH con N=23, g=5, x=6: A=?", a: ["A=15","A=23","A=8","A=5"], correct: 2, explain: "A = g^x mod N = 5^6 mod 23 = 15625 mod 23 = 8."},
    {q: "Su cosa si basa la sicurezza di DH?", a: ["Sulla velocità","Sulla difficoltà di calcolare il logaritmo discreto in un campo finito","Sul caso","Sull'hash"], correct: 1, explain: "Ricavare x da g^x mod N (logaritmo discreto) è computazionalmente intrattabile con N grande."},
    {q: "Perché RSA in produzione richiede N ≥ 2048 bit?", a: ["Per fattorizzare i primi più velocemente","Perché con N piccolo gli attacchi di fattorizzazione lo rompono in tempi ragionevoli","Per estetica","Non c'è motivo"], correct: 1, explain: "Più bit = più tempo per fattorizzare N. Con 2048 bit anche supercomputer impiegherebbero millenni."}
  ]
};
