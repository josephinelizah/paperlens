import { useState } from "react";
import "./App.css";

type Analysis = {
  title: string;
  abstract: string;
  objective: string;
  methodology: string;
  dataset: string;
  results: string;
  conclusion: string;
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const goHome = () => {
    setAnalysis(null);
    setShowAbout(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const handleLearnMore = () => {
    setShowAbout(false);

    setTimeout(() => {
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);
  };

  const handleAbout = () => {
    setAnalysis(null);
    setShowAbout(true);

    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Choose a PDF to begin.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/papers/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      if (data.analysis) {
        setAnalysis(data.analysis);
      }

      setMessage(
        `${data.filename} · ${data.characters.toLocaleString()} characters`
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (analysis) {
    return (
      <div className="app">
        <header className="navbar">
          <button className="brand" onClick={goHome}>
            PaperLens
          </button>

          <nav>
            <button onClick={goHome}>Dashboard</button>
            <button onClick={handleAbout}>About</button>
          </nav>
        </header>

        <main className="results-page">
          <div className="results-title">
            <p>YOUR PAPER</p>
            <h1>{analysis.title}</h1>
            <span>{message}</span>
          </div>

          <div className="results-board">
            <section className="result-piece summary-piece">
              <span className="piece-number">01</span>
              <div>
                <p className="piece-label">THE BIG PICTURE</p>
                <h2>Summary</h2>
                <p>{analysis.abstract}</p>
              </div>
            </section>

            <section className="result-piece objective-piece">
              <span className="piece-number">02</span>
              <div>
                <p className="piece-label">THE QUESTION</p>
                <h2>Objective</h2>
                <p>{analysis.objective}</p>
              </div>
            </section>

            <section className="result-piece methodology-piece">
              <span className="piece-number">03</span>
              <div>
                <p className="piece-label">HOW IT WAS DONE</p>
                <h2>Methodology</h2>
                <p>{analysis.methodology}</p>
              </div>
            </section>

            <section className="result-piece dataset-piece">
              <span className="piece-number">04</span>
              <div>
                <p className="piece-label">WHAT WAS USED</p>
                <h2>Dataset</h2>
                <p>{analysis.dataset}</p>
              </div>
            </section>

            <section className="result-piece results-piece">
              <span className="piece-number">05</span>
              <div>
                <p className="piece-label">WHAT THEY FOUND</p>
                <h2>Results</h2>
                <p>{analysis.results}</p>
              </div>
            </section>

            <section className="result-piece conclusion-piece">
              <span className="piece-number">06</span>
              <div>
                <p className="piece-label">SO WHAT?</p>
                <h2>Conclusion</h2>
                <p>{analysis.conclusion}</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={goHome}>
          PaperLens
        </button>

        <nav>
          <button onClick={goHome}>Dashboard</button>
          <button onClick={handleAbout}>About</button>
        </nav>
      </header>

      <main className="home">
        {!showAbout && (
          <>
            <section className="hero">
              <div className="paper-scene">
                <div className="paper-shadow"></div>

                <div className="paper">
                  <div className="paper-corner"></div>

                  <div className="paper-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="paper-content">
                    <p className="paper-label">
                      YOUR RESEARCH COMPANION
                    </p>

                    <h1>PaperLens</h1>

                    <p className="paper-subtitle">
                      Understand research papers faster.
                    </p>

                    <div className="paper-divider"></div>

                    <p className="paper-note">
                      Find the ideas, methods, results and meaning
                      <br />
                      without getting lost in every page.
                    </p>

                    <button
                      className="learn-more"
                      onClick={handleLearnMore}
                    >
                      Learn more <span>→</span>
                    </button>
                  </div>

                  <div className="paper-sticker sticker-blue">
                    RESEARCH
                  </div>

                  <div className="paper-sticker sticker-pink">
                    READ
                    <br />
                    SMARTER
                  </div>

                  <div className="paper-star">✦</div>

                  <div className="paper-arrow">↗</div>

                  <div className="paper-small-text">
                    IDEAS · METHODS · RESULTS
                  </div>
                </div>
              </div>

              <div className="upload-area">
                <input
                  type="file"
                  accept=".pdf"
                  id="pdf-upload"
                  hidden
                  onChange={(event) =>
                    setFile(event.target.files?.[0] || null)
                  }
                />

                <label
                  htmlFor="pdf-upload"
                  className="choose-paper"
                >
                  {file ? file.name : "Choose your paper"}
                </label>

                {file && (
                  <button
                    className="analyze-button"
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? "Reading..." : "Upload & Analyze"}
                  </button>
                )}

                {message && (
                  <p className="upload-message">{message}</p>
                )}
              </div>
            </section>

            <section className="features-section" id="features">
              <div className="section-heading">
                <p>EXPLORE PAPERLENS</p>
                <h2>Everything worth finding in a paper.</h2>
              </div>

              <div className="feature-grid">
                <article className="feature feature-summary">
                  <span>01</span>
                  <div className="feature-symbol">✦</div>
                  <h3>Summary</h3>
                  <p>
                    Get the main idea without reading every paragraph
                    first.
                  </p>
                  <small>THE BIG PICTURE</small>
                </article>

                <article className="feature feature-objective">
                  <span>02</span>
                  <div className="feature-symbol">?</div>
                  <h3>Objective</h3>
                  <p>
                    See what problem the researchers are actually
                    trying to solve.
                  </p>
                  <small>THE RESEARCH QUESTION</small>
                </article>

                <article className="feature feature-methodology">
                  <span>03</span>
                  <div className="feature-symbol">↗</div>
                  <h3>Methodology</h3>
                  <p>
                    Understand how the study was carried out step by
                    step.
                  </p>
                  <small>HOW IT WAS DONE</small>
                </article>

                <article className="feature feature-results">
                  <span>04</span>
                  <div className="feature-symbol">✳</div>
                  <h3>Results</h3>
                  <p>
                    Find the important findings and what the
                    researchers discovered.
                  </p>
                  <small>WHAT THEY FOUND</small>
                </article>

                <article className="feature feature-dataset">
                  <span>05</span>
                  <div className="feature-symbol">▫</div>
                  <h3>Dataset</h3>
                  <p>
                    Identify the data, materials or participants used
                    in the study.
                  </p>
                  <small>WHAT WAS USED</small>
                </article>

                <article className="feature feature-questions">
                  <span>06</span>
                  <div className="feature-symbol">!</div>
                  <h3>Ask PaperLens</h3>
                  <p>
                    Explore your paper further by asking questions
                    about its content.
                  </p>
                  <small>COMING NEXT</small>
                </article>
              </div>
            </section>
          </>
        )}

        {showAbout && (
          <section className="about-section" id="about">
            <div className="section-heading">
              <p>ABOUT PAPERLENS</p>
              <h2>Research papers, without the overload.</h2>
            </div>

            <div className="about-content">
              <p>
                PaperLens is an AI-powered research paper assistant
                designed to help readers understand academic papers
                faster.
              </p>

              <p>
                Instead of going through every page just to find the
                important parts, PaperLens extracts the key ideas,
                objectives, methodology, datasets, results and
                conclusions into a clearer structure.
              </p>

              <p>
                The goal is simple: spend less time getting lost in a
                paper and more time understanding what it actually
                means.
              </p>

              <button className="analyze-button" onClick={goHome}>
                Analyze a Paper
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;