import PropTypes from "prop-types";

export default function Interpretation({ chatOutput, imageUrl }) {
  const bulletsOutput = chatOutput.split("• ");
  bulletsOutput.shift();

  const mainOutput = bulletsOutput.pop();

  return (
    <>
      <div className="interpretation">
        {bulletsOutput && <ul>{bulletsOutput.map((text, index) => <li key={index}>{text}</li>)}</ul>}
        <h4>{mainOutput}</h4>
      </div>
      <div className="image">
        <img src={imageUrl} />
      </div>
    </>
  )
}

Interpretation.propTypes = {
  chatOutput: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}
