// Module 1 - chapters 7-12
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m1c7 = {
  title: "Crittografia a chiave asimmetrica",
  body: `
    <p>Per usare un cifrario <span class="term">asimmetrico</span> per garantire la riservatezza, ogni interlocutore possiede <strong>due chiavi</strong>:</p>

    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🟢</div>
        <div class="callout-title">Chiave pubblica K<sub>pubblica</sub></div>
        <div class="callout-text">Liberamente distribuibile, anche su canale insicuro.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🔴</div>
        <div class="callout-title">Chiave privata K<sub>privata</sub></div>
        <div class="callout-text">Conosciuta <strong>esclusivamente</strong> dal proprietario.</div>
      </div>
    </div>

    <h2 id="legame">Legame fra le chiavi</h2>
    <div class="info-box key">
      <h4>🔑 Proprietà fondamentale</h4>
      <p>Le chiavi pubblica e privata sono <strong>correlate</strong>:</p>
      <ul>
        <li>Se cifri con la chiave <strong>pubblica</strong> → decifri con la chiave <strong>privata</strong>.</li>
        <li>Se cifri con la chiave <strong>privata</strong> → decifri con la chiave <strong>pubblica</strong>.</li>
      </ul>
    </div>

    <h2 id="utilizzo">Utilizzo per la riservatezza</h2>
    <p>Alice vuole inviare un messaggio riservato a Bob:</p>
    <ol>
      <li>Alice cifra il messaggio con la <strong>chiave pubblica di Bob</strong>.</li>
      <li>Solo Bob, con la sua chiave privata, può decifrarlo.</li>
    </ol>

    <h2 id="vantaggi">Vantaggi rispetto al simmetrico</h2>
    <ul>
      <li><strong>Niente proliferazione delle chiavi</strong>: con N utenti servono solo <code>2N</code> chiavi (una pubblica e una privata per ciascuno).</li>
      <li><strong>Gestione semplificata</strong>: ogni utente protegge solo la propria chiave privata; le pubbliche degli altri sono di pubblico dominio.</li>
      <li><strong>Nessun canale sicuro necessario</strong>: il destinatario può inviare la propria chiave pubblica al mittente sul canale insicuro.</li>
    </ul>

    <h2 id="svantaggi">Svantaggi</h2>
    <p>Gli algoritmi asimmetrici si basano su operazioni matematiche complesse (elevazione a potenza modulare, curve ellittiche). Sono <strong>meno efficienti</strong> dei simmetrici sia in cifratura che in decifratura — problema critico per messaggi lunghi o numerosi.</p>

    <h2 id="mitm-asimm">Attacco MitM</h2>
    <div class="info-box danger">
      <h4>⚠️ Vulnerabilità</h4>
      <p>Se Alice riceve la chiave pubblica di Bob su canale insicuro, Trudy può intercettarla e inviare la <strong>propria chiave pubblica</strong> spacciandosi per Bob. Per evitare questo si usano i <strong>certificati digitali</strong>.</p>
    </div>
  `,
  quiz: [
    {q: "Quante chiavi possiede ogni utente in un sistema asimmetrico?", a: ["Una sola","Due: pubblica e privata","Tre","Una per ogni interlocutore"], correct: 1, explain: "Ogni utente ha una chiave pubblica (distribuibile) e una privata (segreta)."},
    {q: "Quante chiavi totali servono in una rete con N utenti per la crittografia asimmetrica?", a: ["N","2N","N(N-1)/2","N²"], correct: 1, explain: "Servono 2N chiavi: ogni utente ha una pubblica e una privata."},
    {q: "Per inviare un messaggio riservato a Bob, Alice usa:", a: ["La propria chiave privata","La propria chiave pubblica","La chiave pubblica di Bob","La chiave privata di Bob"], correct: 2, explain: "Alice cifra con la chiave pubblica di Bob; solo lui potrà decifrare con la sua privata."},
    {q: "La chiave pubblica può essere distribuita su canale insicuro?", a: ["Sì","No, mai","Solo dopo cifratura","Solo via SMS"], correct: 0, explain: "La chiave pubblica può essere distribuita liberamente: la sua conoscenza non compromette la riservatezza."},
    {q: "Qual è il principale svantaggio dei cifrari asimmetrici?", a: ["Sono insicuri","Sono computazionalmente meno efficienti dei simmetrici","Richiedono canale sicuro","Non funzionano su Internet"], correct: 1, explain: "Le operazioni matematiche complesse (es. elevazione a potenza modulare) li rendono meno efficienti."},
    {q: "Cosa risolvono i certificati digitali?", a: ["L'efficienza","L'attacco MitM nello scambio di chiavi pubbliche","La proliferazione","La gestione delle chiavi"], correct: 1, explain: "I certificati garantiscono che una chiave pubblica appartenga effettivamente a una determinata identità, prevenendo MitM."}
  ]
};

window.CHAPTERS.m1c8 = {
  title: "Algoritmo RSA",
  body: `
    <p>Il più conosciuto algoritmo a chiavi asimmetriche fu proposto da <strong>Rivest, Shamir, Adleman</strong> nel <strong>1978</strong>. Il nome è l'acronimo dei loro cognomi.</p>

    <p>Oggi è ritenuto sicuro se la chiave <strong>pubblica</strong> è di <strong>2048 bit</strong>; la chiave privata è circa il doppio.</p>

    <h2 id="prerequisiti">Prerequisiti matematici</h2>
    <ul>
      <li><strong>Numeri primi tra loro</strong>: <code>a</code> e <code>b</code> hanno solo <code>1</code> come divisore comune.</li>
      <li><strong>Parte alta</strong> <code>⌈x⌉</code>: il più piccolo intero ≥ <code>x</code>.</li>
      <li><strong>Logaritmo</strong>: <code>log<sub>a</sub>b</code> è l'esponente <code>x</code> per cui <code>a<sup>x</sup> = b</code>.</li>
      <li><strong>Bit per rappresentare un numero</strong>: per gli interi nell'intervallo <code>[0, M-1]</code> servono <code>⌈log<sub>2</sub>M⌉</code> bit.</li>
    </ul>

    <h2 id="calcolo-chiavi">Calcolo delle chiavi</h2>
    <ol>
      <li>Si scelgono due numeri <strong>primi elevati e distinti</strong> <code>p</code> e <code>q</code>.</li>
      <li>Si calcolano: <code>N = p · q</code> e <code>b = (p-1)(q-1)</code>.</li>
      <li><strong>Chiave pubblica</strong>: si sceglie un intero <code>e &lt; N</code>, primo rispetto a <code>b</code>. <code>K<sub>pubblica</sub> = [N, e]</code>.</li>
      <li><strong>Chiave privata</strong>: il più piccolo intero <code>d</code> tale che <code>(e·d - 1) mod b = 0</code>, ossia <code>(e·d) mod b = 1</code>. <code>K<sub>privata</sub> = [N, d]</code>.</li>
    </ol>

    <h2 id="cifratura">Algoritmo di cifratura</h2>
    <p>Il messaggio <code>M</code> è suddiviso in blocchi da <code>t</code> bit, con <code>t ≤ log<sub>2</sub>N</code>. Ogni blocco <code>m<sub>i</sub></code> è cifrato come:</p>
    <code class="formula">m'<sub>i</sub> = m<sub>i</sub><sup>e</sup> mod N</code>
    <p>Tutti i blocchi cifrati hanno lunghezza fissa <code>k = ⌈log<sub>2</sub>N⌉</code> bit.</p>

    <h2 id="decifratura">Algoritmo di decifratura</h2>
    <code class="formula">m<sub>i</sub> = m'<sub>i</sub><sup>d</sup> mod N</code>

    <h2 id="sicurezza">Sicurezza di RSA</h2>
    <div class="info-box key">
      <h4>🔑 Su cosa si basa la sicurezza</h4>
      <p>La riservatezza di RSA si basa sull'<strong>elevato sforzo computazionale</strong> richiesto per <strong>fattorizzare N</strong> e ricavare i parametri <code>p</code> e <code>q</code>, indispensabili per calcolare <code>d</code>.</p>
    </div>
    <ul>
      <li>Chiave a 512 bit: <strong>fattorizzabile</strong> in poche ore/giorni.</li>
      <li>Chiave a 768 bit: fattorizzata nel 2010 dopo ~2 anni di lavoro distribuito.</li>
      <li>Chiave a 1024 bit: relativamente sicura, vulnerabile in futuro.</li>
      <li>Chiave a 2048 bit: <strong>nessuna fattorizzazione nota</strong> ad oggi.</li>
    </ul>
  `,
  quiz: [
    {q: "Cosa significa l'acronimo RSA?", a: ["Random Secret Algorithm","Rivest-Shamir-Adleman","Reversible Secure Algorithm","RSA Security Authority"], correct: 1, explain: "RSA è l'acronimo dei cognomi degli inventori: Rivest, Shamir, Adleman (1978)."},
    {q: "Quanti bit deve avere oggi una chiave RSA pubblica per essere ritenuta sicura?", a: ["256 bit","512 bit","1024 bit","2048 bit"], correct: 3, explain: "Oggi le chiavi RSA pubbliche di 2048 bit sono ritenute sicure."},
    {q: "Come si calcola N nelle chiavi RSA?", a: ["N = p + q","N = p · q","N = (p-1)(q-1)","N = p^q"], correct: 1, explain: "N è il prodotto di due numeri primi distinti p e q."},
    {q: "Cosa si calcola dopo aver scelto p e q?", a: ["Solo N","Solo b","Sia N = p·q sia b = (p-1)(q-1)","Solo e"], correct: 2, explain: "Si calcolano N = p·q e b = (p-1)(q-1)."},
    {q: "La chiave pubblica RSA è composta da:", a: ["[N, d]","[N, e]","Solo N","[p, q]"], correct: 1, explain: "K_pubblica = [N, e], dove e è primo rispetto a b."},
    {q: "Come si cifra un blocco m_i in RSA?", a: ["m_i^d mod N","m_i^e mod N","m_i + e mod N","m_i XOR e"], correct: 1, explain: "Cifratura: m'_i = m_i^e mod N, usando i parametri della chiave pubblica."},
    {q: "Su cosa si basa la sicurezza di RSA?", a: ["Sulla difficoltà di calcolare il logaritmo","Sulla difficoltà di fattorizzare N per ricavare p e q","Sulla XOR bit-a-bit","Sulle curve ellittiche"], correct: 1, explain: "La sicurezza si basa sull'elevato sforzo computazionale per fattorizzare N e ricavare p, q."},
    {q: "Per decifrare in RSA si calcola:", a: ["m'_i^e mod N","m'_i^d mod N","m'_i XOR d","m'_i + d"], correct: 1, explain: "Decifratura: m_i = m'_i^d mod N, usando il parametro privato d."}
  ]
};

window.CHAPTERS.m1c9 = {
  title: "Attacchi crittografici",
  body: `
    <p>L'obiettivo dell'attaccante moderno è ricavare la <strong>chiave</strong> usata dal destinatario per decifrare. Esistono due approcci principali.</p>

    <h2 id="forza-bruta">Attacco a forza bruta</h2>
    <p>L'attaccante prova <strong>ogni possibile chiave</strong> su un frammento di messaggio cifrato fino a ottenere un testo in chiaro comprensibile.</p>

    <div class="info-box warn">
      <h4>⏱️ Esempio di tempo</h4>
      <p>Con chiave a <strong>256 bit</strong> e calcolatore che prova <strong>10<sup>9</sup> chiavi/secondo</strong>:</p>
      <code class="formula">T = 2<sup>256</sup>/10<sup>9</sup> s ≈ 3·10<sup>60</sup> anni</code>
      <p>Statisticamente l'attaccante riesce dopo aver provato la <strong>metà</strong> delle chiavi possibili. Con spazi di chiavi grandi è impraticabile.</p>
    </div>

    <h2 id="critto-analitico">Attacco critto-analitico</h2>
    <p>Sfrutta proprietà <strong>matematiche, statistiche o implementative</strong> dell'algoritmo per ricavare la chiave o il messaggio in chiaro.</p>

    <h3 id="statistico">Attacco statistico (esempio Cesare)</h3>
    <p>Si conta la frequenza di ogni carattere nel messaggio cifrato e la si confronta con la frequenza nota della lingua naturale.</p>
    <p>In italiano le lettere più frequenti sono <strong>E</strong> (≈12%), <strong>A</strong> (≈11%), <strong>I</strong> e <strong>O</strong>; le meno frequenti <strong>Q</strong>, <strong>Z</strong>, <strong>F</strong>.</p>

    <h3 id="esempio">Esempio</h3>
    <p>Cifrato (18 lettere): <code>R J J L D Q G L D P R D V F X R O D</code>. La <strong>D</strong> compare 4 volte (più frequente). Ipotesi: D ↔ E nella lingua → chiave <code>X = 20</code>. Provando si vede che il testo decifrato non ha senso. Si prova D ↔ A → chiave <code>X = 3</code> → decifrato: "OGGI ANDIAMO A SCUOLA". ✅</p>
  `,
  quiz: [
    {q: "Qual è l'obiettivo dell'attacco a forza bruta?", a: ["Compromettere il server","Provare tutte le possibili chiavi finché non si decifra il messaggio","Modificare il messaggio cifrato","Bloccare la trasmissione"], correct: 1, explain: "L'attacco a forza bruta prova sistematicamente tutte le chiavi possibili."},
    {q: "Statisticamente, dopo quante chiavi provate l'attaccante a forza bruta riesce?", a: ["Tutte","Una su mille","La metà delle chiavi possibili","Nessuna"], correct: 2, explain: "Statisticamente la chiave corretta viene trovata dopo aver provato circa metà delle chiavi possibili."},
    {q: "Cos'è un attacco critto-analitico?", a: ["Un attacco fisico al server","Un attacco che sfrutta proprietà matematiche/statistiche/implementative dell'algoritmo","Un attacco DDoS","Un'ingegneria sociale"], correct: 1, explain: "L'attacco critto-analitico sfrutta debolezze matematiche, statistiche o di implementazione."},
    {q: "L'attacco statistico è efficace contro:", a: ["Cifrari moderni come AES","Cifrari di sostituzione mono-alfabetica come Cesare","Vernam","RSA"], correct: 1, explain: "I cifrari di sostituzione mono-alfabetica preservano la frequenza dei caratteri, rendendoli vulnerabili."},
    {q: "Quali sono le lettere più frequenti in italiano?", a: ["Q, Z, F","E, A, I, O","X, K, Y","B, C, D"], correct: 1, explain: "Le lettere più frequenti in italiano sono E (~12%), A (~11%), I e O."}
  ]
};

window.CHAPTERS.m1c10 = {
  title: "Firma digitale",
  body: `
    <p>La <span class="term">firma digitale</span> consente di firmare un documento digitale con la stessa <strong>validità legale</strong> di una firma calligrafica su carta. È disciplinata in Italia dal <strong>D.Lgs. 7 marzo 2005, n. 82</strong>.</p>

    <h2 id="differenze">Differenze con la firma autografa</h2>
    <ul>
      <li>La firma digitale <strong>non è</strong> contenuta all'interno del documento.</li>
      <li><strong>Dipende</strong> non solo dal firmatario, ma anche dal <strong>contenuto</strong> del documento.</li>
      <li>Cambia se cambia il documento, ed è quindi anche un meccanismo di integrità.</li>
    </ul>

    <h2 id="calcolo">Come si calcola la firma digitale</h2>
    <p>Si utilizza un algoritmo di <strong>cifratura a chiave asimmetrica</strong>:</p>

    <div class="info-box key">
      <h4>🔑 Procedura semplice</h4>
      <p>Per firmare, il firmatario <strong>cifra il documento con la propria chiave privata</strong>.</p>
    </div>

    <h2 id="problema">Problema dell'efficienza</h2>
    <div class="info-box warn">
      <h4>⚠️ Inefficiente</h4>
      <p>Cifrare un intero documento con un cifrario asimmetrico è <strong>computazionalmente costoso</strong>, soprattutto per documenti grandi.</p>
    </div>

    <h2 id="hash-soluzione">Soluzione: usare un hash</h2>
    <p>Il firmatario:</p>
    <ol>
      <li>Calcola il <strong>digest</strong> del documento con un algoritmo di hash.</li>
      <li>Cifra <strong>solo il digest</strong> (un centinaio di bit) con la propria chiave privata.</li>
      <li>Trasmette al destinatario sia il <strong>documento originale</strong> sia la <strong>firma digitale</strong>.</li>
    </ol>

    <h2 id="verifica">Verifica della firma</h2>
    <p>Bob, ricevuto documento + firma + chiave pubblica di Alice:</p>
    <ol>
      <li>Applica il <strong>medesimo algoritmo di hash</strong> al documento ricevuto → ottiene digest A.</li>
      <li>Decifra la firma digitale con la chiave <strong>pubblica</strong> di Alice → ottiene digest B.</li>
      <li>Se <strong>digest A == digest B</strong> ✅ la firma è valida.</li>
    </ol>

    <h2 id="garanzie">Cosa garantisce la firma</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">🛡️</div>
        <div class="callout-title">Integrità</div>
        <div class="callout-text">Se il documento ricevuto è diverso da quello inviato, i digest saranno diversi.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">👤</div>
        <div class="callout-title">Autenticazione</div>
        <div class="callout-text">Solo chi possiede la chiave privata può aver prodotto quella firma decifrabile con la corrispondente pubblica.</div>
      </div>
    </div>

    <div class="info-box danger">
      <h4>⚠️ Perché il solo digest non basta?</h4>
      <p>Se Alice trasmettesse solo documento + digest (senza cifrare), Trudy potrebbe modificare il documento e <strong>ricalcolare il digest</strong>, rendendo l'attacco invisibile. La <strong>cifratura del digest</strong> con la chiave privata garantisce l'autenticazione.</p>
    </div>
  `,
  quiz: [
    {q: "Che cosa è la firma digitale?", a: ["Una sequenza di bit fissa associata a una persona","Il risultato della cifratura del digest del documento con la chiave privata del firmatario","Una scansione della firma autografa","Un timbro elettronico"], correct: 1, explain: "La firma digitale si calcola cifrando il digest del documento con la chiave privata del firmatario."},
    {q: "La firma digitale dipende:", a: ["Solo dal firmatario","Solo dal documento","Dal firmatario E dal contenuto del documento","Dalla data"], correct: 2, explain: "La firma dipende sia da chi firma sia dal contenuto del documento."},
    {q: "Quale chiave usa il firmatario per produrre la firma?", a: ["La propria chiave pubblica","La propria chiave privata","La chiave pubblica del destinatario","La chiave segreta condivisa"], correct: 1, explain: "Il firmatario usa la propria chiave privata."},
    {q: "Quale chiave usa il verificatore per controllare la firma?", a: ["La propria chiave privata","La chiave pubblica del firmatario","La chiave segreta","Una chiave generata casualmente"], correct: 1, explain: "Il verificatore decifra la firma con la chiave pubblica del firmatario."},
    {q: "Perché si firma il digest invece dell'intero documento?", a: ["Per sicurezza","Per efficienza computazionale: l'hash è breve","Perché l'hash è cifrato","Per legge"], correct: 1, explain: "Cifrare un breve digest (~100 bit) è molto più efficiente che cifrare l'intero documento."},
    {q: "Cosa garantisce la firma digitale?", a: ["Solo riservatezza","Solo integrità","Integrità e autenticazione del firmatario","Velocità di trasmissione"], correct: 2, explain: "La firma garantisce integrità (cambia col documento) e autenticazione (solo chi ha la chiave privata può crearla)."},
    {q: "Perché il solo digest non garantisce l'autenticazione?", a: ["L'hash è troppo lungo","Un attaccante può modificare il documento e ricalcolare il digest","Il digest non è univoco","L'hash non è deterministico"], correct: 1, explain: "Senza cifrare il digest con la chiave privata, chiunque può ricalcolarlo dopo aver modificato il documento."},
    {q: "Quale legge italiana ha introdotto la firma digitale?", a: ["L. 196/2003","D.Lgs. 7 marzo 2005, n. 82","D.Lgs. 196/2018","L. 633/41"], correct: 1, explain: "La firma digitale è disciplinata dal D.Lgs. 7 marzo 2005, n. 82 (CAD)."}
  ]
};

window.CHAPTERS.m1c11 = {
  title: "Algoritmi di hash",
  body: `
    <p>Un <span class="term">algoritmo di hash</span> <code>H</code> è un <strong>algoritmo deterministico</strong> che riceve in ingresso una sequenza <code>S</code> di bit di <strong>lunghezza arbitraria</strong> e produce in uscita una sequenza <code>H(S)</code> di <strong>lunghezza prefissata</strong> chiamata <span class="term">digest</span>.</p>

    <h2 id="lunghezza">Lunghezza del digest</h2>
    <p>Tipicamente <strong>128 bit</strong> o <strong>160 bit</strong>, a seconda dell'algoritmo. Tra i più utilizzati: <strong>MD4</strong>, <strong>MD5</strong>, <strong>SHA-1</strong>, <strong>RIPE-MD</strong>.</p>

    <h2 id="proprieta">Proprietà del digest</h2>
    <ul>
      <li><strong>Irreversibile</strong>: dal digest <strong>non</strong> è possibile risalire al documento originale.</li>
      <li><strong>Non univoco</strong>: due documenti diversi possono avere lo stesso digest (<span class="term">collisione</span>).</li>
    </ul>

    <h2 id="caratteristiche">Caratteristiche di un buon algoritmo di hash</h2>
    <div class="callout-grid">
      <div class="callout">
        <div class="callout-icon">⚡</div>
        <div class="callout-title">Efficienza computazionale</div>
        <div class="callout-text">Per ogni S, calcolare H(S) deve essere veloce.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">💥</div>
        <div class="callout-title">Effetto valanga</div>
        <div class="callout-text">Se due input hanno distanza di Hamming ~1 (un bit di differenza), i digest risultanti devono avere distanza di Hamming molto elevata.</div>
      </div>
      <div class="callout">
        <div class="callout-icon">🔒</div>
        <div class="callout-title">Pre-image resistance</div>
        <div class="callout-text">Dato un digest d, è computazionalmente impossibile determinare una sequenza S tale che H(S) = d.</div>
      </div>
    </div>

    <h2 id="utilizzi">Principali utilizzi</h2>
    <ul>
      <li>Garantire <strong>integrità</strong> di un messaggio.</li>
      <li>Calcolare la <strong>firma digitale</strong> (cifrando il digest con la chiave privata).</li>
      <li>Memorizzare in modo sicuro <strong>password</strong> nei database.</li>
      <li>Verifica di <strong>file scaricati</strong> (es. checksum di una ISO).</li>
    </ul>
  `,
  quiz: [
    {q: "Cos'è il digest?", a: ["Il messaggio cifrato","Una sequenza di bit di lunghezza prefissata, output dell'algoritmo di hash","Una chiave privata","Un certificato"], correct: 1, explain: "Il digest è l'output di un algoritmo di hash: ha lunghezza prefissata indipendente dall'input."},
    {q: "Le caratteristiche del digest sono:", a: ["Reversibile e univoco","Irreversibile e non univoco","Reversibile e non univoco","Irreversibile e univoco"], correct: 1, explain: "Il digest è irreversibile (non si può tornare al documento) e non univoco (esistono collisioni)."},
    {q: "Cos'è una collisione?", a: ["Un errore di trasmissione","Due documenti diversi che producono lo stesso digest","Un attacco DDoS","Una sovrapposizione di chiavi"], correct: 1, explain: "Una collisione si verifica quando due input diversi producono lo stesso digest."},
    {q: "Cosa significa effetto valanga?", a: ["L'algoritmo è veloce","Cambiando un singolo bit dell'input, il digest cambia drasticamente","Il digest è sempre uguale","Funziona solo con documenti grandi"], correct: 1, explain: "Una piccola modifica all'input deve produrre un digest molto diverso (alta distanza di Hamming)."},
    {q: "Quali sono algoritmi di hash comuni?", a: ["RSA, AES, DES","MD5, SHA-1, RIPE-MD","TCP, UDP, IP","HTTP, FTP, SMTP"], correct: 1, explain: "MD5, SHA-1 e RIPE-MD sono tra gli algoritmi di hash più diffusi."},
    {q: "Cosa significa 'pre-image resistance'?", a: ["L'hash è veloce","Dato un digest, è computazionalmente impossibile trovare l'input corrispondente","L'hash è univoco","L'hash usa chiavi"], correct: 1, explain: "La pre-image resistance impedisce di ricavare un input partendo dal suo digest."}
  ]
};

window.CHAPTERS.m1c12 = {
  title: "Autorità di Certificazione e certificati X.509",
  body: `
    <h2 id="problema-ca">Il problema</h2>
    <p>Come può un soggetto che vuole verificare una firma essere certo dell'<strong>identità della persona</strong> che dichiara di possedere una certa chiave pubblica?</p>

    <p>Senza un meccanismo di garanzia, Trudy potrebbe inserire in un database pubblico la propria chiave pubblica associata ai dati anagrafici di Alice, e firmare digitalmente al posto suo.</p>

    <h2 id="ca">Autorità di Certificazione (CA)</h2>
    <div class="info-box key">
      <h4>🏛️ Compito della CA</h4>
      <p>Un'<strong>Autorità di Certificazione</strong> emette <span class="term">certificati digitali</span> il cui scopo è garantire l'appartenenza di una <strong>chiave pubblica</strong> a una determinata <strong>persona</strong> detentrice della corrispondente chiave privata.</p>
    </div>

    <h3 id="compiti">Compiti principali</h3>
    <ul>
      <li>Verificare l'<strong>identità</strong> del soggetto che si vuole certificare.</li>
      <li><strong>Generare</strong> e <strong>firmare</strong> il certificato contenente chiave pubblica e dati personali.</li>
    </ul>

    <h2 id="x509">Standard X.509 v3</h2>
    <p>Lo standard internazionale che definisce il formato del file di certificato. La versione corrente è la <strong>v3</strong>.</p>

    <p>Un certificato X.509 contiene:</p>
    <ul>
      <li><strong>Dati del certificato</strong>: versione, numero di serie, data di inizio e fine validità.</li>
      <li><strong>Dati dell'intestatario</strong>: nome, cognome, codice fiscale, identificatore univoco.</li>
      <li><strong>Algoritmo di chiave asimmetrica e di hash</strong> usati dall'intestatario.</li>
      <li><strong>Chiave pubblica</strong> dell'intestatario.</li>
      <li><strong>Dati della Certification Authority</strong>: denominazione, identificativo univoco.</li>
      <li><strong>Algoritmo</strong> usato dalla CA per firmare il certificato.</li>
      <li><strong>Firma digitale della CA</strong> sull'intero certificato.</li>
    </ul>

    <h2 id="firma-ca">Come la CA firma il certificato</h2>
    <ol>
      <li>Applica un algoritmo di hash a tutti i campi.</li>
      <li>Firma il digest ottenuto con la propria <strong>chiave privata</strong>.</li>
    </ol>

    <h2 id="verifica-cert">Verifica della validità del certificato</h2>
    <ol>
      <li>Calcolare il digest del certificato.</li>
      <li>Procurarsi la chiave pubblica della CA e decifrare la firma apposta.</li>
      <li>Se le sequenze coincidono → il certificato è <strong>valido</strong> e la chiave pubblica appartiene davvero al soggetto.</li>
    </ol>

    <h2 id="smartcard">Distribuzione</h2>
    <p>L'ente certificatore rilascia all'utente:</p>
    <ul>
      <li>Un <strong>dispositivo di firma sicuro</strong> (smart card) contenente la chiave privata e il certificato.</li>
      <li>Un <strong>codice PIN</strong> da usare insieme alla smart card al momento della firma.</li>
    </ul>

    <h2 id="busta">Busta crittografica</h2>
    <p>L'insieme di documento + firma + certificato è chiamato <strong>busta crittografica</strong> (formato <strong>pkcs#7</strong>, estensione <code>.p7m</code>).</p>

    <h2 id="validita-temporale">Validità temporale e TSA</h2>
    <p>Ogni certificato ha una <strong>data di inizio</strong> e <strong>fine validità</strong>. Per attestare l'istante in cui un documento è stato firmato si ricorre alla <span class="term">Time-Stamping Authority (TSA)</span>:</p>
    <ol>
      <li>La TSA riceve l'hash della firma.</li>
      <li>Genera il <strong>TSTInfo</strong> (firma + data/ora).</li>
      <li>Firma il TSTInfo con la propria chiave privata e lo restituisce come <strong>Time-Stamp Token</strong>.</li>
    </ol>
    <p>TSA italiane principali: <strong>InfoCert, Aruba PEC, Intesi Group, Namirial, Poste Italiane</strong>.</p>

    <h2 id="revoca">Revoca di un certificato</h2>
    <p>Se l'utente smarrisce la smart card o non la ritiene più sicura, può <strong>revocare</strong> il certificato. Il software di firma può verificare lo stato in due modi:</p>
    <ul>
      <li><strong>CRL (Certificate Revocation List)</strong>: lista pubblica di certificati revocati ma non ancora scaduti, scaricabile dall'URL contenuto nel campo <em>CRL Distribution Point</em>.</li>
      <li><strong>OCSP (Online Certificate Status Protocol)</strong>: protocollo client-server (RFC 6960) che chiede lo stato del certificato in tempo reale al server della CA. URL nel campo <em>Authority Information Access</em>.</li>
    </ul>
  `,
  quiz: [
    {q: "Cosa fa un'Autorità di Certificazione (CA)?", a: ["Cifra i messaggi","Emette certificati che garantiscono l'appartenenza di una chiave pubblica a una persona","Genera chiavi simmetriche","Memorizza password"], correct: 1, explain: "La CA garantisce l'identità del proprietario di una chiave pubblica tramite un certificato digitale."},
    {q: "Qual è lo standard internazionale per i certificati digitali?", a: ["RFC 1918","X.509 v3","ISO 27001","SHA-256"], correct: 1, explain: "X.509 v3 è lo standard corrente per il formato dei certificati."},
    {q: "Cosa NON è contenuto in un certificato X.509?", a: ["Chiave pubblica dell'intestatario","Firma della CA","Chiave privata dell'intestatario","Data di inizio e fine validità"], correct: 2, explain: "La chiave privata NON viene mai inserita nel certificato: rimane esclusivamente nel possesso dell'intestatario."},
    {q: "Come la CA firma il certificato?", a: ["Con la chiave pubblica dell'utente","Con un algoritmo simmetrico","Calcola il digest dei campi e lo cifra con la propria chiave privata","Non lo firma"], correct: 2, explain: "La CA applica hash + cifratura del digest con la propria chiave privata."},
    {q: "Cos'è la 'busta crittografica'?", a: ["Una mail cifrata","L'insieme di documento, firma digitale e certificato del firmatario (formato p7m/pkcs#7)","Un certificato CA","Un file di backup"], correct: 1, explain: "La busta crittografica raccoglie il documento, la firma e il certificato in un unico file p7m."},
    {q: "A cosa serve una Time-Stamping Authority (TSA)?", a: ["Generare chiavi","Attestare data e ora di firma di un documento","Cifrare il certificato","Revocare certificati"], correct: 1, explain: "La TSA appone una marca temporale (timestamp) attestando data e ora della firma."},
    {q: "Cos'è una CRL?", a: ["Una lista pubblica di certificati revocati ma non ancora scaduti","Un protocollo di rete","Un cifrario","Un tipo di smart card"], correct: 0, explain: "La Certificate Revocation List elenca pubblicamente i certificati revocati."},
    {q: "OCSP è:", a: ["Un algoritmo di hash","Un protocollo client-server per verificare in tempo reale lo stato di un certificato","Un cifrario simmetrico","Una CA italiana"], correct: 1, explain: "Online Certificate Status Protocol (RFC 6960) verifica lo stato di un certificato online."},
    {q: "Cosa contiene la smart card rilasciata dalla CA?", a: ["La chiave pubblica","La chiave privata e il certificato dell'utente","Una copia del documento","La CRL"], correct: 1, explain: "La smart card contiene la chiave privata dell'utente e il suo certificato; va usata insieme al PIN."}
  ]
};
