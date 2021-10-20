export const Stars = ({ rate }) => {
  return (
    <>
      <div className="text-center text-secondary">Мой рейтинг</div>
      <div>
        <i className={`fas fa-star ${rate >= 1 && 'checked'}`} />
        <i className={`fas fa-star ${rate >= 2 && 'checked'}`} />
        <i className={`fas fa-star ${rate >= 3 && 'checked'}`} />
        <i className={`fas fa-star ${rate >= 4 && 'checked'}`} />
        <i className={`fas fa-star ${rate === 5 && 'checked'}`} />
      </div>
    </>
  );
};
