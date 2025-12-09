"use client";
// Home page with links to both examples
export default function HomePage() {
  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Next.js: SSR vs RSC Comparison</h1>
        <p className="subtitle">
          Compare Traditional Server-Side Rendering with React Server Components
        </p>
      </header>

      <div className="intro">
        <p>
          This demo shows the difference between two approaches to server-side
          rendering in Next.js:
        </p>
        <ul>
          <li>
            <strong>Traditional SSR:</strong> Client components with useEffect
            for data fetching
          </li>
          <li>
            <strong>React Server Components (RSC):</strong> Server components
            with direct data access
          </li>
        </ul>
      </div>

      <div className="cards">
        <a href="/traditional-ssr" className="card traditional">
          <div className="card-icon">🔴</div>
          <h2>Traditional SSR</h2>
          <p>The old way - Client-side data fetching</p>
          <ul className="features">
            <li>Uses "use client" directive</li>
            <li>Requires API routes</li>
            <li>Data fetched with useEffect</li>
            <li>Needs loading states</li>
            <li>Larger JavaScript bundle</li>
          </ul>
          <div className="cta">View Example →</div>
        </a>

        <a href="/server-component" className="card server">
          <div className="card-icon">🟢</div>
          <h2>React Server Components</h2>
          <p>The new way - Server-side data fetching</p>
          <ul className="features">
            <li>No "use client" needed</li>
            <li>Direct database access</li>
            <li>Data fetched before render</li>
            <li>No loading states</li>
            <li>Zero JavaScript for server parts</li>
          </ul>
          <div className="cta">View Example →</div>
        </a>
      </div>

      <div className="comparison-table">
        <h2>Quick Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Traditional SSR</th>
              <th>React Server Components</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Fetching</td>
              <td>❌ API routes + useEffect</td>
              <td>✅ Direct in component</td>
            </tr>
            <tr>
              <td>JavaScript Bundle</td>
              <td>❌ ~150KB+</td>
              <td>✅ ~0KB (server only)</td>
            </tr>
            <tr>
              <td>Loading States</td>
              <td>❌ Required</td>
              <td>✅ Not needed</td>
            </tr>
            <tr>
              <td>Hydration</td>
              <td>❌ Full page</td>
              <td>✅ Only interactive parts</td>
            </tr>
            <tr>
              <td>Time to Interactive</td>
              <td>❌ Slower (~600ms)</td>
              <td>✅ Faster (~250ms)</td>
            </tr>
            <tr>
              <td>SEO</td>
              <td>⚠️ Good (after hydration)</td>
              <td>✅ Excellent (immediate)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="setup-info">
        <h2>Setup Instructions</h2>
        <div className="code-block">
          <pre>{`# Create Next.js project
npx create-next-app@latest my-app --typescript --app

# Navigate to project
cd my-app

# Copy these examples
# Then run:
npm run dev`}</pre>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header h1 {
          margin: 0;
          font-size: 42px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subtitle {
          color: #666;
          font-size: 18px;
          margin: 15px 0 0 0;
        }
        .intro {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .intro p {
          margin: 0 0 15px 0;
          color: #333;
          line-height: 1.6;
        }
        .intro ul {
          margin: 0;
          padding-left: 25px;
        }
        .intro li {
          margin: 10px 0;
          color: #666;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
        .card {
          background: white;
          border: 2px solid #ddd;
          border-radius: 16px;
          padding: 30px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .card.traditional {
          border-color: #dc2626;
        }
        .card.traditional:hover {
          border-color: #b91c1c;
        }
        .card.server {
          border-color: #16a34a;
        }
        .card.server:hover {
          border-color: #15803d;
        }
        .card-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .card h2 {
          margin: 0 0 10px 0;
          color: #333;
        }
        .card > p {
          color: #666;
          margin: 0 0 20px 0;
        }
        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          flex-grow: 1;
        }
        .features li {
          padding: 8px 0;
          color: #666;
          font-size: 14px;
          border-bottom: 1px solid #f0f0f0;
        }
        .features li:last-child {
          border-bottom: none;
        }
        .cta {
          text-align: center;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
          font-weight: bold;
        }
        .comparison-table {
          margin-bottom: 50px;
        }
        .comparison-table h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        th,
        td {
          padding: 15px;
          text-align: left;
        }
        th {
          font-weight: bold;
        }
        tbody tr {
          border-bottom: 1px solid #f0f0f0;
        }
        tbody tr:last-child {
          border-bottom: none;
        }
        tbody tr:hover {
          background: #f8f9fa;
        }
        td:first-child {
          font-weight: bold;
          color: #333;
        }
        .setup-info {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
        }
        .setup-info h2 {
          margin: 0 0 20px 0;
          color: #333;
        }
        .code-block {
          background: #1e293b;
          border-radius: 8px;
          padding: 20px;
          overflow-x: auto;
        }
        .code-block pre {
          margin: 0;
          color: #e2e8f0;
          font-family: "Monaco", "Courier New", monospace;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

// Made with Bob
