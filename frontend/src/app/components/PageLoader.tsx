import "./PageLoader.css";

type PageLoaderProps = {
  /** When true, starts fade-out animation before parent unmounts. */
  fading?: boolean;
};

/**
 * Full-page loading overlay (CMS / first paint):
 * - rotating gold frames
 * - "3G" glow + soft zoom
 * - dots left → right
 * - light blur over the page behind
 */
export default function PageLoader({ fading = false }: PageLoaderProps) {
  return (
    <div
      className={`page-loader${fading ? " page-loader--fade" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="page-loader__blur" aria-hidden />

      <div className="page-loader__stage">
        <div className="page-loader__badge" aria-hidden>
          <div className="page-loader__ring page-loader__ring--4 page-loader__spin-acw" />
          <div className="page-loader__ring page-loader__ring--3 page-loader__spin-cw" />
          <div className="page-loader__ring page-loader__ring--2 page-loader__spin-acw" />
          <div className="page-loader__ring page-loader__ring--1 page-loader__spin-cw" />

          <div className="page-loader__mark">
            <span className="page-loader__mark-text">
              <span className="page-loader__mark-char page-loader__mark-char--3">
                3
              </span>
              <span className="page-loader__mark-char page-loader__mark-char--g">
                G
              </span>
            </span>
          </div>
        </div>

        <p className="page-loader__label">LOADING</p>

        <div className="page-loader__dots" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="page-loader__dot"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
