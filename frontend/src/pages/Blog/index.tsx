import {useEffect, useState} from 'react';
import UniversalCard from '../../Components/UniversalCard/index.tsx.ts';
import BackButton from '../../Components/BackButton/index.tsx';
import BlogButton from '../../Components/BlogButton/index.tsx';

type Film = {
  id: number;
  titlu: string;
  continut: string;
  imagine_url: string;
  data_publicarii: string;
  categorie?: string;
};
  
function Blog(){
    const [blogs, setBlogs] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${import.meta.env.VITE_API}/api/blogs`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('A apărut o eroare la încărcarea articolelor.');
                setLoading(false);
            });
    }, []);

    return (
    <div className="blog-page">
        <h2>Blog</h2>
        <BackButton />
      {loading && <p>Se încarcă articolele...</p>}
      {error && <p className="blog-error">{error}</p>}

      {!loading && !error && (
        <div className="blog-container">
          {blogs.length === 0 ? (
            <p>Nu există articole.</p>
          ) : (
            blogs.map((blog) => (
              <article className="blog-card" key={blog.id}>
                {blog.imagine_url && (
                  <img
                    src={blog.imagine_url}
                    alt={blog.titlu}
                    className="blog-image"
                  />
                )}

                <div className="blog-content">
                  {blog.categorie && (
                    <span className="blog-category">
                      {blog.categorie}
                    </span>
                  )}

                  <h3>{blog.titlu}</h3>

                  <p>{blog.continut}</p>

                  <small>
                    {new Date(blog.data_publicarii).toLocaleDateString(
                      "ro-RO"
                    )}
                  </small>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}



export default Blog;