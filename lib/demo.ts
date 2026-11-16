export type Orientation = "portrait" | "landscape";

export type Demo =
  | { kind: "site"; url: string }
  | { kind: "file"; url: string; orientation?: Orientation }
  | {
      kind: "youtube" | "vimeo";
      url: string;
      embed: string;
      orientation?: Orientation;
    };

const FILE = /\.(mp4|webm)$/i;

function hint(hash: string): Orientation | undefined {
  if (hash === "#portrait") return "portrait";
  if (hash === "#landscape") return "landscape";
  return undefined;
}

export function parseDemo(url?: string | null): Demo | null {
  if (!url) return null;

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m)\./, "");
    const orientation = hint(u.hash);

    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id)
        return {
          kind: "youtube",
          url,
          embed: `https://www.youtube-nocookie.com/embed/${id}`,
          orientation,
        };
    }

    if (host === "youtube.com") {
      const short = u.pathname.startsWith("/shorts/");
      const id =
        u.searchParams.get("v") ??
        u.pathname.match(/^\/(?:shorts|embed)\/([\w-]+)/)?.[1];
      if (id)
        return {
          kind: "youtube",
          url,
          embed: `https://www.youtube-nocookie.com/embed/${id}`,
          orientation: orientation ?? (short ? "portrait" : undefined),
        };
    }

    if (host === "vimeo.com") {
      const id = u.pathname.match(/\/(\d+)/)?.[1];
      if (id)
        return {
          kind: "vimeo",
          url,
          embed: `https://player.vimeo.com/video/${id}`,
          orientation,
        };
    }

    if (FILE.test(u.pathname))
      return { kind: "file", url: u.origin + u.pathname + u.search, orientation };

    return { kind: "site", url };
  } catch {
    // Relative path such as "/videos/demo.mp4#portrait" in /public
    const [path, hash] = url.split("#");
    return FILE.test(path)
      ? { kind: "file", url: path, orientation: hint(hash ? `#${hash}` : "") }
      : null;
  }
}