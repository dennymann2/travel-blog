import { useEffect, useRef } from "react";
import { blogPosts } from "../data/blog-posts";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TravelMapProps {
  onLocationClick?: (postId: string) => void;
}

export function TravelMap({ onLocationClick }: TravelMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([20, 0], 2);

    // Dark-themed map tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    const sortedPosts = [...blogPosts].sort((a, b) => a.day - b.day);

    const createCustomIcon = (index: number) => {
      return L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #0f172a;
            font-size: 13px;
            font-family: 'Inter', system-ui, sans-serif;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.1);
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          " onmouseenter="this.style.transform='scale(1.2)';this.style.boxShadow='0 6px 20px rgba(245,158,11,0.5)'" onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 4px 12px rgba(245,158,11,0.3)'">
            ${index + 1}
          </div>
        `,
        iconSize: [36, 36],
        className: "custom-icon",
      });
    };

    sortedPosts.forEach((post, index) => {
      const marker = L.marker(
        [post.coordinates[0], post.coordinates[1]],
        { icon: createCustomIcon(index) }
      ).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'Inter', system-ui, sans-serif; width: 220px; padding: 4px 0;">
          <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #1e293b; line-height: 1.3;">
            ${post.title}
          </h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">
            <strong style="color: #f59e0b;">Tag ${post.day}</strong> · ${post.date}
          </p>
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">
            📍 ${post.location}
          </p>
        </div>
      `);

      marker.on("click", () => {
        onLocationClick?.(post.id);
      });
    });

    // Route line
    const coordinates = sortedPosts.map((post) => [
      post.coordinates[0],
      post.coordinates[1],
    ] as [number, number]);

    if (coordinates.length > 1) {
      L.polyline(coordinates, {
        color: "#f59e0b",
        weight: 2,
        opacity: 0.4,
        dashArray: "6, 12",
      }).addTo(map);
    }

    mapInstanceRef.current = map;

    return () => {};
  }, [onLocationClick]);

  const sortedPosts = [...blogPosts].sort((a, b) => a.day - b.day);

  return (
    <div className="relative w-full flex flex-col overflow-visible rounded-2xl border border-slate-800/60 bg-slate-900/50">
      {/* Map */}
      <div className="w-full relative overflow-hidden flex-shrink-0" style={{ minHeight: "300px", height: "clamp(300px, 50vh, 600px)" }}>
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Legend */}
      <div className="border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto flex-shrink-0 max-h-96 sm:max-h-none">
        <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {sortedPosts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => onLocationClick?.(post.id)}
              className="flex items-center gap-3 rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover:bg-slate-800/60 border border-slate-800/40 hover:border-amber-500/30 group"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-xs font-bold text-slate-950 shadow-sm">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white group-hover:text-amber-50 transition-colors">{post.title}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="h-3 w-3 text-amber-500/60 flex-shrink-0" />
                  <span className="truncate">{post.location.split(",")[0]}</span>
                  <span className="flex-shrink-0 text-slate-600">· Tag {post.day}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
