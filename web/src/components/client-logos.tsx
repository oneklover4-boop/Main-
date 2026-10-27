const PANEL_GREY = "#616161";
const TAB_GREY = "#818181";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

const clients = [
  { name: "Galápagos", file: "galapagos.png", height: 42 },
  { name: "Novartis", file: "novartis.png", height: 44 },
  { name: "Allergan", file: "allergan.png", height: 48 },
  { name: "Sanofi", file: "sanofi.png", height: 44 },
  { name: "Regeneron", file: "regeneron.png", height: 36 },
  { name: "Janssen, Pharmaceutical Companies of Johnson & Johnson", file: "janssen.png", height: 44 },
  { name: "GSK", file: "gsk.png", height: 54 },
];

const ipsen = { name: "Ipsen", file: "ipsen.png", height: 38 };

export default function ClientLogos() {
  return (
    <section style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 3rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        .clients-grid{
          display:grid; grid-template-columns:repeat(3,1fr); gap:3rem 1.5rem;
        }
        .clients-cell{ display:flex; align-items:center; justify-content:center; height:80px; }
        @media (max-width: 700px) {
          .clients-grid{ grid-template-columns:repeat(2,1fr); gap:2.5rem 1rem; }
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ position: "relative", background: PANEL_GREY, padding: "4rem clamp(1.5rem, 4vw, 3rem) 3rem" }}>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: TAB_GREY,
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.65rem 1.5rem",
            }}
          >
            Clients
          </span>

          <div className="clients-grid">
            {clients.map((client) => (
              <div className="clients-cell" key={client.file}>
                <img
                  src={`images/clients/${client.file}`}
                  alt={client.name}
                  style={{ height: client.height, width: "auto", display: "block" }}
                />
              </div>
            ))}
            <div className="clients-cell">
              <div style={{ background: "#ffffff", borderRadius: 8, padding: "1.25rem 1.5rem" }}>
                <img
                  src={`images/clients/${ipsen.file}`}
                  alt={ipsen.name}
                  style={{ height: ipsen.height, width: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
