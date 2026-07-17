import { Link } from 'react-router-dom';
import Button from '../../componens/common/Button';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center px-6">
    <h1 className="text-6xl font-extrabold text-slate-900">404</h1>
    <p className="text-slate-500 mt-3 mb-6">This page doesn't exist.</p>
    <Link to="/">
      <Button variant="primary">Back home</Button>
    </Link>
  </div>
);

export default NotFound;