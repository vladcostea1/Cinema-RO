import {Link} from 'react-router';

function BlogButton() {
    return (
        <Link to="/Blog">
            <button>Go to Blog</button>
        </Link>
    );
}
export default BlogButton;