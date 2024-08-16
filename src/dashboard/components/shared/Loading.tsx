export default function Loading() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
  );
}
