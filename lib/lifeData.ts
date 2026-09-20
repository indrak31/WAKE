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
    sourceDataset?: string;
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

// --- RECEIPTS DATASET (MUSIC & REAL ARCHIVE DATA + REVEAL ANCHORS) ---
export const receipts: Receipt[] = [
  // =========================================================================
  // CHAPTER 1: The 2 AM Playlist (Jan–Feb)
  // =========================================================================
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
      noteText: "Listening in the dark with the phone facing down",
    },
  },
  {
    id: "c1-music-wedonttalk",
    type: "music",
    title: "We Don't Talk Anymore",
    subtitle: "Late-night repeat track",
    timestamp: "2024-02-18T02:40:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      artist: "Charlie Puth ft. Selena Gomez",
      album: "Nine Track Mind",
      duration: "3:37",
      playCount: 11,
      timeLabel: "2:40 AM",
    },
  },
  {
    id: "c1-music-born-die",
    type: "music",
    title: "Born To Die",
    subtitle: "Streamed at 2:50 AM on web player during January insomnia",
    timestamp: "2024-01-28T02:50:24",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      artist: "Lana Del Rey",
      album: "Born To Die - The Paradise Edition",
      albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60",
      duration: "4:45",
      playCount: 14,
      timeLabel: "2:50 AM",
      noteText: "Listening in the dark with low volume while the apartment was completely silent",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c1-music-ode-mets",
    type: "music",
    title: "Ode To The Mets",
    subtitle: "3:12 AM stream • 189 total annual plays recorded",
    timestamp: "2024-02-14T03:12:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      artist: "The Strokes",
      album: "The New Abnormal",
      albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
      duration: "5:51",
      playCount: 28,
      timeLabel: "3:12 AM",
      noteText: "Winter insomnia soundtrack on repeat across February",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c1-purchase-databooster",
    type: "purchase",
    title: "Late-Night Data Booster Pack",
    subtitle: "Emergency top-up when the apartment connection dropped at midnight",
    timestamp: "2024-01-18T23:41:17",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      merchant: "Mobile Service Provider",
      items: [{ name: "High-Speed Data Booster (1.5 GB)", price: 3.5 }],
      total: 3.5,
      timeLabel: "11:41 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c1-purchase-netflix",
    type: "purchase",
    title: "Streaming Subscription Auto-Renewal",
    subtitle: "1 month subscription auto-debit processed while awake at midnight",
    timestamp: "2024-02-01T00:05:00",
    chapterId: "chapter-1",
    linkedIds: [],
    details: {
      merchant: "Digital Streaming Platform",
      items: [{ name: "1 Month HD Subscription", price: 14.99 }],
      total: 14.99,
      timeLabel: "12:05 AM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },

  // =========================================================================
  // CHAPTER 2: New Coordinates (March)
  // =========================================================================
  {
    id: "c2-search-sam",
    type: "search",
    title: "Map & Neighborhood Search",
    subtitle: "how far is sam's apartment from cobble hill",
    timestamp: "2024-03-03T19:42:00",
    chapterId: "chapter-2",
    linkedIds: ["c1-music-songx"], // Reveal Connection 1
    details: {
      query: "how far is sam's apartment from cobble hill",
      timeLabel: "7:42 PM",
    },
  },
  {
    id: "c2-music-reminder",
    type: "music",
    title: "Reminder",
    subtitle: "Streamed 7 times in 48 hours right after the move",
    timestamp: "2024-03-05T08:15:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/reminder.jpg",
      audioUrl: "/audio/reminder.mp3",
      duration: "3:38",
      playCount: 7,
      timeLabel: "8:15 AM",
      noteText: "Streamed 7 times in 48 hours right after the move",
    },
  },
  {
    id: "c2-music-killers-done",
    type: "music",
    title: "All These Things That I've Done",
    subtitle: "Earphones on high while riding the unfamiliar transfer route",
    timestamp: "2024-03-18T10:14:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      artist: "The Killers",
      album: "Hot Fuss",
      albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
      duration: "5:01",
      playCount: 18,
      timeLabel: "10:14 AM",
      noteText: "Soundtrack for walking into the new district for the first time",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c2-purchase-transit-train",
    type: "purchase",
    title: "Suburban Transit Rail Ticket",
    subtitle: "Commuter ticket between Place 5 and Place 0 on the new line",
    timestamp: "2024-03-08T08:45:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      merchant: "Metropolitan Transit Line",
      items: [{ name: "Suburban Single Commute Pass", price: 4.5 }],
      total: 4.5,
      timeLabel: "8:45 AM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c2-place-auto-ride",
    type: "place",
    title: "Station Auto Ride to Residence",
    subtitle: "Rainy cross-town ride with bags to the new apartment entrance",
    timestamp: "2024-03-16T21:30:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      merchant: "Station Taxi & Auto Stand",
      address: "Terminal Plaza to Sector 4 Entrance",
      weather: "Light rain, 54°F",
      timeLabel: "9:30 PM",
      noteText: "Late evening arrival with one rolling suitcase and two boxes",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c2-purchase-ironing",
    type: "purchase",
    title: "Neighborhood Laundry & Pressing",
    subtitle: "11 work shirts pressed at the local dry cleaner after unpacking",
    timestamp: "2024-03-27T16:20:00",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      merchant: "Corner Steam Laundry",
      items: [{ name: "11 Clothes Ironing & Steam Press", price: 12.0 }],
      total: 12.0,
      timeLabel: "4:20 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c2-purchase-train-interchange",
    type: "purchase",
    title: "Transit Transfer — Place 0 to Place 3",
    subtitle: "Evening connecting train pass across the outer junction",
    timestamp: "2024-03-22T21:35:15",
    chapterId: "chapter-2",
    linkedIds: [],
    details: {
      merchant: "Regional Commuter Rail",
      items: [{ name: "Inter-Station Connecting Ticket", price: 5.25 }],
      total: 5.25,
      timeLabel: "9:35 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },

  // =========================================================================
  // CHAPTER 3: Learning the Block (April–May)
  // =========================================================================
  {
    id: "c3-note-block",
    type: "note",
    title: "Notes App Draft",
    subtitle: "things I like about this block",
    timestamp: "2024-05-02T19:30:00",
    chapterId: "chapter-3",
    linkedIds: ["c4-place-park"], // Reveal Connection 2
    details: {
      noteText:
        "things I like about this block:\n- the bakery that smells like cardamom\n- how quiet it gets after 8\n- the bench by the playground where the light hits at 7",
      timeLabel: "7:30 PM",
    },
  },
  {
    id: "c3-music-secrets",
    type: "music",
    title: "Secrets",
    subtitle: "Heavy rotation during early morning walks",
    timestamp: "2024-04-10T07:22:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/secrets.jpg",
      audioUrl: "/audio/secrets.mp3",
      duration: "4:25",
      playCount: 16,
      timeLabel: "7:22 AM",
    },
  },
  {
    id: "c3-music-mala",
    type: "music",
    title: "MALA",
    subtitle: "Afternoon spring walking track",
    timestamp: "2024-05-12T16:45:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      artist: "Maluma",
      album: "The Love & Sex",
      duration: "3:10",
      playCount: 8,
      timeLabel: "4:45 PM",
    },
  },
  {
    id: "c3-music-in-the-blood",
    type: "music",
    title: "In the Blood",
    subtitle: "Afternoon walking playlist while exploring the side streets",
    timestamp: "2024-04-22T14:40:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      artist: "John Mayer",
      album: "The Search for Everything",
      albumArt: "https://images.unsplash.com/photo-1445985543470-41f30c08f10a?w=500&auto=format&fit=crop&q=60",
      duration: "4:05",
      playCount: 22,
      timeLabel: "2:40 PM",
      noteText: "Sun warm on the brick facades, discovering the pocket park down 4th",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c3-purchase-breakfast-idli",
    type: "purchase",
    title: "Corner Counter Breakfast",
    subtitle: "Steaming idli & crispy medu vada combo with filter coffee",
    timestamp: "2024-04-14T09:15:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "South Corner Tiffin House",
      items: [
        { name: "Idli & Medu Vada Combo (2 Plates)", price: 4.0 },
        { name: "Filter Kaapi", price: 1.5 },
      ],
      total: 5.5,
      timeLabel: "9:15 AM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c3-purchase-kirana-provisions",
    type: "purchase",
    title: "Neighborhood Kirana Provisions",
    subtitle: "Pantry restock: whole grain flour, lentils, spices & fresh milk",
    timestamp: "2024-04-28T21:01:32",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "Gupta Brothers Provisions",
      items: [
        { name: "Stoneground Whole Wheat Atta", price: 8.5 },
        { name: "Spices & Organic Tea Leaves", price: 6.5 },
        { name: "Fresh Dairy Milk", price: 3.5 },
      ],
      total: 18.5,
      timeLabel: "9:01 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c3-purchase-hbr-journal",
    type: "purchase",
    title: "Reading Journal & Bookstall",
    subtitle: "2-month review subscription and paperbacks for weekend mornings",
    timestamp: "2024-05-18T15:30:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "Avenue Periodicals & Books",
      items: [{ name: "Bi-Monthly Reading Journal", price: 9.5 }],
      total: 9.5,
      timeLabel: "3:30 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c3-purchase-evening-snacks",
    type: "purchase",
    title: "Evening Street Corner Snacks",
    subtitle: "Crispy savory street snack plate on the walk home from work",
    timestamp: "2024-05-24T18:30:00",
    chapterId: "chapter-3",
    linkedIds: [],
    details: {
      merchant: "Chaat & Street Food Corner",
      items: [
        { name: "Spiced Chinese Bhel", price: 3.0 },
        { name: "Sev Puri Crisp Plates (x2)", price: 4.5 },
      ],
      total: 7.5,
      timeLabel: "6:30 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },

  // =========================================================================
  // CHAPTER 4: The Night Everything Lined Up (June 14)
  // [Core Reveal 3 Hinge Cluster — Strictly Preserved]
  // =========================================================================
  {
    id: "c4-song-firstplay",
    type: "music",
    title: "First Play: 'Die For You'",
    subtitle: "First stream ever logged in your library • 7:12 PM",
    timestamp: "2024-06-14T19:12:00",
    chapterId: "chapter-4",
    linkedIds: [
      "c4-place-park",
      "c4-photo-744",
      "c4-purchase-twocoffees",
      "c4-message-good",
    ], // Reveal Connection 3
    details: {
      artist: "The Weeknd",
      album: "Starboy",
      albumArt: "/covers/die-for-you.jpg",
      audioUrl: "/audio/die-for-you.mp3",
      duration: "4:20",
      playCount: 1,
      timeLabel: "7:12 PM",
      noteText: "First stream ever logged in your library. You had one headphone in.",
    },
  },
  {
    id: "c4-place-park",
    type: "place",
    title: "Location Check-in: Park Bench",
    subtitle: "Cobble Hill Park • Southeast corner bench",
    timestamp: "2024-06-14T19:28:00",
    chapterId: "chapter-4",
    linkedIds: [
      "c3-note-block",
      "c4-song-firstplay",
      "c4-photo-744",
      "c4-purchase-twocoffees",
      "c4-message-good",
    ], // Reveal 2 & Reveal 3
    details: {
      address: "Cobble Hill Park, Brooklyn, NY",
      coords: "40.6882° N, 73.9969° W",
      weather: "72°F, Clear golden hour",
      timeLabel: "7:28 PM",
      noteText: "The same bench you wrote down six weeks ago. Now there were two of you on it.",
    },
  },
  {
    id: "c4-photo-744",
    type: "photo",
    title: "Photo",
    subtitle: "Cobble Hill Park • 7:44 PM • Unedited",
    timestamp: "2024-06-14T19:44:00",
    chapterId: "chapter-4",
    linkedIds: [
      "c4-song-firstplay",
      "c4-place-park",
      "c4-purchase-twocoffees",
      "c4-message-good",
    ], // Reveal Connection 3
    details: {
      imageUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&auto=format&fit=crop&q=80",
      timeLabel: "7:44 PM",
      noteText: "Golden hour through the trees. You didn't post it. You just kept it.",
    },
  },
  {
    id: "c4-purchase-twocoffees",
    type: "purchase",
    title: "Two Iced Coffees",
    subtitle: "Cobble Hill Coffee Roasters • 8:02 PM",
    timestamp: "2024-06-14T20:02:00",
    chapterId: "chapter-4",
    linkedIds: [
      "c4-song-firstplay",
      "c4-place-park",
      "c4-photo-744",
      "c4-message-good",
    ], // Reveal Connection 3
    details: {
      merchant: "Cobble Hill Coffee Roasters",
      items: [
        { name: "Iced Oat Latte", price: 6.5 },
        { name: "Cold Brew with Milk", price: 5.5 },
      ],
      total: 12.0,
      timeLabel: "8:02 PM",
      noteText: "Two cups. First time you ever ordered more than one.",
    },
  },
  {
    id: "c4-message-good",
    type: "message",
    title: "Message to Sam",
    subtitle: "today was good.",
    timestamp: "2024-06-14T23:58:00",
    chapterId: "chapter-4",
    linkedIds: [
      "c4-song-firstplay",
      "c4-place-park",
      "c4-photo-744",
      "c4-purchase-twocoffees",
    ], // Reveal Connection 3
    details: {
      sender: "You",
      isOutgoing: true,
      timeLabel: "11:58 PM",
      noteText: "Three words sent before setting the phone on the nightstand.",
    },
  },

  // =========================================================================
  // CHAPTER 5: Quietly, Something Changed (July–Sept)
  // =========================================================================
  {
    id: "c5-purchase-key",
    type: "purchase",
    title: "Second Key Cut",
    subtitle: "Two brass keys cut • September 06",
    timestamp: "2024-09-06T14:15:00",
    chapterId: "chapter-5",
    linkedIds: ["c1-note-say"], // Reveal Connection 4
    details: {
      merchant: "Court Street Lock & Key",
      items: [{ name: "Standard Brass House Key Duplicate (x2)", price: 9.0 }],
      total: 9.0,
      timeLabel: "2:15 PM",
      noteText: "The thing you were scared to say in January, you didn't have to say by September.",
    },
  },
  {
    id: "c5-music-lessthanzero",
    type: "music",
    title: "Less Than Zero",
    subtitle: "Daytime listening, sunny afternoon",
    timestamp: "2024-07-15T15:30:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "Dawn FM",
      albumArt: "/covers/less-than-zero.jpg",
      audioUrl: "/audio/less-than-zero.mp3",
      duration: "3:31",
      playCount: 12,
      timeLabel: "3:30 PM",
      noteText: "Playing through open windows on a Sunday afternoon",
    },
  },
  {
    id: "c5-music-saveyourtears",
    type: "music",
    title: "Save Your Tears",
    subtitle: "Evening kitchen cooking soundtrack",
    timestamp: "2024-08-05T19:20:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "/covers/save-your-tears.jpg",
      audioUrl: "/audio/save-your-tears.mp3",
      duration: "3:35",
      playCount: 9,
      timeLabel: "7:20 PM",
    },
  },
  {
    id: "c5-music-lovenwantiti",
    type: "music",
    title: "Love Nwantiti (ah ah ah)",
    subtitle: "Evening summer soundtrack • repeat loop",
    timestamp: "2024-08-25T19:48:00",
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
  {
    id: "c5-music-yesterday",
    type: "music",
    title: "Yesterday",
    subtitle: "Golden hour commute home • quiet evening rotation",
    timestamp: "2024-08-20T18:15:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "The Beatles",
      album: "Help! (Remastered)",
      albumArt: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60",
      duration: "2:05",
      playCount: 16,
      timeLabel: "6:15 PM",
      noteText: "Subway rattling home under amber sunlight, no rush at all",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c5-music-reminder",
    type: "music",
    title: "Reminder",
    subtitle: "September dusk walk • played 117 times over the late summer",
    timestamp: "2024-09-14T19:30:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      artist: "Mumford & Sons",
      album: "Babel",
      albumArt: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60",
      duration: "2:04",
      playCount: 12,
      timeLabel: "7:30 PM",
      noteText: "Cool September evening breeze through the street trees",
      sourceDataset: "Spotify Listening History (archive.zip)",
    },
  },
  {
    id: "c5-purchase-bakery-routine",
    type: "purchase",
    title: "Morning Bakery & Dairy Routine",
    subtitle: "Artisanal crusty sourdough loaf and sweet cultured butter",
    timestamp: "2024-08-16T08:10:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      merchant: "Corner Hearth Bakery",
      items: [
        { name: "Artisanal Sourdough Loaf", price: 3.5 },
        { name: "Cultured Table Butter", price: 1.8 },
      ],
      total: 5.3,
      timeLabel: "8:10 AM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
    },
  },
  {
    id: "c5-purchase-shared-dinner",
    type: "purchase",
    title: "Terrace Dinner with Friends",
    subtitle: "Two hand-tossed pizzas and drinks out on the patio until 10 PM",
    timestamp: "2024-08-31T20:15:00",
    chapterId: "chapter-5",
    linkedIds: [],
    details: {
      merchant: "Corner Wood-Fired Pizzeria",
      items: [
        { name: "Margherita & Roasted Garlic Pizzas", price: 28.0 },
        { name: "Sparkling Drinks & Tiramisu", price: 14.5 },
      ],
      total: 42.5,
      timeLabel: "8:15 PM",
      sourceDataset: "Daily Household Transactions (archive (1).zip)",
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

  return undefined;
}
