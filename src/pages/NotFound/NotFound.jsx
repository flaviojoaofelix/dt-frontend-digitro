import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <section className="text-center bg-light rounded p-3 shadow">
        <h1 className="display-1 fw-bold">404</h1>
        <hr />
        <p className="fs-3">Página não encontrada!</p>
        <p className="lead">O endereço da página que você tentou acessar parece não existir...</p>
        <Link to="/" className="btn btn-primary">
          Início
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
