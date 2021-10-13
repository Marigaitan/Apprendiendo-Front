import React, { useState } from "react";
import '../css/QuizzSettings.css'

const QuizzSettings = () => {

  const [formValues, setFormValues] = useState([{questionText: "", answerOptions:[]}])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { questionText: "", answerOptions:[]}])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  }

  return (
    <div className='.mainQuizzSet'>
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <div>
            <label>Pregunta</label>
            <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
            </div>
            <div>
            <label>Opción</label>
            <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
            {
              index ?
                <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                : null
            }
            </ div>
          </div>
        ))}
        <div className="button-section">
          <button className="button add" type="button" onClick={() => addFormFields()}>+ Pregunta</button>
          <button className="button submit" type="submit">Crear Actividad</button>
        </div>
      </form>
    </div>
  )
}
export default QuizzSettings;