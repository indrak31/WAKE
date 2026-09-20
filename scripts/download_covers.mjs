import fs from "fs";
import path from "path";

const songs = [
  { id: "call-out-my-name", query: "The Weeknd Call Out My Name" },
  { id: "reminder", query: "The Weeknd Reminder" },
  { id: "secrets", query: "The Weeknd Secrets" },
  { id: "die-for-you", query: "The Weeknd Die For You" },
  { id: "save-your-tears", query: "The Weeknd Save Your Tears" }
];

const outDir = "c:/Hackathon/Web-Rush/public/covers";
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  for (const s of songs) {
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(s.query)}&entity=song&limit=1`;
    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const item = data.results[0];
        const highResUrl = item.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
        const imgRes = await fetch(highResUrl);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const filePath = path.join(outDir, `${s.id}.jpg`);
        fs.writeFileSync(filePath, buf);
        console.log(`Saved: ${s.id}.jpg (${buf.length} bytes)`);
      }
    } catch (e) {
      console.error(`Error downloading ${s.id}:`, e);
    }
  }
}

run();
