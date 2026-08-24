import { Calendar, Camera, Clock4, MapPin, Video, X } from "lucide-react";
import { useState } from "react";
import { resident } from "@/lib/data";

/** Photo/video attachment with automatically captured location, date & time. */
export function AttachMedia() {
  const [photo, setPhoto] = useState(false);
  const [video, setVideo] = useState(false);
  const attached = photo || video;

  return (
    <div>
      <p className="mb-2 text-[10px] font-extrabold tracking-[0.16em] text-forest/50">ADD EVIDENCE (OPTIONAL)</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPhoto((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-extrabold tracking-wide transition-all ${
            photo ? "bg-emerald text-primary-foreground shadow-lift" : "bg-card text-forest shadow-card"
          }`}
        >
          <Camera className="size-4" />
          {photo ? "PHOTO ADDED" : "ADD PHOTO"}
        </button>
        <button
          type="button"
          onClick={() => setVideo((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-extrabold tracking-wide transition-all ${
            video ? "bg-emerald text-primary-foreground shadow-lift" : "bg-card text-forest shadow-card"
          }`}
        >
          <Video className="size-4" />
          {video ? "VIDEO ADDED" : "ADD VIDEO"}
        </button>
      </div>

      {attached && (
        <div className="animate-float-in mt-3 rounded-3xl bg-pale p-4">
          <div className="flex flex-wrap gap-2">
            {photo && (
              <span className="flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-ivory">
                <Camera className="size-3" /> PHOTO_1842.JPG
                <X className="size-3 cursor-pointer" onClick={() => setPhoto(false)} />
              </span>
            )}
            {video && (
              <span className="flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-ivory">
                <Video className="size-3" /> VIDEO_1843.MP4
                <X className="size-3 cursor-pointer" onClick={() => setVideo(false)} />
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1.5 text-[11px] font-semibold text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5 text-emerald" /> {resident.address} — auto-attached
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="size-3.5 text-emerald" /> Aug 24, 2026
              <Clock4 className="ml-2 size-3.5 text-emerald" /> 6:42 PM
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
