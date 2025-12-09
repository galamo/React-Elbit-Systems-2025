import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Feature imports
import UseHookExample from "./components/features/1-use-hook/Example";
import UseHookExercise from "./components/features/1-use-hook/Exercise";
import UseOptimisticExample from "./components/features/2-use-optimistic/Example";
import UseOptimisticExercise from "./components/features/2-use-optimistic/Exercise";
import UseFormStatusExample from "./components/features/3-use-form-status/Example";
import UseFormStatusExercise from "./components/features/3-use-form-status/Exercise";
import UseFormStateExample from "./components/features/4-use-form-state/Example";
import UseFormStateExercise from "./components/features/4-use-form-state/Exercise";
// import UseTransitionExample from "./components/features/5-use-transition/Example";
// import UseTransitionExercise from "./components/features/5-use-transition/Exercise";
// import DocumentMetadataExample from "./components/features/6-document-metadata/Example";
// import DocumentMetadataExercise from "./components/features/6-document-metadata/Exercise";
// import AssetLoadingExample from "./components/features/7-asset-loading/Example";
// import AssetLoadingExercise from "./components/features/7-asset-loading/Exercise";
// import RefAsPropExample from "./components/features/8-ref-as-prop/Example";
// import RefAsPropExercise from "./components/features/8-ref-as-prop/Exercise";
// import ContextProviderExample from "./components/features/9-context-provider/Example";
// import ContextProviderExercise from "./components/features/9-context-provider/Exercise";

function Home() {
  return (
    <div className="home">
      <h1>🚀 React 19 New Features</h1>
      <p className="subtitle">
        Learn React 19's latest features with examples and exercises
      </p>

      <div className="features-grid">
        <FeatureCard
          number="1"
          title="use() Hook"
          description="Load resources asynchronously with the new use() hook"
          link="/use-hook"
        />
        <FeatureCard
          number="2"
          title="useOptimistic"
          description="Optimistic UI updates for better user experience"
          link="/use-optimistic"
        />
        <FeatureCard
          number="3"
          title="useFormStatus"
          description="Track form submission state easily"
          link="/use-form-status"
        />
        <FeatureCard
          number="4"
          title="useFormState"
          description="Manage form state with Server Actions"
          link="/use-form-state"
        />
        <FeatureCard
          number="5"
          title="useTransition"
          description="Improved concurrent rendering and transitions"
          link="/use-transition"
        />
        <FeatureCard
          number="6"
          title="Document Metadata"
          description="Built-in support for title, meta, and link tags"
          link="/document-metadata"
        />
        <FeatureCard
          number="7"
          title="Asset Loading"
          description="Preload and manage resources efficiently"
          link="/asset-loading"
        />
        <FeatureCard
          number="8"
          title="ref as Prop"
          description="No more forwardRef - cleaner component APIs"
          link="/ref-as-prop"
        />
        <FeatureCard
          number="9"
          title="Context Provider"
          description="Simplified Context API without .Provider"
          link="/context-provider"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  description,
  link,
}: {
  number: string;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link to={link} className="feature-card">
      <div className="feature-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="learn-more">Learn More →</span>
    </Link>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="main-nav">
          <Link to="/" className="logo">
            React 19 Features
          </Link>
          <div className="nav-links">
            <a
              href="https://react.dev/blog/2024/12/05/react-19"
              target="_blank"
              rel="noopener noreferrer"
            >
              📚 Docs
            </a>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* use() Hook */}
            <Route path="/use-hook" element={<UseHookExample />} />
            <Route path="/use-hook/exercise" element={<UseHookExercise />} />

            {/* useOptimistic */}
            <Route path="/use-optimistic" element={<UseOptimisticExample />} />
            <Route
              path="/use-optimistic/exercise"
              element={<UseOptimisticExercise />}
            />

            {/* useFormStatus */}
            <Route path="/use-form-status" element={<UseFormStatusExample />} />
            <Route
              path="/use-form-status/exercise"
              element={<UseFormStatusExercise />}
            />

            {/* useFormState */}
            <Route path="/use-form-state" element={<UseFormStateExample />} />
            <Route
              path="/use-form-state/exercise"
              element={<UseFormStateExercise />}
            />

            {/* useTransition */}
            {/* <Route path="/use-transition" element={<UseTransitionExample />} />
            <Route
              path="/use-transition/exercise"
              element={<UseTransitionExercise />}
            /> */}

            {/* Document Metadata */}
            {/* <Route
              path="/document-metadata"
              element={<DocumentMetadataExample />}
            />
            <Route
              path="/document-metadata/exercise"
              element={<DocumentMetadataExercise />}
            /> */}

            {/* Asset Loading */}
            {/* <Route path="/asset-loading" element={<AssetLoadingExample />} />
            <Route
              path="/asset-loading/exercise"
              element={<AssetLoadingExercise />}
            /> */}

            {/* ref as Prop */}
            {/* <Route path="/ref-as-prop" element={<RefAsPropExample />} />
            <Route
              path="/ref-as-prop/exercise"
              element={<RefAsPropExercise />}
            /> */}

            {/* Context Provider */}
            {/* <Route
              path="/context-provider"
              element={<ContextProviderExample />}
            /> */}
            {/* <Route
              path="/context-provider/exercise"
              element={<ContextProviderExercise />}
            /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
