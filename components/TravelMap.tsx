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

    // Create map
    const map = L.map(mapRef.current).setView([20, 0], 2);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Sort posts by day
    const sortedPosts = [...blogPosts].sort((a, b) => a.day - b.day);

    // Create custom icon
    const createCustomIcon = (index: number) => {
      return L.divIcon({
        html: `
          <div style="
            background: white;
            border: 3px solid #f59e0b;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #f59e0b;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            cursor: pointer;
          ">
            ${index + 1}
          </div>
        `,
        iconSize: [40, 40],
        className: "custom-icon",
      });
    };

    // Add markers for each location
    sortedPosts.forEach((post, index) => {
      const marker = L.marker(
        [post.coordinates[0], post.coordinates[1]],
        { icon: createCustomIcon(index) }
      ).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
            ${post.title}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            <strong>Tag ${post.day}</strong> • ${post.date}
          </p>
          <p style="margin: 0; font-size: 12px; color: #999;">
            ${post.location}
          </p>
        </div>
      `);

      // Add click listener
      marker.on("click", () => {
        onLocationClick?.(post.id);
      });
    });

    // Draw route lines
    const coordinates = sortedPosts.map((post) => [
      post.coordinates[0],
      post.coordinates[1],
    ] as [number, number]);

    if (coordinates.length > 1) {
      L.polyline(coordinates, {
        color: "#f97316",
        weight: 2,
        opacity: 0.6,
        dashArray: "5, 10",
      }).addTo(map);
    }

    mapInstanceRef.current = map;

    return () => {
      // Cleanup
    };
  }, [onLocationClick]);

  const sortedPosts = [...blogPosts].sort((a, b) => a.day - b.day);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-lg border border-slate-700/50 shadow-sm bg-slate-800/50">
      <div
        ref={mapRef}
        className="flex-grow w-full"
        style={{ minHeight: "400px" }}
      />

      {/* Legend below map - Dark themed and larger - Mobile optimized */}
      <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto flex-shrink-0">
        <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {sortedPosts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => onLocationClick?.(post.id)}
              className="flex items-start gap-3 sm:gap-4 rounded-lg p-3 sm:p-4 text-left transition-all duration-300 hover:bg-slate-800/60 border border-slate-700/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/20 flex-shrink-0"
            >
              <div className="flex h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/20 text-xs sm:text-sm font-bold text-amber-300">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm sm:text-base font-semibold text-white">{post.title}</div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1 flex-wrap">
                  <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{post.location.split(",")[0]}</span>
                  <span className="flex-shrink-0">• Tag {post.day}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
