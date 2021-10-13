import React, { useState } from "react";
import '../css/QuizzSettings.css'

const CuestionarioSettings = () => {

  const [formValuesCuest, setFormValuesCuest] = useState([{questionText:""}])

  let handleChange = (i, e) => {
    let newFormValuesCuest = [...formValuesCuest];
    newFormValuesCuest[i][e.target.name] = e.target.value;
    setFormValuesCuest(newFormValuesCuest);
  }

  let addFormFieldsC = () => {
    setFormValuesCuest([...formValuesCuest, { questionText:""}])
  }

  let removeFormFieldsC = (i) => {
    let newFormValuesCuest = [...formValuesCuest];
    newFormValuesCuest.splice(i, 1);
    setFormValuesCuest(newFormValuesCuest)
  }

  let handleSubmitC = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValuesCuest));
  }

  return (
    <div className='.mainQuizzSet'>
      <form onSubmit={handleSubmitC}>
        {formValuesCuest.map((element, index) => (
          <div className="form-inline" key={index}>
        
            <label>Pregunta</label>
            <input type="text" name="questionText" value={element.questionText || ""} onChange={e => handleChange(index, e)} />
            {
              index ?
                <button type="button" className="button remove" onClick={() => removeFormFieldsC(index)}>Remove</button>
                : null
            }
            
          </div>
        ))}
        <div className="button-section">
          <button className="button add" type="button" onClick={() => addFormFieldsC()}>+ Pregunta</button>
          <button className="button submit" type="submit" color="primary">Crear Actividad</button> 
        </div>
      </form>
    </div>
  )
}
export default CuestionarioSettings;