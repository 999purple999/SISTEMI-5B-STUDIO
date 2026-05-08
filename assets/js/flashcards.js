// Flashcards with SM-2 spaced repetition
window.Flashcards = (function () {
  const KEY = 'sistemi5b.flashcards.v1';
  const ALL_CARDS_KEY = 'sistemi5b.flashcards.cards.v1';

  function loadDb() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
  }
  function saveDb(db) {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {}
  }

  // Build cards from quizzes + manual term cards
  const TERM_CARDS = [
    // Module 1
    { q: 'Cos\'è la riservatezza in una trasmissione?', a: 'L\'attaccante, anche intercettando il messaggio, NON è in grado di comprenderne il contenuto.', mod: 1, topic: 'Sicurezza' },
    { q: 'Cos\'è l\'integrità in una trasmissione?', a: 'Il destinatario può verificare se il messaggio ricevuto è uguale a quello trasmesso dall\'autore.', mod: 1, topic: 'Sicurezza' },
    { q: 'Cos\'è l\'autenticazione in una trasmissione?', a: 'Il destinatario può verificare l\'identità dell\'autore del messaggio.', mod: 1, topic: 'Sicurezza' },
    { q: 'Principio di Kerckhoffs?', a: 'La sicurezza non deve dipendere dalla segretezza dell\'algoritmo, ma dalla segretezza di un parametro chiamato chiave (1883).', mod: 1, topic: 'Crittografia' },
    { q: 'Quante chiavi servono in una rete con N utenti per crittografia simmetrica?', a: 'N(N-1)/2 chiavi totali, ognuno gestisce N-1 chiavi.', mod: 1, topic: 'Crittografia' },
    { q: 'Quante chiavi servono in una rete con N utenti per crittografia asimmetrica?', a: '2N (una pubblica e una privata per ognuno).', mod: 1, topic: 'Crittografia' },
    { q: 'Diffie-Hellman: a cosa serve?', a: 'Permette a due interlocutori di scambiare in modo sicuro una chiave segreta su canale insicuro.', mod: 1, topic: 'DH' },
    { q: 'Su cosa si basa la sicurezza di Diffie-Hellman?', a: 'Sulla difficoltà computazionale di calcolare il logaritmo discreto: ricavare x da g^x mod N noti g e N.', mod: 1, topic: 'DH' },
    { q: 'Quale tecnica protegge DH dall\'attacco MitM?', a: 'La firma digitale: autentica i messaggi scambiati impedendo a Trudy di fingersi un altro.', mod: 1, topic: 'DH' },
    { q: 'Cifrario di Cesare: chiave e algoritmo?', a: 'Sostituzione: ogni lettera viene rimpiazzata con quella X posizioni dopo. La chiave è X.', mod: 1, topic: 'Cifrari' },
    { q: 'Cifrario di Vernam: caratteristiche?', a: 'One-Time Pad: chiave casuale, lunga quanto il messaggio, monouso. XOR bit-a-bit. UNICO cifrario inviolabile.', mod: 1, topic: 'Cifrari' },
    { q: 'DES: chiave, blocco, anno?', a: 'Chiave 56 bit (elaborata a 64 con bit di parità), blocchi 64 bit, IBM 1975, vulnerabile dal 2001.', mod: 1, topic: 'DES' },
    { q: '3-DES a 2 chiavi: sequenza di cifratura?', a: 'cifra(K1) → decifra(K2) → cifra(K1).', mod: 1, topic: 'DES' },
    { q: '3-DES a 3 chiavi: sequenza?', a: 'cifra(K1) → decifra(K2) → cifra(K3).', mod: 1, topic: 'DES' },
    { q: 'Perché 3-DES è obsoleto?', a: 'Lento (3 operazioni DES per blocco) e blocco a 64 bit vulnerabile a birthday attack. AES lo rimpiazza.', mod: 1, topic: 'DES' },
    { q: 'RSA: anno e inventori?', a: 'Rivest, Shamir, Adleman nel 1978.', mod: 1, topic: 'RSA' },
    { q: 'RSA: come si calcolano le chiavi?', a: '1) Scegli p,q primi. 2) N=p·q, b=(p-1)(q-1). 3) Pubblica: e<N primo con b → K_pub=[N,e]. 4) Privata: d tale che (e·d) mod b = 1 → K_priv=[N,d].', mod: 1, topic: 'RSA' },
    { q: 'RSA: cifratura e decifratura?', a: 'Cifra: m\' = m^e mod N. Decifra: m = m\'^d mod N.', mod: 1, topic: 'RSA' },
    { q: 'Su cosa si basa la sicurezza di RSA?', a: 'Sulla difficoltà di fattorizzare N (=p·q) per ricavare p e q indispensabili per calcolare d.', mod: 1, topic: 'RSA' },
    { q: 'Lunghezza chiave RSA sicura oggi?', a: '2048 bit per la pubblica.', mod: 1, topic: 'RSA' },
    { q: 'Cos\'è il digest?', a: 'Output di un algoritmo di hash: sequenza di bit di lunghezza prefissata (128 o 160 bit).', mod: 1, topic: 'Hash' },
    { q: 'Proprietà del digest?', a: 'Irreversibile (non si può tornare al messaggio) e non univoco (esistono collisioni).', mod: 1, topic: 'Hash' },
    { q: 'Effetto valanga di un hash?', a: 'Un piccolo cambiamento nell\'input deve produrre un output molto diverso (alta distanza di Hamming).', mod: 1, topic: 'Hash' },
    { q: 'Algoritmi di hash più usati?', a: 'MD4, MD5, SHA-1, RIPE-MD.', mod: 1, topic: 'Hash' },
    { q: 'Come si calcola la firma digitale?', a: '1) Hash del documento → digest. 2) Cifra il digest con la chiave PRIVATA del firmatario.', mod: 1, topic: 'Firma' },
    { q: 'Come si verifica una firma digitale?', a: '1) Calcola digest del documento ricevuto. 2) Decifra la firma con la chiave PUBBLICA del firmatario. 3) Confronta i due digest.', mod: 1, topic: 'Firma' },
    { q: 'Cosa garantisce la firma digitale?', a: 'Integrità + autenticazione (NON riservatezza).', mod: 1, topic: 'Firma' },
    { q: 'Cos\'è una CA?', a: 'Certification Authority: emette certificati che garantiscono l\'appartenenza di una chiave pubblica a una persona.', mod: 1, topic: 'CA' },
    { q: 'Standard del certificato digitale?', a: 'X.509 v3.', mod: 1, topic: 'CA' },
    { q: 'Cosa contiene un certificato X.509?', a: 'Dati certificato + dati intestatario + chiave pubblica intestatario + dati CA + algoritmo + firma della CA.', mod: 1, topic: 'CA' },
    { q: 'Cos\'è una CRL?', a: 'Certificate Revocation List: elenco pubblico di certificati revocati ma non scaduti.', mod: 1, topic: 'CA' },
    { q: 'Cos\'è OCSP?', a: 'Online Certificate Status Protocol: verifica in tempo reale lo stato di un certificato (RFC 6960).', mod: 1, topic: 'CA' },
    { q: 'Cos\'è una TSA?', a: 'Time-Stamping Authority: appone una marca temporale (TST) attestando data e ora di firma.', mod: 1, topic: 'CA' },
    { q: 'Formato della busta crittografica?', a: 'pkcs#7 con estensione .p7m. Contiene documento + firma + certificato.', mod: 1, topic: 'CA' },

    // Module 2
    { q: 'Differenza Network vs Personal firewall?', a: 'Network: dispositivo con 2+ interfacce che protegge intera LAN. Personal: software su singolo host.', mod: 2, topic: 'Firewall' },
    { q: 'Cosa è una ACL?', a: 'Access Control List: lista di regole permit/deny applicate al traffico in un\'interfaccia router.', mod: 2, topic: 'ACL' },
    { q: 'Logica first-match wins?', a: 'Si applica l\'azione della PRIMA regola che produce match; le successive non sono valutate.', mod: 2, topic: 'ACL' },
    { q: 'Default policy ACL Cisco?', a: 'Deny: se nessuna regola produce match, il pacchetto viene scartato.', mod: 2, topic: 'ACL' },
    { q: 'ACL standard cosa filtrano? Numeri?', a: 'Solo IP mittente. Numeri 1-99. Si applicano vicino alla destinazione.', mod: 2, topic: 'ACL' },
    { q: 'ACL estese cosa filtrano? Numeri?', a: 'IP mittente, destinatario, protocollo, porte. Numeri 100-199. Si applicano vicino alla sorgente.', mod: 2, topic: 'ACL' },
    { q: 'Wildcard 0.0.0.0 cosa indica?', a: 'Match esatto su tutti i 32 bit: corrisponde a un singolo host.', mod: 2, topic: 'ACL' },
    { q: 'Wildcard 0.0.0.255 cosa indica?', a: 'Confronta solo i primi 24 bit: corrisponde a una /24.', mod: 2, topic: 'ACL' },
    { q: 'Tre categorie di firewall?', a: 'Packet Filter (L3-L4), Stateful Packet Inspection (con tabella sessioni), Application Level (L7).', mod: 2, topic: 'Firewall' },
    { q: 'Cos\'è un proxy?', a: 'Processo che si interpone tra client e server per uno specifico protocollo applicativo.', mod: 2, topic: 'Proxy' },
    { q: 'Tre vantaggi di un proxy privato?', a: 'Monitoraggio attività (log), caching locale, filtraggio livello applicazione.', mod: 2, topic: 'Proxy' },
    { q: 'Tre topologie proxy?', a: 'Single, Multiple Horizontally (load balancer), Multiple Vertically (cascata).', mod: 2, topic: 'Proxy' },
    { q: 'I tre blocchi di IP privati (RFC 1918)?', a: '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.', mod: 2, topic: 'IP' },
    { q: 'Anno e RFC degli IP privati?', a: '1996, RFC 1918.', mod: 2, topic: 'IP' },
    { q: 'Cosa fa NAT?', a: 'Sostituisce l\'IP privato del mittente con un IP pubblico del pool del router.', mod: 2, topic: 'NAT' },
    { q: 'Cosa fa PAT (NAT Overload)?', a: 'Usa UN solo IP pubblico per tutti gli host modificando anche le porte mittenti.', mod: 2, topic: 'NAT' },
    { q: 'Perché PAT cambia la porta del mittente?', a: 'Processi su host diversi possono avere la stessa porta: senza il cambio il router non saprebbe a chi instradare la risposta.', mod: 2, topic: 'NAT' },
    { q: 'Cos\'è SNAT?', a: 'Static NAT: associa permanentemente IP privati a IP pubblici. Usato per server pubblici della DMZ.', mod: 2, topic: 'NAT' },
    { q: 'Cos\'è il Port Forwarding?', a: 'Configura il router per inoltrare il traffico ricevuto su una specifica porta del suo IP pubblico a un host privato.', mod: 2, topic: 'NAT' },
    { q: 'Cosa è IPSec?', a: 'Architettura di sicurezza a livello 3 (IP) che fornisce riservatezza, integrità e autenticazione.', mod: 2, topic: 'IPSec' },
    { q: 'Differenza ESP vs AH in IPSec?', a: 'ESP cripta + integrità + autenticazione. AH solo integrità + autenticazione (no cifratura).', mod: 2, topic: 'IPSec' },
    { q: 'Modalità Transport vs Tunnel di IPSec?', a: 'Transport: protegge solo payload (host-to-host). Tunnel: protegge intero pacchetto IP (gateway-to-gateway, VPN).', mod: 2, topic: 'IPSec' },
    { q: 'Cos\'è una SA in IPSec?', a: 'Security Association: connessione logica unidirezionale che definisce algoritmi, chiavi, modalità.', mod: 2, topic: 'IPSec' },
    { q: 'Quante SA per una comunicazione bidirezionale?', a: 'Due, una per direzione.', mod: 2, topic: 'IPSec' },
    { q: 'SPD vs SAD?', a: 'SPD = Security Policy Database (le policy). SAD = Security Association Database (le SA attive).', mod: 2, topic: 'IPSec' },
    { q: 'Cos\'è una VPN?', a: 'Rete privata virtuale: tunnel cifrato attraverso Internet pubblico per collegare reti/host in sicurezza.', mod: 2, topic: 'VPN' },
    { q: 'Tipi di VPN?', a: 'Site-to-Site (due reti, gateway-to-gateway) e Remote Access (singolo client → LAN).', mod: 2, topic: 'VPN' },
    { q: 'Cos\'è una DMZ?', a: 'Sottorete intermedia tra LAN interna e Internet che ospita i server pubblici dell\'azienda.', mod: 2, topic: 'DMZ' },
    { q: 'Tre modi di assegnare IP alla DMZ?', a: 'IP pubblico diretto, IP privato + SNAT, IP privato + Port Forwarding.', mod: 2, topic: 'DMZ' },
    { q: 'TLS: a che livello opera?', a: 'Trasporto, sopra TCP. Versione corrente: TLS 1.3 (2018).', mod: 2, topic: 'TLS' },
    { q: 'Porte HTTP vs HTTPS?', a: 'HTTP = 80, HTTPS = 443.', mod: 2, topic: 'TLS' },
    { q: 'TLS combina quali tipi di crittografia?', a: 'Asimmetrica per autenticazione e scambio chiave + simmetrica per cifrare il traffico.', mod: 2, topic: 'TLS' },

    // Module 3
    { q: 'Cosa è un data center?', a: 'Struttura fisica che ospita server, storage e apparati di rete.', mod: 3, topic: 'DC' },
    { q: 'Server farm?', a: 'L\'insieme dei server di un data center.', mod: 3, topic: 'DC' },
    { q: 'Cos\'è il PUE?', a: 'Power Usage Effectiveness = energia totale DC / energia IT. Ideale 1.0.', mod: 3, topic: 'DC' },
    { q: 'Quanti livelli Tier?', a: '4: I (no ridondanza, 99.671%), II, III, IV (fault-tolerant, 99.995%).', mod: 3, topic: 'DC' },
    { q: 'Hosting vs Housing?', a: 'Housing: hardware del cliente in spazio del fornitore. Hosting: hardware del fornitore.', mod: 3, topic: 'DC' },
    { q: 'Cos\'è la virtualizzazione?', a: 'Eseguire più macchine virtuali con SO diversi sulla stessa macchina fisica.', mod: 3, topic: 'Virt' },
    { q: 'Hypervisor tipo 1 vs tipo 2?', a: 'Tipo 1 (bare-metal): direttamente su hardware (ESXi, KVM). Tipo 2 (hosted): sopra un SO (VirtualBox).', mod: 3, topic: 'Virt' },
    { q: 'I 3 paradigmi cloud?', a: 'IaaS (infrastruttura: AWS EC2), PaaS (piattaforma: Heroku), SaaS (applicazione: Gmail).', mod: 3, topic: 'Cloud' },
    { q: 'Cloud pubblico vs privato?', a: 'Pubblico: multi-tenant (AWS, Azure). Privato: dedicato a un\'unica organizzazione.', mod: 3, topic: 'Cloud' },
    { q: 'Cloud ibrido?', a: 'Combinazione di privato + pubblico, con possibilità di muovere workload (cloud bursting).', mod: 3, topic: 'Cloud' },

    // Module 4
    { q: 'Quanti bit IPv4 vs IPv6?', a: 'IPv4 = 32 bit. IPv6 = 128 bit.', mod: 4, topic: 'IP' },
    { q: 'Indirizzo di rete vs broadcast in /24?', a: 'Rete: bit host tutti 0 (es. 192.168.1.0). Broadcast: bit host tutti 1 (192.168.1.255).', mod: 4, topic: 'IP' },
    { q: 'Quanti host in una /26?', a: '62 host utili (64 totali - 2).', mod: 4, topic: 'IP' },
    { q: 'Quanti host in una /30?', a: '2 (perfetto per link point-to-point).', mod: 4, topic: 'IP' },
    { q: 'FLSM vs VLSM?', a: 'FLSM: tutte le sottoreti con stessa maschera. VLSM: maschere variabili in base alle esigenze (più efficiente).', mod: 4, topic: 'IP' },
    { q: 'Loopback IPv4 e IPv6?', a: 'IPv4: 127.0.0.1. IPv6: ::1.', mod: 4, topic: 'IP' },
    { q: 'IP "all zeros" 0.0.0.0?', a: 'Usato dall\'host quando non conosce ancora il proprio IP (es. DHCP DISCOVER) o come rotta default.', mod: 4, topic: 'IP' },
    { q: 'APIPA range?', a: '169.254.0.0/16: l\'host si autoassegna se DHCP fallisce.', mod: 4, topic: 'IP' },
    { q: 'Routing statico vs dinamico?', a: 'Statico: configurato a mano, no overhead, non si adatta. Dinamico: protocolli, si adatta automaticamente.', mod: 4, topic: 'Routing' },
    { q: 'Tipi di protocolli di routing?', a: 'Distance Vector (RIP), Link State (OSPF), Path Vector (BGP).', mod: 4, topic: 'Routing' },
    { q: 'IGP vs EGP?', a: 'IGP: dentro un AS (RIP, OSPF). EGP: tra AS (BGP).', mod: 4, topic: 'Routing' },
    { q: 'Ripping IPv6 indirizzi speciali?', a: '::/128 = non specificato; ::1 = loopback; ff02::1 = tutti i nodi link-local; fe80::/10 = link-local.', mod: 4, topic: 'IPv6' },
    { q: 'IPv6 ha il broadcast?', a: 'NO. È sostituito dal multicast (ff02::1 = tutti i nodi link-local).', mod: 4, topic: 'IPv6' },
    { q: 'Cos\'è SLAAC?', a: 'Stateless Address Autoconfiguration: l\'host si configura un IPv6 dal prefisso annunciato dal router.', mod: 4, topic: 'IPv6' },
    { q: 'BSS vs ESS?', a: 'BSS = un AP con le sue stazioni. ESS = più BSS interconnessi (permette roaming).', mod: 4, topic: 'WiFi' },
    { q: 'CSMA/CA vs CSMA/CD?', a: 'CA = Collision Avoidance (Wi-Fi). CD = Collision Detection (Ethernet cablato).', mod: 4, topic: 'WiFi' },
    { q: 'WEP vs WPA2 vs WPA3?', a: 'WEP (1997, rotto). WPA2 (2004, AES-CCMP, standard). WPA3 (2018, SAE, più sicuro).', mod: 4, topic: 'WiFi' },
    { q: 'Cosa è una VLAN?', a: 'LAN logica creata su uno switch: segmenta il traffico, permette flessibilità, riduce broadcast.', mod: 4, topic: 'VLAN' },
    { q: 'Standard VLAN tagging?', a: 'IEEE 802.1Q. Aggiunge un tag di 4 byte al frame Ethernet con VID a 12 bit (1-4094).', mod: 4, topic: 'VLAN' },
    { q: 'Access port vs Trunk port?', a: 'Access: una sola VLAN, frame senza tag. Trunk: più VLAN, frame taggati 802.1Q.', mod: 4, topic: 'VLAN' },
    { q: 'Router on a Stick?', a: 'Tecnica con interfaccia router in trunk + sub-interfacce (una per VLAN) per inter-VLAN routing.', mod: 4, topic: 'VLAN' },
    { q: 'Le 4 fasi DHCP?', a: 'DORA: Discover (broadcast), Offer (proposta server), Request (scelta), Acknowledge (conferma).', mod: 4, topic: 'DHCP' },
    { q: 'Porte DHCP?', a: 'Server: 67. Client: 68. Entrambi UDP.', mod: 4, topic: 'DHCP' },
    { q: 'Cos\'è un DHCP relay?', a: 'Dispositivo che inoltra DHCP tra reti diverse (i broadcast non attraversano i router).', mod: 4, topic: 'DHCP' },
    { q: 'DNS porta?', a: '53 (UDP/TCP).', mod: 4, topic: 'DNS' },
    { q: 'Tipi di server DNS?', a: 'Root (13 cluster), TLD (.com, .it...), Autoritativo (per dominio specifico), Resolver/Caching.', mod: 4, topic: 'DNS' },
    { q: 'Risoluzione DNS ricorsiva vs iterativa?', a: 'Ricorsiva: il resolver fa tutto e dà la risposta finale. Iterativa: richiesta-per-richiesta a ogni server.', mod: 4, topic: 'DNS' },
    { q: 'Record DNS A vs AAAA vs MX?', a: 'A → IPv4. AAAA → IPv6. MX → mail server del dominio.', mod: 4, topic: 'DNS' },
    { q: 'HTTP porta? Versione moderna?', a: 'Porta 80 (443 per HTTPS). Versione moderna: HTTP/3 su QUIC (UDP).', mod: 4, topic: 'HTTP' },
    { q: 'HTTP è stateful?', a: 'NO, è stateless. Si usano cookie e sessioni per mantenere lo stato.', mod: 4, topic: 'HTTP' },
    { q: 'Connessione persistente HTTP?', a: 'HTTP/1.1+: una sola TCP serve più richieste/risposte (no overhead di apertura ad ogni richiesta).', mod: 4, topic: 'HTTP' },
    { q: 'Codici HTTP più comuni?', a: '200 OK · 301/302 redirect · 304 Not Modified · 401/403 auth · 404 Not Found · 500 Server Error.', mod: 4, topic: 'HTTP' }
  ];

  function getAllCards() {
    // Combine quiz Q&A + manual term cards
    const cards = [...TERM_CARDS];
    if (window.MODULES && window.CHAPTERS) {
      window.MODULES.forEach(mod => {
        mod.chapters.forEach(c => {
          const ch = window.CHAPTERS[c.id];
          if (ch && ch.quiz) {
            ch.quiz.forEach((q, idx) => {
              cards.push({
                q: q.q,
                a: q.a[q.correct] + (q.explain ? ' — ' + q.explain : ''),
                mod: mod.id,
                topic: c.title,
                fromQuiz: true,
                id: c.id + '_q' + idx
              });
            });
          }
        });
      });
    }
    // Assign id if missing
    cards.forEach((c, i) => { if (!c.id) c.id = 'card_' + i; });
    return cards;
  }

  // SM-2 algorithm
  function review(card, quality /* 0..5 */) {
    const db = loadDb();
    const c = db[card.id] || { ef: 2.5, interval: 0, reps: 0, due: 0 };
    if (quality < 3) {
      c.reps = 0;
      c.interval = 1;
    } else {
      if (c.reps === 0) c.interval = 1;
      else if (c.reps === 1) c.interval = 6;
      else c.interval = Math.round(c.interval * c.ef);
      c.reps += 1;
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    }
    c.due = Date.now() + c.interval * 86400000;
    c.lastReview = Date.now();
    db[card.id] = c;
    saveDb(db);
  }

  function dueCards() {
    const db = loadDb();
    const all = getAllCards();
    const now = Date.now();
    return all.filter(c => {
      const e = db[c.id];
      return !e || e.due <= now;
    });
  }

  function stats() {
    const db = loadDb();
    const all = getAllCards();
    const now = Date.now();
    let due = 0, learning = 0, mastered = 0, total = all.length;
    all.forEach(c => {
      const e = db[c.id];
      if (!e) due++;
      else if (e.due <= now) due++;
      else if (e.reps < 3) learning++;
      else mastered++;
    });
    return { total, due, learning, mastered };
  }

  return { getAllCards, review, dueCards, stats };
})();
