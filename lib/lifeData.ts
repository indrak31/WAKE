export type ReceiptType =
  | "music"
  | "movie"
  | "place"
  | "purchase"
  | "photo"
  | "message"
  | "search"
  | "event"
  | "note";

export type Receipt = {
  id: string;
  type: ReceiptType;
  title: string;
  subtitle?: string;
  timestamp: string; // ISO date or readable stamp
  chapterId: string;
  linkedIds: string[];
  details?: {
    merchant?: string;
    items?: { name: string; price: number }[];
    total?: number;
    artist?: string;
    album?: string;
    albumArt?: string;
    audioUrl?: string;
    duration?: string;
    playCount?: number;
    sender?: string;
    isOutgoing?: boolean;
    address?: string;
    coords?: string;
    weather?: string;
    noteText?: string;
    query?: string;
    imageUrl?: string;
    ticketCount?: number;
    venue?: string;
    timeLabel?: string;
  };
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  timeframe: string;
  arcLine: string;
  mood: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  isReflectionOnly?: boolean;
};

// --- AUTHORED CHAPTERS (VERBATIM) ---
export const chapters: Chapter[] = [
  {
    id: "chapter-1",
    number: 1,
    title: "The 2 AM Playlist",
    timeframe: "Jan–Feb",
    arcLine: "You told yourself you were just a night owl. The data says otherwise.",
    mood: "insomnia, restlessness, low warm light",
    bgColor: "#0f172a", // Deep slate blue / midnight
    textColor: "#f8fafc",
    accentColor: "#38bdf8",
  },
  {
    id: "chapter-2",
    number: 2,
    title: "New Coordinates",
    timeframe: "March",
    arcLine: "Somewhere between the 6 train and a stranger's couch, you started over.",
    mood: "relocation, forward motion",
    bgColor: "#18181b", // Charcoal industrial transit
    textColor: "#fafafa",
    accentColor: "#f97316",
  },
  {
    id: "chapter-3",
    number: 3,
    title: "Learning the Block",
    timeframe: "April–May",
    arcLine: "You went looking for a coffee shop and found a whole neighborhood you didn't expect to love.",
    mood: "curiosity, small discoveries",
    bgColor: "#14211a", // Deep hunter spruce
    textColor: "#f2f7f4",
    accentColor: "#34d399",
  },
  {
    id: "chapter-4",
    number: 4,
    title: "The Night Everything Lined Up",
    timeframe: "June 14",
    arcLine: "One ordinary Saturday, if you looked closely, was actually the hinge the whole year turned on.",
    mood: "convergence, golden hour, pivotal",
    bgColor: "#24160e", // Warm twilight amber
    textColor: "#fffbf5",
    accentColor: "#fbbf24",
  },
  {
    id: "chapter-5",
    number: 5,
    title: "Quietly, Something Changed",
    timeframe: "July–Sept",
    arcLine: "The 2 AM playlist stopped playing. You didn't notice until you looked back.",
    mood: "settling, contentment, less searching/more doing",
    bgColor: "#1c1917", // Warm walnut espresso
    textColor: "#fafaf9",
    accentColor: "#fb7185",
  },
  {
    id: "chapter-6",
    number: 6,
    title: "What the Receipts Knew",
    timeframe: "Closing reflection",
    arcLine: "None of these moments meant anything alone. Together, they were the whole story, and you were the last one to read it.",
    mood: "pure reflection",
    bgColor: "#09090b", // Deep zinc
    textColor: "#e4e4e7",
    accentColor: "#a1a1aa",
    isReflectionOnly: true,
  },
];

// --- AUTHORED RECEIPTS DATASET ---
export const receipts: Receipt[] = [
  // CHAPTER 1: The 2 AM Playlist (Jan–Feb)
  {
    id: "c1-music-songx",
    type: "music",
    title: "Call Out My Name",
    subtitle: "Restless, unresolved, exactly the 1–4 AM repeat-loop mood",
    timestamp: "2024-02-08T02:04:00",
    chapterId: "chapter-1",
    linkedIds: ["c2-search-sam"], // Reveal Connection 1
    details: {
      artist: "The Weeknd",
      album: "My Dear Melancholy,",
      albumArt: "/covers/call-out-my-name.jpg",
      audioUrl: "/audio/call-out-my-name.mp3",
      duration: "3:48",
      playCount: 19,
      timeLabel: "2:04 AM",
      noteText: "Restless, unresolved, exactly the 1–4 AM repeat-loop mood",
    },
  },
  {
    id: "c1-search-sleep",
    type: "search",
    title: "Search Query",
    subtitle: "why can't I sleep",
    timestamp: "2024-01-22T03:18:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      query: "why can't I sleep",
      timeLabel: "3:18 AM",
    },
  },
  {
    id: "c1-note-say",
    type: "note",
    title: "Notes App Draft",
    subtitle: "things to say if he asks",
    timestamp: "2024-02-04T03:31:00",
    chapterId: "chapter-1",
    linkedIds: ["c5-purchase-key"], // Reveal Connection 4
    details: {
      noteText:
        "things to say if he asks:\n- just needed space to clear my head\n- work has been hectic\n- don't worry about the keys for now",
      timeLabel: "3:31 AM",
    },
  },
  {
    id: "c1-search-awake",
    type: "search",
    title: "Search Query",
    subtitle: "how many hours before rem sleep resets",
    timestamp: "2024-02-19T02:50:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      query: "how many hours before rem sleep resets",
      timeLabel: "2:50 AM",
    },
  },
  {
    id: "c1-music-afterhours",
    type: "music",
    title: "After Hours",
    subtitle: "Streamed 14 times between 2:15 AM and 4:00 AM",
    timestamp: "2024-01-25T03:15:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "/covers/after-hours.jpg",
      audioUrl: "/audio/after-hours.mp3",
      duration: "6:01",
      playCount: 14,
      timeLabel: "3:15 AM",
    },
  },
  {
    id: "c1-music-wedonttalk",
    type: "music",
    title: "We Don't Talk Anymore",
    subtitle: "Streamed 9 times on repeat",
    timestamp: "2024-01-28T02:38:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      artist: "Charlie Puth feat. Selena Gomez",
      album: "Nine Track Mind",
      albumArt: "/covers/we-dont-talk-anymore.jpg",
      audioUrl: "/audio/we-dont-talk-anymore.mp3",
      duration: "3:37",
      playCount: 9,
      timeLabel: "2:38 AM",
      noteText: "The quiet repetition before turning the screen off",
    },
  },

  // CHAPTER 2: New Coordinates (March)
  {
    id: "c2-search-sam",
    type: "search",
    title: "Map & Neighborhood Search",
    subtitle: "new neighborhood 20 min from Sam's apartment",
    timestamp: "2024-03-03T18:14:00",
    chapterId: "chapter-2",
    linkedIds: ["c1-music-songx"], // Reveal Connection 1
    details: {
      query: "new neighborhood 20 min from Sam's apartment",
      timeLabel: "6:14 PM",
    },
  },
  {
    id: "c2-purchase-truck",
    type: "purchase",
    title: "U-Haul Moving Truck",
    subtitle: "10-foot truck rental + blankets",
    timestamp: "2024-03-08T09:15:00",
    chapterId: "chapter-2",
    linkedIds: ["c2-note-furniture"],
    details: {
      merchant: "U-Haul Moving & Storage",
      items: [
        { name: "10-Foot Cargo Van Rental", price: 79.95 },
        { name: "Furniture Blankets (Pack of 6)", price: 18.0 },
        { name: "Roll of Packing Tape", price: 4.5 },
      ],
      total: 102.45,
      timeLabel: "9:15 AM",
    },
  },

  {
    id: "c2-photo-apt",
    type: "photo",
    title: "First Camera Roll Photo",
    subtitle: "Bare hardwood, radiator ticking",
    timestamp: "2024-03-10T17:40:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
      timeLabel: "5:40 PM",
    },
  },
  {
    id: "c2-note-furniture",
    type: "note",
    title: "Notes App Draft",
    subtitle: "furniture list",
    timestamp: "2024-03-12T20:05:00",
    chapterId: "chapter-2",
    linkedIds: ["c2-purchase-truck"],
    details: {
      noteText:
        "furniture list:\n- mattress (urgent)\n- floor lamp with warm bulb\n- thrift store folding chair\n- water kettle\n- shower curtain rings",
      timeLabel: "8:05 PM",
    },
  },
  {
    id: "c2-place-subway",
    type: "place",
    title: "6 Train — Spring St Station",
    subtitle: "Swipe at downtown turnstile",
    timestamp: "2024-03-24T21:40:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      address: "Spring St & Lafayette St",
      coords: "40.7223° N, 73.9972° W",
      weather: "44°F, damp asphalt",
      timeLabel: "9:40 PM",
    },
  },
  {
    id: "c2-music-reminder",
    type: "music",
    title: "Reminder",
    subtitle: "Forward motion, a little defiant",
    timestamp: "2024-03-15T23:42:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/reminder.jpg",
      audioUrl: "/audio/reminder.mp3",
      duration: "3:38",
      playCount: 12,
      timeLabel: "11:42 PM",
      noteText: "Forward motion, a little defiant",
    },
  },

  // CHAPTER 3: Learning the Block (April–May)
  {
    id: "c3-place-cafe",
    type: "place",
    title: "Café Regular",
    subtitle: "Corner table by window",
    timestamp: "2024-04-06T08:22:00",
    chapterId: "chapter-3",
    linkedIds: ["c3-purchase-coffee"],
    details: {
      address: "158 Berkeley Pl",
      coords: "40.6755° N, 73.9772° W",
      weather: "56°F, pale morning sun",
      timeLabel: "8:22 AM",
    },
  },
  {
    id: "c3-purchase-plant",
    type: "purchase",
    title: "Corner Bodega & Greenery",
    subtitle: "Potted snake plant & saucer",
    timestamp: "2024-04-14T14:10:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "7th Ave Florist & Market",
      items: [
        { name: "Sansevieria in Terra Cotta", price: 24.0 },
        { name: "Spray Mist Bottle", price: 6.0 },
      ],
      total: 30.0,
      timeLabel: "2:10 PM",
    },
  },
  {
    id: "c3-note-block",
    type: "note",
    title: "Notes App Draft",
    subtitle: "things I like about this block",
    timestamp: "2024-05-02T16:15:00",
    chapterId: "chapter-3",
    linkedIds: ["c4-place-park"], // Reveal Connection 2
    details: {
      noteText:
        "things I like about this block:\n- the bakery that opens at 6:30 and smells like cardamom\n- the quiet north bench in the park where nobody looks at you\n- the tree that blooms white petals right by the mailbox",
      timeLabel: "4:15 PM",
    },
  },
  {
    id: "c3-purchase-bike",
    type: "purchase",
    title: "Used Bicycle Purchase",
    subtitle: "10-speed road bike via Craigslist",
    timestamp: "2024-05-11T11:30:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "Cash Exchange — Craigslist",
      items: [{ name: "1988 Schwinn Traveler 10-Speed", price: 120.0 }],
      total: 120.0,
      timeLabel: "11:30 AM",
    },
  },
  {
    id: "c3-purchase-coffee",
    type: "purchase",
    title: "Café Regular Bean Bag",
    subtitle: "Whole bean house roast",
    timestamp: "2024-05-18T09:05:00",
    chapterId: "chapter-3",
    linkedIds: ["c3-place-cafe"],
    details: {
      merchant: "Café Regular",
      items: [{ name: "12oz Guatemala Antigua Whole Bean", price: 19.5 }],
      total: 19.5,
      timeLabel: "9:05 AM",
    },
  },
  {
    id: "c3-message-sam1",
    type: "message",
    title: "Message to Sam",
    subtitle: "i found that bakery you talked about",
    timestamp: "2024-05-27T17:42:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      sender: "You",
      isOutgoing: true,
      timeLabel: "5:42 PM",
    },
  },
  {
    id: "c3-music-secrets",
    type: "music",
    title: "Secrets",
    subtitle: "Curious, exploratory, lighter",
    timestamp: "2024-04-20T09:18:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/secrets.jpg",
      audioUrl: "/audio/secrets.mp3",
      duration: "4:25",
      playCount: 8,
      timeLabel: "9:18 AM",
      noteText: "Curious, exploratory, lighter",
    },
  },
  {
    id: "c3-music-mala",
    type: "music",
    title: "MALA",
    subtitle: "Heard drifting from the bodega speakers on 4th Ave",
    timestamp: "2024-04-18T16:22:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      artist: "6ix9ine feat. Anuel AA",
      album: "DUMMY BOY",
      albumArt: "/covers/mala.jpg",
      audioUrl: "/audio/mala.mp3",
      duration: "3:27",
      playCount: 6,
      timeLabel: "4:22 PM",
      noteText: "Shazamed on the corner of 4th & Bergen — spring air finally arrived",
    },
  },

  // CHAPTER 4: The Night Everything Lined Up (June 14 — Authored Reveal Cluster)
  {
    id: "c4-song-firstplay",
    type: "music",
    title: "First Play: 'Die For You'",
    subtitle: "First time playing this song",
    timestamp: "2024-06-14T19:12:00",
    chapterId: "chapter-4",
    linkedIds: ["c4-place-park", "c4-photo-744", "c4-purchase-twocoffees", "c4-message-good"], // Reveal Cluster 3
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/die-for-you.jpg",
      audioUrl: "/audio/die-for-you.mp3",
      duration: "4:20",
      playCount: 1,
      timeLabel: "7:12 PM",
      noteText: "The one deliberately 'first time playing this song' moment — a turning point, not background noise",
    },
  },
  {
    id: "c4-place-park",
    type: "place",
    title: "Location Check-in: Park Bench",
    subtitle: "The park from Chapter 3",
    timestamp: "2024-06-14T19:28:00",
    chapterId: "chapter-4",
    // Linked to Chapter 3 note (Reveal 2) AND the June 14 cluster (Reveal 3)
    linkedIds: ["c3-note-block", "c4-song-firstplay", "c4-photo-744", "c4-purchase-twocoffees", "c4-message-good"],
    details: {
      address: "Cobble Hill Park (North Bench)",
      coords: "40.6882° N, 73.9967° W",
      weather: "72°F, summer dusk, light breeze",
      timeLabel: "7:28 PM",
    },
  },
  {
    id: "c4-photo-744",
    type: "photo",
    title: "Photo",
    subtitle: "Timestamp 7:44 PM (no caption)",
    timestamp: "2024-06-14T19:44:00",
    chapterId: "chapter-4",
    linkedIds: ["c4-song-firstplay", "c4-place-park", "c4-purchase-twocoffees", "c4-message-good"], // Reveal Cluster 3
    details: {
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
      timeLabel: "7:44 PM",
    },
  },
  {
    id: "c4-purchase-twocoffees",
    type: "purchase",
    title: "Two Iced Coffees",
    subtitle: "Café Regular — 7:50 PM",
    timestamp: "2024-06-14T19:50:00",
    chapterId: "chapter-4",
    linkedIds: ["c4-song-firstplay", "c4-place-park", "c4-photo-744", "c4-message-good"], // Reveal Cluster 3
    details: {
      merchant: "Café Regular",
      items: [
        { name: "Iced Cold Brew with Oat Milk", price: 5.75 },
        { name: "Iced Americano", price: 4.75 },
      ],
      total: 10.5,
      timeLabel: "7:50 PM",
    },
  },
  {
    id: "c4-message-good",
    type: "message",
    title: "Message to Sam",
    subtitle: "today was good.",
    timestamp: "2024-06-14T23:58:00",
    chapterId: "chapter-4",
    linkedIds: ["c4-song-firstplay", "c4-place-park", "c4-photo-744", "c4-purchase-twocoffees"], // Reveal Cluster 3
    details: {
      sender: "You",
      isOutgoing: true,
      timeLabel: "11:58 PM",
    },
  },

  // CHAPTER 5: Quietly, Something Changed (July–Sept)
  {
    id: "c5-purchase-key",
    type: "purchase",
    title: "Second Key Cut",
    subtitle: "Ace Hardware — September",
    timestamp: "2024-09-06T14:32:00",
    chapterId: "chapter-5",
    linkedIds: ["c1-note-say"], // Reveal Connection 4
    details: {
      merchant: "Courthouse Ace Hardware",
      items: [
        { name: "Brass Key Duplication (Kwikset 66)", price: 4.25 },
        { name: "Colored Ring Tag (Olive Green)", price: 1.5 },
      ],
      total: 5.75,
      timeLabel: "2:32 PM",
    },
  },
  {
    id: "c5-event-concert",
    type: "event",
    title: "Prospect Park Bandshell Tickets",
    subtitle: "Two tickets — summer concert series",
    timestamp: "2024-07-19T19:30:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      venue: "Lena Horne Bandshell, Prospect Park",
      ticketCount: 2,
      timeLabel: "7:30 PM",
    },
  },
  {
    id: "c5-note-miss",
    type: "note",
    title: "Notes App Draft",
    subtitle: "things I don't miss",
    timestamp: "2024-08-04T10:15:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      noteText:
        "things I don't miss:\n- waiting for the 3:45 AM train\n- staring at the phone screen in the dark\n- having to explain why I'm quiet\n- checking whether you left the light on",
      timeLabel: "10:15 AM",
    },
  },
  {
    id: "c5-event-hike",
    type: "event",
    title: "Metro-North Day Trip",
    subtitle: "Two roundtrip passes to Cold Spring",
    timestamp: "2024-08-24T08:15:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      venue: "Grand Central to Cold Spring",
      ticketCount: 2,
      timeLabel: "8:15 AM",
    },
  },
  {
    id: "c5-purchase-twoorders",
    type: "purchase",
    title: "Sunday Morning Bakery Run",
    subtitle: "Two coffees & cardamombun",
    timestamp: "2024-09-15T09:40:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      merchant: "Söder Cardamom & Coffee",
      items: [
        { name: "Filter Coffee (Large)", price: 4.5 },
        { name: "Oat Cortado", price: 5.0 },
        { name: "Fresh Cardamom Buns (x2)", price: 9.0 },
      ],
      total: 18.5,
      timeLabel: "9:40 AM",
    },
  },

  {
    id: "c5-music-lessthanzero",
    type: "music",
    title: "Less Than Zero",
    subtitle: "Windows rolled down, driving back from the day trip",
    timestamp: "2024-08-24T18:45:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Dawn FM",
      duration: "3:31",
      playCount: 3,
      timeLabel: "6:45 PM",
    },
  },
  {
    id: "c5-music-saveyourtears",
    type: "music",
    title: "Save Your Tears",
    subtitle: "Settled, a little wistful but at peace",
    timestamp: "2024-09-10T21:14:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "/covers/save-your-tears.jpg",
      audioUrl: "/audio/save-your-tears.mp3",
      duration: "3:35",
      playCount: 7,
      timeLabel: "9:14 PM",
      noteText: "Settled, a little wistful but at peace",
    },
  },
  {
    id: "c5-music-lovenwantiti",
    type: "music",
    title: "Love Nwantiti (ah ah ah)",
    subtitle: "North African Remix • Sunset on the fire escape",
    timestamp: "2024-08-16T19:48:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "CKay feat. ElGrande Toto",
      album: "Love Nwantiti (Remix)",
      albumArt: "/covers/love-nwantiti.jpg",
      audioUrl: "/audio/love-nwantiti.mp3",
      duration: "2:25",
      playCount: 15,
      timeLabel: "7:48 PM",
      noteText: "Windows wide open, breeze finally cooling the apartment down",
    },
  },
];

// --- AUTHORED REVEAL CONNECTIONS (EXACT STRINGS - VERBATIM) ---
export const REVEAL_CONNECTIONS = {
  reveal1: {
    id: "reveal-1",
    ids: ["c1-music-songx", "c2-search-sam"],
    linkReason: "You were already planning this before you told anyone — including yourself.",
    label: "The Unconscious Move",
  },
  reveal2: {
    id: "reveal-2",
    ids: ["c3-note-block", "c4-place-park"],
    linkReason: "Six weeks after writing that list, you finally used it.",
    label: "The Intended Bench",
  },
  reveal3: {
    id: "reveal-3",
    ids: ["c4-song-firstplay", "c4-place-park", "c4-photo-744", "c4-purchase-twocoffees", "c4-message-good"],
    linkReason: "Five separate receipts. One evening. This is the one your future self will come back to.",
    label: "June 14 — The Hinge",
  },
  reveal4: {
    id: "reveal-4",
    ids: ["c1-note-say", "c5-purchase-key"],
    linkReason: "The thing you were scared to say in January, you didn't have to say by September. It just became true.",
    label: "The Second Key",
  },
} as const;

// Helper to look up the exact authored linkReason between any two connected receipts
export function getLinkReason(idA: string, idB: string): string | undefined {
  const pair = [idA, idB];
  
  // Reveal 1
  if (pair.includes("c1-music-songx") && pair.includes("c2-search-sam")) {
    return REVEAL_CONNECTIONS.reveal1.linkReason;
  }
  
  // Reveal 2
  if (pair.includes("c3-note-block") && pair.includes("c4-place-park")) {
    return REVEAL_CONNECTIONS.reveal2.linkReason;
  }
  
  // Reveal 3 (June 14 Cluster)
  const ch4Cluster = REVEAL_CONNECTIONS.reveal3.ids;
  if (ch4Cluster.includes(idA as any) && ch4Cluster.includes(idB as any)) {
    return REVEAL_CONNECTIONS.reveal3.linkReason;
  }
  
  // Reveal 4
  if (pair.includes("c1-note-say") && pair.includes("c5-purchase-key")) {
    return REVEAL_CONNECTIONS.reveal4.linkReason;
  }

  // Chapter 2 moving pair
  if (pair.includes("c2-purchase-truck") && pair.includes("c2-note-furniture")) {
    return "The moving day inventory — moving truck and the first night essentials.";
  }

  // Chapter 3 coffee regular pair
  if (pair.includes("c3-place-cafe") && pair.includes("c3-purchase-coffee")) {
    return "Your local corner table and the beans you started grinding at home.";
  }

  return undefined;
}
