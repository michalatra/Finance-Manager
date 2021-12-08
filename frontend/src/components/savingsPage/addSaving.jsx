import React from "react";

const AddSaving = () => {
  return (
    <div className="container add-saving-container">
      <h4 className="container-header">Dodaj oszczędność</h4>
      <form className="form-container">
        <label className="form-label">Źródło</label>
        <div className="form-choice-button-container">
          <button>Budżet miesięczny</button>
          <button>Budżet tygodniowy</button>
          <button>Inne źródło</button>
        </div>
        <label htmlFor="saving-value" className="form-label">
          Wartość
        </label>
        <input type="number" name="" id="saving-value" />
        <button className="btn submit-btn" type="submit">
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default AddSaving;
