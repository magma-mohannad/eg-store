function Star({ filled = false, half = false }) {
  if (half) {
    // Two overlapping SVGs, left half yellow, right half zinc
    return (
      <span className="relative inline-block w-6 h-6 align-middle">
        <svg
          viewBox="0 0 576 512"
          className="absolute left-0 top-0 w-6 h-6 text-yellow-400"
          fill="currentColor"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
        <svg
          viewBox="0 0 576 512"
          className="absolute left-0 top-0 w-6 h-6 text-zinc-400 "
          fill="currentColor"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        >
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
        <span className="sr-only">Half star</span>
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 576 512"
      className={`w-6 h-6 align-middle ${
        filled ? "text-yellow-400" : "text-zinc-400"
      }`}
      fill="currentColor"
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
}

function RatingStars({ rating, max = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={"full" + i} filled />
      ))}
      {hasHalf && <Star half />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={"empty" + i} />
      ))}
      <span className="ml-2 text-sm text-gray-500 dark:text-zinc-200">
        {rating}
      </span>
    </div>
  );
}

export default RatingStars;
