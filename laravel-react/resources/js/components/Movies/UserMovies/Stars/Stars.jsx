import './Stars.css'

export const Stars = ({ user_rate: rate }) => {
  return (
    <div className='rating d-flex flex-column my-auto ms-md-4 ms-lg-2' align='center'>
      <h5 className='rating-title text-center text-dark mb-1 mb-xl-2'>Мой рейтинг</h5>
      <div className='mt-0'>
        <i className={`fas fa-star star-in-user-movies ${rate >= 1 && 'checked'}`} />
        <i className={`fas fa-star star-in-user-movies ${rate >= 2 && 'checked'}`} />
        <i className={`fas fa-star star-in-user-movies ${rate >= 3 && 'checked'}`} />
        <i className={`fas fa-star star-in-user-movies ${rate >= 4 && 'checked'}`} />
        <i className={`fas fa-star star-in-user-movies ${rate === 5 && 'checked'}`} />
      </div>
    </div>
  );
};
