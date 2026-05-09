// All modules and chapters metadata
window.MODULES = [
  {
    id: 1,
    num: "Modulo 1",
    color: "#ff453a",
    icon: "🔐",
    title: "Crittografia e firma digitale",
    desc: "Riservatezza, integrità e autenticazione delle comunicazioni. Cifrari simmetrici, asimmetrici e firme digitali.",
    chapters: [
      { id: "m1c1", slug: "introduzione",        title: "Introduzione alla sicurezza",   icon: "🛡️" },
      { id: "m1c2", slug: "kerckhoffs",          title: "Principio di Kerckhoffs",       icon: "🔑" },
      { id: "m1c3", slug: "simmetrica",          title: "Crittografia simmetrica",       icon: "🔁" },
      { id: "m1c4", slug: "diffie-hellman",      title: "Algoritmo Diffie-Hellman",      icon: "🤝" },
      { id: "m1c5", slug: "cesare-vernam",       title: "Cifrari di Cesare e Vernam",    icon: "📜" },
      { id: "m1c6", slug: "des",                 title: "DES e 3-DES",                   icon: "🧱" },
      { id: "m1c7", slug: "asimmetrica",         title: "Crittografia asimmetrica",      icon: "🗝️" },
      { id: "m1c8", slug: "rsa",                 title: "Algoritmo RSA",                 icon: "🧮" },
      { id: "m1c9", slug: "attacchi",            title: "Attacchi crittografici",        icon: "⚔️" },
      { id: "m1c10", slug: "firma-digitale",     title: "Firma digitale",                icon: "✍️" },
      { id: "m1c11", slug: "hash",               title: "Algoritmi di hash",             icon: "#️⃣" },
      { id: "m1c12", slug: "ca-certificati",     title: "CA e certificati X.509",        icon: "📜" }
    ]
  },
  {
    id: 2,
    num: "Modulo 2",
    color: "#ff9f0a",
    icon: "🛡️",
    title: "Filtraggio e protezione delle reti locali",
    desc: "Firewall, ACL, proxy, NAT/PAT, IPSec, VPN, DMZ e TLS per proteggere le reti.",
    chapters: [
      { id: "m2c1", slug: "firewall",            title: "Firewall (Network e Personal)", icon: "🔥" },
      { id: "m2c2", slug: "acl",                 title: "ACL standard ed estese",        icon: "📋" },
      { id: "m2c3", slug: "categorie-firewall",  title: "Categorie di firewall",         icon: "🏷️" },
      { id: "m2c4", slug: "proxy",               title: "Proxy server",                  icon: "🔄" },
      { id: "m2c5", slug: "ip-pubblici-privati", title: "Indirizzi IP pubblici e privati", icon: "🌐" },
      { id: "m2c6", slug: "nat-pat",             title: "NAT, PAT, SNAT e Port Forwarding", icon: "🔀" },
      { id: "m2c7", slug: "ipsec",               title: "Architettura IPSec",            icon: "🔒" },
      { id: "m2c8", slug: "vpn",                 title: "Virtual Private Network",       icon: "🛰️" },
      { id: "m2c9", slug: "dmz",                 title: "Demilitarized Zone (DMZ)",      icon: "🏰" },
      { id: "m2c10", slug: "tls",                title: "Protocollo TLS",                icon: "🔐" }
    ]
  },
  {
    id: 3,
    num: "Modulo 3",
    color: "#30d158",
    icon: "☁️",
    title: "Datacenter e servizi cloud",
    desc: "Server farm, virtualizzazione, hypervisor e i tre paradigmi cloud SaaS, PaaS e IaaS.",
    chapters: [
      { id: "m3c1", slug: "datacenter",          title: "Data center e server farm",     icon: "🏢" },
      { id: "m3c2", slug: "classificazione",     title: "Classificazione dei datacenter", icon: "📊" },
      { id: "m3c3", slug: "interni-esterni",     title: "Datacenter interni vs esterni", icon: "⚖️" },
      { id: "m3c4", slug: "colocation",          title: "Colocation in housing",         icon: "🏠" },
      { id: "m3c5", slug: "virtualizzazione",    title: "Virtualizzazione e Hypervisor", icon: "💻" },
      { id: "m3c6", slug: "cloud",               title: "Cloud computing: SaaS PaaS IaaS", icon: "☁️" },
      { id: "m3c7", slug: "cloud-deploy",        title: "Distribuzione cloud privata e pubblica", icon: "🌍" }
    ]
  },
  {
    id: 4,
    num: "Modulo 4",
    color: "#0a84ff",
    icon: "🎓",
    title: "Esame di Stato",
    desc: "Cablaggio, indirizzamento IP, routing, IPv6, reti wireless, VLAN, DHCP, DNS e HTTP.",
    chapters: [
      { id: "m4c1", slug: "cablaggio",           title: "Cablaggio strutturato",         icon: "🔌" },
      { id: "m4c2", slug: "ip-struttura",        title: "Struttura indirizzi IP",        icon: "🆔" },
      { id: "m4c3", slug: "ip-speciali",         title: "Indirizzi IP speciali",         icon: "⭐" },
      { id: "m4c4", slug: "flsm-vlsm",           title: "FLSM e VLSM",                   icon: "📐" },
      { id: "m4c5", slug: "routing",             title: "Routing statico e dinamico",    icon: "🛣️" },
      { id: "m4c6", slug: "ipv6",                title: "Protocollo IPv6",               icon: "📶" },
      { id: "m4c7", slug: "wireless",            title: "Reti Wireless IEEE 802.11",     icon: "📡" },
      { id: "m4c8", slug: "vlan",                title: "Virtual LAN (VLAN)",            icon: "🏷️" },
      { id: "m4c9", slug: "dhcp",                title: "DHCP",                          icon: "🔢" },
      { id: "m4c10", slug: "dns",                title: "DNS",                           icon: "📖" },
      { id: "m4c11", slug: "http",               title: "HTTP",                          icon: "🌐" },
      { id: "m4c12", slug: "hardware-router",    title: "Hardware switch e router",      icon: "⚙️" },
      { id: "m4c13", slug: "accesso-internet",   title: "Accesso alla rete Internet",    icon: "🛰️" },
      { id: "m4c14", slug: "icmp",               title: "ICMP, ping e traceroute",       icon: "📡" }
    ]
  },
  {
    id: 5,
    num: "Casi di studio",
    color: "#b026ff",
    icon: "🧪",
    title: "Esercitazioni d'esame",
    desc: "Tracce reali tipo Esame di Stato con soluzione commentata: LogiPack, DataForge e esercizi DMZ.",
    chapters: [
      { id: "m5c1", slug: "caso-logipack",       title: "Caso LogiPack — 2 edifici, fibra OM3", icon: "🏭" },
      { id: "m5c2", slug: "caso-dataforge",      title: "Caso DataForge — Subnetting + ACL",   icon: "💾" },
      { id: "m5c3", slug: "esercizi-dmz",        title: "Esercizi DMZ con ACL Cisco",          icon: "🏰" },
      { id: "m5c4", slug: "esercizi-rsa",        title: "Esercizi numerici RSA e DH",          icon: "🧮" }
    ]
  }
];
