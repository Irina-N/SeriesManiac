import { RatingStar } from 'rating-star';

export const Rating = ({ id, rate }) => {
  return (
    <div>
      <div className="text-center text-secondary">
        Рейтинг<span> {rate.toFixed(2)}</span>
      </div>
      <RatingStar
        id={`${id}`}
        size={30}
        rating={rate}
        noBorder
        colors={{ rear: 'transparent' }}
      />
    </div>
  );
};
