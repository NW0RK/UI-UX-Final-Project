export function getSteamReviewScore(reviewSource) {
  if (reviewSource && typeof reviewSource === 'object') {
    const label = String(reviewSource.label || '').trim();
    if (label) {
      return {
        ...reviewSource,
        label,
        className: getSteamReviewClassName(label)
      };
    }
  }

  const rating = reviewSource;
  const numericRating = parseFloat(rating);

  if (Number.isNaN(numericRating)) {
    const label = String(rating || '').trim();
    const className = getSteamReviewClassName(label);

    return {
      label: label || 'Mostly Positive',
      className: className || 'mostly-positive'
    };
  }

  if (numericRating >= 4.8) return { label: 'Overwhelmingly Positive', className: 'overwhelmingly-positive' };
  if (numericRating >= 4.5) return { label: 'Very Positive', className: 'very-positive' };
  if (numericRating >= 4.0) return { label: 'Mostly Positive', className: 'mostly-positive' };
  if (numericRating >= 3.0) return { label: 'Mixed', className: 'mixed' };
  if (numericRating >= 2.0) return { label: 'Mostly Negative', className: 'mostly-negative' };
  if (numericRating >= 1.0) return { label: 'Very Negative', className: 'very-negative' };

  return { label: 'Overwhelmingly Negative', className: 'overwhelmingly-negative' };
}

export function getSteamReviewClassName(label) {
  const lower = String(label || '').toLowerCase();

  if (lower.includes('positive')) {
    if (lower.includes('overwhelmingly')) return 'overwhelmingly-positive';
    if (lower.includes('very')) return 'very-positive';
    return 'mostly-positive';
  }

  if (lower.includes('mixed')) return 'mixed';

  if (lower.includes('negative')) {
    if (lower.includes('overwhelmingly')) return 'overwhelmingly-negative';
    if (lower.includes('very')) return 'very-negative';
    return 'mostly-negative';
  }

  return '';
}
