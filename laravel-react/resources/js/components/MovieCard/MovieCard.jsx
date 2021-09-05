import React from 'react';

export const MovieCard = ({image, title, year, ruTitle}) => {

  return (
    <div class="col-lg-3 col-md-4 col-12 p-2">
      <div class="card shadow-sm">
        <img src={image} />
        <h5 class="card-title">{ruTitle}</h5>
        <div class="card-body">
          <p class="card-text truncate">{title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">{year}</small>
          </div>
        </div>
      </div>
    </div>
  )
}