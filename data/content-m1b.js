// Module 1 - chapters 4-6
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS.m1c4 = {
  title: "Algoritmo Diffie-Hellman (DH)",
  body: `
    <div class="info-box tip"><h4>📌 TL;DR</h4><p>Permette a due interlocutori di <strong>concordare una chiave segreta</strong> su un canale insicuro. Si basa su <code>(g<sup>x</sup> mod N)<sup>y</sup> = (g<sup>y</sup> mod N)<sup>x</sup></code>. Sicurezza: difficoltà del logaritmo discreto. Vulnerabile a <strong>MitM</strong> senza autenticazione → si combina con la firma digitale.</p></div>

    <p>Lo scopo dell'algoritmo è permettere a due interlocutori di scambiarsi <strong>in modo sicuro una chiave segreta</strong> attraverso un canale insicuro. La chiave servirà successivamente per cifrare/decifrare i messaggi con un cifrario simmetrico.</p>

    <h2 id="base-matematica">Base matematica</h2>
    <p>L'algoritmo si basa su questa uguaglianza:</p>
    <code class="formula">(g<sup>x</sup> mod N)<sup>y</sup> mod N = (g<sup>y</sup> mod N)<sup>x</sup> mod N = g<sup>x·y</sup> mod N</code>

    <h2 id="modulo">Operatore modulo</h2>
    <p><code>a mod b</code> è il <strong>resto</strong> della divisione intera tra dividendo <code>a</code> e divisore <code>b</code>. Esempi:</p>
    <ul>
      <li><code>10 mod 5 = 0</code></li>
      <li><code>3 mod 5 = 3</code></li>
      <li><code>7 mod 5 = 2</code></li>
    </ul>

    <h2 id="radice-primitiva">Radice primitiva</h2>
    <p>Una <strong>radice primitiva</strong> <code>a</code> di un numero primo <code>N</code> è un intero per cui, preso un qualsiasi <code>b</code> con <code>1 ≤ b ≤ N−1</code>, esiste un <code>i</code> tale per cui <code>b = a<sup>i</sup> mod N</code>.</p>

    <h2 id="diagram-flow">Diagramma di scambio</h2>
    <pre class="mermaid">
sequenceDiagram
  participant A as 👩 Alice
  participant B as 👨 Bob
  Note over A: sceglie N primo, g radice primitiva
  A->>B: N, g
  Note over A: sceglie x segreto
  Note over B: sceglie y segreto
  A->>B: g^x mod N
  B->>A: g^y mod N
  Note over A: K = (g^y mod N)^x mod N
  Note over B: K = (g^x mod N)^y mod N
  Note over A,B: 🔑 Chiave segreta condivisa
    </pre>

    <h2 id="passi">Passi dell'algoritmo</h2>
    <ol>
      <li><strong>Alice</strong> sceglie un numero <strong>primo grande</strong> <code>N</code> e una sua <strong>radice primitiva</strong> <code>g</code>.</li>
      <li>Alice trasmette <code>N</code> e <code>g</code> a Bob sul canale insicuro.</li>
      <li>Alice sceglie un valore segreto <code>x &lt; g</code>; Bob sceglie un valore segreto <code>y &lt; g</code>.</li>
      <li>Alice calcola <code>g<sup>x</sup> mod N</code> e lo invia a Bob.</li>
      <li>Bob calcola <code>g<sup>y</sup> mod N</code> e lo invia ad Alice.</li>
      <li>Alice calcola <code>(g<sup>y</sup> mod N)<sup>x</sup> mod N</code>; Bob calcola <code>(g<sup>x</sup> mod N)<sup>y</sup> mod N</code> → <strong>stessa chiave segreta</strong>.</li>
    </ol>

    <h2 id="sicurezza">Sicurezza</h2>
    <p>L'attaccante intercetta <code>N, g, g<sup>x</sup> mod N, g<sup>y</sup> mod N</code> ma <strong>non</strong> <code>x</code> e <code>y</code>. La sicurezza si basa sulla <strong>difficoltà computazionale</strong> di ricavare l'esponente dal logaritmo discreto.</p>

    <h2 id="mitm">Attacco Man-in-the-Middle</h2>
    <pre class="mermaid">
sequenceDiagram
  participant A as 👩 Alice
  participant T as 🦹 Trudy
  participant B as 👨 Bob
  A->>T: N, g, g^x mod N
  T->>A: g^z mod N (finge di essere Bob)
  T->>B: N, g, g^z mod N (finge di essere Alice)
  B->>T: g^y mod N
  Note over A,T: K_AT condivisa con Trudy
  Note over T,B: K_TB condivisa con Trudy
  A->>T: msg cifrato con K_AT
  Note over T: Decifra con K_AT, legge,<br/>ricifra con K_TB
  T->>B: msg cifrato con K_TB
    </pre>

    <div class="info-box danger">
      <h4>⚠️ Attacco attivo MitM</h4>
      <p>Se Trudy effettua un <strong>attacco attivo</strong>, intercetta i messaggi e si finge Bob con Alice e Alice con Bob. Risultato: due chiavi distinte (<code>K<sub>AT</sub></code> e <code>K<sub>TB</sub></code>) entrambe condivise con Trudy, che può decifrare e ricifrare ogni messaggio.</p>
      <p>L'attacco riesce perché <strong>non c'è autenticazione</strong>. Soluzione: usare la <strong>firma digitale</strong> sui messaggi scambiati.</p>
    </div>
  `,
  quiz: [
    {q: "A cosa serve l'algoritmo Diffie-Hellman?", a: ["Cifrare messaggi","Scambiare in modo sicuro una chiave segreta su canale insicuro","Firmare documenti","Generare hash"], correct: 1, explain: "DH permette a due interlocutori di concordare una chiave segreta su canale insicuro."},
    {q: "Quanto vale 7 mod 5?", a: ["0","1","2","5"], correct: 2, explain: "7 diviso 5 dà resto 2."},
    {q: "Su quale proprietà matematica si basa la sicurezza di Diffie-Hellman?", a: ["Fattorizzazione di numeri primi","Difficoltà di ricavare l'esponente x da g^x mod N","Gradi di una matrice","Operazioni di XOR"], correct: 1, explain: "La sicurezza si basa sulla difficoltà computazionale di calcolare il logaritmo discreto."},
    {q: "Cosa trasmette Alice nel canale insicuro durante DH?", a: ["Solo la chiave segreta finale","N, g e g^x mod N","Solo x","Solo y"], correct: 1, explain: "Alice trasmette il numero primo N, la radice primitiva g e il valore g^x mod N."},
    {q: "Cos'è un attacco Man-in-the-Middle in Diffie-Hellman?", a: ["Un attacco passivo","Un attacco attivo dove Trudy si interpone fingendosi Bob con Alice e Alice con Bob","Un guasto della rete","Un'intercettazione casuale"], correct: 1, explain: "Trudy si interpone attivamente, calcolando due chiavi distinte (KAT con Alice, KTB con Bob), e può decifrare/ricifrare tutto il traffico."},
    {q: "Come si previene l'attacco MitM in Diffie-Hellman?", a: ["Usando chiavi più lunghe","Cambiando spesso la chiave","Usando la firma digitale per autenticare i messaggi","Usando IPv6"], correct: 2, explain: "La firma digitale autentica l'identità degli interlocutori e impedisce a Trudy di fingere identità altrui."}
  ]
};

window.CHAPTERS.m1c5 = {
  title: "Cifrari di Cesare e Vernam",
  body: `
    <h2 id="cesare">Cifrario di Cesare</h2>
    <p>Usato per la prima volta da <strong>Giulio Cesare</strong> nelle campagne galliche (58-50 a.C.). L'algoritmo di cifratura <strong>sostituisce</strong> ogni lettera del messaggio in chiaro con quella collocata <code>X</code> posizioni più avanti nell'alfabeto.</p>
    <p>Il valore <code>X</code> è la <strong>chiave segreta</strong>. Se l'alfabeto ha <code>N</code> lettere, le chiavi distinte sono <code>N-1</code>. La decifratura sostituisce ogni lettera del cifrato con quella che la <strong>precede</strong> di <code>X</code> posizioni.</p>

    <p>Esempio con alfabeto inglese e chiave <code>X = 3</code>:</p>
    <code class="formula">A→D, B→E, C→F, ..., X→A, Y→B, Z→C</code>

    <div class="info-box warn">
      <h4>⚠️ Vulnerabilità</h4>
      <p>È vulnerabile sia a un <strong>attacco a forza bruta</strong> (poche chiavi) sia a un <strong>attacco statistico</strong>: contando la frequenza dei caratteri nel messaggio cifrato e confrontandola con quella della lingua, si scopre la chiave.</p>
    </div>

    <h2 id="vernam">Cifrario di Vernam (One-Time Pad)</h2>
    <p>Inventato da G. Vernam nel <strong>1917</strong>. È l'<strong>unico cifrario inviolabile</strong> (perfettamente sicuro).</p>

    <h3 id="caratteristiche">Caratteristiche della chiave</h3>
    <ul>
      <li>Generata in modo <strong>casuale</strong>.</li>
      <li>Ha <strong>lunghezza pari</strong> a quella del messaggio in chiaro.</li>
      <li>È <strong>monouso</strong>: la stessa chiave non può cifrare due messaggi diversi.</li>
    </ul>

    <h3 id="algoritmo">Algoritmo</h3>
    <p>Cifratura e decifratura effettuano lo <strong>XOR bit-a-bit</strong> tra messaggio e chiave.</p>

    <pre class="mermaid">
flowchart LR
  M[Messaggio<br/>10100011] --> X((XOR))
  K[Chiave<br/>11000111] --> X
  X --> C[Cifrato<br/>01100100]
  C --> X2((XOR))
  K2[Stessa chiave<br/>11000111] --> X2
  X2 --> M2[Chiaro<br/>10100011]
    </pre>


    <p>Esempio:</p>
    <code class="formula">Chiaro:    1 0 1 0 0 0 1 1
Chiave:    1 1 0 0 0 1 1 1
Cifrato:   0 1 1 0 0 1 0 0
(XOR ancora con la chiave riottiene il chiaro)</code>

    <h3 id="vantaggi">Vantaggi</h3>
    <ul>
      <li><strong>Efficiente</strong>: lo XOR è eseguito direttamente in hardware dall'ALU.</li>
      <li><strong>Parallelizzabile</strong>: ogni bit è cifrato indipendentemente.</li>
      <li><strong>Inviolabile</strong>: nessuna relazione statistica tra cifrato e chiaro. Anche con forza bruta, ogni possibile messaggio di senso compiuto può essere ottenuto da una chiave diversa, rendendo impossibile distinguere il vero messaggio.</li>
    </ul>

    <h3 id="svantaggi">Svantaggi</h3>
    <div class="info-box danger">
      <h4>⚠️ Limite pratico</h4>
      <p>Generare una chiave realmente casuale lunga quanto ogni messaggio è <strong>computazionalmente oneroso</strong>, soprattutto per trasmissioni continue. Sembra sia stato usato durante la guerra fredda dai servizi segreti dell'Est.</p>
    </div>
  `,
  quiz: [
    {q: "Chi inventò il cifrario di Cesare?", a: ["Giulio Cesare","Auguste Kerckhoffs","Vernam","Diffie e Hellman"], correct: 0, explain: "Giulio Cesare lo usò durante le campagne galliche (58-50 a.C.)."},
    {q: "Nel cifrario di Cesare con chiave X=3 e alfabeto inglese, la lettera 'A' diventa:", a: ["A","B","C","D"], correct: 3, explain: "Ogni lettera viene sostituita con quella 3 posizioni dopo: A→D."},
    {q: "Perché il cifrario di Cesare è facilmente violabile?", a: ["È troppo veloce","È vulnerabile ad attacchi statistici sulla frequenza dei caratteri","Usa chiavi troppo lunghe","Non usa chiavi"], correct: 1, explain: "Contando la frequenza delle lettere nel testo cifrato e confrontandola con quella della lingua naturale si scopre la chiave."},
    {q: "Il cifrario di Vernam è anche noto come:", a: ["DES","One-Time Pad","RSA","Triple-Cipher"], correct: 1, explain: "È noto come One-Time Pad perché la chiave è monouso."},
    {q: "Quale operazione esegue l'algoritmo di Vernam?", a: ["Sostituzione di lettere","XOR bit-a-bit tra messaggio e chiave","Permutazione di blocchi","Hash MD5"], correct: 1, explain: "Cifratura e decifratura effettuano XOR bit-a-bit tra il messaggio e la chiave."},
    {q: "Quale lunghezza deve avere la chiave del Vernam?", a: ["Sempre 128 bit","Pari a quella del messaggio in chiaro","Pari al doppio del messaggio","Indipendente dal messaggio"], correct: 1, explain: "La chiave deve avere la stessa lunghezza del messaggio per garantire la sicurezza perfetta."},
    {q: "Perché Vernam è inviolabile?", a: ["Usa chiavi molto lunghe","Il cifrato non ha alcuna relazione statistica col chiaro: ogni messaggio possibile può essere ottenuto","Usa algoritmi segreti","È stato approvato dall'NSA"], correct: 1, explain: "Per ogni testo cifrato di N bit, esistono chiavi di N bit che producono qualsiasi possibile testo in chiaro: l'attaccante non può distinguere quale sia il vero messaggio."},
    {q: "Qual è il principale svantaggio pratico del cifrario di Vernam?", a: ["È lento","Generare chiavi realmente casuali lunghe quanto ogni messaggio è computazionalmente oneroso","Non funziona con dati binari","Richiede hardware specifico"], correct: 1, explain: "La generazione di chiavi davvero casuali e lunghe quanto i messaggi è onerosa, specialmente per trasmissioni lunghe o continue."}
  ]
};

window.CHAPTERS.m1c6 = {
  title: "DES e 3-DES",
  body: `
    <div class="info-box tip">
      <h4>📌 TL;DR</h4>
      <p><strong>DES</strong>: cifrario simmetrico a blocchi di IBM (1975), chiave 56 bit, blocchi 64 bit, 16 round Feistel. Rotto a forza bruta nel 2001. <strong>3-DES</strong>: applica DES tre volte (cifra-decifra-cifra) per estendere la chiave; oggi obsoleto, sostituito da <strong>AES</strong>.</p>
    </div>

    <h2 id="des">DES (Data Encryption Standard)</h2>
    <p>Cifrario a chiave <strong>simmetrica</strong> realizzato da <strong>IBM</strong> e pubblicato nel <strong>1975</strong>. Diventa standard federale negli USA due anni dopo. Cifrario più usato al mondo fino al <strong>2001</strong>, quando divenne vulnerabile all'attacco a forza bruta.</p>

    <ul>
      <li>Chiave segreta effettiva: <strong>56 bit</strong>.</li>
      <li>Messaggio suddiviso in <strong>blocchi da 64 bit</strong> (con padding sull'ultimo blocco se necessario).</li>
      <li><code>2<sup>56</sup> ≈ 7.2·10<sup>16</sup></code> chiavi possibili — tempi accettabili per i calcolatori dei primi anni 2000.</li>
      <li>Architettura: <strong>cifrario a blocchi di Feistel</strong> con 16 round.</li>
    </ul>

    <h3 id="elaborazione-chiave">Elaborazione della chiave</h3>
    <p>A ogni blocco di 7 bit della chiave si aggiunge in coda un <strong>bit di parità pari</strong>: si ottiene una chiave elaborata di <strong>64 bit</strong>.</p>

    <h3 id="permutazione">Permutazione iniziale</h3>
    <p>I 64 bit del blocco vengono <strong>permutati</strong> secondo una mappa prefissata <code>PI</code>. Permutare significa variare la posizione dei bit secondo un array di indici.</p>
    <p>Esempio: sequenza <code>10011001</code> con array <code>[3,0,1,4,2,7,5,6]</code> → <code>00111010</code>.</p>

    <h2 id="round">I 16 round (Feistel)</h2>
    <p>In ogni round la sequenza di 64 bit (output della permutazione iniziale) viene divisa in due metà:</p>
    <ul>
      <li><strong>L<sub>i-1</sub></strong> — i 32 bit di sinistra prima del round <code>i</code>.</li>
      <li><strong>R<sub>i-1</sub></strong> — i 32 bit di destra.</li>
    </ul>
    <p>Ad ogni round si calcola:</p>
    <code class="formula">L<sub>i</sub> = R<sub>i-1</sub>
R<sub>i</sub> = L<sub>i-1</sub> XOR f(R<sub>i-1</sub>, K<sub>i</sub>)</code>
    <p>dove <code>f</code> è la funzione di Feistel (espansione, XOR con sub-chiave, S-box, permutazione) e <code>K<sub>i</sub></code> è una sub-chiave di 48 bit derivata dalla chiave principale.</p>

    <h2 id="permutazione-inversa">Permutazione inversa finale</h2>
    <p>L'output del 16° round viene permutato con la mappa <strong>PI<sup>-1</sup></strong>, inversa della permutazione iniziale PI: si ottiene così il blocco cifrato <code>m'<sub>i</sub></code>.</p>
    <p>Se l'array di permutazione PI all'indice <code>i</code> memorizza l'intero <code>p</code>, l'array PI<sup>-1</sup> all'indice <code>p</code> memorizza <code>i</code>.</p>

    <h2 id="decifratura-des">Algoritmo di decifratura</h2>
    <div class="info-box key">
      <h4>🔑 Simmetria di DES</h4>
      <p>Le caratteristiche di simmetria dell'algoritmo, comprese le permutazioni iniziale e inversa finale, fanno sì che <strong>l'algoritmo di decifratura sia identico a quello di cifratura</strong>, salvo l'applicazione delle sub-chiavi <strong>in ordine inverso</strong> (K<sub>16</sub>, K<sub>15</sub>, ..., K<sub>1</sub>).</p>
    </div>

    <h2 id="3des">3-DES (Triple DES)</h2>
    <p>Una volta dimostrato che DES con chiave effettiva di 56 bit non garantisce più la sicurezza (violabile a forza bruta), sono stati proposti altri algoritmi: <strong>3-DES a 2 chiavi</strong>, <strong>3-DES a 3 chiavi</strong>, <strong>IDEA</strong>, <strong>AES</strong>.</p>

    <h3 id="3des-2chiavi">3-DES a 2 chiavi</h3>
    <p><strong>Cifratura</strong>:</p>
    <ol>
      <li><strong>Cifra</strong> il messaggio in chiaro usando DES con chiave <code>K<sub>1</sub></code>.</li>
      <li><strong>Decifra</strong> il messaggio cifrato del passo precedente con DES e chiave <code>K<sub>2</sub></code>.</li>
      <li><strong>Cifra</strong> il risultato con DES e nuovamente la chiave <code>K<sub>1</sub></code>.</li>
    </ol>
    <p>Sintetizzato come: <code>EK<sub>1</sub>(DK<sub>2</sub>(EK<sub>1</sub>(M)))</code>.</p>
    <p><strong>Decifratura</strong>:</p>
    <ol>
      <li><strong>Decifra</strong> il messaggio cifrato con DES e chiave <code>K<sub>1</sub></code>.</li>
      <li><strong>Cifra</strong> il risultato con DES e chiave <code>K<sub>2</sub></code>.</li>
      <li><strong>Decifra</strong> il risultato con DES e chiave <code>K<sub>1</sub></code>.</li>
    </ol>
    <p>Risultato: <code>DK<sub>1</sub>(EK<sub>2</sub>(DK<sub>1</sub>(C)))</code>. Lunghezza chiave effettiva: 112 bit (2 × 56).</p>

    <h3 id="3des-3chiavi">3-DES a 3 chiavi</h3>
    <ul>
      <li>Cifratura: <code>cifra(K<sub>1</sub>) → decifra(K<sub>2</sub>) → cifra(K<sub>3</sub>)</code></li>
      <li>Decifratura: <code>decifra(K<sub>3</sub>) → cifra(K<sub>2</sub>) → decifra(K<sub>1</sub>)</code></li>
    </ul>
    <p>Lunghezza chiave effettiva: 168 bit (3 × 56). Più sicuro ma ancora più lento.</p>

    <pre class="mermaid">
flowchart LR
  M[Messaggio] --> E1["DES.cifra(K1)"]
  E1 --> D1["DES.decifra(K2)"]
  D1 --> E2["DES.cifra(K1)"]
  E2 --> C[Cifrato 3-DES]
    </pre>

    <h3 id="limiti-3des">Limiti</h3>
    <div class="info-box warn">
      <h4>⚠️ Problemi del 3-DES</h4>
      <ul>
        <li><strong>Prestazioni</strong>: tre operazioni DES per ogni blocco — significativamente più lento di AES.</li>
        <li><strong>Dimensione blocco</strong>: 64 bit è considerato troppo piccolo per la sicurezza moderna, vulnerabile ad attacchi basati su collisioni come il <em>birthday attack</em>.</li>
      </ul>
    </div>
    <p>Oggi il cifrario simmetrico più utilizzato è <strong>AES</strong> (Advanced Encryption Standard).</p>
  `,
  quiz: [
    {q: "Da chi è stato realizzato l'algoritmo DES?", a: ["NSA","IBM","Microsoft","RSA Security"], correct: 1, explain: "DES (Data Encryption Standard) è stato realizzato da IBM e pubblicato nel 1975."},
    {q: "Quanto è lunga la chiave segreta del DES?", a: ["32 bit","56 bit","64 bit","128 bit"], correct: 1, explain: "La chiave segreta del DES è di 56 bit (poi elaborata a 64 con bit di parità)."},
    {q: "Su blocchi di quale dimensione lavora DES?", a: ["32 bit","56 bit","64 bit","128 bit"], correct: 2, explain: "Il messaggio viene suddiviso in blocchi da 64 bit."},
    {q: "Quando DES è diventato vulnerabile a forza bruta?", a: ["1985","1995","Nel 2001","Mai"], correct: 2, explain: "Nel 2001 i calcolatori erano in grado di provare tutte le 2^56 chiavi in tempi ragionevoli."},
    {q: "Quante operazioni DES esegue 3-DES per ogni blocco?", a: ["1","2","3","6"], correct: 2, explain: "3-DES applica DES tre volte (cifra-decifra-cifra)."},
    {q: "In 3-DES a due chiavi, qual è la sequenza di cifratura?", a: ["cifra(K1)→cifra(K1)→cifra(K1)","cifra(K1)→decifra(K2)→cifra(K1)","decifra(K1)→cifra(K2)→decifra(K1)","cifra(K1)→cifra(K2)→cifra(K1)"], correct: 1, explain: "La sequenza è cifra(K1)→decifra(K2)→cifra(K1)."},
    {q: "Qual è il successore moderno di 3-DES?", a: ["RSA","AES","SHA","TLS"], correct: 1, explain: "AES (Advanced Encryption Standard) è il cifrario simmetrico più utilizzato oggi."},
    {q: "Perché 3-DES è considerato non più sicuro per grandi volumi di dati?", a: ["Le chiavi sono troppo corte","La dimensione del blocco di 64 bit è vulnerabile a birthday attack","Non usa il principio di Kerckhoffs","Non è pubblico"], correct: 1, explain: "Il blocco a 64 bit lo rende vulnerabile a collisioni (birthday attack) su grandi volumi."}
  ]
};
