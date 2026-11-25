import { publicRoutes } from '../../app/routes';

export function PublicFooter() {
  return (
    <footer className="sf-public-footer">
      <div className="sf-public-footer__inner">
        <div>
          <div className="sf-brand" style={{ color: 'var(--color-surface)' }}>
            <span
              className="sf-brand__mark"
              style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}
            >
              S
            </span>
            SmartFarm
          </div>
          <p style={{ marginTop: 12, maxWidth: 320, opacity: 0.82 }}>
            Clarity for everyday dairy farm operations.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {publicRoutes.map((item) => (
              <li key={item.id}>
                <a href={`#${item.path}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Inquiries</h3>
          <p style={{ margin: 0, opacity: 0.82 }}>
            Use the public contact form to reach the SmartFarm team. No public account registration
            or checkout is offered.
          </p>
          <a
            className="sf-button sf-button--secondary"
            style={{ marginTop: 16 }}
            href="#/public/contact"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="sf-public-footer__bottom">
        © {new Date().getFullYear()} SmartFarm. Approved contact details and legal links pending
        owner content.
      </div>
    </footer>
  );
}
