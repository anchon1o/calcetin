window.CALCETIN_START = function(SRV){
"use strict";
const CONFIG = { HINT: "radar", MAX_TRIES: 10, WIN_DEG: 0.6, SUSPENSE_MS: 550, EPOCH: new Date(2026, 9, 10) }; // reto nº 1 = 10/10/2026 (estrea)

/* ================= IDIOMAS ================= */
const LANGS = ["gl","es","ca","eu"], LI = { es:0, gl:1, ca:2, eu:3 };
const LANG_NAMES = { gl:"Galego", es:"Castellano", ca:"Català", eu:"Euskara" };
const FLAGS = {
  gl:'<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><path d="M0 0h5.5L30 15.5V20h-5.5L0 4.5z" fill="#0A93D2"/></svg>',
  es:'<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#C60B1E"/><rect y="5" width="30" height="10" fill="#FFC400"/></svg>',
  ca:'<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#FCDD09"/><g fill="#DA121A"><rect y="2.22" width="30" height="2.22"/><rect y="6.67" width="30" height="2.22"/><rect y="11.11" width="30" height="2.22"/><rect y="15.56" width="30" height="2.22"/></g></svg>',
  eu:'<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#D52B1E"/><path d="M0 0L30 20M30 0L0 20" stroke="#009B48" stroke-width="3"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="3"/></svg>'
};
const MONTHS = {
  es:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
  gl:["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro"],
  ca:["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],
  eu:["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"]
};
const I18N = {
 es: {
  intro:"Esta noche se ha perdido un calcetín entre las estrellas.", start:"Busca el calcetín", tapSky:"Toca una estrella", first:"Primer intento",
  near:["Al otro lado del cielo","Lejos","Por la zona","Cerca","Muy cerca"], found:"¡Encontrado!", inConT:"¡En su constelación!", nextCon:"Constelación vecina", chip:c=>`Está en ${c}`, go:"Buscar aquí", tried:"Ya la probaste", focus:"Volver a la linterna",
  muchCloser:"Mucho más cerca", closer:"Más cerca", same:"Casi igual", farther:"Más lejos", muchFarther:"Mucho más lejos",
  inCon:c=>`¡Estás en ${c}!`, left:n=>`Quedan ${n}`, last:"Último intento", noTries:"Sin intentos", closest:d=>`Lo más cerca: ${d}`,
  won:"¡Calcetín recuperado!", lost:"El calcetín sigue perdido", where:(n,c)=>`Estaba en <strong>${n}</strong>, en ${c}.`,
  pts:"puntos", tries:"intentos", time:"tiempo", best:"lo más cerca",
  card:"Ver ficha", share:"Compartir", drawer:"Mi cajón", explore:"Explorar el cielo", nextIn:t=>`Nuevo calcetín en ${t}`,
  copied:"Resultado copiado", copyFail:"No se pudo copiar", mapHint:"Arrastra para mover el cielo",
  howTitle:"Cómo se juega",
  help1:m=>`Cada noche se pierde un calcetín distinto en algún astro del cielo. Es el mismo para todos y tienes <b>${m}</b> intentos.`,
  help2:"Arrastra para mover el cielo y pellizca para acercarte. Toca una estrella y pulsa «Buscar aquí». Cada intento lanza un radar: las ondas llegan hasta la distancia del calcetín y el hueco sin ondas marca una zona donde no está.",
  help3:"Si aciertas la constelación, sus líneas se quedan encendidas. Para ganar hay que acertar el astro exacto. El mapa pequeño de arriba muestra todo el cielo: tócalo para viajar.",
  help4:"Al terminar, toca cualquier astro para ver su ficha. Los calcetines que encuentres se guardan en tu cajón.",
  sound:"Sonido", conNames:"Nombres de las constelaciones",
  testTitle:"Modo pruebas (no cuenta en tus estadísticas)", retoLabel:"Reto nº", play:"Jugar", random:"Al azar", reset:"Reiniciar este reto", today:"Volver al de hoy",
  drawerTitle:"Mi cajón", dFound:"encontrado", dLost:"perdido", dNone:"sin jugar", dCount:(f,t)=>`${f} de ${t} calcetines recuperados`,
  nsN:"más al norte", nsS:"más al sur", nsEq:"a su misma altura", 
  train:"entreno", another:"Otro astro", launchTitle:"Estreno el 10 de octubre", launchText:"Cada día se perderá un calcetín nuevo, el mismo para todo el mundo. Hasta entonces puedes entrenar con astros al azar: no cuenta para la clasificación.", launchIn:t=>`Faltan ${t}`, days:n=>n===1?"1 día":`${n} días`, trainBtn:"Entrenar", dEmpty:"Los retos empiezan el 10 de octubre.", coach:["Toca una estrella para seleccionarla y pulsa «Buscar aquí».","El radar llega hasta la distancia del calcetín: está en algún punto del anillo exterior, nunca en el hueco.","Cuando aciertes la constelación, sus líneas se encenderán y el panel te lo dirá. Después busca el astro exacto."], gotIt:"Entendido",
  rankTitle:"Clasificación", rankBtn:"Clasificación", tabs:["Yo","Hoy","Semana","Mes","Siempre"], weekNote:"Suma de tus 5 mejores días de los últimos 7.", monthNote:"Suma de todos los días de este mes.", rankEmpty:"Todavía no hay nadie con nombre. ¡Sé la primera persona!", myPos:(p,t,s)=>`Estás en el puesto ${p} de ${t} con ${s} puntos.`, noScore:"Aún no tienes puntos en este periodo.", nameLabel:"Para salir en la clasificación, elige un nombre. No hace falta registrarse: todo se guarda en este navegador.", namePh:"Tu nombre", save:"Guardar", hideMe:"Dejar de aparecer", nameOk:"Nombre guardado", nameGone:"Ya no apareces en la clasificación", nameBad:"Usa de 2 a 20 letras o números", offline:"No se pudo conectar", sPlayed:"jugados", sFound:"encontrados", sStreak:"racha actual", sBest:"mejor racha", sPts:"puntos", sAvg:"intentos de media", you:"tú", loading:"Cargando…",
  lostIn:n=>`Perdido en ${n}`, foundIn:n=>`Encontrado en ${n}`, num:"nº", test:"prueba", langLabel:"Idioma",
  temp:"Temperatura", dist:"Distancia", size:"Tamaño", bright:"Brillo", con:"Constelación",
  ly:n=>`${n} años luz`, mly:n=>`${n} millones de años luz`, times:n=>`${n} veces el Sol`, pctSun:n=>`${n} % del Sol`, diam:n=>`${n} años luz de diámetro`,
  kelvin:(k,c)=>`${k} K · unos ${c} °C`, naked:"A simple vista", scope:"Con telescopio", invisible:"No se ve: es el centro de la galaxia",
  lightYear:y=>`La luz que ves ahora salió de allí en el año ${y}.`, lightAgo:n=>`La luz que ves salió de allí hace ${n} años.`,
  bestMonth:m=>`Mejor época para verla: ${m}.`, notVisible:"No se ve desde la península ibérica.", hr:"Diagrama de Hertzsprung-Russell", hotter:"más caliente", brighter:"más luminosa", sun:"Sol",
  cls:{dwarf:"Estrella de secuencia principal",reddwarf:"Enana roja",yellowdwarf:"Enana amarilla",subgiant:"Subgigante",giant:"Gigante",brightgiant:"Gigante luminosa",supergiant:"Supergigante",wr:"Estrella Wolf-Rayet"},
  col:{blue:"azul",bluewhite:"azul",white:"blanca",yellowwhite:"blanca amarillenta",yellow:"amarilla",orange:"naranja",red:"roja"},
  desc:{dwarf:"Está en la etapa más larga de su vida: quema hidrógeno tranquilamente en su núcleo, como el Sol.",
        reddwarf:"Las enanas rojas son las estrellas más comunes y longevas: pueden brillar billones de años.",
        subgiant:"Ha empezado a agotar el hidrógeno de su núcleo y se está hinchando.",
        giant:"Una estrella ya mayor que ha crecido muchísimo al agotar el hidrógeno de su núcleo.",
        supergiant:"Una de las estrellas más grandes y luminosas que existen; probablemente acabará como supernova.",
        wr:"Una estrella gigantesca y extremadamente caliente que está perdiendo sus capas exteriores a velocidades enormes."},
  dso:{galaxy:["Galaxia","Otra galaxia, con cientos de miles de millones de estrellas, mucho más allá de la Vía Láctea."],
       nebula:["Nebulosa","Una nube enorme de gas y polvo donde están naciendo estrellas nuevas."],
       cluster:["Cúmulo abierto","Una familia de estrellas jóvenes que nacieron juntas de la misma nube."],
       globular:["Cúmulo globular","Una bola de cientos de miles de estrellas viejísimas, casi tan antiguas como el universo."],
       remnant:["Resto de supernova","Los restos de una estrella que explotó como supernova."],
       planetary:["Nebulosa planetaria","El último suspiro de una estrella como el Sol: expulsa sus capas y deja un anillo de gas brillante."],
       blackhole:["Agujero negro supermasivo","El corazón de nuestra galaxia: un agujero negro con la masa de cuatro millones de soles."]},
  sockName:(b,p,a)=>`Calcetín ${b} con ${p} en ${a}`,
  base:["violeta","naranja","verde menta","mostaza","rojo","azul marino","rosa","verde","azul cielo","granate","verde azulado","coral"],
  acc:["amarillo","azul","blanco","negro","rosa","lima","turquesa","naranja"],
  pat:["rayas","lunares","zigzag","rombos","estrellas","cuadros","corazones","rayos","notas musicales","planetas","rayas diagonales","olas"],
  shareWon:(n,t,m,p)=>`Calcetín nº ${n} · 🧦 ${t}/${m} · ${p} puntos`, shareLost:(n,m,p)=>`Calcetín nº ${n} · 🌌 X/${m} · ${p} puntos`
 },
 gl: {
  intro:"Esta noite perdeuse un calcetín entre as estrelas.", start:"Busca o calcetín", tapSky:"Toca unha estrela", first:"Primeiro intento",
  near:["Ao outro lado do ceo","Lonxe","Pola zona","Preto","Moi preto"], found:"Atopado!", inConT:"Na súa constelación!", nextCon:"Constelación veciña", chip:c=>`Está en ${c}`, go:"Buscar aquí", tried:"Xa a probaches", focus:"Volver á lanterna",
  muchCloser:"Moito máis preto", closer:"Máis preto", same:"Case igual", farther:"Máis lonxe", muchFarther:"Moito máis lonxe",
  inCon:c=>`Estás en ${c}!`, left:n=>`Quedan ${n}`, last:"Último intento", noTries:"Sen intentos", closest:d=>`O máis preto: ${d}`,
  won:"Calcetín recuperado!", lost:"O calcetín segue perdido", where:(n,c)=>`Estaba en <strong>${n}</strong>, en ${c}.`,
  pts:"puntos", tries:"intentos", time:"tempo", best:"o máis preto",
  card:"Ver ficha", share:"Compartir", drawer:"O meu caixón", explore:"Explorar o ceo", nextIn:t=>`Novo calcetín en ${t}`,
  copied:"Resultado copiado", copyFail:"Non se puido copiar", mapHint:"Arrastra para mover o ceo",
  howTitle:"Como se xoga",
  help1:m=>`Cada noite pérdese un calcetín distinto nalgún astro do ceo. É o mesmo para todos e tes <b>${m}</b> intentos.`,
  help2:"Arrastra para mover o ceo e belisca para achegarte. Toca unha estrela e preme «Buscar aquí». Cada intento lanza un radar: as ondas chegan ata a distancia do calcetín e o oco sen ondas marca unha zona onde non está.",
  help3:"Se acertas a constelación, as súas liñas quedan acesas. Para gañar hai que acertar o astro exacto. O mapa pequeno de arriba amosa todo o ceo: tócao para viaxar.",
  help4:"Ao rematar, toca calquera astro para ver a súa ficha. Os calcetíns que atopes gárdanse no teu caixón.",
  sound:"Son", conNames:"Nomes das constelacións",
  testTitle:"Modo probas (non conta nas túas estatísticas)", retoLabel:"Reto nº", play:"Xogar", random:"Ao chou", reset:"Reiniciar este reto", today:"Volver ao de hoxe",
  drawerTitle:"O meu caixón", dFound:"atopado", dLost:"perdido", dNone:"sen xogar", dCount:(f,t)=>`${f} de ${t} calcetíns recuperados`,
  nsN:"máis ao norte", nsS:"máis ao sur", nsEq:"á mesma altura", 
  train:"adestramento", another:"Outro astro", launchTitle:"Estrea o 10 de outubro", launchText:"Cada día perderase un calcetín novo, o mesmo para todo o mundo. Ata entón podes adestrar con astros ao chou: non conta para a clasificación.", launchIn:t=>`Faltan ${t}`, days:n=>n===1?"1 día":`${n} días`, trainBtn:"Adestrar", dEmpty:"Os retos comezan o 10 de outubro.", coach:["Toca unha estrela para seleccionala e preme «Buscar aquí».","O radar chega ata a distancia do calcetín: está nalgún punto do anel exterior, nunca no oco.","Cando acertes a constelación, as súas liñas acenderanse e o panel avisarate. Despois busca o astro exacto."], gotIt:"Entendido",
  rankTitle:"Clasificación", rankBtn:"Clasificación", tabs:["Eu","Hoxe","Semana","Mes","Sempre"], weekNote:"Suma dos teus 5 mellores días dos últimos 7.", monthNote:"Suma de todos os días deste mes.", rankEmpty:"Aínda non hai ninguén con nome. Sé a primeira persoa!", myPos:(p,t,s)=>`Estás no posto ${p} de ${t} con ${s} puntos.`, noScore:"Aínda non tes puntos neste período.", nameLabel:"Para saír na clasificación, escolle un nome. Non fai falta rexistrarse: todo se garda neste navegador.", namePh:"O teu nome", save:"Gardar", hideMe:"Deixar de aparecer", nameOk:"Nome gardado", nameGone:"Xa non apareces na clasificación", nameBad:"Usa de 2 a 20 letras ou números", offline:"Non se puido conectar", sPlayed:"xogados", sFound:"atopados", sStreak:"racha actual", sBest:"mellor racha", sPts:"puntos", sAvg:"intentos de media", you:"ti", loading:"Cargando…",
  lostIn:n=>`Perdido en ${n}`, foundIn:n=>`Atopado en ${n}`, num:"nº", test:"proba", langLabel:"Lingua",
  temp:"Temperatura", dist:"Distancia", size:"Tamaño", bright:"Brillo", con:"Constelación",
  ly:n=>`${n} anos luz`, mly:n=>`${n} millóns de anos luz`, times:n=>`${n} veces o Sol`, pctSun:n=>`${n} % do Sol`, diam:n=>`${n} anos luz de diámetro`,
  kelvin:(k,c)=>`${k} K · uns ${c} °C`, naked:"A ollo nu", scope:"Con telescopio", invisible:"Non se ve: é o centro da galaxia",
  lightYear:y=>`A luz que ves agora saíu de alí no ano ${y}.`, lightAgo:n=>`A luz que ves saíu de alí hai ${n} anos.`,
  bestMonth:m=>`Mellor época para vela: ${m}.`, notVisible:"Non se ve desde a península ibérica.", hr:"Diagrama de Hertzsprung-Russell", hotter:"máis quente", brighter:"máis luminosa", sun:"Sol",
  cls:{dwarf:"Estrela da secuencia principal",reddwarf:"Anana vermella",yellowdwarf:"Anana amarela",subgiant:"Subxigante",giant:"Xigante",brightgiant:"Xigante luminosa",supergiant:"Superxigante",wr:"Estrela Wolf-Rayet"},
  col:{blue:"azul",bluewhite:"azul",white:"branca",yellowwhite:"branca amarelada",yellow:"amarela",orange:"laranxa",red:"vermella"},
  desc:{dwarf:"Está na etapa máis longa da súa vida: queima hidróxeno tranquilamente no seu núcleo, coma o Sol.",
        reddwarf:"As ananas vermellas son as estrelas máis comúns e lonxevas: poden brillar billóns de anos.",
        subgiant:"Empezou a esgotar o hidróxeno do seu núcleo e estase inchando.",
        giant:"Unha estrela xa maior que medrou moitísimo ao esgotar o hidróxeno do seu núcleo.",
        supergiant:"Unha das estrelas máis grandes e luminosas que existen; probablemente rematará como supernova.",
        wr:"Unha estrela xigantesca e extremadamente quente que está perdendo as súas capas exteriores a velocidades enormes."},
  dso:{galaxy:["Galaxia","Outra galaxia, con centos de miles de millóns de estrelas, moi alén da Vía Láctea."],
       nebula:["Nebulosa","Unha nube enorme de gas e po onde están a nacer estrelas novas."],
       cluster:["Cúmulo aberto","Unha familia de estrelas novas que naceron xuntas da mesma nube."],
       globular:["Cúmulo globular","Unha bóla de centos de miles de estrelas vellísimas, case tan antigas coma o universo."],
       remnant:["Resto de supernova","Os restos dunha estrela que estoupou como supernova."],
       planetary:["Nebulosa planetaria","O último suspiro dunha estrela coma o Sol: expulsa as súas capas e deixa un anel de gas brillante."],
       blackhole:["Burato negro supermasivo","O corazón da nosa galaxia: un burato negro coa masa de catro millóns de soles."]},
  sockName:(b,p,a)=>`Calcetín ${b} con ${p} en ${a}`,
  base:["violeta","laranxa","verde menta","mostaza","vermello","azul mariño","rosa","verde","azul ceo","granate","verde azulado","coral"],
  acc:["amarelo","azul","branco","negro","rosa","lima","turquesa","laranxa"],
  pat:["raias","pintas","zigzag","rombos","estrelas","cadros","corazóns","raios","notas musicais","planetas","raias diagonais","ondas"],
  shareWon:(n,t,m,p)=>`Calcetín nº ${n} · 🧦 ${t}/${m} · ${p} puntos`, shareLost:(n,m,p)=>`Calcetín nº ${n} · 🌌 X/${m} · ${p} puntos`
 },
 ca: {
  intro:"Aquesta nit s'ha perdut un mitjó entre les estrelles.", start:"Busca el mitjó", tapSky:"Toca una estrella", first:"Primer intent",
  near:["A l'altra banda del cel","Lluny","Per la zona","A prop","Molt a prop"], found:"Trobat!", inConT:"A la seva constel·lació!", nextCon:"Constel·lació veïna", chip:c=>`És a ${c}`, go:"Busca aquí", tried:"Ja l'has provada", focus:"Tornar a la llanterna",
  muchCloser:"Molt més a prop", closer:"Més a prop", same:"Gairebé igual", farther:"Més lluny", muchFarther:"Molt més lluny",
  inCon:c=>`Ets a ${c}!`, left:n=>`Queden ${n}`, last:"Últim intent", noTries:"Sense intents", closest:d=>`El més a prop: ${d}`,
  won:"Mitjó recuperat!", lost:"El mitjó continua perdut", where:(n,c)=>`Era a <strong>${n}</strong>, a ${c}.`,
  pts:"punts", tries:"intents", time:"temps", best:"el més a prop",
  card:"Veure fitxa", share:"Comparteix", drawer:"El meu calaix", explore:"Explora el cel", nextIn:t=>`Nou mitjó d'aquí a ${t}`,
  copied:"Resultat copiat", copyFail:"No s'ha pogut copiar", mapHint:"Arrossega per moure el cel",
  howTitle:"Com es juga",
  help1:m=>`Cada nit es perd un mitjó diferent en algun astre del cel. És el mateix per a tothom i tens <b>${m}</b> intents.`,
  help2:"Arrossega per moure el cel i pessiga per apropar-t'hi. Toca una estrella i prem «Busca aquí». Cada intent llança un radar: les ones arriben fins a la distància del mitjó i el buit sense ones marca una zona on no és.",
  help3:"Si encertes la constel·lació, les seves línies queden enceses. Per guanyar cal encertar l'astre exacte. El mapa petit de dalt mostra tot el cel: toca'l per viatjar-hi.",
  help4:"En acabar, toca qualsevol astre per veure'n la fitxa. Els mitjons que trobis es guarden al teu calaix.",
  sound:"So", conNames:"Noms de les constel·lacions",
  testTitle:"Mode de proves (no compta a les teves estadístiques)", retoLabel:"Repte núm.", play:"Juga", random:"A l'atzar", reset:"Reinicia aquest repte", today:"Torna al d'avui",
  drawerTitle:"El meu calaix", dFound:"trobat", dLost:"perdut", dNone:"sense jugar", dCount:(f,t)=>`${f} de ${t} mitjons recuperats`,
  nsN:"més al nord", nsS:"més al sud", nsEq:"a la mateixa altura", 
  train:"entrenament", another:"Un altre astre", launchTitle:"Estrena el 10 d'octubre", launchText:"Cada dia es perdrà un mitjó nou, el mateix per a tothom. Fins aleshores pots entrenar amb astres a l'atzar: no compta per a la classificació.", launchIn:t=>`Falten ${t}`, days:n=>n===1?"1 dia":`${n} dies`, trainBtn:"Entrena", dEmpty:"Els reptes comencen el 10 d'octubre.", coach:["Toca una estrella per seleccionar-la i prem «Busca aquí».","El radar arriba fins a la distància del mitjó: és en algun punt de l'anell exterior, mai al buit.","Quan encertis la constel·lació, les seves línies s'encendran i el panell t'ho dirà. Després busca l'astre exacte."], gotIt:"D'acord",
  rankTitle:"Classificació", rankBtn:"Classificació", tabs:["Jo","Avui","Setmana","Mes","Sempre"], weekNote:"Suma dels teus 5 millors dies dels últims 7.", monthNote:"Suma de tots els dies d'aquest mes.", rankEmpty:"Encara no hi ha ningú amb nom. Sigues la primera persona!", myPos:(p,t,s)=>`Ets a la posició ${p} de ${t} amb ${s} punts.`, noScore:"Encara no tens punts en aquest període.", nameLabel:"Per sortir a la classificació, tria un nom. No cal registrar-se: tot es desa en aquest navegador.", namePh:"El teu nom", save:"Desa", hideMe:"Deixar de sortir", nameOk:"Nom desat", nameGone:"Ja no surts a la classificació", nameBad:"Fes servir de 2 a 20 lletres o números", offline:"No s'ha pogut connectar", sPlayed:"jugats", sFound:"trobats", sStreak:"ratxa actual", sBest:"millor ratxa", sPts:"punts", sAvg:"intents de mitjana", you:"tu", loading:"Carregant…",
  lostIn:n=>`Perdut a ${n}`, foundIn:n=>`Trobat a ${n}`, num:"núm.", test:"prova", langLabel:"Llengua",
  temp:"Temperatura", dist:"Distància", size:"Mida", bright:"Brillantor", con:"Constel·lació",
  ly:n=>`${n} anys llum`, mly:n=>`${n} milions d'anys llum`, times:n=>`${n} vegades el Sol`, pctSun:n=>`${n} % del Sol`, diam:n=>`${n} anys llum de diàmetre`,
  kelvin:(k,c)=>`${k} K · uns ${c} °C`, naked:"A ull nu", scope:"Amb telescopi", invisible:"No es veu: és el centre de la galàxia",
  lightYear:y=>`La llum que veus ara va sortir d'allà l'any ${y}.`, lightAgo:n=>`La llum que veus va sortir d'allà fa ${n} anys.`,
  bestMonth:m=>`Millor època per veure-la: ${m}.`, notVisible:"No es veu des de la península Ibèrica.", hr:"Diagrama de Hertzsprung-Russell", hotter:"més calenta", brighter:"més lluminosa", sun:"Sol",
  cls:{dwarf:"Estrella de la seqüència principal",reddwarf:"Nana vermella",yellowdwarf:"Nana groga",subgiant:"Subgegant",giant:"Gegant",brightgiant:"Gegant lluminosa",supergiant:"Supergegant",wr:"Estrella Wolf-Rayet"},
  col:{blue:"blava",bluewhite:"blava",white:"blanca",yellowwhite:"blanca groguenca",yellow:"groga",orange:"taronja",red:"vermella"},
  desc:{dwarf:"És a l'etapa més llarga de la seva vida: crema hidrogen tranquil·lament al nucli, com el Sol.",
        reddwarf:"Les nanes vermelles són les estrelles més comunes i longeves: poden brillar bilions d'anys.",
        subgiant:"Ha començat a esgotar l'hidrogen del nucli i s'està inflant.",
        giant:"Una estrella ja gran que ha crescut moltíssim en esgotar l'hidrogen del nucli.",
        supergiant:"Una de les estrelles més grans i lluminoses que existeixen; probablement acabarà com a supernova.",
        wr:"Una estrella gegantina i extremadament calenta que perd les capes exteriors a velocitats enormes."},
  dso:{galaxy:["Galàxia","Una altra galàxia, amb centenars de milers de milions d'estrelles, molt més enllà de la Via Làctia."],
       nebula:["Nebulosa","Un núvol enorme de gas i pols on estan naixent estrelles noves."],
       cluster:["Cúmul obert","Una família d'estrelles joves que van néixer juntes del mateix núvol."],
       globular:["Cúmul globular","Una bola de centenars de milers d'estrelles vellíssimes, gairebé tan antigues com l'univers."],
       remnant:["Romanent de supernova","Les restes d'una estrella que va esclatar com a supernova."],
       planetary:["Nebulosa planetària","L'últim sospir d'una estrella com el Sol: expulsa les capes i deixa un anell de gas brillant."],
       blackhole:["Forat negre supermassiu","El cor de la nostra galàxia: un forat negre amb la massa de quatre milions de sols."]},
  sockName:(b,p,a)=>`Mitjó ${b} amb ${p} en ${a}`,
  base:["lila","taronja","verd menta","mostassa","vermell","blau marí","rosa","verd","blau cel","granat","verd blavós","corall"],
  acc:["groc","blau","blanc","negre","rosa","llima","turquesa","taronja"],
  pat:["ratlles","pics","ziga-zaga","rombes","estrelles","quadres","cors","llamps","notes musicals","planetes","ratlles diagonals","ones"],
  shareWon:(n,t,m,p)=>`Calcetín núm. ${n} · 🧦 ${t}/${m} · ${p} punts`, shareLost:(n,m,p)=>`Calcetín núm. ${n} · 🌌 X/${m} · ${p} punts`
 },
 eu: {
  intro:"Gaur gauean galtzerdi bat galdu da izarren artean.", start:"Bilatu galtzerdia", tapSky:"Ukitu izar bat", first:"Lehen saiakera",
  near:["Zeruaren beste aldean","Urrun","Inguruan","Gertu","Oso gertu"], found:"Aurkitua!", inConT:"Bere konstelazioan!", nextCon:"Ondoko konstelazioa", chip:c=>`${c} konstelazioan dago`, go:"Bilatu hemen", tried:"Dagoeneko probatu duzu", focus:"Linternara itzuli",
  muchCloser:"Askoz gertuago", closer:"Gertuago", same:"Ia berdin", farther:"Urrunago", muchFarther:"Askoz urrunago",
  inCon:c=>`${c} konstelazioan zaude!`, left:n=>`${n} geratzen dira`, last:"Azken saiakera", noTries:"Saiakerarik gabe", closest:d=>`Gertuena: ${d}`,
  won:"Galtzerdia berreskuratuta!", lost:"Galtzerdiak galduta jarraitzen du", where:(n,c)=>`<strong>${n}</strong> astroan zegoen (${c}).`,
  pts:"puntu", tries:"saiakera", time:"denbora", best:"gertuena",
  card:"Ikusi fitxa", share:"Partekatu", drawer:"Nire tiradera", explore:"Arakatu zerua", nextIn:t=>`Galtzerdi berria: ${t}`,
  copied:"Emaitza kopiatuta", copyFail:"Ezin izan da kopiatu", mapHint:"Arrastatu zerua mugitzeko",
  howTitle:"Nola jokatu",
  help1:m=>`Gauero galtzerdi desberdin bat galtzen da zeruko astroren batean. Guztiontzat berdina da, eta <b>${m}</b> saiakera dituzu.`,
  help2:"Arrastatu zerua mugitzeko eta atximurkatu hurbiltzeko. Ukitu izar bat eta sakatu «Bilatu hemen». Saiakera bakoitzak radar bat jaurtitzen du: uhinak galtzerdiaren distantziaraino iristen dira, eta uhinik gabeko hutsuneak ez dagoen eremu bat adierazten du.",
  help3:"Konstelazioa asmatzen baduzu, bere lerroak piztuta geratzen dira. Irabazteko astro zehatza asmatu behar da. Goiko mapa txikiak zeru osoa erakusten du: ukitu bidaiatzeko.",
  help4:"Amaitzean, ukitu edozein astro bere fitxa ikusteko. Aurkitzen dituzun galtzerdiak zure tiraderan gordetzen dira.",
  sound:"Soinua", conNames:"Konstelazioen izenak",
  testTitle:"Proba modua (ez da zure estatistiketan zenbatzen)", retoLabel:"Erronka zk.", play:"Jokatu", random:"Ausaz", reset:"Berrabiarazi erronka hau", today:"Itzuli gaurkora",
  drawerTitle:"Nire tiradera", dFound:"aurkitua", dLost:"galdua", dNone:"jokatu gabe", dCount:(f,t)=>`${t} galtzerditatik ${f} berreskuratuta`,
  nsN:"iparralderago", nsS:"hegoalderago", nsEq:"altuera berean", 
  train:"entrenamendua", another:"Beste astro bat", launchTitle:"Estreinaldia: urriaren 10ean", launchText:"Egunero galtzerdi berri bat galduko da, berdina guztientzat. Bitartean, ausazko astroekin entrenatu dezakezu: ez du sailkapenerako balio.", launchIn:t=>`Falta: ${t}`, days:n=>n===1?"egun 1":`${n} egun`, trainBtn:"Entrenatu", dEmpty:"Erronkak urriaren 10ean hasiko dira.", coach:["Ukitu izar bat hautatzeko eta sakatu «Bilatu hemen».","Radarra galtzerdiaren distantziaraino iristen da: kanpoko eraztunaren puntu batean dago, inoiz ez hutsunean.","Konstelazioa asmatzen duzunean, bere lerroak piztuko dira eta panelak esango dizu. Gero bilatu astro zehatza."], gotIt:"Ados",
  rankTitle:"Sailkapena", rankBtn:"Sailkapena", tabs:["Ni","Gaur","Astea","Hilabetea","Beti"], weekNote:"Azken 7 egunetako zure 5 egun onenen batura.", monthNote:"Hilabete honetako egun guztien batura.", rankEmpty:"Oraindik ez dago inor izenarekin. Izan zaitez lehena!", myPos:(p,t,s)=>`${t} jokalaritik ${p}. postuan zaude, ${s} punturekin.`, noScore:"Oraindik ez duzu punturik aldi honetan.", nameLabel:"Sailkapenean agertzeko, aukeratu izen bat. Ez da erregistratu behar: dena nabigatzaile honetan gordetzen da.", namePh:"Zure izena", save:"Gorde", hideMe:"Ez agertu", nameOk:"Izena gordeta", nameGone:"Jada ez zara sailkapenean agertzen", nameBad:"Erabili 2-20 letra edo zenbaki", offline:"Ezin izan da konektatu", sPlayed:"jokatuak", sFound:"aurkituak", sStreak:"uneko bolada", sBest:"bolada onena", sPts:"puntu", sAvg:"saiakera batez beste", you:"zu", loading:"Kargatzen…",
  lostIn:n=>`Galdua: ${n}`, foundIn:n=>`Aurkitua: ${n}`, num:"zk.", test:"proba", langLabel:"Hizkuntza",
  temp:"Tenperatura", dist:"Distantzia", size:"Tamaina", bright:"Distira", con:"Konstelazioa",
  ly:n=>`${n} argi-urte`, mly:n=>`${n} milioi argi-urte`, times:n=>`Eguzkia baino ${n} aldiz handiagoa`, pctSun:n=>`Eguzkiaren % ${n}`, diam:n=>`${n} argi-urteko diametroa`,
  kelvin:(k,c)=>`${k} K · ${c} °C inguru`, naked:"Begi hutsez", scope:"Teleskopioarekin", invisible:"Ez da ikusten: galaxiaren erdigunea da",
  lightYear:y=>`Orain ikusten duzun argia handik ${y}. urtean irten zen.`, lightAgo:n=>`Ikusten duzun argia duela ${n} urte irten zen handik.`,
  bestMonth:m=>`Ikusteko garairik onena: ${m}.`, notVisible:"Ez da Iberiar penintsulatik ikusten.", hr:"Hertzsprung-Russell diagrama", hotter:"beroago", brighter:"distiratsuago", sun:"Eguzkia",
  cls:{dwarf:"Sekuentzia nagusiko izar",reddwarf:"Nano gorria",yellowdwarf:"Nano horia",subgiant:"Azpierraldoi",giant:"Erraldoi",brightgiant:"Erraldoi distiratsu",supergiant:"Supererraldoi",wr:"Wolf-Rayet izarra"},
  col:{blue:"urdina",bluewhite:"urdina",white:"zuria",yellowwhite:"zuri horixka",yellow:"horia",orange:"laranja",red:"gorria"},
  desc:{dwarf:"Bere bizitzako etaparik luzeenean dago: hidrogenoa lasai erretzen du nukleoan, Eguzkiak bezala.",
        reddwarf:"Nano gorriak dira izar ohikoenak eta iraunkorrenak: bilioika urtez distira dezakete.",
        subgiant:"Nukleoko hidrogenoa agortzen hasi da eta puzten ari da.",
        giant:"Izar heldua da, izugarri hazi dena nukleoko hidrogenoa agortzean.",
        supergiant:"Dauden izar handienetako eta distiratsuenetako bat; ziur aski supernoba gisa amaituko da.",
        wr:"Izar erraldoi eta oso beroa, bere kanpoko geruzak abiadura izugarrian galtzen ari dena."},
  dso:{galaxy:["Galaxia","Beste galaxia bat, ehunka mila milioi izarrekin, Esne Bidetik oso urrun."],
       nebula:["Nebulosa","Gas eta hauts hodei erraldoia, non izar berriak jaiotzen ari diren."],
       cluster:["Multzo irekia","Hodei beretik elkarrekin jaio ziren izar gazteen familia."],
       globular:["Multzo globularra","Ehunka mila izar oso zaharren bola, ia unibertsoa bezain zaharrak."],
       remnant:["Supernoba-hondarra","Supernoba gisa lehertu zen izar baten hondarrak."],
       planetary:["Nebulosa planetarioa","Eguzkia bezalako izar baten azken hasperena: bere geruzak kanporatu eta gas distiratsuzko eraztuna uzten du."],
       blackhole:["Zulo beltz supermasiboa","Gure galaxiaren bihotza: lau milioi eguzkiren masa duen zulo beltza."]},
  sockName:(b,p,a)=>`Galtzerdi ${b} · ${p} (${a})`,
  base:["morea","laranja","menda-berdea","mostaza","gorria","itsas urdina","arrosa","berdea","zeru-urdina","granatea","berde urdinxka","korala"],
  acc:["horia","urdina","zuria","beltza","arrosa","lima","turkesa","laranja"],
  pat:["marrak","puntuak","sigi-saga","erronboak","izarrak","koadroak","bihotzak","tximistak","musika-notak","planetak","marra zeiharrak","olatuak"],
  shareWon:(n,t,m,p)=>`Calcetín zk. ${n} · 🧦 ${t}/${m} · ${p} puntu`, shareLost:(n,m,p)=>`Calcetín zk. ${n} · 🌌 X/${m} · ${p} puntu`
 }
};

/* ================= UTILIDADES ================= */
const $ = s => document.querySelector(s);
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem(k); } catch(e){} }
};
let prefs = store.get("calcetin:v1:prefs", { sound: true, labels: true });
function detectLang(){
  if (prefs.lang && LANGS.includes(prefs.lang)) return prefs.lang;
  return "gl"; // galego por defecto; o idioma cámbiase coa bandeira
}
let LANG = detectLang();
const T = () => I18N[LANG];
const rad = Math.PI / 180;
function angDist(a, b){ // [lon,lat] en graos → graos
  const s = Math.sin((b[1]-a[1])*rad/2)**2 + Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin((b[0]-a[0])*rad/2)**2;
  return 2*Math.asin(Math.min(1, Math.sqrt(s))) / rad;
}
function mulberry(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function fmtTime(ms){ const s = Math.floor(ms/1000), m = Math.floor(s/60), h = Math.floor(m/60); return h ? `${h}:${String(m%60).padStart(2,"0")}:${String(s%60).padStart(2,"0")}` : `${m}:${String(s%60).padStart(2,"0")}`; }
function num(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
function kelvinRGB(K){ // aproximación de cor de corpo negro
  const t = K / 100; let r, g, b;
  if (t <= 66){ r = 255; g = 99.47 * Math.log(t) - 161.12; b = t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04; }
  else { r = 329.7 * Math.pow(t - 60, -0.1332); g = 288.12 * Math.pow(t - 60, -0.0755); b = 255; }
  const c = v => Math.max(0, Math.min(255, Math.round(v)));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/* ================= CATÁLOGO ================= */
const OBJECTS = [];
STARS_RAW.forEach(r => OBJECTS.push({ id: r[0], kind: "star", con: r[1], lon: r[2]*15, lat: r[3], mag: r[4], sp: r[5], ly: r[6], T: r[7], R: r[8] }));
DSO_RAW.forEach(r => OBJECTS.push({ id: r[0], kind: "dso", con: r[1], lon: r[2]*15, lat: r[3], mag: r[4], type: r[5], ly: r[6], size: r[7], names: r[8] }));
const BYID = Object.fromEntries(OBJECTS.map(o => [o.id, o]));
function objName(o, lang){ lang = lang || LANG; if (o.kind === "dso") return o.names[lang]; const n = STAR_NAMES[o.id]; return n ? n[lang] : o.id; }
function conName(c, lang){ return CONS[c] ? CONS[c][LI[lang || LANG]] : c; }
const CON_CENTER = {};
(function(){ const acc = {}; OBJECTS.forEach(o => { if (o.kind !== "star") return; const v = [Math.cos(o.lat*rad)*Math.cos(o.lon*rad), Math.cos(o.lat*rad)*Math.sin(o.lon*rad), Math.sin(o.lat*rad)]; const a = acc[o.con] || (acc[o.con] = [0,0,0]); a[0]+=v[0]; a[1]+=v[1]; a[2]+=v[2]; });
  for (const c in acc){ const [x,y,z] = acc[c]; const n = Math.hypot(x,y,z); CON_CENTER[c] = [Math.atan2(y,x)/rad, Math.asin(z/n)/rad]; } })();
const LINE_GEO = LINES.map(([a,b]) => ({ con: BYID[a].con, coords: [[BYID[a].lon, BYID[a].lat],[BYID[b].lon, BYID[b].lat]] }));
// estrelas de fondo (decorativas, non se poden tocar)
const BG = []; (function(){ const r = mulberry(4242); for (let i=0;i<1400;i++){ const z = 2*r()-1, lon = 360*r(); BG.push([lon, Math.asin(z)/rad, 4 + 2.6*r(), 3000 + 9000*r()]); } })();
// Vía Láctea: puntos ao longo do plano galáctico
const MW = []; (function(){ const r = mulberry(99); const ra0 = 192.8595*rad, de0 = 27.1283*rad, l0 = 122.932*rad;
  for (let i=0;i<900;i++){ const l = 360*r()*rad, b = ((r()+r()+r()-1.5)*12)*rad;
    const sd = Math.sin(de0)*Math.sin(b) + Math.cos(de0)*Math.cos(b)*Math.cos(l0 - l);
    const d = Math.asin(sd); const y = Math.cos(b)*Math.sin(l0 - l), x = Math.cos(de0)*Math.sin(b) - Math.sin(de0)*Math.cos(b)*Math.cos(l0 - l);
    MW.push([((ra0 + Math.atan2(y, x))/rad + 360) % 360, d/rad, 6 + 10*r()]); } })();

/* ================= RETO ================= */
function todayNum(){ const n = new Date(); const a = new Date(n.getFullYear(), n.getMonth(), n.getDate()); return Math.round((a - CONFIG.EPOCH)/86400000) + 1; }
const TODAY = SRV ? SRV.today : todayNum();
const TEST_KEY = "calcetin:v1:testReto";
const qs = new URLSearchParams(location.search);
const TEST_RETO = parseInt(qs.get("reto"),10) || store.get(TEST_KEY, null);
const PRELAUNCH = TODAY < 1;
// adestramento: astros ao chou, sen puntos nin clasificación (forzado antes da estrea)
const TRAIN = qs.get("entrenar") != null || (PRELAUNCH && (SRV || TEST_RETO == null));
const TRAIN_SEED_KEY = "calcetin:v1:trainSeed";
let trainSeed = store.get(TRAIN_SEED_KEY, null); if (TRAIN && !trainSeed){ trainSeed = 100000 + Math.floor(Math.random()*900000); store.set(TRAIN_SEED_KEY, trainSeed); }
const RETO = TRAIN ? trainSeed : Math.max(1, Math.min(SRV ? TODAY : Infinity, TEST_RETO != null ? TEST_RETO : TODAY));
const TESTING = TRAIN || RETO !== TODAY;
// orde dos obxectivos: uns poucos famosos primeiro, logo o resto baralladado
const ORDER = (function(){ const pinned = ["Betelgeuse","Polaris","M31","Sirius","Antares","Vega","M45","Proxima Centauri","Deneb","SGRA"];
  const rest = OBJECTS.map(o => o.id).filter(id => !pinned.includes(id)); const r = mulberry(2026);
  for (let i = rest.length-1; i > 0; i--){ const j = Math.floor(r()*(i+1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
  return pinned.concat(rest); })();
function targetFor(n){ if (SRV && SRV.ids && BYID[SRV.ids[n]]) return BYID[SRV.ids[n]]; const len = ORDER.length; return BYID[ORDER[(((n-1) % len) + len) % len]]; }
const KEY = TRAIN ? `calcetin:v1:train:${RETO}` : `calcetin:v1:reto:${RETO}`;
let state = store.get(KEY, null) || { guesses: [], start: null, end: null, status: "playing", counted: false };
const TARGET = TRAIN ? OBJECTS[Math.floor(mulberry(RETO)()*OBJECTS.length)] : targetFor(RETO);

/* ================= CALCETÍNS ================= */
const BASES = ["#7E57C2","#F57C00","#4DB6AC","#C9A227","#E53935","#283593","#EC407A","#43A047","#29B6F6","#8E2442","#00897B","#FF7043"];
const ACCS  = ["#FFD54F","#1E88E5","#FAFAFA","#212121","#F48FB1","#C0CA33","#26C6DA","#FFA726"];
function lum(hex){ const n = parseInt(hex.slice(1),16); const c = [n>>16, (n>>8)&255, n&255].map(v => { v/=255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); }); return .2126*c[0]+.7152*c[1]+.0722*c[2]; }
function contrast(a,b){ const x = lum(a), y = lum(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }
function sockFor(n){
  const r = mulberry(n * 7919 + 13);
  const base = Math.floor(r()*BASES.length), pat = Math.floor(r()*12);
  let acc = Math.floor(r()*ACCS.length); for (let k=0; k<ACCS.length && contrast(BASES[base], ACCS[acc]) < 2.2; k++) acc = (acc+1) % ACCS.length;
  let heel = Math.floor(r()*ACCS.length); if (heel === acc && r() < .5) heel = -1; // -1 = mesma cor da base
  return { n, base, pat, acc, heel, cuff: Math.floor(r()*3) };
}
function sockName(s, lang){ const t = I18N[lang || LANG]; return t.sockName(t.base[s.base], t.pat[s.pat], t.acc[s.acc]); }
const SOCK_PATH = "M34 6 Q34 2 38 2 H70 Q74 2 74 6 L74 80 L106 106 Q121 118 112 132 Q103 145 86 138 L42 119 Q26 111 28 92 L34 70 Z";
function patternDef(id, s){
  const a = ACCS[s.acc], p = s.pat;
  const P = (w, h, body) => `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${body}</pattern>`;
  switch (p){
    case 0: return P(40, 14, `<rect y="0" width="40" height="6" fill="${a}"/>`);
    case 1: return P(16, 16, `<circle cx="4" cy="4" r="3.2" fill="${a}"/><circle cx="12" cy="12" r="3.2" fill="${a}"/>`);
    case 2: return P(16, 14, `<path d="M0 10 L4 4 L8 10 L12 4 L16 10" fill="none" stroke="${a}" stroke-width="2.6" stroke-linejoin="round"/>`);
    case 3: return P(20, 24, `<path d="M10 1 L19 12 L10 23 L1 12 Z" fill="${a}" opacity=".85"/><path d="M0 0 L20 24 M20 0 L0 24" stroke="${a}" stroke-width=".8" opacity=".6"/>`);
    case 4: return P(22, 22, `<path d="M11 3 L13.2 8.5 L19 8.8 L14.5 12.4 L16 18 L11 14.8 L6 18 L7.5 12.4 L3 8.8 L8.8 8.5 Z" fill="${a}"/>`);
    case 5: return P(16, 16, `<rect width="8" height="8" fill="${a}" opacity=".9"/><rect x="8" y="8" width="8" height="8" fill="${a}" opacity=".9"/>`);
    case 6: return P(20, 20, `<path d="M10 16 C3 11 3 5.5 6.5 5 C8.5 4.7 9.6 6 10 7 C10.4 6 11.5 4.7 13.5 5 C17 5.5 17 11 10 16 Z" fill="${a}"/>`);
    case 7: return P(20, 26, `<path d="M11 2 L5 14 L10 14 L8 24 L15 10 L10 10 L13 2 Z" fill="${a}"/>`);
    case 8: return P(22, 24, `<ellipse cx="8" cy="18" rx="4.2" ry="3.2" fill="${a}" transform="rotate(-20 8 18)"/><path d="M11.8 17 V4 Q15 6 17 9" fill="none" stroke="${a}" stroke-width="1.8"/>`);
    case 9: return P(26, 26, `<circle cx="13" cy="13" r="5" fill="${a}"/><ellipse cx="13" cy="13" rx="10" ry="3" fill="none" stroke="${a}" stroke-width="1.6" transform="rotate(-20 13 13)"/>`);
    case 10: return P(14, 14, `<path d="M-2 16 L16 -2" stroke="${a}" stroke-width="4"/><path d="M-9 9 L9 -9 M5 23 L23 5" stroke="${a}" stroke-width="4"/>`);
    default: return P(24, 12, `<path d="M0 6 Q6 0 12 6 T24 6" fill="none" stroke="${a}" stroke-width="2.6"/>`);
  }
}
let sockUid = 0;
function sockSVG(s, opts){
  opts = opts || {}; const id = "s" + (++sockUid);
  const base = opts.ghost ? "#5a5670" : BASES[s.base], acc = ACCS[s.acc], heelC = s.heel < 0 ? base : ACCS[s.heel];
  const ghost = !!opts.ghost, empty = !!opts.empty;
  if (empty) return `<svg viewBox="0 0 124 146" class="sock"><path d="${SOCK_PATH}" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 6" opacity=".35"/></svg>`;
  const cuffLines = s.cuff === 0 ? "" : s.cuff === 1 ? `<rect x="30" y="14" width="48" height="4" fill="${acc}"/>` : `<rect x="30" y="11" width="48" height="3" fill="${acc}"/><rect x="30" y="18" width="48" height="3" fill="${acc}"/>`;
  return `<svg viewBox="0 0 124 146" class="sock" role="img" aria-label="${esc(sockName(s))}"><defs><clipPath id="c${id}"><path d="${SOCK_PATH}"/></clipPath>${ghost ? "" : patternDef("p"+id, s)}</defs>
    <g clip-path="url(#c${id})"><rect width="124" height="146" fill="${base}"/>${ghost ? "" : `<rect x="0" y="26" width="124" height="120" fill="url(#p${id})"/>`}
      ${ghost ? "" : `<circle cx="33" cy="116" r="17" fill="${heelC}"/><path d="M96 90 L140 120 L110 160 L82 140 Z" fill="${heelC}"/>`}
      <rect x="28" y="0" width="52" height="26" fill="${ghost ? base : base}"/><path d="M38 4 V24 M46 4 V24 M54 4 V24 M62 4 V24 M70 4 V24" stroke="rgba(0,0,0,.18)" stroke-width="1.4"/>${ghost ? "" : cuffLines}</g>
    <path d="${SOCK_PATH}" fill="none" stroke="rgba(10,6,30,.55)" stroke-width="2.4" stroke-linejoin="round"/></svg>`;
}
const SOCK = sockFor(RETO);
document.documentElement.style.setProperty("--sock", BASES[SOCK.base]);
document.documentElement.style.setProperty("--sock-acc", ACCS[SOCK.acc]);

/* ================= CEO (canvas) ================= */
const cv = $("#sky"), ctx = cv.getContext("2d");
let W = 0, H = 0, DPR = 1, BASE = 300, K = 1;
let view = [((ORDER.indexOf(TARGET.id) * 97 + 140) % 360), 15]; // centro inicial afastado do obxectivo
const proj = d3.geoOrthographic().reflectX(true).clipAngle(90).precision(0.5);
const path = d3.geoPath(proj, ctx);
// capa de efectos (radar): anímase sen redebuxar todo o ceo
const fx = $("#fx"), fctx = fx.getContext("2d"), fpath = d3.geoPath(proj, fctx); let fxAnim = 0;
function renderFx(){
  fctx.setTransform(1,0,0,1,0,0); fctx.clearRect(0, 0, fx.width, fx.height); fctx.setTransform(DPR,0,0,DPR,0,0);
  const more = CONFIG.HINT === "radar" ? drawRadar(fctx, fpath) : false;
  if (more && !fxAnim) fxAnim = requestAnimationFrame(() => { fxAnim = 0; renderFx(); });
}
function resize(){
  DPR = Math.min(2.5, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight;
  cv.width = Math.round(W*DPR); cv.height = Math.round(H*DPR); cv.style.width = W+"px"; cv.style.height = H+"px";
  fx.width = cv.width; fx.height = cv.height; fx.style.width = W+"px"; fx.style.height = H+"px";
  BASE = 0.62 * Math.max(W, H); draw();
}
function centerY(){ return (state.status !== "playing" && !$("#sheet").classList.contains("collapsed")) ? Math.max(120, H*0.26) : H/2 - 20; }
function setProj(){ proj.scale(BASE*K).translate([W/2, centerY()]).rotate([-view[0], -view[1]]); }
function visible(lon, lat){ return angDist([lon,lat], view) < 89.5; }
let hitConLines = null; const nearLines = new Set();
function draw(){
  setProj();
  ctx.setTransform(DPR,0,0,DPR,0,0);
  const g = ctx.createRadialGradient(W/2, H*0.35, 0, W/2, H*0.35, Math.max(W,H));
  g.addColorStop(0, "#1c1650"); g.addColorStop(.55, "#120f38"); g.addColorStop(1, "#0a0a24");
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  // Vía Láctea
  for (const m of MW){ if (!visible(m[0], m[1])) continue; const p = proj([m[0], m[1]]); const r = m[2] * Math.min(2.2, Math.sqrt(K));
    const gr = ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],r); gr.addColorStop(0,"rgba(170,160,255,.05)"); gr.addColorStop(1,"rgba(170,160,255,0)"); ctx.fillStyle = gr; ctx.fillRect(p[0]-r,p[1]-r,2*r,2*r); }
  // retícula
  ctx.beginPath(); path(d3.geoGraticule().step([15,15])()); ctx.strokeStyle = "rgba(170,170,255,.07)"; ctx.lineWidth = 1; ctx.stroke();
  // estrelas de fondo
  for (const b of BG){ if (!visible(b[0], b[1])) continue; const p = proj([b[0], b[1]]); const s = Math.max(.35, (6.8 - b[2]) * .28) * Math.min(1.6, Math.pow(K,.25));
    ctx.fillStyle = `rgba(230,230,255,${Math.max(.15, (6.8-b[2])/4)})`; ctx.fillRect(p[0]-s/2, p[1]-s/2, s, s); }
  drawBeams(); if (CONFIG.HINT === "ns") drawNS();
  // liñas
  ctx.lineWidth = 1.1; ctx.strokeStyle = "rgba(160,170,255,.28)";
  ctx.beginPath(); LINE_GEO.forEach(l => path({ type:"LineString", coordinates:l.coords })); ctx.stroke();
  if (nearLines.size){ ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.beginPath(); LINE_GEO.filter(l => nearLines.has(l.con)).forEach(l => path({ type:"LineString", coordinates:l.coords })); ctx.stroke(); }
  if (hitConLines){ ctx.lineWidth = 2.8; ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.shadowColor = getComputedStyle(document.documentElement).getPropertyValue("--sock"); ctx.shadowBlur = 10;
    ctx.beginPath(); LINE_GEO.filter(l => l.con === hitConLines).forEach(l => path({ type:"LineString", coordinates:l.coords })); ctx.stroke(); ctx.shadowBlur = 0; }
  // nomes de constelacións
  if (prefs.labels !== false){ ctx.font = `500 ${Math.round(12 + Math.min(4, K))}px "Bricolage Grotesque", system-ui, sans-serif`; ctx.textAlign = "center"; ctx.fillStyle = "rgba(190,190,255,.42)";
    for (const c in CON_CENTER){ const [lo,la] = CON_CENTER[c]; if (!visible(lo,la)) continue; const p = proj([lo,la]); ctx.fillText(conName(c), p[0], p[1] + 22); } }
  // obxectos
  for (const o of OBJECTS){ if (!visible(o.lon, o.lat)) continue; const p = proj([o.lon, o.lat]); o._p = p;
    if (o.kind === "star"){ const r = Math.max(1.1, (3.6 - .62*Math.max(-1.5, Math.min(o.mag, 5)))) * Math.min(2, Math.pow(K, .3)); const col = kelvinRGB(o.T);
      if (o.mag < 2.2){ const gr = ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],r*4.5); gr.addColorStop(0, col.replace("rgb","rgba").replace(")",",.35)")); gr.addColorStop(1,"rgba(0,0,0,0)"); ctx.fillStyle = gr; ctx.fillRect(p[0]-r*5,p[1]-r*5,r*10,r*10); }
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 2*Math.PI); ctx.fill();
      if (o.mag > 6){ ctx.strokeStyle = "rgba(255,160,140,.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p[0],p[1], 4, 0, 2*Math.PI); ctx.stroke(); }
    } else drawDSO(o, p);
  }
  // nomes de estrelas probadas / explorando
  ctx.font = `600 12px "Bricolage Grotesque", system-ui, sans-serif`; ctx.textAlign = "left";
  const named = new Set(state.guesses.filter(g => g.id).map(g => g.id)); if (state.status !== "playing") named.add(TARGET.id); if (K > 3) OBJECTS.forEach(o => { if (o.mag < 2.5 || o.kind === "dso") named.add(o.id); });
  named.forEach(id => { const o = BYID[id]; if (!o || !visible(o.lon, o.lat)) return; const p = proj([o.lon,o.lat]); ctx.fillStyle = "rgba(240,236,255,.85)"; ctx.fillText(objName(o), p[0] + 9, p[1] - 8); });
  // marcadores dos intentos
  state.guesses.forEach((g, i) => { if (!visible(g.lon, g.lat)) return; const p = proj([g.lon, g.lat]); const c = lvlColor(g);
    ctx.lineWidth = 2.4; ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(p[0], p[1], 12, 0, 2*Math.PI); ctx.stroke();
    ctx.fillStyle = c; ctx.font = `700 11px "Bricolage Grotesque", system-ui, sans-serif`; ctx.textAlign = "center"; ctx.fillText(String(i+1), p[0], p[1] - 16); });
  if (false && state.status === "playing" && hitConLines){ ctx.strokeStyle = hexA(CON_COLOR, .75); ctx.lineWidth = 1.4;
    OBJECTS.forEach(o => { if (o.con !== TARGET.con || !visible(o.lon,o.lat) || state.guesses.some(g => g.id === o.id)) return; const p = proj([o.lon,o.lat]); ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, 2*Math.PI); ctx.stroke(); }); }
  if (selected && visible(selected.lon, selected.lat)){ const p = proj([selected.lon, selected.lat]); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.setLineDash([5,4]); ctx.beginPath(); ctx.arc(p[0],p[1], 15, 0, 2*Math.PI); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#fff"; ctx.font = `700 13px "Bricolage Grotesque", system-ui, sans-serif`; ctx.textAlign = "left"; ctx.fillText(objName(selected), p[0] + 18, p[1] + 4); }
  if (pending){ const p = proj(pending); ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 2; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.arc(p[0],p[1], 14 + 4*Math.sin(Date.now()/120), 0, 2*Math.PI); ctx.stroke(); ctx.setLineDash([]); }
  placeSockOverlay(); drawMini(); renderFx();
}
function drawDSO(o, p){
  const k = Math.min(2.2, Math.pow(K,.4)), a = "rgba(210,200,255,";
  if (o.type === "galaxy"){ ctx.save(); ctx.translate(p[0],p[1]); ctx.rotate(.6); const rx = (o.id === "LMC" || o.id === "SMC" ? 18 : 11)*k, ry = rx*.45;
    const gr = ctx.createRadialGradient(0,0,0,0,0,rx); gr.addColorStop(0,a+".55)"); gr.addColorStop(1,a+"0)"); ctx.scale(1, ry/rx); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0,0,rx,0,2*Math.PI); ctx.fill(); ctx.restore(); }
  else if (o.type === "nebula" || o.type === "remnant"){ const r = 10*k; const gr = ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],r); gr.addColorStop(0,"rgba(255,140,190,.5)"); gr.addColorStop(1,"rgba(255,140,190,0)"); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(p[0],p[1],r,0,2*Math.PI); ctx.fill(); }
  else if (o.type === "planetary"){ ctx.strokeStyle = "rgba(140,230,220,.8)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(p[0],p[1],4*k,0,2*Math.PI); ctx.stroke(); }
  else if (o.type === "cluster" || o.type === "globular"){ const r = mulberry(o.id.length*31); ctx.fillStyle = o.type === "cluster" ? "rgba(190,215,255,.9)" : "rgba(255,235,200,.8)";
    for (let i=0;i<(o.type === "cluster" ? 7 : 16);i++){ const an = r()*6.28, d = r()*6*k; ctx.fillRect(p[0]+Math.cos(an)*d-0.8, p[1]+Math.sin(an)*d-0.8, 1.6, 1.6); } }
  else if (o.type === "blackhole"){ ctx.strokeStyle = "rgba(255,190,120,.7)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p[0],p[1],5*k,0,2*Math.PI); ctx.stroke(); ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(p[0],p[1],3*k,0,2*Math.PI); ctx.fill(); }
}
let raf = 0; function redraw(){ if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); }

// arrastrar e ampliar
let prevT = d3.zoomIdentity;
const zoom = d3.zoom().scaleExtent([0.55, 14]).on("zoom", ev => {
  const t = ev.transform;
  if (Math.abs(t.k - prevT.k) > 1e-6){ K = t.k; }
  else { const s = 180 / (Math.PI * BASE * K); view[0] = (view[0] + (t.x - prevT.x) * s + 360) % 360; view[1] = Math.max(-89.9, Math.min(89.9, view[1] + (t.y - prevT.y) * s)); }
  prevT = t; redraw();
});
d3.select(cv).call(zoom).on("dblclick.zoom", null);
function flyTo(lon, lat, k, ms){
  const from = view.slice(), k0 = K, dl = ((lon - from[0] + 540) % 360) - 180;
  d3.select({}).transition().duration(ms || 1100).ease(d3.easeCubicInOut).tween("fly", () => t => {
    view = [(from[0] + dl*t + 360) % 360, from[1] + (lat - from[1])*t]; K = k0 + (k - k0)*t; redraw(); })
    .on("end", () => { const tr = d3.zoomIdentity.scale(K); prevT = tr; d3.select(cv).property("__zoom", tr); });
}

/* ================= PISTAS: cercanía, constelación e linterna ================= */
const NEAR_COLORS = ["#5d5c96","#7f6fe0","#4a9be8","#35c2a8","#f2c94c"], CON_COLOR = "#ff9f5a";
function nearIdx(d){ return d > 90 ? 0 : d > 45 ? 1 : d > 20 ? 2 : d > 8 ? 3 : 4; }
function guessCon(g){ return g.id && BYID[g.id] ? BYID[g.id].con : conOfPoint(g.lon, g.lat); }
function lvl(g){ return g.d <= CONFIG.WIN_DEG ? 6 : guessCon(g) === TARGET.con ? 5 : nearIdx(g.d); }
function lvlColor(g){ const l = lvl(g); return l === 6 ? BASES[SOCK.base] : l === 5 ? CON_COLOR : NEAR_COLORS[l]; }
function tuneScore(d){ return Math.max(0, Math.min(1, 1 - Math.log(1 + d)/Math.log(181))); }
function fmtDeg(d){ return d < 10 ? `${d.toFixed(1).replace(".", ",")}°` : `${Math.round(d)}°`; }
// constelacións veciñas: algunha das súas estrelas a menos de 14° dalgún astro da constelación obxectivo
const NEIGH = (function(){ const own = OBJECTS.filter(o => o.con === TARGET.con); const s = new Set();
  OBJECTS.forEach(o => { if (o.kind !== "star" || o.con === TARGET.con) return; if (own.some(t => angDist([o.lon,o.lat],[t.lon,t.lat]) < 14)) s.add(o.con); }); return s; })();
function inConNow(){ return state.guesses.some(g => guessCon(g) === TARGET.con); }
// xeometría esférica (graos)
function bearing(a, b){ const [l1,p1] = [a[0]*rad, a[1]*rad], [l2,p2] = [b[0]*rad, b[1]*rad];
  return Math.atan2(Math.sin(l2-l1)*Math.cos(p2), Math.cos(p1)*Math.sin(p2) - Math.sin(p1)*Math.cos(p2)*Math.cos(l2-l1))/rad; }
function dest(a, brg, dist){ const l1 = a[0]*rad, p1 = a[1]*rad, t = brg*rad, dl = dist*rad;
  const p2 = Math.asin(Math.sin(p1)*Math.cos(dl) + Math.cos(p1)*Math.sin(dl)*Math.cos(t));
  const l2 = l1 + Math.atan2(Math.sin(t)*Math.sin(dl)*Math.cos(p1), Math.cos(dl) - Math.sin(p1)*Math.sin(p2));
  return [((l2/rad) % 360 + 360) % 360, p2/rad]; }
// linterna: o haz sae do intento cara ao calcetín; a dirección real está dentro do haz, pero non sempre no medio
const BEAM_W = [55, 40, 28, 18, 11];
function beamFor(g, i){
  const w = BEAM_W[nearIdx(g.d)], r = mulberry(RETO*131 + i*17 + 7)();
  const c = bearing([g.lon, g.lat], [TARGET.lon, TARGET.lat]) + (2*r - 1) * w * 0.55;
  const L = Math.max(7, Math.min(45, g.d * 1.5));
  const ring = [[g.lon, g.lat]]; for (let k = 0; k <= 16; k++) ring.push(dest([g.lon, g.lat], c - w + 2*w*k/16, L)); ring.push([g.lon, g.lat]);
  let poly = { type:"Polygon", coordinates:[ring] }; if (d3.geoArea(poly) > 2*Math.PI) poly = { type:"Polygon", coordinates:[ring.slice().reverse()] };
  return { poly, c, L, w, apex:[g.lon, g.lat], tip: dest([g.lon, g.lat], c, L), aim: dest([g.lon, g.lat], c, L*0.5) };
}
/* radar: ondas ata a distancia do calcetín; 270° con trazo e 90° de oco onde NON está */
let radarT = 0;
function radarFor(g, i){
  const r = mulberry(RETO*977 + i*31 + 5), b = bearing([g.lon, g.lat], [TARGET.lon, TARGET.lat]);
  const gapC = b + 180 + (2*r() - 1)*120; // o oco nunca toca a dirección real, pero non sempre está oposto
  return { gap0: gapC - 45, gap1: gapC + 45, n: Math.max(1, Math.min(8, Math.ceil(g.d/12))) };
}
function arcCoords(c, rDeg, a0, a1, step){
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0)/step)), out = [];
  for (let k = 0; k <= n; k++) out.push(dest(c, a0 + (a1 - a0)*k/n, rDeg));
  return out;
}
const RADAR_MS = 2600;
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeSoft = x => 1 - Math.pow(1 - x, 2);           // freado máis suave
const smooth = (a, b, x) => { const u = Math.max(0, Math.min(1, (x - a)/(b - a))); return u*u*(3 - 2*u); };
// tres estilos para probar: "pulsos" (ondas que pasan e desaparecen), "halo" (banda difusa e tenue), "apagase" (aneis que se van apagando)
let RADAR_STYLE = ["pulsos","halo","apagase"].includes(prefs.radarStyle) ? prefs.radarStyle : "pulsos";
function drawRadar(X, P){ // debúxase na capa #fx; devolve true mentres siga a animación
  if (state.status !== "playing" || !state.guesses.length) return false;
  const now = performance.now();
  if (now < radarT) return isFinite(radarT);
  const i = state.guesses.length - 1, g = state.guesses[i], R = radarFor(g, i), c = [g.lon, g.lat], ink = "#fff4c8";
  const rMax = Math.max(0.8, Math.min(g.d, 178)), el = now - radarT, rnd = mulberry(RETO*613 + i*7 + 1);
  const arc = (r, a0, a1) => { X.beginPath(); P({ type:"LineString", coordinates: arcCoords(c, Math.max(0.3, Math.min(178, r)), a0, a1, 1.5) }); };
  X.lineCap = "round"; X.lineJoin = "round";
  const ring = (r, w, a) => { if (a <= 0.004) return; X.lineWidth = w; X.strokeStyle = hexA(ink, a); arc(r, R.gap1, R.gap0 + 360); X.stroke();
    X.save(); X.setLineDash([2,7]); X.lineWidth = .8; X.strokeStyle = hexA(ink, a*.2); arc(r, R.gap0, R.gap1); X.stroke(); X.restore(); };

  if (RADAR_STYLE === "pulsos"){
    // tres ondas seguidas; cada unha morre nun punto distinto arredor da distancia real (±15 %) e apágase
    const PUL = 3, GAPMS = 1300, LIFE = 3600; let more = false;
    for (let k = 0; k < PUL; k++){
      const end = rMax*(1 + (rnd()*2 - 1)*0.15), q = (el - k*GAPMS)/LIFE;
      if (q < 0){ more = true; continue; } if (q >= 1) continue;
      more = true;
      // entra suave, avanza freando e apágase devagar
      ring(easeSoft(q)*end, 2.2, .7*smooth(0, .12, q)*Math.pow(1 - q, 1.8));
    }
    // última onda: chega, queda quieta un pouco e apágase moi amodo
    const LAST = 7600, ql = (el - PUL*GAPMS)/LAST;
    if (ql < 1){ more = true;
      if (ql >= 0){ const endL = rMax*(1 + (rnd()*2 - 1)*0.12), tr = .42;
        const r = easeSoft(Math.min(1, ql/tr))*endL, a = .72*smooth(0, .05, ql)*(1 - smooth(.6, 1, ql));
        ring(r, 2.4, a); } }
    return more;
  }
  if (R && RADAR_STYLE === "halo"){
    // banda ancha e difusa; o máis brillante non cae xusto na distancia real
    const grow = smooth(0, 1, el/2200), centre = rMax*(1 + (rnd()*2 - 1)*0.12), width = 0.28;
    for (let f = -1; f <= 1.0001; f += 0.125){
      const a = grow*.07*Math.exp(-f*f*2.2);
      ring(centre*(1 + f*width)*(0.6 + 0.4*grow), 7, a);
    }
    return grow < 1;
  }
  // "apagase": os aneis aparecen coa onda e despois apáganse aos poucos (7 s), sen eco fixo
  const p = Math.min(1, el/RADAR_MS), front = easeSoft(p)*rMax, step = rMax/R.n, fade = Math.max(0, 1 - Math.max(0, el - RADAR_MS)/7000);
  for (let k = 1; k <= R.n; k++){
    const rr = step*k, a = Math.max(0, Math.min(1, (front - rr + step*0.6)/(step*0.6)));
    if (a <= 0) break; ring(rr, 1.3, fade*a*(.18 + .4*k/R.n));
  }
  if (p < 1) ring(front, 2.6, .7*smooth(0, .1, p)*(1 - p*.6));
  return fade > 0;
}
function replayRadar(delay){ radarT = performance.now() + (delay || 0); renderFx(); }

function nsOf(g){ const d = TARGET.lat - g.lat; return Math.abs(d) < 2 ? "eq" : d > 0 ? "n" : "s"; }
function drawNS(){ // paralelo polo último intento e unha frecha cara ao norte ou ao sur
  if (state.status !== "playing" || !state.guesses.length) return;
  const g = state.guesses[state.guesses.length-1], ns = nsOf(g), sock = BASES[SOCK.base];
  const par = []; for (let k = 0; k <= 360; k += 4) par.push([(g.lon + k) % 360, g.lat]);
  ctx.save(); ctx.setLineDash([3,7]); ctx.lineWidth = 1.3; ctx.strokeStyle = "rgba(255,244,200,.45)"; ctx.beginPath(); path({ type:"LineString", coordinates:par }); ctx.stroke(); ctx.restore();
  if (ns === "eq" || !visible(g.lon, g.lat)) return;
  const brg = ns === "n" ? 0 : 180, a = proj([g.lon, g.lat]), tip = dest([g.lon, g.lat], brg, 6/Math.sqrt(K)), b = proj(tip);
  if (!b || !visible(tip[0], tip[1])) return;
  const dx = b[0]-a[0], dy = b[1]-a[1], L = Math.hypot(dx, dy) || 1, ux = dx/L, uy = dy/L, s0 = 20;
  const x0 = a[0] + ux*s0, y0 = a[1] + uy*s0, x1 = a[0] + ux*Math.max(s0+26, L), y1 = a[1] + uy*Math.max(s0+26, L);
  ctx.strokeStyle = "#fff4c8"; ctx.fillStyle = "#fff4c8"; ctx.lineWidth = 2.4; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1 + ux*7, y1 + uy*7); ctx.lineTo(x1 - uy*6 - ux*3, y1 + ux*6 - uy*3); ctx.lineTo(x1 + uy*6 - ux*3, y1 - ux*6 - uy*3); ctx.closePath(); ctx.fill();
  ctx.font = `700 11px "Bricolage Grotesque", system-ui, sans-serif`; ctx.textAlign = "center"; ctx.fillText(ns === "n" ? "N" : "S", x1 + ux*18, y1 + uy*18 + 4);
}
function drawBeams(){
  if (CONFIG.HINT !== "beam") return;
  if (state.status !== "playing") return;
  const n = state.guesses.length; if (!n) return;
  const sock = BASES[SOCK.base];
  for (let i = Math.max(0, n-3); i < n; i++){ const g = state.guesses[i]; if (g.d <= CONFIG.WIN_DEG) continue;
    const b = beamFor(g, i), strong = i === n-1, p0 = proj(b.apex);
    const rr = Math.max(40, BASE*K*Math.sin(Math.min(89, b.L)*rad));
    const gr = ctx.createRadialGradient(p0[0], p0[1], 0, p0[0], p0[1], rr);
    gr.addColorStop(0, hexA("#fff4c8", strong ? .55 : .14)); gr.addColorStop(.35, hexA(sock, strong ? .32 : .08)); gr.addColorStop(1, hexA(sock, 0));
    ctx.beginPath(); path(b.poly); ctx.fillStyle = gr; ctx.fill();
    if (strong){ ctx.save(); ctx.setLineDash([2,6]); ctx.lineWidth = 1.4; ctx.strokeStyle = "rgba(255,244,200,.55)"; ctx.beginPath(); path({ type:"LineString", coordinates:[b.apex, b.tip] }); ctx.stroke(); ctx.restore(); }
  }
}
function hexA(hex, a){ const n = parseInt(hex.slice(1),16); return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`; }

/* ================= SON: sonar ================= */
let AC = null;
function ping(level){ // level 0–4 distancia, 5 constelación, 6 atopado
  if (prefs.sound === false) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === "suspended") AC.resume();
    const now = AC.currentTime;
    const note = (f, t, dur, vol, type) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type || "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, now+t); g.gain.exponentialRampToValueAtTime(vol, now+t+.012); g.gain.exponentialRampToValueAtTime(.0001, now+t+dur);
      o.connect(g); g.connect(AC.destination); o.start(now+t); o.stop(now+t+dur+.05); };
    if (level === 6){ [523.25, 659.25, 783.99, 1046.5].forEach((f,i) => note(f, i*.11, 2.2, .09, "triangle")); return; }
    if (level === 5){ note(659.25, 0, .5, .12, "triangle"); note(987.77, .16, .9, .12, "triangle"); return; }
    const n = level + 1, gap = .34 - level*.055;
    for (let i = 0; i < n; i++) note(620 + level*90, i*gap, .22, .13);
  } catch(e){}
}

/* ================= XOGO ================= */
let locked = false, pending = null, selected = null;
function save(){ store.set(KEY, state); }
function conOfPoint(lon, lat){ let best = null, bd = 9; OBJECTS.forEach(o => { if (o.kind !== "star") return; const d = angDist([lon,lat],[o.lon,o.lat]); if (d < bd){ bd = d; best = o.con; } }); return best; }
function pick(px, py){ let best = null, bd = 26; OBJECTS.forEach(o => { if (!o._p || !visible(o.lon,o.lat)) return; const d = Math.hypot(o._p[0]-px, o._p[1]-py); if (d < bd){ bd = d; best = o; } }); return best; }
function select(o){
  selected = o || null; const box = $("#pick");
  if (!selected || state.status !== "playing"){ box.hidden = true; redraw(); return; }
  const tried = state.guesses.some(g => g.id === o.id);
  $("#pickName").textContent = objName(o);
  $("#pickSub").textContent = tried ? T().tried : conName(o.con);
  $("#pickGo").textContent = T().go; $("#pickGo").disabled = tried || locked;
  box.hidden = false; redraw();
}
d3.select(cv).on("click", ev => {
  const [x, y] = d3.pointer(ev, cv);
  const o = pick(x, y);
  if (state.status !== "playing"){ if (o) openCard(o); return; }
  if (locked) return;
  select(o);
});
$("#pickGo").onclick = () => { if (!selected || locked) return; const o = selected; select(null); guess([o.lon, o.lat], o); };
function fitBeam(b){ const L = b.L*rad; return Math.max(0.8, Math.min(9, 0.42*Math.min(W, H) / (BASE*Math.sin(Math.min(L, 1.2))))); }
function focusLast(ms){ const n = state.guesses.length; if (!n) return; const g = state.guesses[n-1];
  if (inConNow() && CON_CENTER[TARGET.con] && guessCon(g) === TARGET.con){ const c = CON_CENTER[TARGET.con]; const ext = Math.max(4, ...OBJECTS.filter(o => o.con === TARGET.con).map(o => angDist([o.lon,o.lat], c)));
    flyTo(c[0], c[1], Math.max(0.8, Math.min(9, 0.4*Math.min(W, H) / (BASE*Math.sin(Math.min(ext*1.15, 70)*rad)))), ms); return; }
  if (CONFIG.HINT === "ns"){ flyTo(g.lon, g.lat, K, ms); return; }
  if (CONFIG.HINT === "radar"){ const r = Math.max(3, Math.min(g.d, 85)); flyTo(g.lon, g.lat, Math.max(0.55, Math.min(9, 0.42*Math.min(W, H)/(BASE*Math.sin(r*rad)))), ms); return; }
  const b = beamFor(g, n-1); flyTo(b.aim[0], b.aim[1], fitBeam(b), ms); }
$("#focusBtn").onclick = () => { focusLast(1200); replayRadar(1250); };
function coach(i){
  const done = prefs.tut || 0; if (done > i || done >= 3 || state.status !== "playing") return;
  prefs.tut = i; store.set("calcetin:v1:prefs", prefs);
  $("#coachText").textContent = T().coach[i]; $("#coachOk").textContent = T().gotIt; $("#coach").hidden = false; $("#coach").dataset.i = i;
}
$("#coachOk").onclick = () => { prefs.tut = (+$("#coach").dataset.i || 0) + 1; store.set("calcetin:v1:prefs", prefs); $("#coach").hidden = true; };
async function guess(ll, o){
  locked = true; if (!state.start){ state.start = Date.now(); startTimer(); }
  const wasIn = inConNow();
  pending = ll; (function pulse(){ if (!pending) return; redraw(); requestAnimationFrame(pulse); })();
  await sleep(CONFIG.SUSPENSE_MS); pending = null;
  const d = (o && o.id === TARGET.id) ? 0 : angDist(ll, [TARGET.lon, TARGET.lat]);
  const prev = state.guesses.length ? state.guesses[state.guesses.length-1].d : null;
  const g = { lon: +ll[0].toFixed(3), lat: +ll[1].toFixed(3), d: +d.toFixed(2), id: o ? o.id : null };
  state.guesses.push(g);
  const found = d <= CONFIG.WIN_DEG, L = lvl(g);
  radarT = Infinity; // non se debuxa ata que remate o voo da cámara
  ping(L); setReadout(g); setDelta(prev, d);
  const con = guessCon(g);
  if (!found && con === TARGET.con){ hitConLines = TARGET.con; if (!wasIn) toast(T().inCon(conName(TARGET.con)), 3200); }
  if (found || state.guesses.length >= CONFIG.MAX_TRIES) $("#coach").hidden = true;
  else if (con === TARGET.con || state.guesses.length >= 3) coach(2); else if (state.guesses.length >= 1) coach(1);
  else if (!found && NEIGH.has(con) && d < 35){ nearLines.add(con); }
  if (found){ state.status = "won"; state.end = Date.now(); }
  else if (state.guesses.length >= CONFIG.MAX_TRIES){ state.status = "lost"; state.end = Date.now(); }
  save(); renderPips(); redraw();
  if (state.status !== "playing"){ stopTimer(); countStats(); await sleep(found ? 700 : 1000); reveal(true); }
  else { await sleep(150); focusLast(1200); radarT = performance.now() + 1250; redraw(); }
  locked = false;
}
function setReadout(g){
  const el = $("#tuneName"), deg = $("#deg"), tag = $("#tag"), bars = $("#bars");
  if (!g){ el.textContent = T().start; deg.textContent = ""; tag.textContent = ""; tag.hidden = true; if ($("#nsTag")) $("#nsTag").hidden = true; bars.dataset.n = 0; bars.style.setProperty("--c", "var(--muted)"); return; }
  const L = lvl(g), found = L === 6;
  el.textContent = state.status === "lost" ? T().noTries : found ? T().found : L === 5 ? T().inConT : T().near[L];
  deg.textContent = found ? "" : fmtDeg(g.d);
  let t = ""; if (!found){ if (inConNow()) t = T().chip(conName(TARGET.con)); else if (NEIGH.has(guessCon(g)) && g.d < 35) t = T().nextCon; }
  tag.textContent = t; tag.hidden = !t; tag.classList.toggle("con", inConNow());
  const nsEl = $("#nsTag"); if (nsEl){ const ns = found || state.status !== "playing" || CONFIG.HINT !== "ns" ? "" : nsOf(g);
    nsEl.textContent = ns === "n" ? "⬆ " + T().nsN : ns === "s" ? "⬇ " + T().nsS : ns === "eq" ? "↔ " + T().nsEq : ""; nsEl.hidden = !ns; }
  bars.dataset.n = found || L === 5 ? 5 : L + 1; bars.style.setProperty("--c", lvlColor(g));
  bars.classList.toggle("glow", L >= 5);
}
let deltaKey = null;
function setDelta(prev, d){
  if (prev == null){ deltaKey = state.guesses.length ? "first" : "tapSky"; }
  else { const r = d / Math.max(prev, .01); deltaKey = d <= CONFIG.WIN_DEG ? "" : r < .5 ? "muchCloser" : r < .9 ? "closer" : r <= 1.1 ? "same" : r <= 2 ? "farther" : "muchFarther"; }
  renderDelta();
}
function renderDelta(){ const el = $("#delta");
  if (state.status === "lost"){ el.textContent = T().closest(fmtDeg(Math.min(...state.guesses.map(g => g.d)))); return; }
  el.textContent = deltaKey ? T()[deltaKey] : ""; }
function renderPips(){
  const box = $("#pips"); box.innerHTML = "";
  for (let i=0;i<CONFIG.MAX_TRIES;i++){ const p = document.createElement("span"); p.className = "pip"; const g = state.guesses[i];
    if (g){ p.style.background = lvlColor(g); p.style.borderColor = lvlColor(g); } else if (i === state.guesses.length && state.status === "playing") p.classList.add("next");
    box.appendChild(p); }
  const left = CONFIG.MAX_TRIES - state.guesses.length;
  $("#left").textContent = state.status === "playing" ? (left === 1 ? T().last : T().left(left)) : "";
  $("#focusBtn").hidden = !(state.status === "playing" && state.guesses.length);
}

/* ================= MINIMAPA ================= */
const mini = $("#mini"), mctx = mini.getContext("2d"); let MW_ = 0, MH_ = 0;
function miniXY(lon, lat){ const dl = ((view[0] - lon + 540) % 360) - 180; return [MW_/2 + dl/360*MW_, MH_/2 - lat/180*MH_]; }
function drawMini(){
  const r = mini.getBoundingClientRect(); if (!r.width) return;
  if (MW_ !== r.width || MH_ !== r.height){ MW_ = r.width; MH_ = r.height; mini.width = Math.round(MW_*DPR); mini.height = Math.round(MH_*DPR); }
  const c = mctx; c.setTransform(DPR,0,0,DPR,0,0); c.clearRect(0,0,MW_,MH_);
  c.fillStyle = "rgba(170,160,255,.10)"; for (let i = 0; i < MW.length; i += 3){ const p = miniXY(MW[i][0], MW[i][1]); c.fillRect(p[0]-1, p[1]-1, 2, 2); }
  c.strokeStyle = "rgba(90,90,190,.35)"; c.lineWidth = .6; c.beginPath(); c.moveTo(0, MH_/2); c.lineTo(MW_, MH_/2); c.stroke();
  const seg = (l, col, w) => { const a = miniXY(...l.coords[0]), b = miniXY(...l.coords[1]); if (Math.abs(a[0]-b[0]) > MW_/2) return; c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); };
  LINE_GEO.forEach(l => seg(l, "rgba(170,175,255,.35)", .8));
  nearLines.forEach(k => LINE_GEO.filter(l => l.con === k).forEach(l => seg(l, "rgba(255,255,255,.7)", 1)));
  if (hitConLines) LINE_GEO.filter(l => l.con === hitConLines).forEach(l => seg(l, CON_COLOR, 1.6));
  // o que estás mirando
  const fov = Math.asin(Math.min(1, (Math.min(W,H)/2) / (BASE*K))) / rad, v = miniXY(view[0], view[1]);
  c.strokeStyle = "rgba(255,255,255,.85)"; c.lineWidth = 1.2; c.beginPath(); c.ellipse(v[0], v[1], Math.max(3, fov/360*MW_), Math.max(3, fov/180*MH_), 0, 0, 2*Math.PI); c.stroke();
  // intentos e linterna
  const n = state.guesses.length;
  state.guesses.forEach((g, i) => { const p = miniXY(g.lon, g.lat); c.fillStyle = lvlColor(g); c.beginPath(); c.arc(p[0], p[1], i === n-1 ? 3 : 2.2, 0, 2*Math.PI); c.fill(); });
  if (false && CONFIG.HINT === "radar" && state.status === "playing" && n){ const g = state.guesses[n-1], R = radarFor(g, n-1); // no minimapa non se marca o anel (sería demasiado obvio)
    c.strokeStyle = hexA("#fff4c8", .9); c.lineWidth = 1.2; c.beginPath(); let prev = null;
    arcCoords([g.lon, g.lat], Math.max(0.8, Math.min(g.d, 178)), R.gap1, R.gap0 + 360, 4).forEach(q => { const m = miniXY(q[0], q[1]);
      if (!prev || Math.abs(m[0] - prev[0]) > MW_/2) c.moveTo(m[0], m[1]); else c.lineTo(m[0], m[1]); prev = m; });
    c.stroke(); }
  if (CONFIG.HINT === "ns" && state.status === "playing" && n){ const g = state.guesses[n-1], ns = nsOf(g), y = miniXY(g.lon, g.lat)[1], x = miniXY(g.lon, g.lat)[0];
    c.save(); c.setLineDash([2,3]); c.strokeStyle = hexA("#fff4c8", .6); c.lineWidth = 1; c.beginPath(); c.moveTo(0, y); c.lineTo(MW_, y); c.stroke(); c.restore();
    if (ns !== "eq"){ const dir = ns === "n" ? -1 : 1; c.fillStyle = "#fff4c8"; c.beginPath(); c.moveTo(x, y + dir*13); c.lineTo(x - 4, y + dir*6); c.lineTo(x + 4, y + dir*6); c.closePath(); c.fill(); } }
  if (CONFIG.HINT === "beam" && state.status === "playing" && n){ const g = state.guesses[n-1], b = beamFor(g, n-1), a = miniXY(...b.apex);
    c.strokeStyle = hexA("#fff4c8", .9); c.lineWidth = 1.2; c.beginPath(); c.moveTo(a[0], a[1]);
    for (let k = 1; k <= 8; k++){ const p = miniXY(...dest(b.apex, b.c, b.L*k/8)); if (Math.abs(p[0]-a[0]) > MW_/2) break; c.lineTo(p[0], p[1]); } c.stroke(); }
  if (state.status !== "playing"){ const p = miniXY(TARGET.lon, TARGET.lat); c.fillStyle = BASES[SOCK.base]; c.strokeStyle = "#fff"; c.lineWidth = 1; c.beginPath(); c.arc(p[0], p[1], 3.5, 0, 2*Math.PI); c.fill(); c.stroke(); }
}
mini.addEventListener("click", e => { const r = mini.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
  const lon = ((view[0] - (x - MW_/2)/MW_*360) % 360 + 360) % 360, lat = Math.max(-85, Math.min(85, (MH_/2 - y)/MH_*180));
  flyTo(lon, lat, Math.max(1, Math.min(K, 2.2)), 800); });
let timerId = null;
function elapsed(){ return state.start ? (state.end || Date.now()) - state.start : 0; }
function tick(){ $("#timer").textContent = fmtTime(elapsed()); }
function startTimer(){ if (!timerId){ timerId = setInterval(tick, 500); tick(); } }
function stopTimer(){ clearInterval(timerId); timerId = null; tick(); }
function bestScore(){ return state.guesses.length ? Math.max(...state.guesses.map(g => tuneScore(g.d))) : 0; }
function points(){
  if (!state.guesses.length) return 0;
  if (state.status === "won"){ const spare = CONFIG.MAX_TRIES - state.guesses.length, s = elapsed()/1000; return 600 + 40*spare + Math.round(40*Math.max(0, Math.min(1, (300 - s)/240))); }
  return 5 * Math.min(99, Math.round(100 * bestScore()));
}

/* ================= FINAL ================= */
const sockEl = $("#sockOnStar");
function placeSockOverlay(){
  if (state.status === "playing" || !visible(TARGET.lon, TARGET.lat)){ sockEl.hidden = true; return; }
  const p = proj([TARGET.lon, TARGET.lat]); sockEl.hidden = false; sockEl.style.transform = `translate(${p[0] - 6}px, ${p[1] - 4}px)`;
  sockEl.classList.toggle("ghosty", state.status === "lost");
}
function reveal(animate){
  sockEl.innerHTML = sockSVG(SOCK, { ghost: false }); sockEl.classList.toggle("drop", !!animate);
  hitConLines = TARGET.con;
  flyTo(TARGET.lon, TARGET.lat, Math.max(K, 1.6), animate ? 1300 : 1);
  renderEnd(); redraw();
}
function renderEnd(){
  if (state.status === "playing") return;
  const won = state.status === "won";
  $("#end").innerHTML = `
    <div class="endhead"><div class="endsock">${sockSVG(SOCK)}</div>
      <div><h2>${won ? T().won : T().lost}</h2><p class="sockname">${esc(sockName(SOCK))}</p></div></div>
    <p class="where">${T().where(esc(objName(TARGET)), esc(conName(TARGET.con)))}</p>
    <div class="nums">
      <div><b>${points()}</b><span>${T().pts}</span></div>
      <div><b>${won ? state.guesses.length : "–"}/${CONFIG.MAX_TRIES}</b><span>${T().tries}</span></div>
      <div><b>${fmtTime(elapsed())}</b><span>${T().time}</span></div>
    </div>
    ${TRAIN ? `<div class="actions"><button class="btn primary" id="againBtn">${T().another}</button><button class="btn" id="cardBtn">${T().card}</button></div>
    <div class="actions"><button class="btn" id="exploreBtn">${T().explore}</button></div>` :
    `<div class="actions"><button class="btn primary" id="cardBtn">${T().card}</button><button class="btn" id="shareBtn">${T().share}</button></div>
    <div class="actions"><button class="btn" id="drawerBtn2">${T().drawer}</button><button class="btn" id="exploreBtn">${T().explore}</button></div>
    ${SRV ? `<div class="actions"><button class="btn" id="rankBtn2">${T().rankBtn}</button></div>` : ""}`}
    <p class="next-in" id="nextIn"></p>`;
  $("#end").hidden = false; $("#sheet").classList.remove("collapsed");
  $("#cardBtn").onclick = () => openCard(TARGET);
  if (TRAIN) $("#againBtn").onclick = newTrain;
  else { $("#shareBtn").onclick = share; $("#drawerBtn2").onclick = openDrawer; if (SRV) $("#rankBtn2").onclick = openRank; }
  $("#exploreBtn").onclick = () => { $("#sheet").classList.add("collapsed"); redraw(); };
  renderDelta(); nextCountdown();
}
function launchLeft(){ const ms = CONFIG.EPOCH - new Date(); if (ms <= 0) return ""; const d = Math.floor(ms/86400000); return T().launchIn((d ? T().days(d) + " · " : "") + fmtTime(ms % 86400000)); }
function newTrain(){ store.del(KEY); store.set(TRAIN_SEED_KEY, 100000 + Math.floor(Math.random()*900000)); location.href = location.pathname + (PRELAUNCH ? "" : "?entrenar"); }
function nextCountdown(){ const el = $("#nextIn"), lc = $("#launchCount"); if (lc) lc.textContent = launchLeft(); if (!el) return;
  if (TRAIN){ el.textContent = PRELAUNCH ? launchLeft() : ""; return; } const n = new Date(), mid = new Date(n.getFullYear(), n.getMonth(), n.getDate()+1); el.textContent = T().nextIn(fmtTime(mid - n)); }
setInterval(nextCountdown, 1000);
const SHARE_SQ = ["⬛","🟪","🟦","🟩","🟨","🟧","🧦"];
function shareText(){
  const won = state.status === "won";
  const row = state.guesses.map(g => SHARE_SQ[lvl(g)]).join("");
  return `${won ? T().shareWon(RETO, state.guesses.length, CONFIG.MAX_TRIES, points()) : T().shareLost(RETO, CONFIG.MAX_TRIES, points())}\n${row}\n${sockName(SOCK)}${SRV ? "\n" + location.origin : ""}`;
}
async function share(){ const text = shareText();
  if (navigator.share){ try { await navigator.share({ text }); return; } catch(e){ if (e && e.name === "AbortError") return; } }
  try { await navigator.clipboard.writeText(text); toast(T().copied); } catch(e){ toast(T().copyFail); } }

/* ================= ESTATÍSTICAS / CAIXÓN ================= */
const STATS_KEY = "calcetin:v1:stats";
function getStats(){ return store.get(STATS_KEY, { hist: {} }); }
function countStats(){ if (state.counted || TESTING) return; const s = getStats();
  s.hist[RETO] = { f: state.status === "won" ? 1 : 0, t: state.guesses.length, p: points(), id: TARGET.id }; store.set(STATS_KEY, s); state.counted = true; save(); submitResult(RETO); }
function openDrawer(){
  const s = getStats(), last = Math.max(TODAY, TRAIN ? 0 : RETO), first = Math.min(1, ...Object.keys(s.hist).map(Number).filter(n => n >= 1));
  let html = "", found = 0, total = 0;
  for (let n = last; n >= first; n--){
    const h = s.hist[n], sk = sockFor(n), tgt = targetFor(n); total++;
    if (h && h.f) found++;
    const cls = !h ? "none" : h.f ? "found" : "lost";
    const cap = !h ? T().dNone : h.f ? T().foundIn(objName(tgt)) : (n < TODAY || n !== RETO || state.status !== "playing") ? T().lostIn(objName(tgt)) : T().dNone;
    html += `<button class="dcell ${cls}" data-n="${n}" title="${esc(sockName(sk))}">
      <span class="dsock">${!h ? sockSVG(sk, { empty: true }) : sockSVG(sk, { ghost: !h.f })}</span>
      <span class="dnum">${T().num} ${n}</span><span class="dcap">${esc(cap)}</span></button>`;
  }
  $("#drawerCount").textContent = last < 1 ? T().dEmpty : T().dCount(found, total);
  $("#drawerGrid").innerHTML = html;
  $("#drawerGrid").querySelectorAll(".dcell").forEach(b => b.onclick = () => { const n = +b.dataset.n, h = s.hist[n];
    if (h) openCard(targetFor(n)); });
  $("#drawerDlg").showModal();
}

/* ================= FICHA DO ASTRO ================= */
function starClass(o){
  if (/^W/.test(o.sp)) return "wr";
  const lc = (o.sp.match(/\b(Iab|Ia|Ib|III|II|IV|V)\b/) || [])[1] || "V";
  if (/^I[ab]/.test(lc) || lc === "Iab") return "supergiant";
  if (lc === "II") return "brightgiant"; if (lc === "III") return "giant"; if (lc === "IV") return "subgiant";
  if (o.T < 3900) return "reddwarf"; if (o.T >= 5200 && o.T < 6000) return "yellowdwarf"; return "dwarf";
}
function colorKey(T_){ return T_ > 25000 ? "blue" : T_ > 10000 ? "bluewhite" : T_ > 7500 ? "white" : T_ > 6000 ? "yellowwhite" : T_ > 5200 ? "yellow" : T_ > 3700 ? "orange" : "red"; }
function starLabel(o){ const c = starClass(o), t = T();
  if (c === "reddwarf" || c === "yellowdwarf" || c === "wr") return t.cls[c];
  return `${t.cls[c]} ${t.col[colorKey(o.T)]}`; }
function starDesc(o){ const c = starClass(o), t = T(); return t.desc[c === "yellowdwarf" ? "dwarf" : c === "brightgiant" ? "giant" : c]; }
function fmtLy(ly){ if (ly >= 1e6) return T().mly(String(+(ly/1e6).toFixed(1)).replace(".", ",")); return T().ly(ly < 20 ? String(ly).replace(".", ",") : num(Math.round(ly))); }
function lightStory(ly){ const y = 2026 - Math.round(ly); if (ly < 2026) return T().lightYear(y); return T().lightAgo(ly >= 1e6 ? num(Math.round(ly/1e5)*1e5) : num(Math.round(ly))); }
function bestMonth(o){ const ra = o.lon/15; const i = ((Math.round((ra - 12)/2 + 3) - 1) % 12 + 12) % 12; return MONTHS[LANG][i]; } // mes no que culmina á medianoite
function hrSVG(o){
  const L = o.R*o.R*Math.pow(o.T/5772, 4);
  const x = t => 10 + 200 * (Math.log10(40000) - Math.log10(t)) / (Math.log10(40000) - Math.log10(2500));
  const y = l => 120 - 110 * (Math.log10(l) + 4) / 10;
  let ms = ""; for (let t = 2600; t <= 38000; t *= 1.18){ const r = Math.pow(t/5772, .8), l = r*r*Math.pow(t/5772,4); ms += `${ms ? "L" : "M"}${x(t).toFixed(1)} ${y(l).toFixed(1)} `; }
  const grad = [2600,3500,4500,5500,6500,8000,11000,20000,38000].map((t,i,a) => `<stop offset="${(1 - (Math.log10(t)-Math.log10(2500))/(Math.log10(40000)-Math.log10(2500)))*100}%" stop-color="${kelvinRGB(t)}"/>`).join("");
  return `<svg viewBox="0 0 220 150" class="hr" role="img" aria-label="${T().hr}">
    <defs><linearGradient id="hrg" x1="0" x2="1">${grad}</linearGradient></defs>
    <rect x="10" y="126" width="200" height="4" rx="2" fill="url(#hrg)" opacity=".9"/>
    <path d="${ms}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="9" stroke-linecap="round"/>
    <circle cx="${x(5772)}" cy="${y(1)}" r="3.5" fill="#FFE9A8"/><text x="${x(5772)+6}" y="${y(1)+4}" class="hrt">${T().sun}</text>
    <circle cx="${x(o.T)}" cy="${y(L)}" r="6" fill="${kelvinRGB(o.T)}" stroke="#fff" stroke-width="2"/>
    <text x="12" y="144" class="hrt">← ${T().hotter}</text><text x="206" y="14" class="hrt" text-anchor="end">↑ ${T().brighter}</text></svg>`;
}
function sizeSVG(o){
  const R = o.R, col = kelvinRGB(o.T);
  const big = Math.max(R, 1), rs = 44, sun = Math.max(1.6, rs / big), star = R >= 1 ? rs : rs * R;
  return `<svg viewBox="0 0 220 110" class="size"><defs><radialGradient id="sg"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${col}"/><stop offset="1" stop-color="${col}" stop-opacity=".25"/></radialGradient></defs>
    <circle cx="80" cy="55" r="${star}" fill="url(#sg)"/><circle cx="${R >= 1 ? 80 + star + 30 : 170}" cy="55" r="${R >= 1 ? sun : rs}" fill="#FFE9A8"/>
    <text x="${R >= 1 ? 80 + star + 30 : 170}" y="${R >= 1 ? 55 - sun - 6 : 55 - rs - 6}" class="hrt" text-anchor="middle">${T().sun}</text></svg>`;
}
function openCard(o){
  const t = T(); let head, body;
  if (o.kind === "star"){
    const C = Math.round(o.T - 273);
    head = `<div class="orb" style="--c:${kelvinRGB(o.T)}"></div><div><h3>${esc(objName(o))}</h3><p class="kind">${esc(starLabel(o))}</p></div>`;
    body = `<p class="desc">${esc(starDesc(o))}</p>
      <dl class="facts">
        <div><dt>${t.con}</dt><dd>${esc(conName(o.con))}</dd></div>
        <div><dt>${t.temp}</dt><dd>${t.kelvin(num(o.T), num(C))}</dd></div>
        <div><dt>${t.dist}</dt><dd>${fmtLy(o.ly)}</dd></div>
        <div><dt>${t.size}</dt><dd>${o.R >= 1 ? t.times(String(o.R >= 10 ? Math.round(o.R) : +o.R.toFixed(1)).replace(".", ",")) : t.pctSun(Math.round(o.R*100))}</dd></div>
        <div><dt>${t.bright}</dt><dd>${o.mag <= 6 ? t.naked : t.scope}</dd></div>
      </dl>
      <p class="story">${lightStory(o.ly)} ${o.lat < -50 ? t.notVisible : t.bestMonth(bestMonth(o))}</p>
      <div class="viz">${sizeSVG(o)}${hrSVG(o)}</div>`;
  } else {
    const [label, desc] = t.dso[o.type];
    head = `<div class="orb dso ${o.type}"></div><div><h3>${esc(objName(o))}</h3><p class="kind">${esc(label)}</p></div>`;
    body = `<p class="desc">${esc(desc)}</p>
      <dl class="facts">
        <div><dt>${t.con}</dt><dd>${esc(conName(o.con))}</dd></div>
        <div><dt>${t.dist}</dt><dd>${fmtLy(o.ly)}</dd></div>
        ${o.size ? `<div><dt>${t.size}</dt><dd>${t.diam(num(o.size))}</dd></div>` : ""}
        <div><dt>${t.bright}</dt><dd>${o.type === "blackhole" ? t.invisible : o.mag <= 6 ? t.naked : t.scope}</dd></div>
      </dl>
      <p class="story">${lightStory(o.ly)} ${o.type === "blackhole" ? "" : o.lat < -50 ? t.notVisible : t.bestMonth(bestMonth(o))}</p>`;
  }
  $("#cardBody").innerHTML = `<div class="cardhead">${head}</div>${body}`;
  $("#cardDlg").showModal();
}

/* ================= UI ================= */
let toastId; function toast(msg, ms){ const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastId); toastId = setTimeout(() => t.classList.remove("show"), ms || 1800); }
$("#handle").onclick = () => { $("#sheet").classList.toggle("collapsed"); redraw(); };
$("#helpBtn").onclick = () => $("#helpDlg").showModal();
$("#drawerBtn").onclick = openDrawer;
document.querySelectorAll("[data-close]").forEach(b => b.onclick = () => b.closest("dialog").close());
document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
$("#soundToggle").checked = prefs.sound !== false; $("#soundToggle").onchange = e => { prefs.sound = e.target.checked; store.set("calcetin:v1:prefs", prefs); };
$("#labelToggle").checked = prefs.labels !== false; $("#labelToggle").onchange = e => { prefs.labels = e.target.checked; store.set("calcetin:v1:prefs", prefs); redraw(); };
$("#testNum").value = RETO;
$("#testGo").onclick = () => { const n = parseInt($("#testNum").value, 10); if (n >= 0){ store.set(TEST_KEY, n); store.del(`calcetin:v1:reto:${n}`); location.reload(); } };
$("#testRand").onclick = () => { const n = 1 + Math.floor(Math.random()*(SRV ? Math.max(1, TODAY) : ORDER.length)); store.set(TEST_KEY, n); store.del(`calcetin:v1:reto:${n}`); location.reload(); };
$("#resetBtn").onclick = () => { store.del(KEY); location.reload(); };
$("#testToday").onclick = () => { store.del(TEST_KEY); location.href = location.pathname; };
$("#trainGo").onclick = () => newTrain();
document.querySelectorAll("[data-radar]").forEach(b => { b.classList.toggle("primary", b.dataset.radar === RADAR_STYLE);
  b.onclick = () => { RADAR_STYLE = b.dataset.radar; prefs.radarStyle = RADAR_STYLE; store.set("calcetin:v1:prefs", prefs);
    document.querySelectorAll("[data-radar]").forEach(x => x.classList.toggle("primary", x === b)); replayRadar(0); }; });
$("#launchGo").onclick = () => $("#launchDlg").close();
function closeLang(){ $("#langMenu").hidden = true; }
$("#langBtn").onclick = e => { e.stopPropagation(); $("#langMenu").hidden = !$("#langMenu").hidden; };
document.addEventListener("click", e => { if (!e.target.closest(".langwrap")) closeLang(); });
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { const k = el.dataset.i18n; let v = T()[k]; if (k === "help1") v = T().help1(CONFIG.MAX_TRIES); el.innerHTML = v; });
  $("#retoNum").textContent = TRAIN ? T().train : `${T().num} ${RETO}`; $("#testBadge").hidden = !TESTING || TRAIN; $("#testBadge").textContent = T().test;
  $("#brandSock").innerHTML = sockSVG(SOCK); $("#brandSock").title = sockName(SOCK);
  $("#langFlag").innerHTML = FLAGS[LANG];
  $("#langMenu").innerHTML = LANGS.map(l => `<button data-lang="${l}" class="${l === LANG ? "on" : ""}"><span class="flag">${FLAGS[l]}</span>${LANG_NAMES[l]}</button>`).join("");
  $("#langMenu").querySelectorAll("button").forEach(b => b.onclick = () => { LANG = b.dataset.lang; prefs.lang = LANG; store.set("calcetin:v1:prefs", prefs); closeLang(); applyLang(); });
  $("#introSock").innerHTML = sockSVG(SOCK); $("#launchSock").innerHTML = sockSVG(SOCK); $("#introName").textContent = sockName(SOCK);
  const last = state.guesses[state.guesses.length-1]; setReadout(last || null); renderDelta(); renderPips(); renderEnd(); if (selected) select(selected); $("#focusBtn").title = T().focus; $("#focusBtn").setAttribute("aria-label", T().focus); $("#rankBtn").title = T().rankTitle; if (!$("#coach").hidden) $("#coachText").textContent = T().coach[+$("#coach").dataset.i || 0]; $("#coachOk").textContent = T().gotIt; nextCountdown(); if ($("#rankDlg").open){ $("#nameIn").placeholder = T().namePh; renderRankTabs(); loadRank(); } redraw();
}

/* ================= CLASIFICACIÓN (só na versión instalada) ================= */
function ident(){
  let id = store.get("calcetin:v1:id", null);
  if (!id || !id.uid || !id.key){ const hex = n => Array.from(crypto.getRandomValues(new Uint8Array(n)), b => b.toString(16).padStart(2, "0")).join("");
    id = { uid: hex(10), key: hex(20) }; store.set("calcetin:v1:id", id); }
  return id;
}
async function api(path, data){
  const opt = data ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) } : { cache: "no-store" };
  const r = await fetch(path, opt); const j = await r.json().catch(() => ({}));
  if (!r.ok){ const e = new Error(j.error || "http"); e.code = j.error; throw e; }
  return j;
}
function submitResult(n){
  if (!SRV) return; const h = getStats().hist[n]; if (!h || h.s) return;
  const st = n === RETO ? state : store.get(`calcetin:v1:reto:${n}`, null); if (!st || !st.guesses || !st.guesses.length || st.status === "playing") return;
  const id = ident();
  api("/api/resultado", { uid: id.uid, key: id.key, n, secs: Math.round(((st.end || Date.now()) - (st.start || Date.now()))/1000),
      guesses: st.guesses.map(g => ({ lon: g.lon, lat: g.lat, id: g.id })) })
    .then(() => { const s = getStats(); if (s.hist[n]){ s.hist[n].s = 1; store.set(STATS_KEY, s); } })
    .catch(() => {});
}
const RTABS = ["eu","hoxe","semana","mes","sempre"]; let rankTab = "hoxe";
function openRank(){ $("#nameIn").value = prefs.rankName || ""; $("#nameIn").placeholder = T().namePh; $("#nameMsg").textContent = ""; renderRankTabs(); loadRank(); $("#rankDlg").showModal(); }
function renderRankTabs(){
  $("#rankTabs").innerHTML = RTABS.map((k, i) => `<button class="${k === rankTab ? "on" : ""}" data-k="${k}">${T().tabs[i]}</button>`).join("");
  $("#rankTabs").querySelectorAll("button").forEach(b => b.onclick = () => { rankTab = b.dataset.k; renderRankTabs(); loadRank(); });
}
function myStatsHTML(){
  const h = getStats().hist, ns = Object.keys(h).map(Number).sort((a, b) => a - b), t = T();
  let run = 0, best = 0, prev = null, pts = 0, tries = 0, found = 0;
  ns.forEach(n => { const x = h[n]; pts += x.p || 0; if (x.f){ found++; tries += x.t; run = (prev === n - 1 && run > 0) ? run + 1 : 1; } else run = 0; best = Math.max(best, run); prev = n; });
  const cur = ns.length && ns[ns.length-1] >= TODAY - 1 ? run : 0;
  const cell = (v, l) => `<div><b>${v}</b><span>${l}</span></div>`;
  return `<div class="statgrid">${cell(ns.length, t.sPlayed)}${cell(found + (ns.length ? ` <small>${Math.round(100*found/ns.length)}%</small>` : ""), t.sFound)}${cell(cur, t.sStreak)}${cell(best, t.sBest)}${cell(num(pts), t.sPts)}${cell(found ? String((tries/found).toFixed(1)).replace(".", ",") : "–", t.sAvg)}</div>`;
}
async function loadRank(){
  const box = $("#rankBody"), tab = rankTab;
  if (tab === "eu"){ box.innerHTML = myStatsHTML(); return; }
  box.innerHTML = `<p class="small">${T().loading}</p>`;
  try {
    const j = await api(`/api/ranking?t=${tab}&uid=${ident().uid}`); if (tab !== rankTab) return;
    const t = T(), note = tab === "semana" ? t.weekNote : tab === "mes" ? t.monthNote : "";
    const rows = j.rows.length ? `<ol class="rank">${j.rows.map(r => `<li class="${r.me ? "me" : ""}"><span class="pos">${r.pos}</span><span class="nm">${esc(r.name)}${r.me ? ` <em>· ${t.you}</em>` : ""}</span><b>${num(r.score)}</b></li>`).join("")}</ol>` : `<p class="small">${t.rankEmpty}</p>`;
    box.innerHTML = (note ? `<p class="small">${note}</p>` : "") + rows + `<p class="mypos">${j.me ? t.myPos(j.me.pos, j.me.tot, num(j.me.score)) : t.noScore}</p>`;
  } catch(e){ if (tab === rankTab) box.innerHTML = `<p class="small">${T().offline}</p>`; }
}
async function saveName(name){
  const msg = $("#nameMsg");
  if (name !== null && !/^[\p{L}\p{N} ._'·-]{2,20}$/u.test(name)){ msg.textContent = T().nameBad; return; }
  const id = ident();
  try { await api("/api/nome", { uid: id.uid, key: id.key, name });
    prefs.rankName = name || ""; store.set("calcetin:v1:prefs", prefs); $("#nameIn").value = prefs.rankName;
    msg.textContent = name ? T().nameOk : T().nameGone; loadRank(); }
  catch(e){ msg.textContent = e.code === "name" ? T().nameBad : T().offline; }
}
if (SRV){
  $("#rankBtn").hidden = false; $("#rankBtn").onclick = openRank;
  $("#nameSave").onclick = () => saveName($("#nameIn").value.replace(/\s+/g, " ").trim());
  $("#nameOff").onclick = () => saveName(null);
  // panel oculto: 5 toques no nome do xogo
  let taps = 0, tapT = null;
  document.querySelector(".brand").addEventListener("click", () => { taps++; clearTimeout(tapT); tapT = setTimeout(() => { taps = 0; }, 1500); if (taps >= 5){ taps = 0; location.href = "admin.html"; } });
  // reenviar resultados que non chegaron ao servidor
  for (let n = TODAY - 2; n <= TODAY; n++) if (n !== RETO || state.status !== "playing") submitResult(n);
}

/* ================= ARRANQUE ================= */
window.addEventListener("resize", resize);
resize();
if (state.guesses.length){ const last = state.guesses[state.guesses.length-1], prev = state.guesses[state.guesses.length-2];
  state.guesses.forEach(g => { const c = guessCon(g); if (c === TARGET.con) hitConLines = TARGET.con; else if (NEIGH.has(c) && g.d < 35) nearLines.add(c); }); if (state.status === "playing") setTimeout(() => focusLast(1), 50);
  setDelta(prev ? prev.d : null, last.d); if (state.status === "playing" && state.start) startTimer(); else tick(); }
else setDelta(null, null);
applyLang();
if (state.status !== "playing"){ countStats(); reveal(false); }
else if (PRELAUNCH && TRAIN && !sessionStorage.getItem("cal_launch_seen")){ setTimeout(() => { $("#launchDlg").showModal(); try { sessionStorage.setItem("cal_launch_seen", "1"); } catch(e){} }, 350); }
else if (!state.guesses.length) setTimeout(() => $("#introDlg").showModal(), 350);
if (state.status === "playing"){ const n = state.guesses.length; coach(n === 0 ? 0 : n < 3 ? 1 : 2); }
$("#introDlg").addEventListener("close", () => { if (!state.guesses.length) coach(0); });
$("#launchDlg").addEventListener("close", () => { if (!state.guesses.length) coach(0); });
if (document.fonts) document.fonts.ready.then(redraw);
};
