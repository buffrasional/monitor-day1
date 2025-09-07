import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { SEATS, Seat } from "./SEATS";
import "./index.css";

export default function Preview() {
  const [locked, setLocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.from("seats").select("id, locked");
      if (!mounted) return;
      if (!error && data) {
        setLocked(new Set(data.filter((s: any) => s.locked).map((s: any) => String(s.id))));
      }
    })();

    const ch = supabase
      .channel("realtime:seats")
      .on(
        "postgres_changes",
        { schema: "public", table: "seats", event: "*" },
        (p: any) => {
          if (!p?.new?.id) return;
          setLocked(prev => {
            const next = new Set(prev);
            if (p.new.locked) next.add(String(p.new.id));
            else next.delete(String(p.new.id));
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      try { supabase.removeChannel(ch); } catch {}
    };
  }, []);

  const SeatCell = ({ seat }: { seat: Seat }) => {
    const isLocked = locked.has(seat.id);
    return (
      <div
        className={`seat${isLocked ? " locked" : ""}`}
        style={{ gridRow: seat.row, gridColumn: seat.col, pointerEvents: "none" }}
        title={seat.id}
        aria-label={`Seat ${seat.id}`}
      >
        {seat.id}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Live Seat Monitor</h1>
          <span className="muted">Realtime dari Supabase (read-only)</span>
        </div>

        <div className="gridWrap">
          <div className="grid">
            {SEATS.map((s) => <SeatCell key={s.id} seat={s} />)}
          </div>

          <div className="screenWrap">
            <div className="screenBar"></div>
            <div className="screenLabel">LAYAR</div>
          </div>
        </div>

        <div className="legend">
          <span><span className="dot"></span> Available</span>
          <span><span className="dot locked"></span> Locked</span>
          <span style={{ marginLeft: "auto" }}>Non-interaktif (preview saja)</span>
        </div>
      </div>
    </div>
  );
}
