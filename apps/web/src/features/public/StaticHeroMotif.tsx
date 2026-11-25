type StaticHeroMotifProps = {
  loading?: boolean;
};

export function StaticHeroMotif({ loading = false }: StaticHeroMotifProps) {
  return (
    <div className="sf-hero__motif-fallback">
      <svg
        className="sf-hero__static-motif"
        viewBox="0 0 480 360"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse cx="240" cy="292" rx="176" ry="34" fill="#EAF1E8" />
        <path
          d="M118 236 C150 138 262 96 362 128 C320 224 210 268 118 236 Z"
          fill="#397A58"
          opacity="0.9"
        />
        <path
          d="M184 246 C226 176 326 166 390 198 C344 272 252 288 184 246 Z"
          fill="#245C45"
          opacity="0.82"
        />
        <path
          d="M300 52 C332 100 356 128 356 158 C356 188 330 212 300 212 C270 212 244 188 244 158 C244 128 268 100 300 52 Z"
          fill="#D5A64A"
          opacity="0.78"
        />
      </svg>
      {loading ? (
        <span className="sf-hero__motif-loading" role="status">
          Loading visual…
        </span>
      ) : null}
    </div>
  );
}
