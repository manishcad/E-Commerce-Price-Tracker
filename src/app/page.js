import Image from "next/image";

    // app/page.js
export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>🛒 E-commerce Price Tracker</h1>
      <form method="POST" action="api/track" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
        <input type="text" name="url" placeholder="Product Link" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <button type="submit">Track Price</button>
      </form>
    </main>
  );
}


