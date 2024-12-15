export default function Feedback({ feed, total, positive }) {
  return (
    <>
      <ul>
        <li>Good: {feed.good}</li>
        <li>Neutral: {feed.neutral}</li>
        <li>Bad: {feed.bad}</li>
        <li>Total: {total}</li>
        <li>Positive: {positive}%</li>
      </ul>
    </>
  );
}
