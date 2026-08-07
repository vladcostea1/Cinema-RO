import "./index.css"
function BackButton() {
  return (
    <div className="back-button">
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
} 
export default BackButton;