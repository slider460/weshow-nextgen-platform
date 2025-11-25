import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import type { Letter } from "../data/letters";

type Orientation = "portrait" | "landscape";

interface AchievementModalProps {
  letter: Letter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const A4_RATIO = 1.41421356237; // height / width
const HEADER_FOOTER_OFFSET = 220; // approximate padding & header inside dialog
const INITIAL_SCALE = 0.94; // emulate одно "минус" на старте

const isPdf = (url?: string) => url?.toLowerCase().endsWith(".pdf");

const computeFrame = (orientation: Orientation): CSSProperties => {
  if (typeof window === "undefined") {
    return { width: "auto", height: "auto" };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxWidth = vw * 0.78;
  const maxHeight = Math.max(420, vh - HEADER_FOOTER_OFFSET);

  if (orientation === "portrait") {
    const rawWidth = Math.min(maxWidth, maxHeight / A4_RATIO);
    const width = rawWidth * INITIAL_SCALE;
    const height = width * A4_RATIO;
    return {
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
      aspectRatio: `${1}/${A4_RATIO}`,
    };
  }

  const rawHeight = Math.min(maxHeight, maxWidth / A4_RATIO);
  const height = rawHeight * INITIAL_SCALE;
  const width = height * A4_RATIO;
  return {
    width: `${width}px`,
    height: `${height}px`,
    maxWidth: `${width}px`,
    maxHeight: `${height}px`,
    aspectRatio: `${A4_RATIO}/1`,
  };
};

export const AchievementModal = ({ letter, open, onOpenChange }: AchievementModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [frameStyle, setFrameStyle] = useState<CSSProperties>(() => computeFrame("portrait"));

  const title = letter?.title ?? "";
  const description = letter?.description ?? "";
  const documentUrl = letter?.document_url;

  useEffect(() => {
    setIsLoaded(false);
    setOrientation("portrait");
    setFrameStyle(computeFrame("portrait"));
  }, [documentUrl]);

  useEffect(() => {
    const handleResize = () => {
      setFrameStyle(computeFrame(orientation));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [orientation]);

  useEffect(() => {
    setFrameStyle(computeFrame(orientation));
  }, [orientation]);

  const contentStyle: CSSProperties = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-h-[96vh] border border-white/15 bg-[#1f1f25] text-white shadow-2xl sm:rounded-2xl [&>button]:hidden">
        <DialogHeader className="border-b border-white/10 px-6 py-4 text-left">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/40">Документ</p>
              <DialogTitle className="mt-1 text-lg font-semibold text-white/90">{title}</DialogTitle>
            </div>
            <button
              type="button"
              aria-label="Закрыть"
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>
        </DialogHeader>

        <div className="flex h-full flex-col gap-6 overflow-hidden p-6">
          {!documentUrl ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-white/80">
              <p className="text-lg font-semibold">Документ недоступен</p>
              <p className="text-sm text-white/60">
                Для этого достижения пока не добавлена ссылка на документ.
              </p>
            </div>
          ) : (
            <>
              <div className={`flex flex-1 items-center justify-center transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <div
                  style={{
                    ...frameStyle,
                    backgroundColor: "#e5e5e5",
                    borderRadius: "24px",
                    padding: "24px",
                    boxShadow: "0 18px 36px rgba(0,0,0,0.2)",
                  }}
                  className="relative flex items-center justify-center"
                >
                  {isPdf(documentUrl) ? (
                    <iframe
                      src={documentUrl}
                      title={title}
                      className="h-full w-full rounded-xl border border-black/10 bg-white"
                      onLoad={() => setIsLoaded(true)}
                    />
                  ) : (
                    <img
                      src={documentUrl}
                      alt={title}
                      style={contentStyle}
                      className="h-full w-full rounded-[18px] border border-black/10 bg-white"
                      onLoad={(event) => {
                        const { naturalWidth, naturalHeight } = event.currentTarget;
                        setOrientation(naturalWidth > naturalHeight ? "landscape" : "portrait");
                        setIsLoaded(true);
                      }}
                      onError={() => setIsLoaded(true)}
                    />
                  )}
                </div>
              </div>

              {!isLoaded && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4 rounded-3xl bg-black/60 px-8 py-10 text-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/15 border-t-primary" />
                    <div className="max-w-md space-y-2">
                      <p className="text-lg font-semibold text-white">Загружаем документ…</p>
                      <p className="text-sm text-white/60">Пожалуйста, подождите несколько секунд.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-base font-medium text-white">{title}</p>
                {description && <p className="text-sm leading-relaxed text-white/70">{description}</p>}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementModal;


