import PropTypes from "prop-types";

export default function Interpretation({ keywords, chatOutput, imageUrl }) {
  const bulletsOutput = chatOutput.split("• ");
  bulletsOutput.shift();

  const mainOutput = bulletsOutput.pop();

  const bulletsString = bulletsOutput ? bulletsOutput.join() : "";

  async function postDream() {
    try {
      await fetch ("http://localhost:5000/dreams", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords, mainOutput, imageUrl, bulletsString })
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="interpretation">
        {bulletsOutput && <ul>{bulletsOutput.map((text, index) => <li key={index}>{text}</li>)}</ul>}
        <h4>{mainOutput}</h4>
      </div>
      <div className="image">
        <img src={imageUrl} />
      </div>
      <button className="share-button" onClick={postDream}>Share to the world</button>
    </>
  )
}

Interpretation.propTypes = {
  keywords: PropTypes.string.isRequired,
  chatOutput: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}
