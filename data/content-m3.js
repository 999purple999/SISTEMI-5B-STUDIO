// Module 3 - Datacenter and Cloud
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m3c1 = {
  title: "Data center e server farm",
  body: `
    <p>Un <span class="term">data center</span> è una struttura fisica progettata per ospitare grandi quantità di <strong>server</strong>, apparati di rete e sistemi di storage che forniscono servizi informatici a un'organizzazione o ai propri clienti.</p>

    <h2 id="server-farm">Server farm</h2>
    <p>L'insieme dei server di un data center prende il nome di <span class="term">server farm</span>. Le risorse sono organizzate in <strong>rack</strong> standardizzati (1U, 2U, ...).</p>

    <h2 id="infrastruttura">Componenti dell'infrastruttura</h2>
    <ul>
      <li><strong>Server</strong>: macchine ad alte prestazioni, ridondate, modulari.</li>
      <li><strong>Storage</strong>: SAN, NAS, sistemi a tier diversi (SSD veloce, HDD economico).</li>
      <li><strong>Apparati di rete</strong>: switch core, switch ToR (Top of Rack), router, firewall, load balancer.</li>
      <li><strong>Alimentazione ridondata</strong>: doppia linea elettrica, <strong>UPS</strong> (gruppo di continuità) e <strong>generatori diesel</strong> per la continuità in caso di blackout.</li>
      <li><strong>Raffreddamento</strong>: condizionamento di precisione, corridoi caldi/freddi, free cooling.</li>
      <li><strong>Sicurezza fisica</strong>: badge, biometria, telecamere, antincendio (a gas inerte).</li>
      <li><strong>Monitoraggio</strong>: temperatura, umidità, consumi, intrusioni.</li>
    </ul>

    <h2 id="metriche">Metriche di efficienza</h2>
    <p><span class="term">PUE</span> (Power Usage Effectiveness) = energia totale del data center ÷ energia consumata dall'IT. Valore ideale 1.0; tipico 1.5-2.0; data center moderni iperscalari raggiungono 1.1.</p>

    <h2 id="utilizzi">A cosa serve</h2>
    <ul>
      <li>Hosting di siti web e applicazioni.</li>
      <li>Storage di dati aziendali.</li>
      <li>Cloud computing.</li>
      <li>Streaming video, gaming online.</li>
      <li>HPC (High Performance Computing), AI training.</li>
    </ul>
  `,
  quiz: [
    {q: "Cos'è un data center?", a: ["Una rete di computer casalinghi","Una struttura fisica che ospita server, apparati di rete e storage","Un protocollo","Un cifrario"], correct: 1, explain: "Il data center è la struttura fisica per ospitare l'infrastruttura IT."},
    {q: "L'insieme dei server di un data center si chiama:", a: ["Server farm","Cluster","Rack","Pool"], correct: 0, explain: "L'insieme dei server è chiamato server farm."},
    {q: "Cosa garantisce la continuità di alimentazione?", a: ["Solo l'allaccio elettrico","UPS e generatori diesel","Solo il sole","Le batterie del server"], correct: 1, explain: "UPS (gruppo di continuità) e generatori garantiscono l'alimentazione anche in caso di blackout."},
    {q: "Come si calcola il PUE (Power Usage Effectiveness)?", a: ["PUE = energia totale del data center ÷ energia consumata dall'IT","PUE = energia IT ÷ energia totale","PUE = potenza nominale dei server ÷ potenza UPS","PUE = ore di funzionamento ÷ ore di downtime"], correct: 0, explain: "PUE = Energia totale / Energia IT. Misura il sovraccarico di raffreddamento, illuminazione e perdite. Ideale = 1.0; tipico 1.5-2.0; iperscalari moderni ~1.1-1.2. Più è BASSO, più è efficiente."},
    {q: "Un PUE di 1.5 significa che:", a: ["Per ogni 1 W consumato dai server, in totale il datacenter ne consuma 1.5 (0.5 W vanno a raffreddamento/illuminazione/perdite)","Per ogni 1 W di rete, 1.5 W di alimentazione","Il datacenter è in classe energetica A","La metà dei server è spenta"], correct: 0, explain: "PUE 1.5 = il datacenter consuma 1.5× l'energia richiesta dall'IT. Il 33% dell'energia (0.5 / 1.5) è 'overhead' (raffreddamento, UPS, illuminazione)."},
    {q: "Quale di queste NON è una funzione tipica di un data center?", a: ["Hosting siti web e applicazioni","Cloud computing e storage di dati","Routing del traffico Internet pubblico TRA ISP (questo lo fanno gli IXP come MIX a Milano)","HPC e training di modelli AI"], correct: 2, explain: "Il routing tra ISP avviene negli Internet Exchange Point (IXP). I data center ospitano server applicativi/storage; possono ospitare anche apparati di rete dei clienti, ma non sono punti di scambio inter-ISP."}
  ]
};

window.CHAPTERS.m3c2 = {
  title: "Classificazione dei data center",
  body: `
    <p>I data center si classificano in base a vari criteri: <strong>dimensione</strong>, <strong>collocazione</strong>, <strong>livello di affidabilità</strong> (Tier).</p>

    <h2 id="dimensione">Per dimensione</h2>
    <ul>
      <li><strong>Server room</strong>: stanza dedicata in azienda con pochi server.</li>
      <li><strong>Data center aziendali</strong>: medi, decine/centinaia di server.</li>
      <li><strong>Hyperscale data center</strong>: enormi, centinaia di migliaia di server (AWS, Azure, GCP, Meta).</li>
    </ul>

    <h2 id="collocazione">Per collocazione</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🏢</div>
        <div class="callout-title">Interni (on-premise)</div>
        <div class="callout-text">All'interno della sede aziendale.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🌐</div>
        <div class="callout-title">Esterni</div>
        <div class="callout-text">Presso un fornitore di servizi (colocation, cloud).</div>
      </div>
    </div>

    <h2 id="tier">Classificazione Tier (Uptime Institute)</h2>
    <p>Quattro livelli di affidabilità basati su ridondanza e disponibilità:</p>
    <table>
      <thead><tr><th>Tier</th><th>Caratteristiche</th><th>Disponibilità</th><th>Downtime annuo</th></tr></thead>
      <tbody>
        <tr><td>I</td><td>Singolo path, no ridondanza</td><td>99.671%</td><td>~28.8h</td></tr>
        <tr><td>II</td><td>Componenti ridondati</td><td>99.741%</td><td>~22h</td></tr>
        <tr><td>III</td><td>Manutenibile senza shutdown</td><td>99.982%</td><td>~1.6h</td></tr>
        <tr><td>IV</td><td>Fault-tolerant, doppia ridondanza attiva</td><td>99.995%</td><td>~26 min</td></tr>
      </tbody>
    </table>
  `,
  quiz: [
    {q: "Cos'è un data center 'hyperscale'?", a: ["Un mini-server","Un data center enorme con centinaia di migliaia di server (es. AWS)","Un PC potente","Un server domestico"], correct: 1, explain: "Gli hyperscale data center ospitano centinaia di migliaia di server (Google, Amazon, Microsoft)."},
    {q: "Quanti livelli Tier ha la classificazione dell'Uptime Institute?", a: ["2","3","4","5"], correct: 2, explain: "Quattro livelli Tier: I, II, III, IV."},
    {q: "Quale Tier offre la massima affidabilità?", a: ["Tier I","Tier II","Tier III","Tier IV"], correct: 3, explain: "Tier IV è fault-tolerant con doppia ridondanza attiva (99.995% disponibilità)."},
    {q: "Un data center 'on-premise' è:", a: ["Esterno","Interno alla sede aziendale","Un cloud","Mobile"], correct: 1, explain: "On-premise indica un data center collocato all'interno della sede dell'azienda."}
  ]
};

window.CHAPTERS.m3c3 = {
  title: "Data center interni vs esterni",
  body: `
    <p>L'azienda può scegliere se gestire un proprio data center <strong>internamente</strong> o esternalizzare a un fornitore.</p>

    <h2 id="interni">Data center interni (on-premise)</h2>

    <h3 id="vantaggi-interni">Vantaggi</h3>
    <ul>
      <li><strong>Controllo totale</strong> su hardware, software e dati.</li>
      <li><strong>Privacy massima</strong>: i dati restano fisicamente in azienda.</li>
      <li><strong>Personalizzazione</strong>: si configura tutto secondo le esigenze.</li>
      <li><strong>Latenza bassa</strong> per servizi usati internamente.</li>
    </ul>

    <h3 id="svantaggi-interni">Svantaggi</h3>
    <ul>
      <li><strong>Investimento iniziale (CapEx) alto</strong>: server, rack, alimentazione, raffreddamento.</li>
      <li><strong>Costi di gestione</strong>: personale IT, energia, manutenzione, aggiornamenti.</li>
      <li><strong>Scalabilità lenta</strong>: serve tempo per acquistare e installare nuovo hardware.</li>
      <li><strong>Disaster recovery</strong>: bisogna predisporre site secondari.</li>
    </ul>

    <h2 id="esterni">Data center esterni</h2>

    <h3 id="vantaggi-esterni">Vantaggi</h3>
    <ul>
      <li><strong>OpEx invece di CapEx</strong>: pago un canone, non investo capitale.</li>
      <li><strong>Scalabilità rapida</strong>: si aumentano risorse "con un click".</li>
      <li><strong>Manutenzione delegata</strong> al fornitore.</li>
      <li><strong>Affidabilità</strong>: data center professionali con SLA garantiti.</li>
    </ul>

    <h3 id="svantaggi-esterni">Svantaggi</h3>
    <ul>
      <li><strong>Dipendenza dal fornitore</strong> (vendor lock-in).</li>
      <li><strong>Privacy</strong>: i dati sono ospitati da terzi.</li>
      <li><strong>Latenza</strong> per servizi che richiedono accesso veloce.</li>
      <li>Costi a lungo termine possono superare quelli on-premise.</li>
    </ul>
  `,
  quiz: [
    {q: "Un vantaggio dei data center interni è:", a: ["Costi iniziali bassi","Controllo totale e massima privacy","Scalabilità immediata","Manutenzione delegata"], correct: 1, explain: "Il principale vantaggio è il pieno controllo dell'infrastruttura e dei dati."},
    {q: "CapEx vs OpEx:", a: ["CapEx = canone, OpEx = investimento","CapEx = investimento iniziale, OpEx = spesa operativa ricorrente","Sono sinonimi","Solo CapEx è ammesso in bilancio"], correct: 1, explain: "CapEx (Capital Expenditure) è investimento, OpEx (Operating Expenditure) è canone ricorrente."},
    {q: "Qual è uno svantaggio dei data center esterni?", a: ["Costi iniziali alti","Difficoltà di scalare","Dipendenza dal fornitore (vendor lock-in)","Manutenzione richiesta internamente"], correct: 2, explain: "Il vendor lock-in lega l'azienda al fornitore."},
    {q: "Per scalare rapidamente le risorse è meglio:", a: ["Data center interno","Data center esterno / cloud","Server fisici dedicati","Niente di quanto sopra"], correct: 1, explain: "I servizi cloud e i data center esterni permettono scalabilità immediata."}
  ]
};

window.CHAPTERS.m3c4 = {
  title: "Colocation in housing",
  body: `
    <p><span class="term">Colocation in housing</span>: il fornitore mette a disposizione lo <strong>spazio fisico</strong> in un proprio data center (rack o intere stanze), <strong>alimentazione, raffreddamento, connettività e sicurezza fisica</strong>. L'azienda cliente porta i <strong>propri server</strong> e li gestisce.</p>

    <h2 id="hosting-vs-housing">Hosting vs Housing</h2>
    <table>
      <thead><tr><th></th><th>Housing (Colocation)</th><th>Hosting</th></tr></thead>
      <tbody>
        <tr><td>Hardware</td><td>Del cliente</td><td>Del fornitore</td></tr>
        <tr><td>Gestione SO/applicazioni</td><td>Cliente</td><td>Cliente (in shared/VPS) o fornitore (managed)</td></tr>
        <tr><td>Spazio fisico</td><td>Fornitore</td><td>Fornitore</td></tr>
        <tr><td>Tipologia</td><td>Server proprietari in rack</td><td>Macchine virtuali, web hosting</td></tr>
      </tbody>
    </table>

    <h2 id="vantaggi">Vantaggi della colocation</h2>
    <ul>
      <li>Si beneficia di <strong>infrastruttura professionale</strong> (Tier III/IV) senza costruirla.</li>
      <li><strong>Connettività</strong> ad alta banda con peering verso più ISP.</li>
      <li><strong>Sicurezza fisica</strong> garantita dal fornitore.</li>
      <li>Ridondanza energetica e raffreddamento ottimizzati.</li>
    </ul>

    <h2 id="svantaggi">Svantaggi</h2>
    <ul>
      <li>L'hardware è ancora di proprietà → CapEx.</li>
      <li>Distanza fisica per interventi diretti (servizi remote hands per assistenza).</li>
    </ul>
  `,
  quiz: [
    {q: "Cosa è la colocation in housing?", a: ["Un servizio cloud","Un servizio in cui il fornitore offre spazio, alimentazione e connettività ma il cliente porta i propri server","Un firewall","Una VPN"], correct: 1, explain: "In colocation il cliente possiede e gestisce i server, mentre il fornitore offre spazio fisico e infrastruttura."},
    {q: "Differenza housing vs hosting:", a: ["Sono sinonimi","Housing: hardware del cliente; Hosting: hardware del fornitore","Housing è solo per email","Hosting non esiste"], correct: 1, explain: "In housing il cliente porta i propri server, in hosting usa hardware del provider."},
    {q: "Vantaggio principale della colocation:", a: ["Si paga zero","Si beneficia di infrastruttura professionale (Tier III/IV) senza costruirla","Niente connettività","Niente sicurezza"], correct: 1, explain: "Si sfrutta un'infrastruttura professionale e ridondata senza investire nella costruzione."}
  ]
};

window.CHAPTERS.m3c5 = {
  title: "Virtualizzazione e Hypervisor",
  body: `
    <p>La <span class="term">virtualizzazione</span> è la tecnica che permette di eseguire più <strong>macchine virtuali (VM)</strong>, ciascuna con il proprio sistema operativo, su una sola macchina fisica.</p>

    <h2 id="vantaggi">Vantaggi</h2>
    <ul>
      <li><strong>Sfruttamento massimo dell'hardware</strong>: una macchina fisica spesso era usata al 10-20%; con la virtualizzazione si arriva all'80%.</li>
      <li><strong>Isolamento</strong> tra VM: un crash o intrusione in una VM non compromette le altre.</li>
      <li><strong>Portabilità</strong>: una VM è un file che può essere spostato e clonato.</li>
      <li><strong>Scalabilità</strong>: si creano nuove VM in pochi minuti.</li>
      <li><strong>Disaster recovery</strong>: snapshot e backup veloci.</li>
    </ul>

    <h2 id="hypervisor">Hypervisor</h2>
    <p>L'<span class="term">hypervisor</span> (Virtual Machine Monitor) è il software che astrae le risorse hardware e le distribuisce alle VM.</p>

    <h3 id="hypervisor-types">Tipo 1 vs Tipo 2 — schema</h3>
    <pre class="mermaid">
flowchart TB
  subgraph T1[Tipo 1 — Bare-metal]
    HW1[💾 Hardware] --> HV1[🛡️ Hypervisor]
    HV1 --> VM1A[VM 1]
    HV1 --> VM1B[VM 2]
    HV1 --> VM1C[VM N]
  end
  subgraph T2[Tipo 2 — Hosted]
    HW2[💾 Hardware] --> OS2[🖥️ Sistema operativo host]
    OS2 --> HV2[🛡️ Hypervisor]
    HV2 --> VM2A[VM 1]
    HV2 --> VM2B[VM 2]
  end
    </pre>

    <h3 id="tipo1">Hypervisor di tipo 1 (bare-metal)</h3>
    <p>Eseguito <strong>direttamente sull'hardware</strong>, senza un sistema operativo sottostante. Massime prestazioni e sicurezza. Esempi:</p>
    <ul>
      <li><strong>VMware ESXi</strong></li>
      <li><strong>Microsoft Hyper-V</strong></li>
      <li><strong>Xen</strong></li>
      <li><strong>KVM</strong> (è un modulo del kernel Linux che lo trasforma in hypervisor)</li>
    </ul>

    <h3 id="tipo2">Hypervisor di tipo 2 (hosted)</h3>
    <p>Eseguito come <strong>applicazione sopra un sistema operativo host</strong>. Più semplice da installare ma meno performante. Esempi:</p>
    <ul>
      <li><strong>VMware Workstation / Player</strong></li>
      <li><strong>Oracle VirtualBox</strong></li>
      <li><strong>Parallels Desktop</strong> (macOS)</li>
    </ul>

    <h2 id="container">Container vs VM (cenni)</h2>
    <p>I <strong>container</strong> (Docker, Kubernetes) condividono il kernel del sistema operativo host: più leggeri delle VM ma meno isolati.</p>
  `,
  quiz: [
    {q: "Cos'è la virtualizzazione?", a: ["Un protocollo di rete","Una tecnica per eseguire più macchine virtuali su un solo hardware fisico","Un cifrario","Un firewall"], correct: 1, explain: "Permette di eseguire più sistemi operativi/VM su un'unica macchina fisica."},
    {q: "Cos'è un hypervisor?", a: ["Un firewall","Il software che astrae l'hardware e gestisce le VM","Un cifrario","Un router virtuale"], correct: 1, explain: "L'hypervisor (Virtual Machine Monitor) crea, esegue e gestisce le VM."},
    {q: "Hypervisor di tipo 1:", a: ["Gira sopra un sistema operativo","Gira direttamente sull'hardware (bare-metal)","Usa solo Windows","È un'app Android"], correct: 1, explain: "Il tipo 1 (bare-metal) viene eseguito direttamente sull'hardware: ESXi, Hyper-V, KVM."},
    {q: "Quale di questi è un hypervisor di tipo 2?", a: ["VMware ESXi","KVM","VirtualBox","Hyper-V"], correct: 2, explain: "VirtualBox è hosted (tipo 2) e gira sopra un sistema operativo come Windows o macOS."},
    {q: "Vantaggio principale della virtualizzazione:", a: ["Più costi","Minor sfruttamento dell'hardware","Sfruttamento massimo dell'hardware e isolamento tra VM","Solo backup"], correct: 2, explain: "Le VM permettono di sfruttare l'hardware al massimo e isolare i carichi."},
    {q: "I container (Docker) e le VM:", a: ["Sono identici","I container condividono il kernel dell'host: più leggeri ma meno isolati","I container hanno il proprio kernel","Non hanno differenze"], correct: 1, explain: "I container condividono il kernel host: più leggeri delle VM ma con isolamento minore."}
  ]
};

window.CHAPTERS.m3c6 = {
  title: "Cloud computing: SaaS, PaaS, IaaS",
  body: `
    <p>Il <span class="term">cloud computing</span> è un modello di erogazione di servizi IT (calcolo, storage, applicazioni) via Internet, con pagamento <strong>a consumo</strong> (pay-as-you-go).</p>

    <h2 id="caratteristiche">Caratteristiche fondamentali</h2>
    <ul>
      <li><strong>On-demand self-service</strong>: l'utente attiva risorse autonomamente.</li>
      <li><strong>Broad network access</strong>: accessibile via Internet da qualsiasi dispositivo.</li>
      <li><strong>Resource pooling</strong>: risorse condivise tra più clienti (multi-tenant).</li>
      <li><strong>Rapid elasticity</strong>: scalare velocemente su e giù.</li>
      <li><strong>Measured service</strong>: pagamento basato su uso effettivo.</li>
    </ul>

    <h2 id="paradigmi-stack">Schema dei paradigmi cloud</h2>
    <pre class="mermaid">
flowchart LR
  subgraph IaaS
    direction TB
    I1[Hardware]:::p
    I2[Virtualizzazione]:::p
    I3[OS]:::u
    I4[Runtime]:::u
    I5[App]:::u
    I6[Dati]:::u
  end
  subgraph PaaS
    direction TB
    P1[Hardware]:::p
    P2[Virtualizzazione]:::p
    P3[OS]:::p
    P4[Runtime]:::p
    P5[App]:::u
    P6[Dati]:::u
  end
  subgraph SaaS
    direction TB
    S1[Hardware]:::p
    S2[Virtualizzazione]:::p
    S3[OS]:::p
    S4[Runtime]:::p
    S5[App]:::p
    S6[Dati]:::p
  end
  classDef p fill:#0a84ff,stroke:#0a84ff,color:#fff;
  classDef u fill:#30d158,stroke:#30d158,color:#000;
    </pre>
    <p style="font-size:0.85rem; color:var(--text-muted);">🔵 gestito dal provider · 🟢 gestito dall'utente</p>

    <h2 id="paradigmi">I tre paradigmi di servizio</h2>

    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🏗️</div>
        <div class="callout-title">IaaS — Infrastructure as a Service</div>
        <div class="callout-text">Si affittano risorse hardware virtualizzate (CPU, RAM, storage, rete). L'utente gestisce SO e applicazioni.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">⚙️</div>
        <div class="callout-title">PaaS — Platform as a Service</div>
        <div class="callout-text">Si affitta una piattaforma (runtime, DB, middleware). L'utente gestisce solo le proprie applicazioni.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">📱</div>
        <div class="callout-title">SaaS — Software as a Service</div>
        <div class="callout-text">Si usa un'applicazione completa via web. L'utente non gestisce niente sotto.</div>
      </div>
    </div>

    <h2 id="esempi">Esempi</h2>
    <table>
      <thead><tr><th>Modello</th><th>Esempi</th></tr></thead>
      <tbody>
        <tr><td>IaaS</td><td>AWS EC2, Azure VM, Google Compute Engine, DigitalOcean Droplet</td></tr>
        <tr><td>PaaS</td><td>Heroku, Google App Engine, AWS Elastic Beanstalk, Azure App Service</td></tr>
        <tr><td>SaaS</td><td>Gmail, Office 365, Salesforce, Dropbox, Spotify</td></tr>
      </tbody>
    </table>

    <h2 id="responsabilita">Responsabilità (Pizza-as-a-Service)</h2>
    <p>Chi gestisce cosa nei diversi modelli (✓ = utente, ✗ = provider):</p>
    <table>
      <thead><tr><th>Layer</th><th>On-Premise</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr></thead>
      <tbody>
        <tr><td>Applicazione</td><td>✓</td><td>✓</td><td>✓</td><td>✗</td></tr>
        <tr><td>Dati</td><td>✓</td><td>✓</td><td>✓</td><td>✗</td></tr>
        <tr><td>Runtime</td><td>✓</td><td>✓</td><td>✗</td><td>✗</td></tr>
        <tr><td>Middleware/OS</td><td>✓</td><td>✓</td><td>✗</td><td>✗</td></tr>
        <tr><td>Virtualizzazione/HW</td><td>✓</td><td>✗</td><td>✗</td><td>✗</td></tr>
      </tbody>
    </table>
  `,
  quiz: [
    {q: "Cosa è il cloud computing?", a: ["Un sistema operativo","Un modello di erogazione di servizi IT via Internet con pagamento a consumo","Un protocollo di rete","Un firewall"], correct: 1, explain: "Cloud computing è la fornitura di servizi IT (calcolo, storage, applicazioni) via Internet con modello pay-as-you-go."},
    {q: "Quali sono i tre paradigmi cloud principali?", a: ["FaaS, BaaS, SaaS","IaaS, PaaS, SaaS","HTTP, HTTPS, FTP","TCP, UDP, IP"], correct: 1, explain: "I tre paradigmi sono Infrastructure-, Platform- e Software-as-a-Service."},
    {q: "IaaS fornisce:", a: ["Software completo","Piattaforma di sviluppo","Risorse hardware virtualizzate (VM, storage, rete)","Solo email"], correct: 2, explain: "IaaS fornisce infrastruttura virtualizzata: VM, storage, rete. Esempio: AWS EC2."},
    {q: "PaaS fornisce:", a: ["Hardware fisico","Piattaforma di sviluppo (runtime, DB, middleware) per le proprie applicazioni","Solo email","Hardware non virtualizzato"], correct: 1, explain: "PaaS dà runtime, DB, middleware: l'utente sviluppa le proprie applicazioni. Esempio: Heroku."},
    {q: "Gmail è un esempio di:", a: ["IaaS","PaaS","SaaS","HaaS"], correct: 2, explain: "Gmail è un'applicazione completa via web: SaaS."},
    {q: "AWS EC2 è un esempio di:", a: ["SaaS","PaaS","IaaS","FaaS"], correct: 2, explain: "AWS EC2 è una macchina virtuale: IaaS."},
    {q: "Una caratteristica fondamentale del cloud è:", a: ["Costi fissi","Rapid elasticity (scalare velocemente)","Hardware dedicato","Niente Internet"], correct: 1, explain: "L'elasticità rapida è una caratteristica chiave del cloud computing."},
    {q: "In SaaS l'utente gestisce:", a: ["Tutto","Solo l'hardware","Niente sotto l'applicazione","Solo il SO"], correct: 2, explain: "In SaaS l'utente usa solo l'applicazione: il provider gestisce tutto il resto."}
  ]
};

window.CHAPTERS.m3c7 = {
  title: "Distribuzione cloud privata e pubblica",
  body: `
    <p>Esistono diversi modelli di <strong>distribuzione</strong> (deployment) del cloud, in base a chi possiede e usa l'infrastruttura.</p>

    <h2 id="pubblica">Cloud pubblico</h2>
    <p>L'infrastruttura è di proprietà di un fornitore (AWS, Azure, GCP) e i servizi sono accessibili via Internet a <strong>chiunque</strong>. Risorse <strong>condivise</strong> tra più clienti (multi-tenant).</p>

    <h3 id="vantaggi-pub">Vantaggi</h3>
    <ul>
      <li>Costi iniziali nulli (pay-as-you-go).</li>
      <li>Scalabilità praticamente infinita.</li>
      <li>Alta affidabilità (data center Tier III/IV).</li>
      <li>Manutenzione delegata al provider.</li>
    </ul>

    <h3 id="svantaggi-pub">Svantaggi</h3>
    <ul>
      <li>Dipendenza dal fornitore.</li>
      <li>Privacy: i dati sono fuori dal perimetro aziendale.</li>
      <li>Customizzazione limitata.</li>
    </ul>

    <h2 id="privata">Cloud privato</h2>
    <p>Infrastruttura cloud usata <strong>esclusivamente</strong> da un'unica organizzazione. Può essere ospitata internamente (on-premise) o presso terzi (managed private cloud).</p>

    <h3 id="vantaggi-priv">Vantaggi</h3>
    <ul>
      <li><strong>Massimo controllo</strong> e privacy.</li>
      <li>Conformità a normative stringenti (banche, sanità, PA).</li>
      <li>Customizzazione totale.</li>
    </ul>

    <h3 id="svantaggi-priv">Svantaggi</h3>
    <ul>
      <li>Costi iniziali alti (CapEx).</li>
      <li>Scalabilità più lenta.</li>
      <li>Manutenzione interna.</li>
    </ul>

    <h2 id="ibrido">Cloud ibrido</h2>
    <p>Combina cloud privato e pubblico, con possibilità di muovere workload tra i due (es. dati sensibili in privato, picchi di carico in pubblico = <strong>cloud bursting</strong>).</p>

    <h2 id="community">Cloud community</h2>
    <p>Infrastruttura condivisa tra <strong>più organizzazioni</strong> con esigenze comuni (es. ricerca scientifica, sanità).</p>

    <h2 id="multi">Multi-cloud</h2>
    <p>Uso di servizi di <strong>più cloud provider</strong> (es. AWS + Azure) per evitare vendor lock-in e sfruttare i punti di forza di ciascuno.</p>
  `,
  quiz: [
    {q: "Il cloud pubblico è:", a: ["Solo per enti pubblici","Cloud usato esclusivamente da una sola organizzazione","Cloud accessibile a chiunque, multi-tenant","Sempre gratuito"], correct: 2, explain: "Il cloud pubblico (es. AWS, Azure) è multi-tenant e accessibile a chiunque via Internet."},
    {q: "Il cloud privato:", a: ["È del provider","È usato esclusivamente da una singola organizzazione","È solo on-premise","Non è virtualizzato"], correct: 1, explain: "Il cloud privato è dedicato a un'unica organizzazione (può essere on-premise o managed)."},
    {q: "Quando è preferibile il cloud privato?", a: ["Sempre","Quando servono massimi controllo, privacy e conformità a normative","Mai","Solo per piccoli progetti"], correct: 1, explain: "Il cloud privato è preferibile per requisiti normativi stringenti (banche, sanità, PA)."},
    {q: "Cos'è il cloud ibrido?", a: ["Un cloud rotto","Combinazione di cloud privato e pubblico","Un cloud privato","Un cloud pubblico"], correct: 1, explain: "Il cloud ibrido combina privato e pubblico, con possibilità di spostare workload."},
    {q: "Cosa significa 'cloud bursting'?", a: ["Un guasto","Spostare temporaneamente workload sul cloud pubblico durante picchi di carico","Cifrare i dati","Backup automatico"], correct: 1, explain: "Il cloud bursting sposta carichi sul pubblico durante i picchi, mantenendo il resto in privato."},
    {q: "Multi-cloud significa:", a: ["Avere più data center privati","Usare servizi di più provider cloud (es. AWS + Azure)","Solo cloud pubblico","Cloud distribuito in continenti"], correct: 1, explain: "Multi-cloud usa servizi di più provider per evitare vendor lock-in."}
  ]
};
