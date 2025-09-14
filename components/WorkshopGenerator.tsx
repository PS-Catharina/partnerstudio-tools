"use client";

import React, { useMemo, useRef, useState } from "react";
import { Zap, RefreshCcw, Sparkles, Lightbulb, Upload, Wand2, Rocket } from "lucide-react";

/* ---------- Små UI-byggeklosser ---------- */
function Card({ children }: React.PropsWithChildren) {
  return <div className="rounded-2xl bg-white/60 backdrop-blur shadow-lg">{children}</div>;
}
function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-3">{children}</div>;
}
function CardTitle({ children }: React.PropsWithChildren) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}
function CardContent({ children }: React.PropsWithChildren) {
  return <div className="px-5 pb-5 space-y-3">{children}</div>;
}
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 disabled:opacity-50"
      {...props}
    />
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="border rounded-xl px-3 py-2 text-sm w-full" {...props} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="border rounded-xl px-3 py-2 text-sm w-full" {...props} />;
}

/* ---------- Demo-eksempler ---------- */
const EXAMPLES = [
  {
    brief:
      "Kunde: Bohus. Mål: skille seg ut på kvalitet, design og inspirasjon. Målgruppe: etablerte familier 30–55. Ønske: 360-konsept som lever i butikk, nett og SoMe.",
    participants: "12",
    duration: "90",
    style: "Kreativ idéutvikling",
  },
  {
    brief:
      "Kunde: Helthjem. Mål: bygge kjennskap til bærekraftige leveringsløsninger og rask levering. Målgruppe: netthandlere 20–45 i by. Ønske: kampanjeidé med tydelig grønn profil.",
    participants: "8",
    duration: "60",
    style: "Innovasjonsworkshop",
  },
  {
    brief:
      "Kunde: Mester Grønn. Mål: styrke merkevarefølelser og bli førstevalget til hverdag og høytid. Målgruppe: kvinner 20–60. Ønske: 360-konsept, butikkaktivering + SoMe.",
    participants: "15",
    duration: "120",
    style: "Konseptutvikling",
  },
];

/* ---------- Icebreakers ---------- */
const ICEBREAKERS = [
  "Tegn din drømmesofa på 2 minutter",
  "Emoji-introduksjon: vis humøret ditt",
  "Speed networking (2 x 90 sek)",
  "Rock–Paper–Scissors championship",
  "Sketch your mood (1 min tegning)",
];

/* ---------- OPPGAVEBANK: ekte workshop-oppgaver ---------- */
const TASK_BANK = {
  Bohus: [
    { title: "Emosjonell merkevare", desc: "Hvordan kan Bohus eie følelsen av «hjemmekos»? Lag 3 idéskisser i grupper (10 min)." },
    { title: "Butikk-wow", desc: "Lag en idé til hvordan førsteinntrykket i butikk kan gi «wow»-følelse. Tegn på post-its (7 min)." },
    { title: "Differensiering", desc: "Skriv 5 ting som gjør Bohus annerledes enn konkurrentene. Del i plenum (5 min)." },
    { title: "Produktfortelling", desc: "Velg ett møbel og skriv en 60-sek historie om hvordan det blir en del av et hjem (individuelt, 5 min)." },
    { title: "Forny stuen", desc: "Hvordan kan Bohus inspirere folk til å fornye stuen på en morsom måte? 3 forslag per gruppe (10 min)." },
    { title: "Storyboard 3 ruter", desc: "Lag et 3-ruters storyboard fra nettside til butikkopplevelse (15 min)." },
    { title: "Trender å eie", desc: "Hvilke 3 møbeltrender kan Bohus eie de neste 3 årene? (10 min)." },
    { title: "Tagline-duell", desc: "Hver gruppe lager 2 taglines på 5 min. Pitch – stem frem favoritt." },
    { title: "360-øvelse", desc: "Én idé som kan leve i butikk, nett og SoMe. Skisser kjapt format for hver kanal (15 min)." },
    { title: "Kundeønske", desc: "Fullfør setningen «Hvis jeg bare kunne …» fra kundens perspektiv. Lag løsning (10 min)." },
  ],
  Helthjem: [
    { title: "Bærekraft-pitch", desc: "Forklar bærekraft i levering på 15 sek. Skriv 3 forslag og spill inn med mobil (10 min)." },
    { title: "Leveringsreise", desc: "Tegn «før-under-etter» for en kunde som får rask levering. Marker følelser (15 min)." },
    { title: "Bekymringer", desc: "Hva er kundens største bekymring? Lag 3 budskap som beroliger (10 min)." },
    { title: "Gate-stunt", desc: "Idé til et by-stunt som viser hvor grønn og rask Helthjem er (15 min)." },
    { title: "TikTok-format", desc: "Hvordan forklare levering med humor i maks 30 sek? Lag 3 hooks (10 min)." },
    { title: "Slagordsprut", desc: "Lag 5 slagord for «grønn og rask». Test ved håndsopprekning (7 min)." },
    { title: "Checkout-hook", desc: "Hvordan kan Helthjem-valget i checkout føles uunnværlig? 3 forslag (10 min)." },
    { title: "Personalisering", desc: "Hvordan kan appen føles mer personlig? Brainstorm features i par (10 min)." },
    { title: "Pakke-magi", desc: "Hva kan legges i pakken (melding/design) for «wow»-følelse? (10 min)." },
    { title: "Tillit ved første møte", desc: "3 ideer som bygger tillit på første berøringspunkt (10 min)." },
  ],
  "Mester Grønn": [
    { title: "Emosjonelle øyeblikk", desc: "Hvordan skape emosjonelle øyeblikk rundt blomster i butikk, nett og SoMe? 3 ideer i grupper (10 min)." },
    { title: "Sesongkampanje", desc: "Lag en kampanjeidé for jul/påske/17. mai. Tegn plakat + hashtag (15 min)." },
    { title: "Gave-reisen", desc: "Tegn kundereise fra «ser annonse» til «gir bort blomster». Marker emosjonelle topper (15 min)." },
    { title: "UGC-aktivering", desc: "Hvordan få kunder til å vise frem blomster hjemme? 3 konkurranseideer (10 min)." },
    { title: "Butikkopplevelse", desc: "Idé som gjør butikken mer inspirerende enn konkurrentene (10 min)." },
    { title: "Lojalitet", desc: "Hvordan få folk til å velge Mester Grønn hver gang? Brainstorm tiltak (10 min)." },
    { title: "Glede i å gi", desc: "Hva er den mest emosjonelle måten å gi blomster på? Lag et stunt eller kampanje (15 min)." },
    { title: "Abonnementsvane", desc: "Hvordan gjøre blomsterabonnement til en vane? 2 idéforslag per gruppe (10 min)." },
    { title: "Moodboard", desc: "Lag et mini-moodboard (tegninger/ord) for en stil som uttrykker kjærlighet til blomster (15 min)." },
    { title: "Tagline-verksted", desc: "Lag 5 taglines for «glede i hverdagen med blomster». Test i plenum (10 min)." },
  ],
} as const;

/* ---------- Brief-analyse ---------- */
function analyzeBrief(brief: string) {
  const b = (brief || "").toLowerCase();
  const client =
    b.includes("helthjem") ? "Helthjem" : b.includes("mester grønn") || b.includes("mestergrønn")
    ? "Mester Grønn"
    : "Bohus";

  const goals = [
    ...(b.match(/bærekraft|grønn/g) ? ["bærekraft"] : []),
    ...(b.match(/360|helhet|konsept/g) ? ["360"] : []),
    ...(b.match(/kjøpsreise|kundeopplevelse|butikk/g) ? ["opplevelse"] : []),
    ...(b.match(/kjennskap|posisjon|posisjonering/g) ? ["posisjon"] : []),
    ...(b.match(/so ?me|video|format/g) ? ["format"] : []),
    ...(b.match(/rask|levering/g) ? ["levering"] : []),
  ];

  return { client: client as keyof typeof TASK_BANK, goals };
}

/* ---------- Seeded shuffle (stabil men variert) ---------- */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffleUnique<T>(arr: T[], seed: number) {
  const rand = mulberry32(seed || 1);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return Array.from(new Set(copy));
}

/* ---------- Agenda-generator (med pauser) ---------- */
function generateAgenda(duration: number, icebreaker: string) {
  const rows: { time: string; activity: string; how: string }[] = [];
  let t = 0;
  const add = (len: number, activity: string, how: string) => {
    const start = t, end = t + len;
    rows.push({ time: `${start}–${end} min`, activity, how });
    t = end;
  };

  add(10, "Kick-off og forventningssetting", `Energizer: ${icebreaker}`);
  add(20, "Spørsmål 1 + 2: Differensiering & preferanse", "Brainstorm i grupper på post-its");
  add(25, "Spørsmål 3: Posisjonering", "Konkurranse: Lag en tagline på 5 minutter – grupper pitcher");
  if (t < duration && duration > 60) add(5, "Pause", "Kaffe og strekk");
  add(15, "Spørsmål 4 + 5: Nyhetslansering og digitale grep", "Rotasjon: to idéstasjoner, bytt etter 7 min");
  add(15, "Spørsmål 6: Kategori-eierskap", "Shark Tank: Pitch en kategori – maks 2 min hver");
  if (t < duration && duration > 120) add(5, "Pause", "Kaffe og strekk");
  add(5, "Oppsummering og neste steg", "Moderator samler opp + stemme over idéer");

  return rows.filter((r) => {
    const [_, endStr] = r.time.split("–");
    const end = parseInt(endStr);
    return end <= duration;
  });
}

/* ---------- Hovedkomponent ---------- */
export default function WorkshopGenerator() {
  const [brief, setBrief] = useState(EXAMPLES[0].brief);
  const [participants, setParticipants] = useState(EXAMPLES[0].participants);
  const [duration, setDuration] = useState(EXAMPLES[0].duration);
  const [style, setStyle] = useState(EXAMPLES[0].style);

  const [iceIdx, setIceIdx] = useState(0);
  const ice = ICEBREAKERS[iceIdx % ICEBREAKERS.length];

  const [seed, setSeed] = useState(1); // økes når vi «genererer» på nytt
  const agenda = useMemo(() => generateAgenda(Number(duration || "60"), ice), [duration, ice, seed]);

  const parsed = useMemo(() => analyzeBrief(brief), [brief]);

  // Vektet, seeded shuffle – alle 6 kan byttes, men briefens mål øker sjansen for match
  const sixTasks = useMemo(() => {
    const base = TASK_BANK[parsed.client];
    const pool = [...base];

    const weightMap: Record<string, string[]> = {
      bærekraft: ["bærekraft", "grønn"],
      "360": ["360", "kanal", "butikk"],
      opplevelse: ["opplevelse", "butikk", "reise"],
      posisjon: ["posisjon", "slagord", "tagline"],
      format: ["format", "tiktok", "video", "plakat"],
      levering: ["levering", "checkout", "pakke"],
    };

    parsed.goals.forEach((g) => {
      const keys = weightMap[g] || [];
      base.forEach((t) => {
        const hit = keys.some((k) => t.title.toLowerCase().includes(k) || t.desc.toLowerCase().includes(k));
        if (hit) pool.push(t); // dupliser for høyere sjanse
      });
    });

    const shuffled = shuffleUnique(pool, seed);
    return shuffled.slice(0, 6);
  }, [parsed, seed]);

  // File upload (enkel tekstlesing)
  const fileRef = useRef<HTMLInputElement>(null);
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      if (text && text.trim().length > 0) setBrief(text.trim());
    } catch {
      alert("Kunne ikke lese filen. Prøv .txt eller .md for enklest mulig lesing.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-white to-pink-100">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-900">
            <Sparkles className="inline w-7 h-7 text-purple-600" /> Workshop Generator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            lager agenda med tidsplan, icebreakers og foreslår oppgaver som matcher mål og målgrupper.
          </p>
        </header>

        {/* Brief & parametre */}
        <Card>
          <CardHeader>
            <CardTitle>Brief & parametre</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setSeed((s) => s + 1)}>
                <Rocket className="w-4 h-4" /> Generer plan
              </Button>
              <Button
                onClick={() => {
                  const ex = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
                  setBrief(ex.brief);
                  setParticipants(ex.participants);
                  setDuration(ex.duration);
                  setStyle(ex.style);
                  setSeed((s) => s + 1);
                }}
              >
                <Wand2 className="w-4 h-4" /> Eksempel
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept=".txt,.md,.rtf,.docx,.pdf"
                className="hidden"
                onChange={handleFile}
              />
              <Button onClick={() => fileRef.current?.click()}>
                <Upload className="w-4 h-4" /> Last opp brief
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Skriv eller last opp en brief..."
            />

            {/* Labels gjør feltene tydelige */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <span className="block text-slate-600 mb-1">Antall deltakere</span>
                <Input
                  inputMode="numeric"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  placeholder="f.eks. 12"
                  aria-label="Antall deltakere"
                />
              </label>
              <label className="text-sm">
                <span className="block text-slate-600 mb-1">Tid i minutter</span>
                <Input
                  inputMode="numeric"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="f.eks. 90"
                  aria-label="Tid i minutter"
                />
              </label>
              <label className="text-sm">
                <span className="block text-slate-600 mb-1">Workshop-stil</span>
                <Input
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="f.eks. Kreativ idéutvikling"
                  aria-label="Workshop-stil"
                />
              </label>
            </div>

            <div className="text-xs text-slate-500 pt-1">
              Oppdaget kunde: <b>{parsed.client}</b> · Nøkkelord: {parsed.goals.length ? parsed.goals.join(", ") : "–"}
            </div>
          </CardContent>
        </Card>

        {/* Agenda */}
        <Card>
  <CardHeader>
    <CardTitle>Agenda</CardTitle>
    <Button onClick={() => setIceIdx((i) => i + 1)}>
      <Zap className="w-4 h-4" />
      Bytt icebreaker
    </Button>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-purple-50">
            <th className="px-3 py-2 text-sm font-semibold text-slate-700 w-24">Tid</th>
            <th className="px-3 py-2 text-sm font-semibold text-slate-700">Aktivitet</th>
            <th className="px-3 py-2 text-sm font-semibold text-slate-700">Slik gjør du det</th>
          </tr>
        </thead>
        <tbody>
          {agenda.map((row, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="px-3 py-2 text-sm text-slate-600 whitespace-nowrap">{row.time}</td>
              <td className="px-3 py-2 text-sm font-medium text-slate-800">{row.activity}</td>
              <td className="px-3 py-2 text-sm text-slate-700">{row.how}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

        {/* Oppgaver */}
        <Card>
          <CardHeader>
            <CardTitle>Forslag til oppgaver</CardTitle>
            <Button onClick={() => setSeed((s) => s + 1)}>
              <RefreshCcw className="w-4 h-4" /> Generer nye oppgaver
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sixTasks.map((t, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>
                      <Lightbulb className="w-4 h-4 inline mr-2" />
                      {t.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700 text-sm">{t.desc}</CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
