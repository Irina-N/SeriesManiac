import React from 'react';

export const MovieCard = ({ image, title, year, ruTitle }) => {

  return (
    <div className="col-lg-3 col-md-4 col-12 p-2">
      <div className="card shadow-sm">
        <img src={image} />
        <h5 className="card-title">{ruTitle}</h5>
        <div className="card-body">
          <p className="card-text truncate">{title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{year}</small>
          </div>
        </div>
      </div>
    </div>
  )
}